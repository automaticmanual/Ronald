define([
  'Ronald/helpers/Error'
], function(Error) {

  /**
   * Adapter Errors.
   * 
   * @exports Ronald/db/AdapterErrors
   */
  var Errors = {

    /**
     * Thrown in the case that a requested driver is not found.
     * 
     * @type {Ronald/helpers/Error}
     */
    DriverNotFound: Error.extend({

      /**
       * Error Factory.
       * 
       * @return {Ronald/helpers/Error}
       */
      create: function() {
        return Error.create('DriverNotFound', 'Requested driver was not found.');
      }
    }),

    /**
     * Thrown in the case that a requested driver is not supprted.
     * 
     * @type {Ronald/helpers/Error}
     */
    DriverNotSupported: Error.extend({

      /**
       * Error Factory.
       * 
       * @return {Ronald/helpers/Error}
       */
      create: function() {
        return Error.create('DriverNotSupported', 'Requested driver is not supprted.');
      }
    }),

    /**
     * Thrown in the case that a provider is registered thats not a Ronald/db/Provider
     * 
     * @type {Ronald/helpers/Error}
     */
    NotProvider: Error.extend({

      /**
       * Error Factory.
       * 
       * @return {Ronald/helpers/Error}
       */
      create: function() {
        return Error.create('NotProvider', 'Argument is not of type Ronald/db/Provider.');
      }
    }),

    /**
     * Thrown in the case that a unsupported method is used on a driver.
     * 
     * @type {Ronald/helpers/Error}
     */
    UnsupportedMethod: Error.extend({

      /**
       * Error Factory.
       * 
       * @return {Ronald/helpers/Error}
       */
      create: function() {
        return Error.create('UnsupportedMethod', 'Method is not supported by driver.');
      }
    })
  };

  return Errors;
});