// ==UserScript==
// @name         KustEd Kontent Docs improvements
// @namespace    https://docs.kontent.ai/
// @version      3.0.1
// @description  Adds the preview link and keyboard shortcuts to the articles.
// @author       Tomas Nosek, Kentico
// @include      https://docs.kontent.ai/*
// @icon         https://raw.githubusercontent.com/KenticoDocs/tampermonkey-scripts/master/custedlogo_48.png
// @updateURL    https://github.com/KenticoDocs/tampermonkey-scripts/raw/master/kusted_kontent_learn.user.js
// @grant        none
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js
// @commithandle KK Learn
// ==/UserScript==

(function() {
    'use strict';
    var $ = window.jQuery;

    const PREVIEW_ID = 'kusted_preview';

    $(document).ready(async function() {
        await displayPreviewLink();
    });
    
    async function displayPreviewLink() {
        $('.article__notes').append('<a href="' + window.location.href.replace('docs.kontent.ai', 'kcd-web-preview-master.azurewebsites.net') + '" target="_blank" id="kusted_preview' + PREVIEW_ID + '" rel="noopener">Preview</a>');
    }
    
    $(document).keypress(function(e){
        if (!($("input").is(":focus")) && $('#' + PREVIEW_ID).length > 0) {
            let key = e.keyCode;
    
            switch (key) {
                case 112: // key code for 'p'
                case 119: // key code for 'w'
                    $('#' + PREVIEW_ID)[0].click();
            }
        }
    });
})();