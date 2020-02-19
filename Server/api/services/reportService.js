
const reportRepo = require('../../dal/repositories/reportRepo');
const modelsFactory = require('./modelsFactory');
const monthlyReportServ = require('./monthlyReportService');


//add clockIn or clockOut report for specific user
async function addReport(mail, reportData) {
    lastReport = await reportRepo.findLastReport(mail);
    response = {};

    //check the action of last report from current day
    //if this action is same as the requested action - the report is not been added
    //and the client get an error message
    requestedAction = reportData.report.action;
    if (lastReport) {
        if (lastReport.Action == requestedAction) {
            response.status = 200;
            response.resJson = {
                result: false,
                errorCode: 351,
                errorDesc: `You already reported on ${requestedAction}. First please ${getReversedAction(requestedAction)}`
            }
            return response;
        }
    }

    //if there is not exists report from this day - limit it only for clock in
    if (!lastReport && requestedAction == "clockOut") {
        response.status = 200;
        response.resJson = {
            result: false,
            errorCode: 354,
            errorDesc: `First please report on clockIn}`
        }
    }
    else {
        report = modelsFactory.CreateReport(reportData.report);
        await reportRepo.addReport(mail, report);

        response.status = 200;
        response.resJson = {
            result: true,
            message: `${requestedAction} Reported Successfully`
        }
    }
    return response;
}

function getReversedAction(action) {
    if (action == "clockIn") {
        return "clockOut";
    }
    return "clockIn";
}

//return all data for month report of user with the requested month
//return array of timesSummary(rows for table of month report)
//return array for graph - for each day the total hours and also the total hours of all days of month

async function GenerateMonthlyReport(mail, month) {

    /*     mail = reportData.userToken.mail; */
    const reports = await reportRepo.getReportsByMonth(mail, month);

    if (!reports || reports.length < 1) {
        return monthlyReportServ.responseForEmptyReport();
    }

    const tableMonthReport = [];
    const graphMonthReport = {};
    let totalHoursOfReport = 0;

    for (let i = 0; i < reports.length;) {

        dayCurrent = reports[i].date.getDate();
        if (i == (reports.length - 1)) {//if this is the last report
            row = monthlyReportServ.generateMissingReport(dayCurrent, reports[i]);
            i += 1;
        }
        else {

            dayNext = reports[i + 1].date.getDate();
            if (dayCurrent == dayNext) { //if the current clock in has also report of clock out
                clockIn = reports[i];
                clockOut = reports[i + 1];
                res = monthlyReportServ.generateFullReport(clockIn, clockOut, dayCurrent);
                totalHoursOfReport += res.totalHours;
                row = res.row;
                monthlyReportServ.addToDictionary(dayCurrent, res.totalHours, graphMonthReport);

                i += 2;
            }
            else {//if the clock in has not clock out
                row = monthlyReportServ.generateMissingReport(dayCurrent, reports[i]);
                i += 1;
            }
            tableMonthReport.push(row);
        }
    }

    totalHoursOfReport = Number.parseFloat(totalHoursOfReport).toFixed(2);

    return monthlyReportServ.responseForValidReport
        (tableMonthReport, graphMonthReport, totalHoursOfReport);
}

//return all data for monthly report of all employees for manager user
async function ManagerMonthlyReport(month) {
    const reports = await reportRepo.GetAllReportsByMonth(month).catch(err => console.log(err));
    if (!reports || reports.length <= 0) {
        return monthlyReportServ.responseForEmptyReport();
    }

    const tableMonthReport = {};
    const graphMonthReport = {};
    const locations = [];
    let totalHoursOfReport = 0;

    for (let i = 0; i < reports.length;) {
        currentReport = reports[i];
        if (i == (reports.length - 1)) {//if this is the last report
            i += 1;
        }
        else {
            dayCurrent = reports[i].date.getDate();
            nextReport = reports[i + 1];
            if (currentReport.Action == "clockIn" && nextReport.Action == "clockOut") { //if the current report is clockIn and the next is clockOut
                fullName = `${currentReport.firstName} ${currentReport.lastName}`;
                totalHours = monthlyReportServ.CalculateDiffHoursDates(currentReport.date, nextReport.date);
                monthlyReportServ.addToDictionary(fullName, totalHours, tableMonthReport);
                totalHoursOfReport += totalHours;
                monthlyReportServ.addToDictionary(dayCurrent, totalHours, graphMonthReport);
                i += 2;
            }
            else {//if the clock in has not clock out
                i += 1;
            }
        }
        locations.push(currentReport.Location);
    }

    totalHoursOfReport = Number.parseFloat(totalHoursOfReport).toFixed(2);
    return monthlyReportServ.responseForValidReport
        (tableMonthReport, graphMonthReport, totalHoursOfReport, locations);
}



module.exports = {
    addReport: addReport,
    GenerateMonthlyReport: GenerateMonthlyReport,
    ManagerMonthlyReport: ManagerMonthlyReport
} 