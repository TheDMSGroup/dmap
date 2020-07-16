/* Vue Permutive Helper Script */

/**
 * Force value to string.
 * @param answer
 * @returns string
 */
 function forceString(answer) {
     if (typeof answer == "string") {
         return answer;
     }

     if (answer && typeof answer.toString == "function") {
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
 * Tracking using permutive script
 * @param postQuestion
 * @param postAnswer
 */

function doTrack(postQuestion, postAnswer) {
    if (typeof window.permutive !== 'undefined') {
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
                "answer": forceString(postAnswer),
                "question": postQuestion,
            },
            "network": {
                "campaignId": grabUrlArg('utm_campaign'),
                "pubId": grabUrlArg('sub2'),
                "source": grabUrlArg('utm_source'),
                "subId": grabUrlArg('sub1')
            }
        });
    }
}

/* BIND TO input Change Events */
if (typeof window.vueApp !== 'undefined') {

  window.vueApp.registerInputChangeCallback(function (name, value) {
    if (typeof window.queryDmap !== 'undefined') {
        var dmapSet = queryDmap(name, value);
        var postQuestion = dmapSet[0];
        var postAnswer = dmapSet[1];
        doTrack(postQuestion, postAnswer);
    }

  });
}
