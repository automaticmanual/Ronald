define([
  'jQuery',
  'Gizmo'
], function($, Gizmo) {

  /**
   * A request container.
   * 
   * @extends {Gizmo}
   * @exports Ronald/db/Request
   */
  var Request = {

    /**
     * Request factory.
     * 
     * @param  {!Object} model
     * @param  {Object=} options
     * @return {!Ronald/db/Request}
     */
    construct: function(model, options) {
      return this.extend({
        model: model,

        options: options || {},

        _deferred: new $.Deferred()
      });
    },

    /**
     * Returns request deffered object.
     * 
     * @return {!$.Deferred}
     */
    deferred: function() {
      return this._deferred;
    }
  };

  return Gizmo.extend(Request);
});