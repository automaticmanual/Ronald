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
     * Creates the provider.
     *
     * @throws {Ronald/db/AdapterProviderErrors#NotDriverProvider} If driverProvider is not a Ronald/db/DriverProvider
     * 
     * @param  {!Ronald/db/DriverProvider} driverProvider
     * @return {!Ronald/db/AdapterProvider}
     */
    create: function(driverProvider) {
      var provider = Provider.create.call(this);

      Dot.assert(driverProvider && driverProvider.instanceOf && driverProvider.instanceOf(DriverProvider), Errors.NotDriverProvider.create());

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
      Dot.assert(adapter && adapter.instanceOf && adapter.instanceOf(Adapter), Errors.NotAdapter.create());

      Provider.register.call(this, Dot.result(adapter, 'name'), adapter);

      return this;
    },

    /**
     * Creates an adapter if exists.
     *
     * @throws {Ronald/db/AdapterProviderErrors#DoesntExist} If adapter does not exist.
     * @throws {Ronald/db/AdapterProviderErrors#NotSupported} If adapter is not supprted.
     * 
     * @param  {!String} adapter
     * @return {!Ronald/db/Adapter}
     */
    adapter: function(adapter) {
      Dot
        .assert(this.has(adapter), Errors.DoesntExist.create())
        .assert(this.supported(adapter), Errors.NotSupported.create());

      return this.get(adapter).create(this._driverProvider);
    }
  };

  return Provider.extend(AdapterProvider);
});