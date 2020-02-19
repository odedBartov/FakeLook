function generateRow(day, clockIn, clockOut, comment, totalHours, location) {
    return {
        day: day,
        clockIn: clockIn,
        clockOut: clockOut,
        comment: comment,
        totalHours: totalHours,
        location: location
    }

}

function generateFullReport(clockIn, clockOut, dayCurrent) {
    dateClockIn = clockIn.date;
    dateClockOut = clockOut.date;
    totalHours = CalculateDiffHoursDates(dateClockIn, dateClockOut);

    console.log(typeof (totalHours));
    row = generateRow(dayCurrent, dateClockIn, dateClockOut,
        clockOut.comment, totalHours, clockIn.Location);

    return {
        row: row,
        totalHours: totalHours
    }
}

function generateMissingReport(dayCurrent, clockIn) {
    dateClockIn = clockIn.date;
    row = generateRow(dayCurrent, dateClockIn, "Not Reported",
        "", 0, clockIn.Location);
    return row;

}

function responseForEmptyReport() {
    response = {};
    response.status = 200;
    response.resJson = {
        result: false,
        errorCode: 352,
        errorDesc: "You hav'nt reports from this month"
    }
    return response;
}

function responseForValidReport(tableMonthReport, graphMonthReport, totalHours, locations) {
    response = {};
    response.status = 200;
    response.resJson = {
        result: true,
        tableMonthReport: tableMonthReport,
        graphMonthReport: graphMonthReport,
        totalHours: totalHours
    }
    if (locations) {
        response.resJson.locations = locations;
    }
    console.log(response.resJson.locations);
    return response;
}

function CalculateDiffHoursDates(dateClockIn, dateClockOut) {
    return (Math.abs(dateClockOut - dateClockIn) / 3600000).toFixed(2);
}

function addToDictionary(key, value, dic) {
    if (dic[key]) {
        dic[key] += value;
    }
    else {
        dic[key] = value;
    }
    dic[key] = Number.parseFloat(dic[key]).toFixed(2);
}


module.exports = {
    generateFullReport: generateFullReport,
    generateMissingReport: generateMissingReport,
    responseForEmptyReport: responseForEmptyReport,
    responseForValidReport: responseForValidReport,
    CalculateDiffHoursDates: CalculateDiffHoursDates,
    addToDictionary: addToDictionary

}