define([
  'Gizmo',
  'Ronald/db/Driver'
], function(Gizmo, Driver) {

  describe('Ronald/db/Driver', function() {
    window.Gizmo = Gizmo;
    describe('Ronald/db/Driver', function() {
      it('Should extend Gizmo.', function() {
        Driver.instanceOf(Gizmo).should.be.true;
        Driver.construct().instanceOf(Gizmo).should.be.true;
      });
    });
  });
});