define([
  'Ronald/helpers/Dot',
  'Ronald/helpers/patterns/Provider',
  'Ronald/db/Adapter',
  'Ronald/db/DriverProvider',
  'Ronald/db/AdapterProviderErrors'
], function(Dot, Provider, Adapter, DriverProvider, Errors) {

  /**
   * An adapter service provider.
   * 
   * @extends {Ronald/helpers/patterns/Provider}
   * @exports Ronald/db/Adapterprovider
   */
  var AdapterProvider = {

    /**
     * constructs the provider.
     *
     * @throws {Ronald/db/AdapterProviderErrors#NotDriverProvider} If driverProvider is not a Ronald/db/DriverProvider
     * 
     * @param  {!Ronald/db/DriverProvider} driverProvider
     * @return {!Ronald/db/AdapterProvider}
     */
    construct: function(driverProvider) {
      var provider = Provider.construct.call(this);

      Dot.assert(driverProvider && driverProvider.instanceOf && driverProvider.instanceOf(DriverProvider), Errors.NotDriverProvider.construct());

      provider._driverProvider = driverProvider;

      return provider;
    },

    /**
     * Determines if anything currently registered can satisfy adapter.
     * 
     * @param  {!String} adapter
     * @return {!Boolean}
     */
    supported: function(adapter) {
      return this.has(adapter) && Dot.result(this.get(adapter), 'supported');
    },

    /**
     * Registers an adapter.
     *
     * @throws {Ronald/db/AdapterProviderErrors#NotAdapter} If adapter is not Ronald/db/Adapter
     * 
     * @param  {!Ronald/db/Adapter} adapter
     * @return {!this}
     */
    register: function(adapter) {
      Dot.assert(adapter && adapter.instanceOf && adapter.instanceOf(Adapter), Errors.NotAdapter.construct());

      Provider.register.call(this, Dot.result(adapter, 'name'), adapter);

      return this;
    },

    /**
     * constructs an adapter if exists.
     *
     * @throws {Ronald/db/AdapterProviderErrors#DoesntExist} If adapter does not exist.
     * @throws {Ronald/db/AdapterProviderErrors#NotSupported} If adapter is not supprted.
     * 
     * @param  {!String} adapter
     * @return {!Ronald/db/Adapter}
     */
    create: function(adapter) {
      Dot
        .assert(this.has(adapter), Errors.DoesntExist.construct())
        .assert(this.supported(adapter), Errors.NotSupported.construct());

      return this.get(adapter).construct(this._driverProvider);
    }
  };

  return Provider.extend(AdapterProvider);
});