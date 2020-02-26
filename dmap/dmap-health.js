/* DMAP Data Map */
var __dmapValues = {"mappings": {"address": "address1", "age": "age", "avgmilage": "car_mileage", "city": "city", "currentcarrier": "currentcarrier", "CURRENTINSURANCECOMPANY": "insurance_provider", "currentlyinsured": "have_health_insurance", "currentpolicyexpiration": "currentpolicyexpiration", "currentresidence": "homeowner", "currentvalue": "currentvalue", "deniedcoverage": "deniedcoverage", "desiredcollisiondeductible": "ins_coverage_amt", "desiredcomprehensivedeductible": "ins_coverage_amt", "desiredcoveragetype": "ins_coverage_amt", "dobday": "dob_day", "dobmonth": "dob_month", "dobyear": "dob_year", "driver1dobday": "dob_day", "driver1dobmonth": "dob_month", "driver1dobyear": "dob_year", "driver1edulevel": "education_level", "driver1firstname": "firstname", "driver1gender": "gender", "driver1lastname": "lastname", "driver1licenseage": "driver1licenseage", "driver1maritalstatus": "marital_status", "driver1occupation": "occupation_name", "driver1yearsatresidence": "residency_length", "driver2dobday": "dob_day", "driver2dobmonth": "dob_month", "driver2dobyear": "dob_year", "driver2edulevel": "education_level", "driver2gender": "gender", "driver2licenseage": "driver2licenseage", "driver2maritalstatus": "marital_status", "driver2occupation": "employed (boolean)", "dui": "dui", "email": "email", "emailaddress": "email", "existingconditionstoggle": "medical_condition", "gender": "gender", "height": "height_ft", "homephone": "phone", "householdsize": "household_size", "incidentslast5years": "n/a", "income": "household_income", "lastname": "lastname", "name": "firstname", "optin": "tcpa_consent", "pregnant": "pregnant", "RN": "rn_license", "socialsecurity": "socialsecurity", "state": "state", "tobacco": "tobacco_use", "vehicle1alarm": "vehicle1alarm", "vehicle1annualMileage": "car_mileage", "vehicle1garageType": "vehicle1garageType", "vehicle1leased": "car_lease_own", "vehicle1make": "car_make", "vehicle1model": "car_model", "vehicle1primaryUse": "vehicle1primaryUse", "vehicle1trim": "vehicle1trim", "vehicle1year": "car_year", "vehicle2alarm": "vehicle2alarm", "vehicle2annualMileage": "car_mileage", "vehicle2commuteAvgMileage": "vehicle2commuteAvgMileage", "vehicle2garageType": "vehicle2garageType", "vehicle2leased": "car_lease_own", "vehicle2make": "car_make", "vehicle2model": "car_model", "vehicle2primaryUse": "vehicle2primaryUse", "vehicle2trim": "vehicle2trim", "vehicle2year": "car_year", "weight": "weight_lbs", "zip": "zipcode"}, "patterns": {"companyemail": "\/[^A-Za-z0-9]\/", "email": "\/[^A-Za-z0-9]\/", "email_consent": "\/[^A-Za-z0-9]\/", "email_job_alert": "\/[^A-Za-z0-9]\/", "email_reason": "\/[^A-Za-z0-9]\/", "email_score": "\/[^A-Za-z0-9]\/", "email_valid": "\/[^A-Za-z0-9]\/", "lender_email": "\/[^A-Za-z0-9]\/"}, "privates": {"dob": true, "email": true, "dobday": true, "dobmonth": true, "dobyear": true, "firstname": true, "lastname": true, "phone": true, "zipcode": true}};

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
