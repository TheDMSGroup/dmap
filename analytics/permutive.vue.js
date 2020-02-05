/* Vue Permutive Helper Script */

/**
 * Force value to string.
 * @param answer
 * @returns string
 */
function forceString(answer) {
    if (typeof answer == "undefined") {
        return "";
    }
    if (typeof answer == "string") {
        return answer;
    }

    if (typeof answer.toString == "function") {
        return answer.toString();
    }

    return "" + answer;
}

/**
 * Extract URL Parameters.
 * @param namespace
 * @returns {string|null}
 */
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

/**
 * Permutive Injection Script.
 * @param n, e, o, r, i
 *
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

permutive.addon('web',
    {
        'page': {
            "network": {
                "campaign_id": grabUrlArg('utm_campaign'),
                "pub_id": grabUrlArg('sub2'),
                "source": grabUrlArg('utm_source'),
                "sub_id": grabUrlArg('sub1')
            }
        }
    }
);
/* END PERMUTIVE INJECTION SCRIPT */

/* BIND TO input Change Events */
if (typeof window.vueApp !== 'undefined') {

  window.vueApp.registerInputChangeCallback(function (name, value) {
    window.permutive.track('Submit', {
        "client": {
            "url": document.location.href,
            "domain": document.location.hostname,
            "referrer": document.referrer,
            "title": document.title,
            "type": "web",
            "user_agent": navigator.userAgent,
        },
        "form": {
            "answer": forceString(name),
            "question": forceString(window.vueApp.permittedValue(name, value)),
        },
        "network": {
            "campaignId": grabUrlArg('utm_campaign'),
            "pubId": grabUrlArg('sub2'),
            "source": grabUrlArg('utm_source'),
            "subId": grabUrlArg('sub1')
        }
    });

  });
}
