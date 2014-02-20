define([
  'Ronald/helpers/Error'
], function(Error) {

  /**
   * Adapter Errors.
   * 
   * @exports Ronald/db/AdapterProviderErrors
   */
  var Errors = {

    /**
     * Thrown in the case that create is called without a Ronald/db/DriverProvider
     * 
     * @type {Ronald/helpers/Error}
     */
    NotDriverProvider: Error.extend({

      /**
       * Error Factory.
       * 
       * @return {Ronald/helpers/Error}
       */
      create: function() {
        return Error.create('NotDriverProvider', 'Provided argument is not of type Ronald/db/DriverProvider.');
      }
    }),

    /**
     * Thrown in the case that create is called without a Ronald/db/Adapter
     * 
     * @type {Ronald/helpers/Error}
     */
    NotAdapter: Error.extend({

      /**
       * Error Factory.
       * 
       * @return {Ronald/helpers/Error}
       */
      create: function() {
        return Error.create('NotAdapter', 'Provided argument is not of type Ronald/db/Adapter.');
      }
    }),

    /**
     * Thrown in the case that adapter is called when no adapter isnt registered.
     * 
     * @type {Ronald/helpers/Error}
     */
    DoesntExist: Error.extend({

      /**
       * Error Factory.
       * 
       * @return {Ronald/helpers/Error}
       */
      create: function() {
        return Error.create('DoesntExist', 'Adapter does not exist or is not registered.');
      }
    }),

    /**
     * Thrown in the case that adapter is called when adapter exists but not supported.
     * 
     * @type {Ronald/helpers/Error}
     */
    NotSupported: Error.extend({

      /**
       * Error Factory.
       * 
       * @return {Ronald/helpers/Error}
       */
      create: function() {
        return Error.create('NotSupported', 'Adapter is not supported.');
      }
    })
  };

  return Errors;
});