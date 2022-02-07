// ==UserScript==
// @name         KustEd Small Improvements beautification
// @namespace    https://kontent.ai/learn
// @version      3.1.0
// @description  Adds the championship culture chart as a background to the Small Improvements review charts.
// @author       Tomas Nosek, Kentico
// @include      https://kentico.small-improvements.com/*
// @icon         https://raw.githubusercontent.com/KenticoDocs/tampermonkey-scripts/master/files/custedlogo_48.png
// @updateURL    https://github.com/KenticoDocs/tampermonkey-scripts/raw/master/kusted_small_improvements.user.js
// @downloadURL  https://github.com/KenticoDocs/tampermonkey-scripts/raw/master/kusted_small_improvements.user.js
// @resource     IMPORTED_CSS https://raw.githubusercontent.com/KenticoDocs/tampermonkey-scripts/master/files/kusted_small_improvements.css
// @grant        GM_getResourceText
// @grant        GM_addStyle
// @commithandle SI champ
// ==/UserScript==

(function() {
    'use strict';

    const css = GM_getResourceText("IMPORTED_CSS");
    GM_addStyle(css);
})();