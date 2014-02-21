define([
  'Ronald/db/Driver',
  'Ronald/db/drivers/all',
  'Ronald/db/DriverProvider',
  'Ronald/db/Adapter',
  'Ronald/db/adapters/all',
  'Ronald/db/AdapterProvider'
], function(Driver, drivers, DriverProvider, Adapter, adapters, AdapterProvider) {

  var globalDriverProvider, globalAdapterProvider;

  globalDriverProvider = DriverProvider.construct();

  globalAdapterProvider = AdapterProvider.construct(globalDriverProvider);

  drivers.forEach(globalDriverProvider.register.bind(globalDriverProvider));

  adapters.forEach(globalAdapterProvider.register.bind(globalAdapterProvider));

  /**
   * Ronald entry point.
   * 
   * @exports Ronald
   */
  var Ronald = {
    drivers: globalDriverProvider,

    Driver: Driver,

    DriverProvider: DriverProvider,

    adapters: globalAdapterProvider,

    Adapter: Adapter,

    AdapterProvider: AdapterProvider
  };

  window.Ronald = Ronald;

  return Ronald;
});