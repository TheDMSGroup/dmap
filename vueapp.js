// window.vueApp methods for tracking
window.vueApp = {};

//Register InputChange Events
window.vueApp.inputChangeCallbacks = [];

window.vueApp.registerInputChangeCallback = (cb) => {

  if (cb instanceof Function) {
      window.vueApp.inputChangeCallbacks.push(cb);
  }
}
//Register Pageview  Events
window.vueApp.pageViewCallbacks = [];

window.vueApp.registerPageViewCallback = (cb) => {

  if (cb instanceof Function) {
      window.vueApp.pageViewCallbacks.push(cb);
  }
}

//Register FormSubmit  Events
window.vueApp.formSubmitCallbacks = [];

window.vueApp.registerFormSubmitCallback = (cb) => {

  if (cb instanceof Function) {
      window.vueApp.formSubmitCallbacks.push(cb);
  }
}

// CHECK IF VALUE IS PERMITTED
window.vueApp.permittedValue = (name, value) => {
  var privateFields = [
      "credit_score",
      "dob",
      "email",
      "medical_condition",
      "phone",
      "firstname",
      "lastname",
      "ssn_last_4"
  ];

   if (privateFields.includes(name)) {
       return "CAPTURED";
   } else {
       return value;
   }
}
