define([
  'Ronald/helpers/patterns/Registry',
], function(Registry) {

  /**
   * A  service provider.
   * 
   * @extends {Ronald/helpers/Registry}
   * @exports Ronald/helpers/patterns/Provider
   */
  var Provider = {

    /**
     * Determines if service is supported.
     * 
     * @param  {!String} service
     * @return {!Boolean}
     */
    supported: function() {
      return true;
    }
  };

  return Registry.extend(Provider);
});