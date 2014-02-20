define([
  'Gizmo'
], function(Gizmo) {

  /**
   * Database driver.
   * 
   * @extends {Gizmo}
   * @exports Ronald/db/Driver
   */
  var Driver = {

    create: function() {
      var driver = {
      
      /**
       * Reads.
       *
       * @param {Ronald/db/Request} request
       */
        read: function() { },

        /**
         * Creates.
         * 
         * @param {Ronald/db/Request} request
         */
        create: function() { },

        /**
         * Updates.
         * 
         * @param {Ronald/db/Request} request
         */
        update: function() { },

        /**
         * Deletes.
         * 
         * @param {Ronald/db/Request} request
         */
        delete: function() { },

        /**
         * Patches.
         * 
         * @param {Ronald/db/Request} request
         */
        patch: function() { }
      };

      return this.extend(driver);
    },

    /**
     * Determines if this driver is supported.
     * 
     * @return {!Boolean}
     */
    supported: function() {
      return true;
    },

    /**
     * The name of this driver.
     * 
     * @return {!String}
     */
    name: function() {
      return 'Driver';
    }
  };

  return Gizmo.extend(Driver);
});