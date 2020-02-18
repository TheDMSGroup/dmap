/* W4 Permutive Helper Script */

/**
 * Force value to string.
 * @param answer
 * @returns string
 */
function forceString(answer) {
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


/* BIND TO :input Change Events */
$(function (){
    $(document).ready(function() {
        $(':input').change(function(event) {

            var postQuestion = $(this).attr('name');
            var postAnswer   = $(this).val();

            if (typeof postQuestion === 'string' && postQuestion !== '' && postQuestion.slice(0,5) === 'data[') {
                // Note: Fix for simplyjobs.com, all of the input names are formatted like so: data[FIELD]
                postQuestion = postQuestion.substring(5).replace(']','');
            }

            if (typeof window.queryDmap !== 'undefined') {
                var dmapSet = queryDmap(postQuestion, postAnswer);

                postQuestion = dmapSet[0];
                postAnswer = dmapSet[1];
            }

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
        });
    });
});

