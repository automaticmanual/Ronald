define([
  'Gizmo',
  'Ronald/helpers/Dot',
  'Ronald/db/Request',
  'Ronald/db/DriverProvider',
  'Ronald/db/AdapterErrors'
], function(Gizmo, Dot, Request, Provider, Errors) {

  /**
   * An adapter for different Database drivers and a consumer.
   * 
   * @extends {Gizmo}
   * @exports Ronald/db/Adapter
   */
  var Adapter = {

    /**
     * Adapter factory.
     *
     * @throws {Ronald/db/AdapterErrors#NotProvider} If privder is not of type Ronald/db/Provider
     * 
     * @param  {!Ronald/db/Provider} provider
     * @param  {Object=} options
     * @return {!Ronald/db/Adapter}
     */
    construct: function(provider, options) {

      Dot
        .assert(provider.instanceOf, Errors.NotProvider.construct())
        .assert(provider.instanceOf(Provider), Errors.NotProvider.construct());

      var adapter = {

        /**
         * A database provider that powers this adapter.
         * 
         * @type {Ronald/db/provider}
         */
        provider_: provider,

        /**
         * A key locator. used to override key mappings.
         * 
         * @type {Object}
         */
        locator_: Gizmo.extend({
          driver: 'driver'
        }),

        /**
         * Any instance options.
         * 
         * @type {Object}
         */
        options: options || {}
      };

      adapter.locator_ = adapter.locator_.extend(Dot.result(adapter.options, 'locator') || {});

      return  this.extend(adapter);
    },

    /**
     * Returns a key thats need to locate provided key.
     * 
     * @param  {!String} key
     * @return {?String}
     */
    locator: function(key) {
      return this.locator_[key];
    },

    /**
     * Detects driver type needed to resolve model.
     * 
     * @param  {!Object} model
     * @return {?Ronald/db/Driver}
     */
    driver: function(model) {
      return this.provider_.get(model[this.locator('driver')]);
    },

    /**
     * Perfomes a query.
     *
     * @throws {Ronald/db/AdapterErrors#DriverNotFound} If the provider cannot resolve  Ronald/db/Provider
     * @throws {Ronald/db/AdapterErrors#DriverNotSupported} If privder is not of type Ronald/db/Provider
     * 
     * @param  {!String} method
     * @param  {!Object} model
     * @param  {Object=} options
     * @return {!Ronald/db/Request}
     */
    query: function(method, model, options) {
      var driver, request;

      driver = this.driver(model);

      Dot
        .assert(driver, Errors.DriverNotFound.construct())
        .assert(Dot.result(driver, 'supported'), Errors.DriverNotSupported.construct())
        .assert(driver[method], Errors.UnsupportedMethod.construct());

      request = Request.construct(model, options);

      driver[method](request);

      return request;
    },

    /**
     * Determines if adapter is supported.
     * 
     * @return {!Boolean}
     */
    supported: function() {
      return true;
    },

    /**
     * Name of adapter.
     * 
     * @return {!String}
     */
    name: function() {
      return 'Adapter';
    }
  };

  return Gizmo.extend(Adapter);
});