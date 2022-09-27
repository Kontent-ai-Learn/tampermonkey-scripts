// ==UserScript==
// @name         Kontent app hider
// @namespace    https://kontent.ai/learn
// @version      3.1.2
// @description  Hides projects from the project drop-down list, hides beta tags, renames Safelife according to CustEd's agreement.
// @author       Tomas Nosek, Kontent.ai
// @include      https://app.kontent.ai/*
// @icon         https://raw.githubusercontent.com/Kontent-ai-Learn/tampermonkey-scripts/master/files/custedlogo_48.png
// @updateURL    https://github.com/Kontent-ai-Learn/tampermonkey-scripts/raw/master/kusted_kontent_app_hider.user.js
// @downloadURL  https://github.com/Kontent-ai-Learn/tampermonkey-scripts/raw/master/kusted_kontent_app_hider.user.js
// @resource     IMPORTED_CSS https://raw.githubusercontent.com/Kontent-ai-Learn/tampermonkey-scripts/master/files/kusted_kontent_app_hider.css
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js
// @grant        GM_getResourceText
// @grant        GM_addStyle
// @grant        GM_setValue
// @grant        GM_getValue
// @commithandle Kontent.ai hider
// ==/UserScript==

(function() {
    'use strict';
    var $ = window.jQuery;

    const css = GM_getResourceText("IMPORTED_CSS");
    GM_addStyle(css);

    const hiddenProjectsKey = 'kusted_hiddenprojects';
    const hiddenProjectsSeparator = ';';

    let observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (!mutation.addedNodes) return

            for (let i = 0; i < mutation.addedNodes.length; i++) {
                // Rename CustEd's Safelife project and environment
                if (window.location.href.indexOf("e431d0aa-1f0a-0188-96cf-446fee29b616") > -1) {
                    $('body').addClass('kusted-safelife');
                }

                // Add a hiding textbox to the Projects overview
                if (window.location.href.indexOf("/projects/active") > -1) {
                    if ($('#kusted-hider-list').length <= 0) {
                        if ($('.my-projects').length > 0) {
                            $('.my-projects').append('<div><h3>Hide projects from project menu:</h3><br>Separate names with semicolons.<br><input type="text" id="kusted-hider-list"><input type="submit" id="kusted-hider-submit"></div>');
                            $('#kusted-hider-list').val(getHiddenProjectsAsString());
                            $('#kusted-hider-submit').on('click', function() { setHiddenProjectsAsString($('#kusted-hider-list').val()) });
                        }
                    }
                }

                //
            }
        });
    });

    observer.observe(document.body, {
        childList: true
        , subtree: true
    });

    function getHiddenProjectsAsString() {
        return GM_getValue(hiddenProjectsKey, '');
    }

    function setHiddenProjectsAsString(projectsToHide) {
        GM_setValue(hiddenProjectsKey, projectsToHide);
        console.log('KustEd: These projects were set to be hidden: ' + projectsToHide);
    }


    let hiddenProjectsRaw = getHiddenProjectsAsString();
    if (hiddenProjectsRaw.length > 0) {
        let hiddenProjects = hiddenProjectsRaw.split(hiddenProjectsSeparator);

        for (let i = 0; i < hiddenProjects.length; i++) {
            $('head').append('<style type="text/css">.dropdown-option.switch-icon-select[data-ui-nav="' + hiddenProjects[i] + '"] { display: none; }</style>');
        }
    }



    /*
    function getHiddenProjects() {
        let hiddenProjects = GM_getValue(hiddenProjectsKey, '');
        return hiddenProjects.length > 0 ? hiddenProjects.split(hiddenProjectsSeparator) : [];
    }

    // Hidden with Show button = false, visible with Hide button = true
    function getProjectState(projectName) {
        return !getHiddenProjects().includes(projectName);
    }

    function getButton(projectName) {
        let linkCaption = '';
        if (getProjectState) {
            linkCaption = 'Hide ' + projectName;
        } else {
            linkCaption = 'Show ' + projectName;
        }

        return '<div class="kusted-hide" style="position: absolute; top: 10px; right: 10px;"><a href="#" onclick="toggleProject(e, \'' + projectName + '\')">' + linkCaption + '</a></div>';
    }

    function toggleProject(e, projectName) {
        e.preventDefault();

        let projectState = getProjectState(projectName);

        if (!projectState) {
            addHiddenProjects(projectName);
        } else {
            removeHiddenProjects(projectName);
        }

        console.log('KustEd script: Project "' + projectName + '" was originally set to ' + projectState.toString() + ' (false = hidden, true = displayed). It is now ' + !projectState.toString() + '.');
    }

    function addHiddenProjects(name) {
        let oldHiddenProjects = getHiddenProjects();
        if (oldHiddenProjects.length > 0) {
            GM_setValue(hiddenProjectsKey, oldHiddenProjects.join(hiddenProjectsSeparator) + hiddenProjectsSeparator + name);
        } else {
            GM_setValue(hiddenProjectsKey, name);
        }
    }

    function removeHiddenProjects(name) {
        let oldHiddenProjects = getHiddenProjects().join(hiddenProjectsSeparator);
        if (oldHiddenProjects.length > 0) {
            let newHiddenProjects = oldHiddenProjects.replace(name, '').replace(hiddenProjectsSeparator + hiddenProjectsSeparator, hiddenProjectsSeparator);
            newHiddenProjects = trimChar(newHiddenProjects, hiddenProjectsSeparator);

            if (oldHiddenProjects != newHiddenProjects) {
                GM_setValue(hiddenProjectsKey, newHiddenProjects);
            }
        }
    }

    function trimChar(string, charToRemove) {
        while(string.charAt(0)==charToRemove) {
            string = string.substring(1);
        }

        while(string.charAt(string.length-1)==charToRemove) {
            string = string.substring(0,string.length-1);
        }

        return string;
    }

    function updateShowHideButton(element) {
        let projectName = element.innerText.replace('Show ', '').replace('Hide ','');
        $(element).replaceWith(getButton(projectName));
        $(element).find('a').onclick = function(e){ toggleProject(e, projectName) };
    }

    let observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (!mutation.addedNodes) return

            for (let i = 0; i < mutation.addedNodes.length; i++) {
                // Rename CustEd's Safelife project and environment
                if (window.location.href.indexOf("e431d0aa-1f0a-0188-96cf-446fee29b616") > -1) {
                    $('body').addClass('kusted-safelife');
                }

                // Add a hiding button to the project tile
                if (window.location.href.indexOf("/projects/") > -1) {
                    let node = mutation.addedNodes[i];
                    if (node.innerText != null) {
                        let myproject = $(node).find('div.my-project');
                        if (myproject.length > 0) {
                            for (let i = 0; i < myproject.length; i++) {
                                let kustedHidden = $(myproject[i]).find('.kusted-hide');
                                if (kustedHidden.length <= 0) {
                                    let projectNames = $(myproject[i]).find('.my-project__title')
                                    if (projectNames.length > 0) {
                                        $(myproject[i]).append(getButton(projectNames[0].innerText));
                                        $(myproject[i]).find('.kusted-hide > a').onclick = function(e){ toggleProject(e, projectNames[0].innerText) };
                                    }
                                } else {
                                    updateShowHideButton(kustedHidden);
                                }
                            }
                        }
                    }
                }
            }
        });
    });

    observer.observe(document.body, {
        childList: true
        , subtree: true
    });
    */
})();