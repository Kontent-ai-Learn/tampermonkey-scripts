// ==UserScript==
// @name         KustEd Kontent Learn improvements
// @namespace    https://kontent.ai/learn
// @version      3.3.1
// @description  Adds the preview and edit links and keyboard shortcuts to the articles.
// @author       Tomas Nosek, Kentico
// @include      https://kontent.ai/learn/*
// @icon         https://raw.githubusercontent.com/KenticoDocs/tampermonkey-scripts/master/custedlogo_48.png
// @updateURL    https://github.com/KenticoDocs/tampermonkey-scripts/raw/master/kusted_kontent_learn.user.js
// @downloadURL  https://github.com/KenticoDocs/tampermonkey-scripts/raw/master/kusted_kontent_learn.user.js
// @grant        none
// @require      https://code.jquery.com/jquery-3.6.0.slim.min.js
// @require      /path/to/jquery.keyframes[.min].js
// @commithandle KK Learn
// ==/UserScript==

(function() {
    'use strict';
    var $ = window.jQuery;

    const PREVIEW_ID = 'kusted_preview';
    const EDIT_ID = 'kusted_edit';
    const EDIT_ID_LOAD = EDIT_ID + '_load';

    $(document).ready(async function() {
        await displayPreviewLink();
        await displayEditLink();
    });

    async function displayPreviewLink() {
        $('.article__notes').append('<a href="' + window.location.href.replace('kontent.ai/learn', 'kcd-web-preview-master.azurewebsites.net/learn') + '" target="_blank" title="Press p or w" id="' + PREVIEW_ID + '" rel="noopener">Preview</a>');
    }

    async function displayEditLink() {
        let preview_link = $('#' + PREVIEW_ID).attr('href');
        if (preview_link.length > 0) {
            $.keyframe.define([{
                  name:'spin',
                  from: {
                    'transform':'rotate(0deg)'
                  },
                  to: {
                    'transform':'rotate(360deg)'
                  }
                }]);

            $('.article__notes').append('<span id="' + EDIT_ID_LOAD + ' style="font-size: 70%;">⌛</span>');
            $('#' + EDIT_ID_LOAD).playKeyframe({
                name: 'spin',
                duration: "5s",
                timingFunction: 'linear',
                iterationCount: 'infinite',
                direction: 'normal',
                fillMode: 'forwards'
            });

            fetch(preview_link)
                .then(response => response.text())
                .then(text => {
                    let parser = new DOMParser();
                    let htmlDocument = parser.parseFromString(text, "text/html");
                    let edit_link = htmlDocument.documentElement.querySelector(".article__notes > a[rel='noopener']").href;
                    if (edit_link.length > 0) {
                        $('#' + EDIT_ID_LOAD).insertAfter('<a href="' + edit_link + '" target="_blank" title="Press e" id="' + EDIT_ID + '" rel="noopener">Edit</a>');
                    };
                })
                .then(
                    $('#' + EDIT_ID_LOAD).remove()
                );
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
