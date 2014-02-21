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
     * Thrown in the case that construct is called without a Ronald/db/DriverProvider
     * 
     * @type {Ronald/helpers/Error}
     */
    NotDriverProvider: Error.extend({

      /**
       * Error Factory.
       * 
       * @return {Ronald/helpers/Error}
       */
      construct: function() {
        return Error.construct('NotDriverProvider', 'Provided argument is not of type Ronald/db/DriverProvider.');
      }
    }),

    /**
     * Thrown in the case that construct is called without a Ronald/db/Adapter
     * 
     * @type {Ronald/helpers/Error}
     */
    NotAdapter: Error.extend({

      /**
       * Error Factory.
       * 
       * @return {Ronald/helpers/Error}
       */
      construct: function() {
        return Error.construct('NotAdapter', 'Provided argument is not of type Ronald/db/Adapter.');
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
      construct: function() {
        return Error.construct('DoesntExist', 'Adapter does not exist or is not registered.');
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
      construct: function() {
        return Error.construct('NotSupported', 'Adapter is not supported.');
      }
    })
  };

  return Errors;
});