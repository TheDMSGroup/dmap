var findFormioTimer = null;
var watchFormioDataInterval = 5000;
var oldFormioData = null;
var oldFormioDataFields = {};

/**
 * Event Properties
 */
var permutiveEventProperties = {
    "LinkClick": {
        "client": {
            "url": "",
            "domain": "",
            "referrer": "",
            "title": "",
            "type": "",
            "user_agent": "",
            "dest_url": ""
        }
    },
    "Submit": {
        "client": {"url": "", "domain": "", "referrer": "", "title": "", "type": "", "user_agent": ""},
        "form": {"answer": "", "question": "", "type": ""},
        "network": {"campaignId": "", "categoryId": "", "channels": [], "pubId": "", "source": "", "subId": ""},
    }
};

//extract URL parameters
function grabUrlArg(namespace) {
    namespace = namespace.toLowerCase();
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key.toLowerCase()] = value;
    });

    if (vars.hasOwnProperty(namespace)) {
        if (vars[namespace].indexOf('#')) {
            vars[namespace] = vars[namespace].split('#')[0];
        }

        return vars[namespace] ? vars[namespace] : "N/A";
    }

    return null;
}

function permutiveTrack(eventType, payLoad) {
    if (typeof window.permutive !== 'undefined') {
      return window.permutive.track(eventType, payLoad);
    }
    return;
}

function mergeObjects(obj1, obj2) {
    return Object.assign(obj1, obj2);
}

//Easy hack to copy/clone a javascript obj
function easyCopyObj(originalObj) {
    return JSON.parse(JSON.stringify(originalObj));
}

// This function handles arrays and objects
function eachRecursive(obj) {
    for (var k in obj) {
        if (typeof obj[k] == "object" && obj[k] !== null) {
            eachRecursive(obj[k]);
        } else {

        }
    }
}

function forceString(answer) {
    if (typeof answer == "string") {
        return answer;
    }

    if (typeof answer.toString == "function") {
        return answer.toString();
    }

    return "" + answer;
}

function copyOldProperties(obj) {
    for (var k in obj) {
        if (obj[k] !== null) {
            oldFormioDataFields[k] = obj[k];
        }
    }
}

var loadMainFeature = function() {

    findFormioTimer = setInterval(function() {
        if (typeof Formio !== 'undefined') {
            setInterval(function() {
                var formData = Formio.forms[Object.keys(Formio.forms)[0]].data;
                if (oldFormioData) {
                    if (JSON.stringify(oldFormioData) !== JSON.stringify(formData)) {
                        for (var k in formData) {
                            if (
                                (!oldFormioDataFields.hasOwnProperty(k) || oldFormioDataFields[k] != formData[k])  &&
                                (formData.hasOwnProperty(k) && formData[k].length > 1)
                            ) {
                                var postQuestion = k;
                                var postAnswer = formData[k];

                                if (typeof window.queryDmap !== 'undefined') {
                                    var dmapSet = queryDmap(postQuestion, postAnswer);

                                    postQuestion = dmapSet[0];
                                    postAnswer = dmapSet[1];
                                }

                                console.log("Form Data Changed: " + k + "\nFrom " + oldFormioDataFields[k] + " to " + formData[k] + "\nSending: " + postAnswer);

                                permutiveTrack(
                                    "Submit",
                                    mergeObjects(
                                        permutiveEventProperties.Submit,
                                        {
                                            "client": {
                                                "url": document.location.href,
                                                "domain": document.location.hostname,
                                                "referrer": document.referrer,
                                                "title": document.title,
                                                "type": "web",
                                                "user_agent": navigator.userAgent,
                                            },
                                            "form": {
                                                "answer": postAnswer,
                                                "question": postQuestion,
                                            },
                                            "network": {
                                                "campaignId": grabUrlArg('utm_campaign'),
                                                "pubId": grabUrlArg('sub2'),
                                                "source": grabUrlArg('utm_source'),
                                                "subId": grabUrlArg('sub1')
                                            },
                                        }
                                    )
                                );
                            }
                        }

                        oldFormioData = easyCopyObj(formData);
                        copyOldProperties(formData);
                    }
                } else {
                    oldFormioData = easyCopyObj(formData);
                }
            }, watchFormioDataInterval);

            clearInterval(findFormioTimer);
        }
    }, 10);
};

//Bind Formio Data Watcher
if (typeof $ == 'undefined') {
    document.addEventListener("DOMContentLoaded", loadMainFeature);
} else {
    $(loadMainFeature);
}
