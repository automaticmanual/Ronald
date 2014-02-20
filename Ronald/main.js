define([
  'Gizmo',
  'Ronald/db/Provider',
  'Ronald/db/drivers/all'
], function(Gizmo) {

  /**
   * Ronald entry point.
   *
   * @extends {Gizmo}
   * @exports Ronald
   */
  var Ronald = {

    /**
     * Version of build. This will only be populated during a build.
     * 
     * @type {String}
     */
    version: '{{version}}'
  };

  return Ronald.extend(Gizmo);
});