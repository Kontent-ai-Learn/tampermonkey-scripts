// ==UserScript==
// @name         KustEd Jira board and backlog beautification
// @namespace    https://kontent.ai/learn
// @version      3.1.2
// @description  Collapses the top bar for company-managed boards and backlogs.
// @author       Tomas Nosek, Kontent.ai
// @match        https://kontent-ai.atlassian.net/jira/software/c/projects/
// @include      https://kontent-ai.atlassian.net/jira/software/c/projects/*/boards/*
// @icon         https://raw.githubusercontent.com/Kontent-ai-Learn/tampermonkey-scripts/master/files/custedlogo_48.png
// @updateURL    https://github.com/Kontent-ai-Learn/tampermonkey-scripts/raw/master/kusted_jira_boards_backlogs.user.js
// @downloadURL  https://github.com/Kontent-ai-Learn/tampermonkey-scripts/raw/master/kusted_jira_boards_backlogs.user.js
// @resource     IMPORTED_CSS https://raw.githubusercontent.com/Kontent-ai-Learn/tampermonkey-scripts/master/files/kusted_jira_boards_backlogs.css
// @grant        GM_getResourceText
// @grant        GM_addStyle
// @commithandle Jira board&backlog
// ==/UserScript==

(function() {
    'use strict';

    const css = GM_getResourceText("IMPORTED_CSS");
    GM_addStyle(css);
})();