/* DMAP Data Map */
var __dmapValues =  {"mappings": {"sFirstName": "firstname","sLastName": "lastname","sAddress1": "address1","sCity": "city","sState": "state","sZipCode": "zipcode","email": "email","phone1": "ptp_area_code","phone2": "ptp_line_number","phone3": "ptp_prefix","childM": "dob_month","childD": "dob_day","childY": "dob_year","joinEmailList": "email_consent"},"patterns": {"companyemail": "\/[^A-Za-z0-9]\/","email": "\/[^A-Za-z0-9]\/","email_consent": "\/[^A-Za-z0-9]\/","email_job_alert": "\/[^A-Za-z0-9]\/","email_reason": "\/[^A-Za-z0-9]\/","email_score": "\/[^A-Za-z0-9]\/","email_valid": "\/[^A-Za-z0-9]\/","lender_email": "\/[^A-Za-z0-9]\/"},"privates": {"dob": !0,"email": !0,"firstname": !0,"lastname": !0,"address1": !0,"phone": !0,"address1": !0,"zipcode": !0,"ssn": !0},"ignores": {"confEmail": !0,"isBonus": !0,"cardType": !0,"ccNumber": !0,"billingZipCode": !0,"expMonth": !0,"expYear": !0,"cidNumber": !0,"isAgreeTC": !0,"imageStr": !0}}

/**
 * QUERY JSON DMAP (namespace:  __dmapValues
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

function fieldIsIgnored(field) {
  if (__dmapValues['ignores'][field]) {
    return true;
  }
  return false;
}
