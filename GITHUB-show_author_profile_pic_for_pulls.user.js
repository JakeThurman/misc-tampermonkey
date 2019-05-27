// ==UserScript==
// @name         GITHUB - Show author profile pics for pulls
// @namespace    http://tampermonkey.net/
// @version      0.4
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

        var getQueryString = url => JSON.parse('{"' + decodeURI((url.split("?")[1] || "").replace(/&/g, "\",\"").replace(/=/g,"\":\"")) + '"}');

        document.querySelectorAll(".opened-by a").forEach(function (author) {
            var url = author.getAttribute("data-hovercard-url");
            var params = getQueryString(url);

            var id = params.user_id;
            var name = author.innerText;

            var image = '<img class="from-avatar" src="https://avatars2.githubusercontent.com/u/' + id + '?s=40" width="20" height="20" alt="@' + name + '">';
            author.innerHTML = name + " " + image;
        });
    }

    // When the content of the body changes, try to show the author pics (if we're on the right page)
    var observer = new MutationObserver(showAuthorProfilePics);

    var toReload = document.getElementById("js-repo-pjax-container");
    observer.observe(toReload, { childList: true });

    // Try and show right away
    showAuthorProfilePics();
})();
