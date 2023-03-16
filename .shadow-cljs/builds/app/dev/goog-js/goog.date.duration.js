["^ ","~:resource-id",["~:shadow.build.classpath/resource","goog/date/duration.js"],"~:js","goog.provide(\"goog.date.duration\");\ngoog.require(\"goog.i18n.DateTimeFormat\");\ngoog.require(\"goog.i18n.MessageFormat\");\ngoog.date.duration.MINUTE_MS_ = 60000;\ngoog.date.duration.HOUR_MS_ = 3600000;\ngoog.date.duration.DAY_MS_ = 86400000;\ngoog.date.duration.format = function(durationMs) {\n  var ms = Math.abs(durationMs);\n  if (ms < goog.date.duration.MINUTE_MS_) {\n    var MSG_ZERO_MINUTES = goog.getMsg(\"0 minutes\");\n    return MSG_ZERO_MINUTES;\n  }\n  var days = Math.floor(ms / goog.date.duration.DAY_MS_);\n  ms %= goog.date.duration.DAY_MS_;\n  var hours = Math.floor(ms / goog.date.duration.HOUR_MS_);\n  ms %= goog.date.duration.HOUR_MS_;\n  var minutes = Math.floor(ms / goog.date.duration.MINUTE_MS_);\n  var daysText = goog.i18n.DateTimeFormat.localizeNumbers(days);\n  var hoursText = goog.i18n.DateTimeFormat.localizeNumbers(hours);\n  var minutesText = goog.i18n.DateTimeFormat.localizeNumbers(minutes);\n  var daysSeparator = days * (hours + minutes) ? \" \" : \"\";\n  var hoursSeparator = hours * minutes ? \" \" : \"\";\n  var MSG_DURATION_DAYS = goog.getMsg(\"{COUNT, plural, \" + \"\\x3d0 {}\" + \"\\x3d1 {{TEXT} day}\" + \"other {{TEXT} days}}\");\n  var MSG_DURATION_HOURS = goog.getMsg(\"{COUNT, plural, \" + \"\\x3d0 {}\" + \"\\x3d1 {{TEXT} hour}\" + \"other {{TEXT} hours}}\");\n  var MSG_DURATION_MINUTES = goog.getMsg(\"{COUNT, plural, \" + \"\\x3d0 {}\" + \"\\x3d1 {{TEXT} minute}\" + \"other {{TEXT} minutes}}\");\n  var daysPart = goog.date.duration.getDurationMessagePart_(MSG_DURATION_DAYS, days, daysText);\n  var hoursPart = goog.date.duration.getDurationMessagePart_(MSG_DURATION_HOURS, hours, hoursText);\n  var minutesPart = goog.date.duration.getDurationMessagePart_(MSG_DURATION_MINUTES, minutes, minutesText);\n  var MSG_CONCATENATED_DURATION_TEXT = goog.getMsg(\"{$daysPart}{$daysSeparator}{$hoursPart}{$hoursSeparator}{$minutesPart}\", {\"daysPart\":daysPart, \"daysSeparator\":daysSeparator, \"hoursPart\":hoursPart, \"hoursSeparator\":hoursSeparator, \"minutesPart\":minutesPart});\n  return MSG_CONCATENATED_DURATION_TEXT;\n};\ngoog.date.duration.getDurationMessagePart_ = function(pattern, count, text) {\n  var formatter = new goog.i18n.MessageFormat(pattern);\n  return formatter.format({\"COUNT\":count, \"TEXT\":text});\n};\n","~:source","/**\n * @license\n * Copyright The Closure Library Authors.\n * SPDX-License-Identifier: Apache-2.0\n */\n\n/**\n * @fileoverview Functions for formatting duration values.  Such as \"3 days\"\n * \"3 hours\", \"14 minutes\", \"2 hours 45 minutes\".\n */\n\ngoog.provide('goog.date.duration');\n\ngoog.require('goog.i18n.DateTimeFormat');\ngoog.require('goog.i18n.MessageFormat');\n\n\n/**\n * Number of milliseconds in a minute.\n * @type {number}\n * @private\n */\ngoog.date.duration.MINUTE_MS_ = 60000;\n\n\n/**\n * Number of milliseconds in an hour.\n * @type {number}\n * @private\n */\ngoog.date.duration.HOUR_MS_ = 3600000;\n\n\n/**\n * Number of milliseconds in a day.\n * @type {number}\n * @private\n */\ngoog.date.duration.DAY_MS_ = 86400000;\n\n\n/**\n * Accepts a duration in milliseconds and outputs an absolute duration time in\n * form of \"1 day\", \"2 hours\", \"20 minutes\", \"2 days 1 hour 15 minutes\" etc.\n * @param {number} durationMs Duration in milliseconds.\n * @return {string} The formatted duration.\n */\ngoog.date.duration.format = function(durationMs) {\n  'use strict';\n  var ms = Math.abs(durationMs);\n\n  // Handle durations shorter than 1 minute.\n  if (ms < goog.date.duration.MINUTE_MS_) {\n    /**\n     * @desc Duration time of zero minutes.\n     */\n    var MSG_ZERO_MINUTES = goog.getMsg('0 minutes');\n    return MSG_ZERO_MINUTES;\n  }\n\n  var days = Math.floor(ms / goog.date.duration.DAY_MS_);\n  ms %= goog.date.duration.DAY_MS_;\n\n  var hours = Math.floor(ms / goog.date.duration.HOUR_MS_);\n  ms %= goog.date.duration.HOUR_MS_;\n\n  var minutes = Math.floor(ms / goog.date.duration.MINUTE_MS_);\n\n  // Localized number representations.\n  var daysText = goog.i18n.DateTimeFormat.localizeNumbers(days);\n  var hoursText = goog.i18n.DateTimeFormat.localizeNumbers(hours);\n  var minutesText = goog.i18n.DateTimeFormat.localizeNumbers(minutes);\n\n  // We need a space after the days if there are hours or minutes to come.\n  var daysSeparator = days * (hours + minutes) ? ' ' : '';\n  // We need a space after the hours if there are minutes to come.\n  var hoursSeparator = hours * minutes ? ' ' : '';\n\n  /**\n   * @desc The days part of the duration message: 1 day, 5 days.\n   */\n  var MSG_DURATION_DAYS = goog.getMsg(\n      '{COUNT, plural, ' +\n      '=0 {}' +\n      '=1 {{TEXT} day}' +\n      'other {{TEXT} days}}');\n  /**\n   * @desc The hours part of the duration message: 1 hour, 5 hours.\n   */\n  var MSG_DURATION_HOURS = goog.getMsg(\n      '{COUNT, plural, ' +\n      '=0 {}' +\n      '=1 {{TEXT} hour}' +\n      'other {{TEXT} hours}}');\n  /**\n   * @desc The minutes part of the duration message: 1 minute, 5 minutes.\n   */\n  var MSG_DURATION_MINUTES = goog.getMsg(\n      '{COUNT, plural, ' +\n      '=0 {}' +\n      '=1 {{TEXT} minute}' +\n      'other {{TEXT} minutes}}');\n\n  var daysPart = goog.date.duration.getDurationMessagePart_(\n      MSG_DURATION_DAYS, days, daysText);\n  var hoursPart = goog.date.duration.getDurationMessagePart_(\n      MSG_DURATION_HOURS, hours, hoursText);\n  var minutesPart = goog.date.duration.getDurationMessagePart_(\n      MSG_DURATION_MINUTES, minutes, minutesText);\n\n  /**\n   * @desc Duration time text concatenated from the individual time unit message\n   * parts. The separator will be a space (e.g. '1 day 2 hours 24 minutes') or\n   * nothing in case one/two of the duration parts is empty (\n   * e.g. '1 hour 30 minutes', '3 days 15 minutes', '2 hours').\n   */\n  var MSG_CONCATENATED_DURATION_TEXT = goog.getMsg(\n      '{$daysPart}{$daysSeparator}{$hoursPart}{$hoursSeparator}{$minutesPart}',\n      {\n        'daysPart': daysPart,\n        'daysSeparator': daysSeparator,\n        'hoursPart': hoursPart,\n        'hoursSeparator': hoursSeparator,\n        'minutesPart': minutesPart\n      });\n\n  return MSG_CONCATENATED_DURATION_TEXT;\n};\n\n\n/**\n * Gets a duration message part for a time unit.\n * @param {string} pattern The pattern to apply.\n * @param {number} count The number of units.\n * @param {string} text The string to use for amount of units in the message.\n * @return {string} The formatted message part.\n * @private\n */\ngoog.date.duration.getDurationMessagePart_ = function(pattern, count, text) {\n  'use strict';\n  var formatter = new goog.i18n.MessageFormat(pattern);\n  return formatter.format({'COUNT': count, 'TEXT': text});\n};\n","~:compiled-at",1676995295547,"~:source-map-json","{\n\"version\":3,\n\"file\":\"goog.date.duration.js\",\n\"lineCount\":36,\n\"mappings\":\"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\",\n\"sources\":[\"goog/date/duration.js\"],\n\"sourcesContent\":[\"/**\\n * @license\\n * Copyright The Closure Library Authors.\\n * SPDX-License-Identifier: Apache-2.0\\n */\\n\\n/**\\n * @fileoverview Functions for formatting duration values.  Such as \\\"3 days\\\"\\n * \\\"3 hours\\\", \\\"14 minutes\\\", \\\"2 hours 45 minutes\\\".\\n */\\n\\ngoog.provide('goog.date.duration');\\n\\ngoog.require('goog.i18n.DateTimeFormat');\\ngoog.require('goog.i18n.MessageFormat');\\n\\n\\n/**\\n * Number of milliseconds in a minute.\\n * @type {number}\\n * @private\\n */\\ngoog.date.duration.MINUTE_MS_ = 60000;\\n\\n\\n/**\\n * Number of milliseconds in an hour.\\n * @type {number}\\n * @private\\n */\\ngoog.date.duration.HOUR_MS_ = 3600000;\\n\\n\\n/**\\n * Number of milliseconds in a day.\\n * @type {number}\\n * @private\\n */\\ngoog.date.duration.DAY_MS_ = 86400000;\\n\\n\\n/**\\n * Accepts a duration in milliseconds and outputs an absolute duration time in\\n * form of \\\"1 day\\\", \\\"2 hours\\\", \\\"20 minutes\\\", \\\"2 days 1 hour 15 minutes\\\" etc.\\n * @param {number} durationMs Duration in milliseconds.\\n * @return {string} The formatted duration.\\n */\\ngoog.date.duration.format = function(durationMs) {\\n  'use strict';\\n  var ms = Math.abs(durationMs);\\n\\n  // Handle durations shorter than 1 minute.\\n  if (ms < goog.date.duration.MINUTE_MS_) {\\n    /**\\n     * @desc Duration time of zero minutes.\\n     */\\n    var MSG_ZERO_MINUTES = goog.getMsg('0 minutes');\\n    return MSG_ZERO_MINUTES;\\n  }\\n\\n  var days = Math.floor(ms / goog.date.duration.DAY_MS_);\\n  ms %= goog.date.duration.DAY_MS_;\\n\\n  var hours = Math.floor(ms / goog.date.duration.HOUR_MS_);\\n  ms %= goog.date.duration.HOUR_MS_;\\n\\n  var minutes = Math.floor(ms / goog.date.duration.MINUTE_MS_);\\n\\n  // Localized number representations.\\n  var daysText = goog.i18n.DateTimeFormat.localizeNumbers(days);\\n  var hoursText = goog.i18n.DateTimeFormat.localizeNumbers(hours);\\n  var minutesText = goog.i18n.DateTimeFormat.localizeNumbers(minutes);\\n\\n  // We need a space after the days if there are hours or minutes to come.\\n  var daysSeparator = days * (hours + minutes) ? ' ' : '';\\n  // We need a space after the hours if there are minutes to come.\\n  var hoursSeparator = hours * minutes ? ' ' : '';\\n\\n  /**\\n   * @desc The days part of the duration message: 1 day, 5 days.\\n   */\\n  var MSG_DURATION_DAYS = goog.getMsg(\\n      '{COUNT, plural, ' +\\n      '=0 {}' +\\n      '=1 {{TEXT} day}' +\\n      'other {{TEXT} days}}');\\n  /**\\n   * @desc The hours part of the duration message: 1 hour, 5 hours.\\n   */\\n  var MSG_DURATION_HOURS = goog.getMsg(\\n      '{COUNT, plural, ' +\\n      '=0 {}' +\\n      '=1 {{TEXT} hour}' +\\n      'other {{TEXT} hours}}');\\n  /**\\n   * @desc The minutes part of the duration message: 1 minute, 5 minutes.\\n   */\\n  var MSG_DURATION_MINUTES = goog.getMsg(\\n      '{COUNT, plural, ' +\\n      '=0 {}' +\\n      '=1 {{TEXT} minute}' +\\n      'other {{TEXT} minutes}}');\\n\\n  var daysPart = goog.date.duration.getDurationMessagePart_(\\n      MSG_DURATION_DAYS, days, daysText);\\n  var hoursPart = goog.date.duration.getDurationMessagePart_(\\n      MSG_DURATION_HOURS, hours, hoursText);\\n  var minutesPart = goog.date.duration.getDurationMessagePart_(\\n      MSG_DURATION_MINUTES, minutes, minutesText);\\n\\n  /**\\n   * @desc Duration time text concatenated from the individual time unit message\\n   * parts. The separator will be a space (e.g. '1 day 2 hours 24 minutes') or\\n   * nothing in case one/two of the duration parts is empty (\\n   * e.g. '1 hour 30 minutes', '3 days 15 minutes', '2 hours').\\n   */\\n  var MSG_CONCATENATED_DURATION_TEXT = goog.getMsg(\\n      '{$daysPart}{$daysSeparator}{$hoursPart}{$hoursSeparator}{$minutesPart}',\\n      {\\n        'daysPart': daysPart,\\n        'daysSeparator': daysSeparator,\\n        'hoursPart': hoursPart,\\n        'hoursSeparator': hoursSeparator,\\n        'minutesPart': minutesPart\\n      });\\n\\n  return MSG_CONCATENATED_DURATION_TEXT;\\n};\\n\\n\\n/**\\n * Gets a duration message part for a time unit.\\n * @param {string} pattern The pattern to apply.\\n * @param {number} count The number of units.\\n * @param {string} text The string to use for amount of units in the message.\\n * @return {string} The formatted message part.\\n * @private\\n */\\ngoog.date.duration.getDurationMessagePart_ = function(pattern, count, text) {\\n  'use strict';\\n  var formatter = new goog.i18n.MessageFormat(pattern);\\n  return formatter.format({'COUNT': count, 'TEXT': text});\\n};\\n\"],\n\"names\":[\"goog\",\"provide\",\"require\",\"date\",\"duration\",\"MINUTE_MS_\",\"HOUR_MS_\",\"DAY_MS_\",\"format\",\"goog.date.duration.format\",\"durationMs\",\"ms\",\"Math\",\"abs\",\"MSG_ZERO_MINUTES\",\"getMsg\",\"days\",\"floor\",\"hours\",\"minutes\",\"daysText\",\"i18n\",\"DateTimeFormat\",\"localizeNumbers\",\"hoursText\",\"minutesText\",\"daysSeparator\",\"hoursSeparator\",\"MSG_DURATION_DAYS\",\"MSG_DURATION_HOURS\",\"MSG_DURATION_MINUTES\",\"daysPart\",\"getDurationMessagePart_\",\"hoursPart\",\"minutesPart\",\"MSG_CONCATENATED_DURATION_TEXT\",\"goog.date.duration.getDurationMessagePart_\",\"pattern\",\"count\",\"text\",\"formatter\",\"MessageFormat\"]\n}\n"]