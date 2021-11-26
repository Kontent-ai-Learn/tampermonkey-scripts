// ==UserScript==
// @name         KustEd Kontent Docs improvements
// @namespace    https://docs.kontent.ai/
// @version      3.1.0
// @description  Adds the preview and edit links and keyboard shortcuts to the articles.
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
    const EDIT_ID = 'kusted_edit';

    $(document).ready(async function() {
        await displayPreviewLink();
        await displayEditLink();
    });
    
    async function displayPreviewLink() {
        $('.article__notes').append('<a href="' + window.location.href.replace('docs.kontent.ai', 'kcd-web-preview-master.azurewebsites.net') + '" target="_blank" id="' + PREVIEW_ID + '" rel="noopener">Preview</a>');
    }

    async function displayEditLink() {
        var preview_link = $('#' + PREVIEW_ID).attr('href');
        if (preview_link.length > 0) {
            fetch(preview_link)
                .then(response => response.text())
                .then(text => {
                var parser = new DOMParser();
                var htmlDocument = parser.parseFromString(text, "text/html");
                var edit_link = htmlDocument.documentElement.querySelector(".article__notes > a[rel='noopener']").href;
                if (edit_link.length > 0) {
                    $('.article__notes').append('<a href="' + edit_link + '" target="_blank" id="' + EDIT_ID + '" rel="noopener">Edit</a>');
                }
            });
        }
    }
    
    $(document).keypress(function(e){
        if (!($("input").is(":focus")) && $('#' + PREVIEW_ID).length > 0) {
            let key = e.keyCode;
    
            switch (key) {
                case 112: // key code for 'p'
                case 119: // key code for 'w'
                    $('#' + PREVIEW_ID)[0].click();
                    break;
                case 101: // key code for 'e
                    if ($('#' + EDIT_ID).length > 0) {
                        $('#' + EDIT_ID)[0].click();
                    }
            }
        }
    });
})();