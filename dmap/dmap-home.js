/* DMAP Data Map */
var __dmapValues = {"mappings": {"address": "address1", "age": "age", "bathrooms": "bathroom_count", "bedrooms": "bedroom_count", "city": "city", "claims": "claims", "credit": "credit_score_self", "CURRENTINSURANCECOMPANY": "insurance_provider", "currentinsured": "currently_insured", "currentlyinsured": "currently_insured", "currentpolicyexpiration": "currentpolicyexpiration", "currentvalue": "currentvalue", "desireddeductible": "ins_coverage_amt", "dob": "dob", "dobday": "dob_day", "dobmonth": "dob_month", "dobyear": "dob_year", "driver1dobyear": "dob_year", "driver1firstname": "firstname", "driver1gender": "gender", "driver1lastname": "lastname", "driver1maritalstatus": "marital_status", "driver1occupation": "occupation_name", "driver2age": "age", "driver2gender": "gender", "driver2maritalstatus": "marital_status", "driver2occupation": "occupation_name", "email": "email", "emailaddress": "email", "employer": "occupation_name", "firealarm": "fire_alarm", "foundation": "foundation", "garagetype": "garage_type", "gender": "gender", "homephone": "phone", "housesqft": "square_footage", "housestories": "house_stories", "houseuse": "house_use", "incidentslast5years": "incidentslast5years", "lastname": "lastname", "maritalstatus": "marital_status", "name": "firstname", "occupation": "occupation_name", "optin": "tcpa_consent", "personalliability_coverage": "ins_coverage_amt", "primaryheating": "primary_heating", "primaryphone": "phone", "primaryphone": "phone", "propertytype": "property_purpose", "RN": "rn_license", "roofage": "roof_age", "rooftype": "rooftype", "securitysystem": "security_system", "st": "state", "useragent": "user_agent", "vehicle1commuteAvgMileage": "vehicle1commuteAvgMileage", "vehicle1make": "car_make", "vehicle1model": "car_model", "vehicle1trim": "vehicle1trim", "vehicle1year": "car_year", "vehicle2make": "car_make", "vehicle2model": "car_model", "vehicle2trim": "vehicle2trim", "vehicle2year": "car_year", "yearbuilt": "home_year_built", "zip": "zipcode"}, "patterns": {"companyemail": "\/[^A-Za-z0-9]\/", "email": "\/[^A-Za-z0-9]\/", "email_consent": "\/[^A-Za-z0-9]\/", "email_job_alert": "\/[^A-Za-z0-9]\/", "email_reason": "\/[^A-Za-z0-9]\/", "email_score": "\/[^A-Za-z0-9]\/", "email_valid": "\/[^A-Za-z0-9]\/", "lender_email": "\/[^A-Za-z0-9]\/"}, "privates": {"dob": true, "email": true, "dobday": true, "dobmonth": true, "dobyear": true, "firstname": true, "lastname": true, "phone": true, "zipcode": true}};

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
