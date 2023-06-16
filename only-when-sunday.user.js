// ==UserScript==
// @name         Only When Sunday
// @namespace    https://github.com/mefengl
// @author       mefengl
// @version      0.0.8
// @description  🏖️ Closes specific websites tabs except Sunday
// @match        *://*/*
// @grant        none
// @license      MIT
// ==/UserScript==

(() => {
  'use strict';

  const websitesToClose = [
    'bilibili.com',
    'ddys.art',
    'discord.com',
    'greasyfork.org',
    'outlook.live.com',
    'spotify.com',
    'twitter.com',
    'weibo.com',
    'weread.qq.com',
    'youtube.com',
  ];

  if (new Date().getDay() !== 0) {
    if (websitesToClose.some(website => window.location.href.includes(website))) {
      window.close();
    }
  }
})();
