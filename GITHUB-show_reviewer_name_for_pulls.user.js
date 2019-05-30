// ==UserScript==
// @name         GITHUB - Show reviewer name for pulls
// @namespace    http://tampermonkey.net/
// @version      0.3
// @downloadURL  https://github.com/JakeThurman/misc-tampermonkey/raw/master/GITHUB-show_reviewer_name_for_pulls.user.js
// @author       @JakeThurman
// @match        https://github.com/**
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function showAuthorProfilePics() {
        if (!location.pathname.toLowerCase().endsWith("/pulls") && !location.pathname.toLowerCase().endsWith("/pulls/")) {
            return;
        }
        var getQueryString = url => JSON.parse('{"' + decodeURI((url.split("?")[1] || "").replace(/&/g, "\",\"").replace(/=/g,"\":\"")) + '"}');

        document.querySelectorAll(".avatar .from-avatar").forEach(function (reviewer) {
            var name = " " + reviewer.getAttribute("alt").replace("@", "");

            // Don't append again, if the text is already there.
            if (reviewer.parentNode.innerText.trim() === name.trim())
                return;

            var textNode = document.createTextNode(name);
            reviewer.parentNode.insertBefore(textNode, reviewer);

            // Make width automatic
            reviewer.parentNode.style.width = "auto";
        });
    }

    // When the content of the body changes, try to show the author pics (if we're on the right page)
    var observer = new MutationObserver(showAuthorProfilePics);

    var toReload = document.getElementById("js-repo-pjax-container");
    observer.observe(toReload, { childList: true });

    // Try and show right away
    showAuthorProfilePics();
})();
