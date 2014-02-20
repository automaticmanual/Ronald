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
     * Backbone sync method. Should overwrite model or global sync.
     * 
     * @alias query
     */
    sync: function() {
      this.query.apply(this, [].slice.apply(arguments));
    },

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
    }
  };

  return Adapter.extend(Backbone);
});