JiraBoard - Tampermonkey
=
A simple javascript module to make jira great!
-
To use the module, past the script below into your tampermonkey script and replace the domain with your own.
```javascript
// ==UserScript==
// @name         JIRA
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Make JIRA great again
// @author       Pete Arden/John Keen
// @match        https://yourdomain.atlassian.net/secure/RapidBoard.jspa*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    document.onreadystatechange = function(){
        if(document.readyState === "complete"){
            var s = document.createElement('script');
            s.type = 'text/javascript';
            s.src = 'https://web192.secure-secure.co.uk/peterarden.net/JavaScript/jiraModule.js';
            document.body.appendChild(s);
        }
    };
})();
```
