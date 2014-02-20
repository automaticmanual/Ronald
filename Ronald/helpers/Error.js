define([
  'Gizmo'
], function(Gizmo) {

  /**
   * An error module.
   * 
   * @extends {Gizmo}
   * @exports Ronald/helpers/Error
   */
  var Error = {

    /**
     * Creates an Error object.
     * 
     * @param  {String=} name
     * @param  {String=} message
     * @return {!Ronald/helpers/Error}
     */
    create: function(name, message) {
      var error = {

        /**
         * An error name
         * 
         * @type {String}
         */
        name: name || 'Unknown',
        
        /**
         * An error message
         * 
         * @type {String}
         */
        message: message || 'No details'
      };

      return this.extend(error);
    },

    /**
     * Serialzes this error.
     * 
     * @return {!String}
     */
    toString: function() {
      return this.message;
    }
  };
  
  return Gizmo.extend(Error);
});