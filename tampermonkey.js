// ==UserScript==
// @name         JIRA
// @namespace    http://tampermonkey.net/
// @version      0.7
// @description  Make JIRA great again...(if it was ever.)
// @author       Pete Arden
// @match        https://yourdomain.atlassian.net/secure/RapidBoard.jspa*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    var s = document.createElement("script");
    s.type = 'text/javascript';
    s.src = 'https://cdn.rawgit.com/pda87/JIRABoard-TamperMonkey/master/module.js';
    document.body.appendChild(s);
})();
