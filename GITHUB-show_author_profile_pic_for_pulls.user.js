// ==UserScript==
// @name         GITHUB - Show author profile pics for pulls
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @downloadURL  https://github.com/JakeThurman/misc-tampermonkey/raw/master/GITHUB-show_author_profile_pic_for_pulls.user.js
// @author       @JakeThurman
// @match        https://github.com/**/pulls
// @match        https://github.com/pulls
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var parseUrl = queryString => JSON.parse('{"' + decodeURI(queryString.replace(/&/g, "\",\"").replace(/=/g,"\":\"")) + '"}');

    document.querySelectorAll(".opened-by a").forEach(function (author) {
        var url = author.getAttribute("data-hovercard-url");
        var queryString = url.split("?")[1];
        var params = parseUrl(queryString);

        var id = params.user_id;
        var name = author.innerText;

        var image = '<img class="from-avatar" src="https://avatars2.githubusercontent.com/u/' + id + '?s=40" width="20" height="20" alt="@' + name + '">';
        author.innerHTML = "@" + name + " " + image;
    });
})();
