define([
  'Gizmo',
  'Ronald/helpers/Dot',
  'Ronald/db/Request',
  'Ronald/db/Provider',
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
    create: function(provider, options) {

      Dot
        .assert(provider.instanceOf, Errors.NotProvider.create())
        .assert(provider.instanceOf(Provider), Errors.NotProvider.create());

      var adapter = {

        /**
         * A database provider that powers this adapter.
         * 
         * @type {Ronald/db/provider}
         */
        provider_: provider,

        /**
         * A key locater. used to override key mappings.
         * 
         * @type {Object}
         */
        locater_: Gizmo.extend({
          driver: 'driver'
        }),

        /**
         * Any instance options.
         * 
         * @type {Object}
         */
        options: options || {}
      };

      adapter.locater_ = adapter.locater_.extend(Dot.result(adapter.options, 'locater') || {});

      return  this.extend(adapter);
    },

    /**
     * Returns a key thats need to locate provided key.
     * 
     * @param  {!String} key
     * @return {?String}
     */
    locater: function(key) {
      return this.locater_[key];
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

      driver = this.provider_.get(model[this.locater('driver')]);

      Dot
        .assert(driver, Errors.DriverNotFound.create())
        .assert(Dot.result(driver, 'supported'), Errors.DriverNotSupported.create())
        .assert(driver[method], Errors.UnsupportedMethod.create());

      request = Request.create(model, options);

      driver[method](request);

      return request;
    },

    /**
     * [support description]
     * 
     * @return {[type]} [description]
     */
    support: function() {
      return true;
    },

    /**
     * [name description]
     * 
     * @return {[type]} [description]
     */
    name: function() {
      return 'Adapter';
    }
  };

  return Gizmo.extend(Adapter);
});