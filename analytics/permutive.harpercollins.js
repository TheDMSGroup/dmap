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

/**
 * Tracking using permutive script
 * @param postQuestion
 * @param postAnswer
 */

function doTrack(q, a) {
    if (typeof window.permutive !== 'undefined') {

      if (typeof window.queryDmap !== 'undefined') {

        if (!fieldIsIgnored(q)) {
          var dmapSet = queryDmap(q, a);
          postQuestion = dmapSet[0];
          postAnswer = dmapSet[1];

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
    }
}


/* BIND TO :input Change Events */
(function($) {
    $(function () {
        $(document).on( 'change', ':input', function() {
            var postQuestion = $(this).attr('name');
            var postAnswer   = $(this).val();

            doTrack(postQuestion, postAnswer);
        });

        $(document).on( 'click', ':input', function() {
            var postQuestion = $(this).attr('name');
            var postAnswer   = $(this).val();

            doTrack(postQuestion, postAnswer);
        });
    });
})(jQuery);
