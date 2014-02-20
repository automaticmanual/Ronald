define([
  'Gizmo',
  'Ronald/helpers/Error'
], function(Gizmo, Error) {

  /**
   * A util module.
   *
   * @exteds {Gizmo}
   * @exports Ronald/helpers/Dot
   */
  var Dot = {

    /**
     * Asserts a truty condition or throws.
     * 
     * @param  {*} condition
     * @param  {Ronald/helpers/Error=} error
     * @return {!this}
     */
    assert: function(condition, error) {
      if(!condition) {
        throw (error || Error.create('AssertionError'));
      }
      
      return this;
    },

    /**
     * Evaluates an objects property and returns in.
     * 
     * @param  {!Object} object
     * @param  {String=} key
     * @return {?*}
     */
    result: function(object, key) {
      if(typeof(object[key]) === 'function') {
        return object[key]();
      }

      return object[key];
    }
  };

  return Gizmo.extend(Dot);
});