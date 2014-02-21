define([
  'Ronald/db/Driver'
], function(Driver) {

  /**
   * A backbone type driver.
   *
   * 
   * @extends {Ronald/db/Driver}
   * @exports Ronald/db/drivers/Backbone
   */
  var Backbone = {

    /**
     * Driver name
     * 
     * @type {String}
     */
    name: 'Backbone',

    /**
     * Backbone sync method that will be leveraged.
     * 
     * @type {Function}
     */
    _sync: window.Backbone && window.Backbone.sync,

    /**
     * Performs a request using the provided method using internal sync.
     * 
     * @param  {!String} method
     * @param  {!Ronald/db/Request} request 
     */
    _request: function(method, request) {
      this
        ._sync(method, request.model, request.options)
        .fail(function() {
          request.reject.apply(request, [].slice.call(arguments));
        })
        .done(function() {
          request.resolve(apply, request, [].slice.call(arguments));
        });
    },

    /**
     * Determines if this driver is supported. via Testing for Backbone
     * 
     * @return {!Boolean}
     */
    supported: function() {
      return !!this._sync;
    },

    /**
     * Reads
     * 
     * @param  {!Ronald/db/Request} request
     */
    read: function(request) {
      this._request('read', request);
    },

    /**
     * construct
     * 
     * @param  {!Ronald/db/Request} request
     */
    construct: function(request) {
      this._request('construct', request);
    },

    /**
     * Update
     * 
     * @param  {!Ronald/db/Request} request
     */
    update: function(request) {
      this._request('update', request);
    },

    /**
     * Delete
     * 
     * @param  {!Ronald/db/Request} request
     */
    delete: function(request) {
      this._request('delete', request);
    },

    /**
     * Patch
     * 
     * @param  {!Ronald/db/Request} request
     */
    patch: function(request) {
      this._request('patch', request);
    }
  };

  return Driver.extend(Backbone);
});