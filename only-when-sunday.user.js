// ==UserScript==
// @name         Only When Sunday
// @namespace    https://github.com/mefengl
// @author       mefengl
// @version      0.0.7
// @description  🏖️ Closes specific websites tabs except Sunday
// @match        *://*/*
// @grant        none
// @license      MIT
// ==/UserScript==

(() => {
  'use strict';

  const websitesToClose = [
    'twitter.com',
    'weibo.com',
    'youtube.com',
    'outlook.live.com',
    'spotify.com',
    'bilibili.com',
    'discord.com',
    'ddys.art',
    'greasyfork.org',
  ];

  if (new Date().getDay() !== 0) {
    if (websitesToClose.some(website => window.location.href.includes(website))) {
      window.close();
    }
  }
})();
