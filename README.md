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
// @description  Make JIRA great again...(if it was ever.)
// @author       Pete Arden
// @match        https://yourdomain.atlassian.net/secure/RapidBoard.jspa*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    document.onreadystatechange = function(){
        if(document.readyState === "complete"){
            var s = document.createElement('script');
            s.type = 'text/javascript';
            s.src = 'https://cdn.rawgit.com/pda87/JIRABoard-TamperMonkey/master/jiraModule.js';
            document.body.appendChild(s);
        }
    };
})();
```
