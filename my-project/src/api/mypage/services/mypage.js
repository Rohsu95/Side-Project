'use strict';

/**
 * mypage service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::mypage.mypage');
