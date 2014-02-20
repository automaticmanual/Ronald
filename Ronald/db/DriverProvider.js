define([
  'Ronald/helpers/Dot',
  'Ronald/helpers/patterns/Provider',
  'Ronald/db/Driver',
  'Ronald/db/DriverProviderErrors'
], function(Dot, Provider, Driver, Errors) {

  /**
   * A database driver provider.
   * 
   * @extends {Ronald/helpers/patterns/Provider}
   * @exports Ronald/db/DriverProvider
   */
  var DriverProvider = {

    /**
     * Registers a driver with the provider.
     *
     * @throws {Ronald/db/DriverProviderErrors#NotDriver} If argument is not a driver.
     * 
     * @param  {!Ronald/db/Driver} driver
     * @return {!this}
     */
    register: function(driver) {
      Dot.assert(driver && driver.instanceOf && driver.instanceOf(Driver), Errors.NotDriver.create());

      Provider.register.call(this, Dot.result(driver, 'name'), driver);

      return this;
    },

    /**
     * Determines driver is supported.
     * 
     * @param  {!String} driver
     * @return {!Boolean}
     */
    supported: function(driver) {
      return this.has(driver) && Dot.result(this.get(driver), 'supported');
    }
  };

  return Provider.extend(DriverProvider);
});