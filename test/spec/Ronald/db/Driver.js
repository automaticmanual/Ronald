define([
  'Gizmo',
  'Ronald/db/Driver'
], function(Gizmo, Driver) {

  describe('Ronald/db/Driver', function() {
    
    describe('Ronald/db/Driver', function() {
      it('Should extend Gizmo.', function() {
        Driver.instanceOf(Gizmo).should.be.true;
        Driver.create().instanceOf(Gizmo).should.be.true;
      });
    });
  });
});