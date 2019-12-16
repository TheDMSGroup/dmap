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
    console.log([eventType, payLoad]);
    return window.permutive.track(eventType, payLoad);
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
            oldFormioData[k] = obj[k];
        }
    }
}

/**
 * Permutive Script
 */
!function (n, e, o, r, i) {
    if (!e) {

        e = e || {},
            window.permutive = e,
            e.q = [],
            e.config = i || {},
            e.config.projectId = o,
            e.config.apiKey = r,
            e.config.environment = e.config.environment || "production";

        var t = [
            "addon",
            "identify",
            "track",
            "trigger",
            "query",
            "segment",
            "segments",
            "ready",
            "on",
            "once",
            "user",
            "consent"
        ];

        for (c = 0; c < t.length; c++) {
            var f = t[c];
            e[f] = function (n) {
                return function () {
                    var o = Array.prototype.slice.call(arguments, 0);
                    e.q.push({functionName: n, arguments: o})
                }
            }(f);
        }
    }
} (document, window.permutive, "d17fc6b1-943f-4914-b96b-f35214fc0687", "bc838b88-1bea-4f37-aa85-0bf13e927ae4", {});

window.googletag = window.googletag || {},
    window.googletag.cmd = window.googletag.cmd || [],
    window.googletag.cmd.push(function () {
        if (0 === window.googletag.pubads().getTargeting("permutive").length) {
            var g = window.localStorage.getItem("_pdfps");
            window.googletag.pubads().setTargeting("permutive", g ? JSON.parse(g) : [])
        }
    });

permutive.addon('web', {'page': {
        "network": {
            "campaign_id": grabUrlArg('utm_campaign'),
            "pub_id": grabUrlArg('sub2'),
            "source": grabUrlArg('utm_source'),
            "sub_id": grabUrlArg('sub1')
        }}
});


/**
 * include permutive external script
 */
var s = document.createElement("script");
s.type = "text/javascript";
s.src = "https://cdn.permutive.com/d17fc6b1-943f-4914-b96b-f35214fc0687-web.js";
document.head.appendChild(s);

var loadMainFeature = function() {

    findFormioTimer = setInterval(function() {
        if (typeof Formio !== 'undefined') {
            setInterval(function() {
                var formData = Formio.forms[Object.keys(Formio.forms)[0]].data;
                if (!oldFormioData) {
                    oldFormioData = easyCopyObj(formData);
                }
                if (JSON.stringify(oldFormioData) !== JSON.stringify(formData)) {
                    for (var k in formData) {
                        if (
                            (!oldFormioData.hasOwnProperty(k) || oldFormioData[k] != formData[k])  &&
                            (formData.hasOwnProperty(k) && formData[k].length > 1)
                        ) {
                            console.log("Form Data Changed: " + k + "\nFrom " + oldFormioData[k] + " to " + formData[k]);

                            var postQuestion = k;
                            var postAnswer = formData[k];

                            if (typeof window.queryDmap !== 'undefined') {
                                var dmapSet = queryDmap(postQuestion, postAnswer);

                                postQuestion = dmapSet[0];
                                postAnswer = dmapSet[1];
                            }

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
                                            "answer": forceString(postAnswer),
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

