'use strict';

/**
 * real service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::real.real');
