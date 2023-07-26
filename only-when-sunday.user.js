// ==UserScript==
// @name         Only When Sunday
// @namespace    https://github.com/mefengl
// @author       mefengl
// @version      0.3.5
// @description  🏖️ Closes specific websites tabs except Sunday and different ones on weekdays from 9:30 to 18:30
// @match        *://*/*
// @grant        none
// @license      MIT
// ==/UserScript==

(() => {
  'use strict';

  const specialDates = getSpecialDates();

  const websitesToClose = [
    'bilibili.com',
    'ddys.art',
    'discord.com',
    'outlook.live.com',
    'spotify.com',
    'sspai.com',
    'twitter.com',
    'weibo.com',
    'youtube.com',
    'zhihu.com',
  ];

  const websitesToCloseDuringWork = [
    'github.com',
    'greasyfork.org',
    'hellogithub.com',
  ];

  const currentDate = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const currentHour = new Date().getHours();
  const currentMinute = new Date().getMinutes();
  const currentDay = new Date().getDay();

  const isSunday = currentDay === 0;
  const isWorkingHours = (currentHour > 9 && currentHour < 18) || (currentHour === 9 && currentMinute >= 30) || (currentHour === 18 && currentMinute <= 30);
  const isWorkingDay = currentDay >= 1 && currentDay <= 5;
  const isWorkingDayNotWorkingHours = isWorkingDay && !isWorkingHours;

  if (isSunday) {
    // No restrictions on Sunday
    return;
  }

  if (isWorkingHours && (websitesToClose.some(website => window.location.href.includes(website)) || websitesToCloseDuringWork.some(website => window.location.href.includes(website)))) {
    window.close();
  }

  if (isWorkingDayNotWorkingHours && specialDates.some(date => currentDate >= date.start && currentDate <= date.end) && websitesToClose.some(website => window.location.href.includes(website))) {
    window.close();
  }
})();

function getSpecialDates() {
  const icsString = getIcsString();
  const eventBlocks = icsString.match(/BEGIN:VEVENT[\s\S]*?END:VEVENT/g);
  return eventBlocks.map(block => {
    const dtstart = block.match(/DTSTART:(\d{8})T\d{6}/)[1];
    const dtend = block.match(/DTEND:(\d{8})T\d{6}/)[1];
    return { start: dtstart, end: dtend };
  });
}

