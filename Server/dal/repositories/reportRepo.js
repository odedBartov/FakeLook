const userRepo = require('../../dal/repositories/userRepo');
const mongoose = require('mongoose');
const User = require('../../api/models/user');

///find the last report for this current day
async function findLastReport(mail) {

    dateNow = new Date();
    day = dateNow.getDate();
    month = dateNow.getUTCMonth() + 1;
    year = dateNow.getFullYear();

    res = await User.aggregate([
        { $match: { mail: mail } },
        { $unwind: { path: "$reports" } },
        {
            $project: {
                "Location": "$reports.location", date: {
                    $dateToParts: { date: "$reports.time" }
                },
                "Action": "$reports.action"
            }
        },
        { $group: { _id: "$_id", Location: { $last: "$Location" }, Time: { $last: "$date" }, Action: { $last: "$Action" } } },
        { $match: { "$and": [{ "Time.day": day }, { "Time.month": month }, { "Time.year": year }] } }
    ]);

    if (res) {
        return res[0];
    }
    return null;

}

//add report to user with the requested mail
async function addReport(mail, report) {
    //check if has some error
    await User.updateOne(
        { mail: mail },
        { "$push": { "reports": report } }
    );
}

//filter all reports of the user with the requested mail
//of the requested month and current year
async function getReportsByMonth(mail, month) {
    dateNow = new Date();
    currentYear = dateNow.getFullYear();
    res = await User.aggregate([
        { $match: { mail: mail } },
        { $unwind: { path: "$reports" } },
        {
            $project: {
                "Location": "$reports.location", date: "$reports.time", dateParts: {
                    $dateToParts: { date: "$reports.time" }
                },
                "Action": "$reports.action", "Comment": "$reports.comment", "_id": 0
            }
        },
        { $match: { "$and": [{ "dateParts.month": month }, { "dateParts.year": currentYear }] } },
        { $sort: { date: 1 } }
    ]);
    return res;
}

//return all reports of specific month of all employees
//sorted by id
async function GetAllReportsByMonth(month) {
    dateNow = new Date();
    currentYear = dateNow.getFullYear();
    res = await User.aggregate([
        { $unwind: { path: "$reports" } },
        { $match: { "isManager": false } },
        {
            $project: {
                "Location": "$reports.location", date: "$reports.time", dateParts: {
                    $dateToParts: { date: "$reports.time" }
                },
                "Action": "$reports.action", "firstName": 1,
                "lastName": 1
            }
        },
        { $match: { "$and": [{ "dateParts.month": month }, { "dateParts.year": currentYear }] } },
        { $sort: { "_id": 1 } }
    ]);

    return res;
}

module.exports = {
    findLastReport: findLastReport,
    addReport: addReport,
    getReportsByMonth: getReportsByMonth,
    GetAllReportsByMonth: GetAllReportsByMonth
}