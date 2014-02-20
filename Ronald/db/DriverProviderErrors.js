define([
  'Ronald/helpers/Error'
], function(Error) {

  /**
   * Driver provider errors.
   * 
   * @exports Ronald/db/ProviderErrors
   */
  var Errors = {

    /**
     * Thrown in the case that a non Robald/db/Driver is used in a driver only context.
     * 
     * @return {!Ronald/helpers/Error}
     */
    NotDriver: Error.extend({

      /**
       * Error Factory.
       * 
       * @return {Ronald/helpers/Error}
       */
      create: function() {
        return Error.create('NotDriver', 'Not a Driver.');
      }
    })
  };

  return Errors;
});