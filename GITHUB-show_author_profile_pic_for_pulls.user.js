// ==UserScript==
// @name         GITHUB - Show author profile pics for pulls
// @namespace    http://tampermonkey.net/
// @version      0.6
// @description  try to take over the world!
// @downloadURL  https://github.com/JakeThurman/misc-tampermonkey/raw/master/GITHUB-show_author_profile_pic_for_pulls.user.js
// @author       @JakeThurman
// @match        https://github.com/**
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function showAuthorProfilePics() {
        if (!location.pathname.toLowerCase().endsWith("/pulls") && !location.pathname.toLowerCase().endsWith("/pulls/"))
            return;

        document.querySelectorAll(".opened-by a").forEach(function (author) {
            // It's okay if this runs multiple times by accident, since the
            //  inner text is still just the username in the updated state.
            var username = author.innerText.trim();

            var image = '<img class="from-avatar" src="https://github.com/' + username + '.png?size=40" width="20" height="20" alt="@' + username + '\'s profile picture">';
            author.innerHTML = username + " " + image;
        });
    }

    // When the content of the body changes, try to show the author pics (if we're on the right page)
    var observer = new MutationObserver(showAuthorProfilePics);

    var toReload = document.getElementById("js-repo-pjax-container");
    observer.observe(toReload, { childList: true });

    // Try and show right away
    showAuthorProfilePics();
})();
