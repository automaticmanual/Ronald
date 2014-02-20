define([
  'Gizmo',
  'Ronald/helpers/Dot',
  'Ronald/db/Driver',
  'Ronald/db/Request',
  'Ronald/db/ProviderErrors'
], function(Gizmo, Dot, Driver, Request, Errors) {

  /**
   * A database driver provider.
   * 
   * @extends {Gizmo}
   * @exports Ronald/db/Provider
   */
  var Provider = {

    /**
     * Creates a provider instance.
     * 
     * @return {!Ronald/db/Provider}
     */
    create: function() {
      var provider = {

        /**
         * Providers list of currently registered drivers.
         * 
         * @type {Object<String, Ronald/db/Driver>}
         */
        _drivers: {}
      };

      return this.extend(provider);
    },

    /**
     * Registers a driver with the provider.
     *
     * @throws {Ronald/db/ProviderErrors#NotDriver} If argument is not a driver.
     * 
     * @param  {!Ronald/db/Driver} driver
     * @return {!this}
     */
    register: function(driver) {
      Dot.assert(driver.instanceOf && driver.instanceOf(Driver), Errors.NotDriver.create());

      this._drivers[Dot.result(driver, 'name')] = driver;

      return this;
    },

    /**
     * Determines if a driver is registed.
     * 
     * @param  {!String}  driver
     * @return {!Boolean}
     */
    has: function(driver) {
      return !!this.get(driver);
    },

    /**
     * Determines driver is supported.
     * 
     * @param  {!String} driver
     * @return {!Boolean}
     */
    supported: function(driver) {
      if(!this.has(driver)) {
        return false;
      }

      return Dot.result(this.get(driver), 'supported');
    },

    /**
     * Returns a driver.
     * 
     * @param  {!Stirng} driver
     * @return {?Ronald/db/Driver}
     */
    get: function(driver) {
      return this._drivers[driver];
    },

    /**
     * Returns a list of drivers registered.
     * 
     * @return {!Array<String>}
     */
    keys: function() {
      return Object.keys(this._drivers);
    }
  };

  return Gizmo.extend(Provider);
});