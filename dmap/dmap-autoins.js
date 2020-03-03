/* DMAP Data Map */
var __dmapValues = {"mappings": {"address": "address1", "addsecondvehicle": "num_cars", "age": "age", "autoinshomesecurity_upsell": "autoins_homesecurity_upsell", "avgmilage": "car_mileage", "career": "area_of_study", "city": "city", "continuouscoverage": "continuous_coverage", "credit": "credit_score", "currentcustomer": "current_customer", "CURRENTINSURANCECOMPANY": "insurance_provider", "currentlyinsured": "have_car_insurance", "currentpolicyexpiration": "currentpolicyexpiration", "currentresidence": "homeowner", "currentvalue": "currentvalue", "desiredcollisiondeductible": "ins_coverage_amt", "desiredcomprehensivedeductible": "ins_coverage_amt", "desiredcoveragetype": "ins_coverage_amt", "desiredcoveragetypelevel": "ins_coverage_amt", "desirededulevel": "education_level", "dob": "dob", "dobday": "dob_day", "dobmonth": "dob_month", "dobyear": "dob_year", "driver1dob_year": "dob_year", "driver1dobyear": "dob_year", "driver1edulevel": "education_level", "driver1firstname": "firstname", "driver1gender": "gender", "driver1lastname": "lastname", "driver1licenseage": "driver1licenseage", "driver1licensestatus": "driver1licensestatus", "driver1maritalstatus": "marital_status", "driver1occupation": "employed", "driver1sr22": "driver1sr22", "driver1yearsatresidence": "residency_length", "driver2age": "age", "driver2dob": "dob", "driver2dobday": "dob_day", "driver2dobmonth": "dob_month", "driver2dobyear": "dob_year", "driver2firstname": "firstname", "driver2gender": "gender", "driver2lastname": "lastname", "driver2maritalstatus": "marital_status", "driver2occupation": "employed", "driver2relationshipToApplicant": "driver2relationshipToApplicant", "driver2yearsatresidence": "residency_length", "eduLevel": "education_level", "email": "email", "emailaddress": "email", "employer": "employed", "employername": "employed", "enrolled": "enrolled", "gender": "gender", "gradyear": "hs_graduation_year", "homephone": "phone", "housesqft": "square_footage", "housestories": "house_stories", "incidentslast5years": "incidentslast5years", "lastname": "lastname", "MilitaryStatus": "military_status", "name": "firstname", "optin": "tcpa_consent", "recentInsurance": "have_car_insurance", "RN": "rn_license", "state": "state", "TC": "TC", "vehicle1annualMileage": "car_mileage", "vehicle1commutedays_per_week": "vehicle1commute_days_per_week", "vehicle1commuteAvgMileage": "vehicle1commuteAvgMileage", "vehicle1leased": "car_lease_own", "vehicle1primaryUse": "vehicle1commuteAvgMileage", "vehicle1year": "car_year", "vehicle1yeartop10select": "car_year", "vehicle1yeartop10": "car_year", "vehicle1make": "car_make", "vehicle1maketop10": "car_make", "vehicle1maketop10select": "car_make", "vehicle1model": "car_model", "vehicle1trim": "car_trim", "vehicle2year": "car_year", "vehicle2yeartop10": "car_year", "vehicle2make": "car_make", "vehicle2maketop10": "car_make", "vehicle2maketop10select": "car_make", "vehicle2model": "car_model", "vehicle2trim": "car_trim", "vehicle2annualMileage": "car_mileage", "vehicle2commutedays_per_week": "vehicle2commute_days_per_week", "vehicle2commuteAvgMileage": "vehicle2commuteAvgMileage", "vehicle2leased": "car_lease_own", "vehicle2primaryUse": "vehicle2primaryUse", "yearbuilt": "home_year_built", "zip": "zipcode"}, "patterns": {"companyemail": "\/[^A-Za-z0-9]\/", "email": "\/[^A-Za-z0-9]\/", "email_consent": "\/[^A-Za-z0-9]\/", "email_job_alert": "\/[^A-Za-z0-9]\/", "email_reason": "\/[^A-Za-z0-9]\/", "email_score": "\/[^A-Za-z0-9]\/", "email_valid": "\/[^A-Za-z0-9]\/", "lender_email": "\/[^A-Za-z0-9]\/"}, "privates": {"dob": true, "email": true, "dobday": true, "dobmonth": true, "dobyear": true, "firstname": true, "lastname": true, "phone": true, "zipcode": true}};

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
