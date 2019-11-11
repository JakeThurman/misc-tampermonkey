// ==UserScript==
// @name         DEV - prefix to localhost
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @downloadURL  https://github.com/JakeThurman/misc-tampermonkey/raw/master/LOCALHOST-prefix_all_pages_with_DEV.user.js
// @author       @JakeThurman
// @author       You
// @match        http://localhost/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    document.title = "DEV - " + document.title;
})();
