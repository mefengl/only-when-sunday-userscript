// ==UserScript==
// @name         Only When Sunday
// @namespace    https://github.com/mefengl
// @author       mefengl
// @version      0.0.4
// @description  🏖️ Redirects specific websites to WeRead.qq.com/web/shelf except sunday
// @match        *://*/*
// @grant        none
// @license      MIT
// ==/UserScript==

(() => {
  'use strict';

  if (new Date().getDay() !== 0) {
    const websitesToRedirect = ['twitter.com', 'weibo.com', 'youtube.com', 'outlook.live.com', 'spotify.com', 'bilibili.com', 'discord.com'];
    if (websitesToRedirect.some(website => window.location.href.includes(website))) {
      window.location.href = 'https://weread.qq.com/web/shelf';
    }
  }
})();
