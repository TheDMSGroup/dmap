/* DMAP Data Map */
var __dmapValues = {"mappings": {"degreelevel_id" : "degree_level", "rootstudy_area_id" : "area_of_study", "studyarea_id" : "area_of_study", "stepview[age_level]" : "age", "stepview[months_until_start]" : "months_until_start", "stepview[extended_computer_access]" : "computer_access", "stepview[extended_three_hours_to_enroll]" : "three_hours_to_enroll", "stepview[education_level_id]" : "education_level", "stepview[college_credits]" : "college_credits", "stepview[hs_grad_year]" : "hs_graduation_year", "stepview[country]" : "country", "stepview[us_citizen]" : "us_citizen", "stepview[military_affiliation]" : "military_relative_oversea", "stepview[military_branch]" : "military_branch", "stepview[military_status]" : "military_status", "stepview[military_relationship]" : "military_relationship", "stepview[zip]" : "zipcode", "zip": "zipcode", "search": "search_terms", "schooltype": "school_type", "referringurl": "referring_url", "sub": "sub_id", "qual": "qual", "action": "action", "ct": "ct", "stepview[school_type]" : "school_type", "stepview[email]" : "email", "stepview[degree_level_id]" : "degree_level_id", "otherstudy_areas" : "other_study_areas", "duplicateteaching_certificate" : "duplicate_teaching_certificate", "duplicatern_license" : "rn_license", "stepview[extended_teaching_certificate]" : "extended_teaching_certificate", "stepview[rn_license]" : "rn_license", "stepview[study_area_ids][]" : "study_area_ids", "stepview[first_name]" : "firstname", "stepview[last_name]" : "lastname", "stepview[phone1]" : "phone", "stepview[address1]" : "address1", "stepview[city]" : "city", "stepview[state]" : "state", "stepview[gender]" : "gender", "stepview[prefix]": "title", "stepview[phone1_type]": "line_type", "stepview[phone2]": "phone_home", "stepview[time_to_call]": "best_time", "stepview[extended_leadid_token]" : "jornayaleadid", "consenttype" : "consent_type", "consentid" : "consent_id", "commit" : "commit", "stepview[extended_trusted_form_cert_url]" : "xx_trusted_form_cert_url", "authenticity_token" : "token", "stepview[pre_leads][0][search_id]" : "search_id", "stepview[pre_leads][0][school_id]" : "school_id", "stepview[pre_leads][0][program_id]" : "program_id", "stepview[pre_leads][0][program_id]\n" : "program_id"}, "patterns": {"companyemail": "\/[^A-Za-z0-9]\/", "email": "\/[^A-Za-z0-9]\/", "email_consent": "\/[^A-Za-z0-9]\/", "email_job_alert": "\/[^A-Za-z0-9]\/", "email_reason": "\/[^A-Za-z0-9]\/", "email_score": "\/[^A-Za-z0-9]\/", "email_valid": "\/[^A-Za-z0-9]\/", "lender_email": "\/[^A-Za-z0-9]\/"}, "privates": {"dob": true, "age": true, "address1": true, "email": true, "dobday": true, "dobmonth": true, "firstname": true, "lastname": true, "phone": true, "zipcode": true}};

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
