'use strict';

/**
 * spot service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::spot.spot');
