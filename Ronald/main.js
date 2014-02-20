define([
  'Gizmo',
  'Ronald/db/Provider',
  'Ronald/db/drivers/all'
], function() {

  /**
   * Gizmo entry point.
   *
   * @extends {Gizmo/helpers/Base}
   * @exports Gizmo
   */
  var Ronald = {

    /**
     * Version meta data. Will only be populated on build.
     * 
     * @type {String}
     */
    version: '{{version}}',
  };

  return Ronald;
});