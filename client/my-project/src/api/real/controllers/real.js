'use strict';

/**
 * real controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::real.real');
