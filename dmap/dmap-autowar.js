/* DMAP Data Map */
var __dmapValues = {"mappings": {"address": "address1", "age": "age", "autowarranty_mileage": "car_mileage", "currentvalue": "currentvalue", "driver1firstname": "firstname", "driver1lastname": "lastname", "email": "email", "homephone": "phone", "incidentslast5years": "incidentslast5years", "lastname": "lastname", "name": "firstname", "optin": "tcpa_consent", "RN": "rn_license", "vehicle1make": "car_make", "vehicle1model": "car_model", "vehicle1year": "car_year", "zip": "zipcode"}, "patterns": {"companyemail": "\/[^A-Za-z0-9]\/", "email": "\/[^A-Za-z0-9]\/", "email_consent": "\/[^A-Za-z0-9]\/", "email_job_alert": "\/[^A-Za-z0-9]\/", "email_reason": "\/[^A-Za-z0-9]\/", "email_score": "\/[^A-Za-z0-9]\/", "email_valid": "\/[^A-Za-z0-9]\/", "lender_email": "\/[^A-Za-z0-9]\/"}, "privates": {"dob": true, "email": true, "dobday": true, "dobmonth": true, "dobyear": true, "firstname": true, "lastname": true, "phone": true, "zipcode": true}};

/**
* QUERY JSON DMAP (namespace: __dmapValues
*/
function queryDmap(question, answer) {
    var mappedQuestionKey = getDmapMapping(question);

    if (!mappedQuestionKey) {
        return [question, answer];
    }

    if (__dmapValues['privates'][mappedQuestionKey]) {
        return [mappedQuestionKey, '*********'];
    }

    if (mappedPattern = __dmapValues['patterns'][mappedQuestionKey]) {
        return [mappedQuestionKey, applyDmapPattern(answer, __dmapValues['patterns'][mappedQuestionKey])];
    }

    return [mappedQuestionKey, answer];
}

function modifyQueryInput(queryInput) {
    return queryInput.replace(/[^A-Za-z0-9]/, '');
}

function getDmapMapping(keyString) {
    keyString = modifyQueryInput(keyString);

    //check for mappings
    if (__dmapValues['mappings'].hasOwnProperty(keyString)) {
        return __dmapValues['mappings'][keyString];
    }

    return false;
}

function applyDmapPattern(valueString, pattermString) {
    return valueString.replace(new RegExp(pattermString), '');
}
