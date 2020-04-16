/* DMAP Data Map */
var __dmapValues = {"mappings": {"annualincome": "household_income", "dob": "dob", "email": "email", "firstname": "firstname", "lastname": "lastname", "phoneNumber": "phone", "cphone": "companyphone", "zipcode": "zipcode", "ssn": "ssn", "ssnagree": "ssn", "creditscore_self": "credit", "employmentpay_freq": "employmentpay_freq", "debtover_10k": "debtover_10k", "mortgagepmt_amt": "mortgagepmt_amt", "incomesource": "incomesource", "address1": "address1"}, "patterns": {"companyemail": "\/[^A-Za-z0-9]\/", "email": "\/[^A-Za-z0-9]\/", "email_consent": "\/[^A-Za-z0-9]\/", "email_job_alert": "\/[^A-Za-z0-9]\/", "email_reason": "\/[^A-Za-z0-9]\/", "email_score": "\/[^A-Za-z0-9]\/", "email_valid": "\/[^A-Za-z0-9]\/", "lender_email": "\/[^A-Za-z0-9]\/"}, "privates": {"dob": true, "email": true, "firstname": true, "lastname": true, "address1": true, "phone": true, "address1": true, "companyphone": true, "zipcode": true, "ssn": true, "credit": true, "employmentpay_freq" : true, "debtover_10k" : true, "mortgagepmt_amt" : true, "incomesource": true,}};

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
    if (typeof queryInput === 'undefined') return false;
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
