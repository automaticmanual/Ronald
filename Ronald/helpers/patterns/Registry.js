define([
  'Gizmo',
], function(Gizmo) {

  /**
   * A basic registry collection type.
   * 
   * @extends {Gizmo}
   * @exports Ronald/helpers/patterns/Registry
   */
  var Registry = {
    
    /**
     * Object factory
     * 
     * @return {!Roanld/helpers/Registry}
     */
    construct: function() {
      var registry = {

        /**
         * Internal registry hash.
         * 
         * @type {Object}
         */
        _registry: {}
      };
      
      return this.extend(registry);
    },

    /**
     * Registers an item. Will overwrite any items already registered.
     * 
     * @param  {!String} name
     * @param  {!*} item
     * @return {!This}
     */
    register: function(name, item) {
      this._registry[name] = item;

      return this;
    },

    /**
     * Removes an item by name.
     * 
     * @param  {!String} name
     * @return {!This}
     */
    remove: function(name) {
      delete this._registry[name];

      return this;
    },

    /**
     * Determines if an item name exists in registery.
     * 
     * @param  {!String} name
     * @return {!Boolean}
     */
    has: function(name) {
      return this.keys().indexOf(name) !== -1;
    },

    /**
     * Gets an item from registry by name.
     * 
     * @param  {!String} name
     * @return {?*}
     */
    get: function(name) {
      return this._registry[name];
    },

    /**
     * Get the keys of all items current registered.
     * 
     * @return {!Array}
     */
    keys: function() {
      var keys = Object.keys(this._registry);

      return keys.filter(function(key) {
        return key !== 'undefined';
      });
    }
  };

  return  Gizmo.extend(Registry);
});