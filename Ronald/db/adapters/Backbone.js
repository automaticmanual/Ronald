define([
  'Ronald/db/Adapter'
], function(Adapter) {

  /**
   * A backbone adapter.
   * 
   * @extends {Ronald/db/Adapter}
   * @exprts Ronald/db/adapters/Backbone
   */
  var Backbone = {

    /**
     * Determines model driver needed. If one is not provided, use native backbone.
     * 
     * @param  {!Object} model
     * @return {?Ronald/db/Driver}
     */
    driver: function(model) {
      var search = {};

      if(model[this.locator('driver')]) {
        return Adapter.driver.call(this, model);
      }

      search[this.locator('driver')] = 'Backbone';

      return Adapter.driver.call(this, search);
    },

    /**
     * Adapter name
     * 
     * @type {String}
     */
    name: 'Backbone'
  };

  return Adapter.extend(Backbone);
});