/*
  * 以下内容来自 https://github.com/lanceliao/china-holiday-calender
*/
function getIcsString() {
  return `BEGIN:VCALENDAR
  PRODID:-//ShuYZ.com//China Public Holidays 2.0//CN
  VERSION:2.0
  CALSCALE:GREGORIAN
  METHOD:PUBLISH
  X-WR-CALNAME:ShuYZ中国节假日(补班)
  X-WR-TIMEZONE:Asia/Shanghai
  X-WR-CALDESC:2021~2023年中国节假日(补班) 更新时间2023-06-14 19:35:13
  BEGIN:VTIMEZONE
  TZID:Asia/Shanghai
  X-LIC-LOCATION:Asia/Shanghai
  BEGIN:STANDARD
  TZOFFSETFROM:+0800
  TZOFFSETTO:+0800
  TZNAME:CST
  DTSTART:19700101T000000
  END:STANDARD
  END:VTIMEZONE
  BEGIN:VEVENT
  DTSTART:20230128T090000
  DTEND:20230128T180000
  DTSTAMP:20230128T000000Z
  UID:20230128T000001_compensateday1@shuyz.com
  CREATED:20230614T193513Z
  DESCRIPTION:二、春节：1月21日至27日放假调休，共7天。1月28日（星期六）、1月29日（星期日）上班。\n\n放假通知: http://www.gov.cn/zhengce/content/2022-12/08/content_5730844.htm
  LAST-MODIFIED:20230614T193513Z
  SEQUENCE:0
  STATUS:TENTATIVE
  SUMMARY:春节 补班 第1天/共2天
  TRANSP:OPAQUE
  BEGIN:VALARM
  TRIGGER:-PT60M
  ACTION:DISPLAY
  END:VALARM
  END:VEVENT
  BEGIN:VEVENT
  DTSTART:20230129T090000
  DTEND:20230129T180000
  DTSTAMP:20230129T000000Z
  UID:20230129T000001_compensateday2@shuyz.com
  CREATED:20230614T193513Z
  DESCRIPTION:二、春节：1月21日至27日放假调休，共7天。1月28日（星期六）、1月29日（星期日）上班。\n\n放假通知: http://www.gov.cn/zhengce/content/2022-12/08/content_5730844.htm
  LAST-MODIFIED:20230614T193513Z
  SEQUENCE:0
  STATUS:TENTATIVE
  SUMMARY:春节 补班 第2天/共2天
  TRANSP:OPAQUE
  BEGIN:VALARM
  TRIGGER:-PT60M
  ACTION:DISPLAY
  END:VALARM
  END:VEVENT
  BEGIN:VEVENT
  DTSTART:20230423T090000
  DTEND:20230423T180000
  DTSTAMP:20230423T000000Z
  UID:20230423T000001_compensateday1@shuyz.com
  CREATED:20230614T193513Z
  DESCRIPTION:四、劳动节：4月29日至5月3日放假调休，共5天。4月23日（星期日）、5月6日（星期六）上班。\n\n放假通知: http://www.gov.cn/zhengce/content/2022-12/08/content_5730844.htm
  LAST-MODIFIED:20230614T193513Z
  SEQUENCE:0
  STATUS:TENTATIVE
  SUMMARY:劳动节 补班 第1天/共2天
  TRANSP:OPAQUE
  BEGIN:VALARM
  TRIGGER:-PT60M
  ACTION:DISPLAY
  END:VALARM
  END:VEVENT
  BEGIN:VEVENT
  DTSTART:20230506T090000
  DTEND:20230506T180000
  DTSTAMP:20230506T000000Z
  UID:20230506T000001_compensateday2@shuyz.com
  CREATED:20230614T193513Z
  DESCRIPTION:四、劳动节：4月29日至5月3日放假调休，共5天。4月23日（星期日）、5月6日（星期六）上班。\n\n放假通知: http://www.gov.cn/zhengce/content/2022-12/08/content_5730844.htm
  LAST-MODIFIED:20230614T193513Z
  SEQUENCE:0
  STATUS:TENTATIVE
  SUMMARY:劳动节 补班 第2天/共2天
  TRANSP:OPAQUE
  BEGIN:VALARM
  TRIGGER:-PT60M
  ACTION:DISPLAY
  END:VALARM
  END:VEVENT
  BEGIN:VEVENT
  DTSTART:20230625T090000
  DTEND:20230625T180000
  DTSTAMP:20230625T000000Z
  UID:20230625T000001_compensateday1@shuyz.com
  CREATED:20230614T193513Z
  DESCRIPTION:五、端午节：6月22日至24日放假调休，共3天。6月25日（星期日）上班。\n\n放假通知: http://www.gov.cn/zhengce/content/2022-12/08/content_5730844.htm
  LAST-MODIFIED:20230614T193513Z
  SEQUENCE:0
  STATUS:TENTATIVE
  SUMMARY:端午节 补班 第1天/共1天
  TRANSP:OPAQUE
  BEGIN:VALARM
  TRIGGER:-PT60M
  ACTION:DISPLAY
  END:VALARM
  END:VEVENT
  BEGIN:VEVENT
  DTSTART:20231007T090000
  DTEND:20231007T180000
  DTSTAMP:20231007T000000Z
  UID:20231007T000001_compensateday1@shuyz.com
  CREATED:20230614T193513Z
  DESCRIPTION:六、中秋节、国庆节：9月29日至10月6日放假调休，共8天。10月7日（星期六）、10月8日（星期日）上班。\n\n放假通知: http://www.gov.cn/zhengce/content/2022-12/08/content_5730844.htm
  LAST-MODIFIED:20230614T193513Z
  SEQUENCE:0
  STATUS:TENTATIVE
  SUMMARY:中秋节、国庆节 补班 第1天/共2天
  TRANSP:OPAQUE
  BEGIN:VALARM
  TRIGGER:-PT60M
  ACTION:DISPLAY
  END:VALARM
  END:VEVENT
  BEGIN:VEVENT
  DTSTART:20231008T090000
  DTEND:20231008T180000
  DTSTAMP:20231008T000000Z
  UID:20231008T000001_compensateday2@shuyz.com
  CREATED:20230614T193513Z
  DESCRIPTION:六、中秋节、国庆节：9月29日至10月6日放假调休，共8天。10月7日（星期六）、10月8日（星期日）上班。\n\n放假通知: http://www.gov.cn/zhengce/content/2022-12/08/content_5730844.htm
  LAST-MODIFIED:20230614T193513Z
  SEQUENCE:0
  STATUS:TENTATIVE
  SUMMARY:中秋节、国庆节 补班 第2天/共2天
  TRANSP:OPAQUE
  BEGIN:VALARM
  TRIGGER:-PT60M
  ACTION:DISPLAY
  END:VALARM
  END:VEVENT
  BEGIN:VEVENT
  DTSTART:20220129T090000
  DTEND:20220129T180000
  DTSTAMP:20220129T000000Z
  UID:20220129T000001_compensateday1@shuyz.com
  CREATED:20230614T193513Z
  DESCRIPTION:二、春节：1月31日至2月6日放假调休，共7天。1月29日（星期六）、1月30日（星期日）上班。\n\n放假通知: http://www.gov.cn/zhengce/content/2021-10/25/content_5644835.htm
  LAST-MODIFIED:20230614T193513Z
  SEQUENCE:0
  STATUS:TENTATIVE
  SUMMARY:春节 补班 第1天/共2天
  TRANSP:OPAQUE
  BEGIN:VALARM
  TRIGGER:-PT60M
  ACTION:DISPLAY
  END:VALARM
  END:VEVENT
  BEGIN:VEVENT
  DTSTART:20220130T090000
  DTEND:20220130T180000
  DTSTAMP:20220130T000000Z
  UID:20220130T000001_compensateday2@shuyz.com
  CREATED:20230614T193513Z
  DESCRIPTION:二、春节：1月31日至2月6日放假调休，共7天。1月29日（星期六）、1月30日（星期日）上班。\n\n放假通知: http://www.gov.cn/zhengce/content/2021-10/25/content_5644835.htm
  LAST-MODIFIED:20230614T193513Z
  SEQUENCE:0
  STATUS:TENTATIVE
  SUMMARY:春节 补班 第2天/共2天
  TRANSP:OPAQUE
  BEGIN:VALARM
  TRIGGER:-PT60M
  ACTION:DISPLAY
  END:VALARM
  END:VEVENT
  BEGIN:VEVENT
  DTSTART:20220402T090000
  DTEND:20220402T180000
  DTSTAMP:20220402T000000Z
  UID:20220402T000001_compensateday1@shuyz.com
  CREATED:20230614T193513Z
  DESCRIPTION:三、清明节：4月3日至5日放假调休，共3天。4月2日（星期六）上班。\n\n放假通知: http://www.gov.cn/zhengce/content/2021-10/25/content_5644835.htm
  LAST-MODIFIED:20230614T193513Z
  SEQUENCE:0
  STATUS:TENTATIVE
  SUMMARY:清明节 补班 第1天/共1天
  TRANSP:OPAQUE
  BEGIN:VALARM
  TRIGGER:-PT60M
  ACTION:DISPLAY
  END:VALARM
  END:VEVENT
  BEGIN:VEVENT
  DTSTART:20220424T090000
  DTEND:20220424T180000
  DTSTAMP:20220424T000000Z
  UID:20220424T000001_compensateday1@shuyz.com
  CREATED:20230614T193513Z
  DESCRIPTION:四、劳动节：4月30日至5月4日放假调休，共5天。4月24日（星期日）、5月7日（星期六）上班。\n\n放假通知: http://www.gov.cn/zhengce/content/2021-10/25/content_5644835.htm
  LAST-MODIFIED:20230614T193513Z
  SEQUENCE:0
  STATUS:TENTATIVE
  SUMMARY:劳动节 补班 第1天/共2天
  TRANSP:OPAQUE
  BEGIN:VALARM
  TRIGGER:-PT60M
  ACTION:DISPLAY
  END:VALARM
  END:VEVENT
  BEGIN:VEVENT
  DTSTART:20220507T090000
  DTEND:20220507T180000
  DTSTAMP:20220507T000000Z
  UID:20220507T000001_compensateday2@shuyz.com
  CREATED:20230614T193513Z
  DESCRIPTION:四、劳动节：4月30日至5月4日放假调休，共5天。4月24日（星期日）、5月7日（星期六）上班。\n\n放假通知: http://www.gov.cn/zhengce/content/2021-10/25/content_5644835.htm
  LAST-MODIFIED:20230614T193513Z
  SEQUENCE:0
  STATUS:TENTATIVE
  SUMMARY:劳动节 补班 第2天/共2天
  TRANSP:OPAQUE
  BEGIN:VALARM
  TRIGGER:-PT60M
  ACTION:DISPLAY
  END:VALARM
  END:VEVENT
  BEGIN:VEVENT
  DTSTART:20221008T090000
  DTEND:20221008T180000
  DTSTAMP:20221008T000000Z
  UID:20221008T000001_compensateday1@shuyz.com
  CREATED:20230614T193513Z
  DESCRIPTION:七、国庆节：10月1日至7日放假调休，共7天。10月8日（星期六）、10月9日（星期日）上班。\n\n放假通知: http://www.gov.cn/zhengce/content/2021-10/25/content_5644835.htm
  LAST-MODIFIED:20230614T193513Z
  SEQUENCE:0
  STATUS:TENTATIVE
  SUMMARY:国庆节 补班 第1天/共2天
  TRANSP:OPAQUE
  BEGIN:VALARM
  TRIGGER:-PT60M
  ACTION:DISPLAY
  END:VALARM
  END:VEVENT
  BEGIN:VEVENT
  DTSTART:20221009T090000
  DTEND:20221009T180000
  DTSTAMP:20221009T000000Z
  UID:20221009T000001_compensateday2@shuyz.com
  CREATED:20230614T193513Z
  DESCRIPTION:七、国庆节：10月1日至7日放假调休，共7天。10月8日（星期六）、10月9日（星期日）上班。\n\n放假通知: http://www.gov.cn/zhengce/content/2021-10/25/content_5644835.htm
  LAST-MODIFIED:20230614T193513Z
  SEQUENCE:0
  STATUS:TENTATIVE
  SUMMARY:国庆节 补班 第2天/共2天
  TRANSP:OPAQUE
  BEGIN:VALARM
  TRIGGER:-PT60M
  ACTION:DISPLAY
  END:VALARM
  END:VEVENT
  BEGIN:VEVENT
  DTSTART:20210207T090000
  DTEND:20210207T180000
  DTSTAMP:20210207T000000Z
  UID:20210207T000001_compensateday1@shuyz.com
  CREATED:20230614T193513Z
  DESCRIPTION:二、春节：2月11日至17日放假调休，共7天。2月7日（星期日）、2月20日（星期六）上班。\n\n放假通知: http://www.gov.cn/fuwu/2020-11/25/content_5564533.htm
  LAST-MODIFIED:20230614T193513Z
  SEQUENCE:0
  STATUS:TENTATIVE
  SUMMARY:春节 补班 第1天/共2天
  TRANSP:OPAQUE
  BEGIN:VALARM
  TRIGGER:-PT60M
  ACTION:DISPLAY
  END:VALARM
  END:VEVENT
  BEGIN:VEVENT
  DTSTART:20210220T090000
  DTEND:20210220T180000
  DTSTAMP:20210220T000000Z
  UID:20210220T000001_compensateday2@shuyz.com
  CREATED:20230614T193513Z
  DESCRIPTION:二、春节：2月11日至17日放假调休，共7天。2月7日（星期日）、2月20日（星期六）上班。\n\n放假通知: http://www.gov.cn/fuwu/2020-11/25/content_5564533.htm
  LAST-MODIFIED:20230614T193513Z
  SEQUENCE:0
  STATUS:TENTATIVE
  SUMMARY:春节 补班 第2天/共2天
  TRANSP:OPAQUE
  BEGIN:VALARM
  TRIGGER:-PT60M
  ACTION:DISPLAY
  END:VALARM
  END:VEVENT
  BEGIN:VEVENT
  DTSTART:20210425T090000
  DTEND:20210425T180000
  DTSTAMP:20210425T000000Z
  UID:20210425T000001_compensateday1@shuyz.com
  CREATED:20230614T193513Z
  DESCRIPTION:四、劳动节：5月1日至5日放假调休，共5天。4月25日（星期日）、5月8日（星期六）上班。\n\n放假通知: http://www.gov.cn/fuwu/2020-11/25/content_5564533.htm
  LAST-MODIFIED:20230614T193513Z
  SEQUENCE:0
  STATUS:TENTATIVE
  SUMMARY:劳动节 补班 第1天/共2天
  TRANSP:OPAQUE
  BEGIN:VALARM
  TRIGGER:-PT60M
  ACTION:DISPLAY
  END:VALARM
  END:VEVENT
  BEGIN:VEVENT
  DTSTART:20210508T090000
  DTEND:20210508T180000
  DTSTAMP:20210508T000000Z
  UID:20210508T000001_compensateday2@shuyz.com
  CREATED:20230614T193513Z
  DESCRIPTION:四、劳动节：5月1日至5日放假调休，共5天。4月25日（星期日）、5月8日（星期六）上班。\n\n放假通知: http://www.gov.cn/fuwu/2020-11/25/content_5564533.htm
  LAST-MODIFIED:20230614T193513Z
  SEQUENCE:0
  STATUS:TENTATIVE
  SUMMARY:劳动节 补班 第2天/共2天
  TRANSP:OPAQUE
  BEGIN:VALARM
  TRIGGER:-PT60M
  ACTION:DISPLAY
  END:VALARM
  END:VEVENT
  BEGIN:VEVENT
  DTSTART:20210918T090000
  DTEND:20210918T180000
  DTSTAMP:20210918T000000Z
  UID:20210918T000001_compensateday1@shuyz.com
  CREATED:20230614T193513Z
  DESCRIPTION:六、中秋节：9月19日至21日放假调休，共3天。9月18日（星期六）上班。\n\n放假通知: http://www.gov.cn/fuwu/2020-11/25/content_5564533.htm
  LAST-MODIFIED:20230614T193513Z
  SEQUENCE:0
  STATUS:TENTATIVE
  SUMMARY:中秋节 补班 第1天/共1天
  TRANSP:OPAQUE
  BEGIN:VALARM
  TRIGGER:-PT60M
  ACTION:DISPLAY
  END:VALARM
  END:VEVENT
  BEGIN:VEVENT
  DTSTART:20210926T090000
  DTEND:20210926T180000
  DTSTAMP:20210926T000000Z
  UID:20210926T000001_compensateday1@shuyz.com
  CREATED:20230614T193513Z
  DESCRIPTION:七、国庆节：10月1日至7日放假调休，共7天。9月26日（星期日）、10月9日（星期六）上班。\n\n放假通知: http://www.gov.cn/fuwu/2020-11/25/content_5564533.htm
  LAST-MODIFIED:20230614T193513Z
  SEQUENCE:0
  STATUS:TENTATIVE
  SUMMARY:国庆节 补班 第1天/共2天
  TRANSP:OPAQUE
  BEGIN:VALARM
  TRIGGER:-PT60M
  ACTION:DISPLAY
  END:VALARM
  END:VEVENT
  BEGIN:VEVENT
  DTSTART:20211009T090000
  DTEND:20211009T180000
  DTSTAMP:20211009T000000Z
  UID:20211009T000001_compensateday2@shuyz.com
  CREATED:20230614T193513Z
  DESCRIPTION:七、国庆节：10月1日至7日放假调休，共7天。9月26日（星期日）、10月9日（星期六）上班。\n\n放假通知: http://www.gov.cn/fuwu/2020-11/25/content_5564533.htm
  LAST-MODIFIED:20230614T193513Z
  SEQUENCE:0
  STATUS:TENTATIVE
  SUMMARY:国庆节 补班 第2天/共2天
  TRANSP:OPAQUE
  BEGIN:VALARM
  TRIGGER:-PT60M
  ACTION:DISPLAY
  END:VALARM
  END:VEVENT
  END:VCALENDAR`;
}
