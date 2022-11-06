'use strict';

/**
 * world-level-composition service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::world-level-composition.world-level-composition');
