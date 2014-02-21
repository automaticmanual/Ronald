define([
  'Gizmo',
  'Ronald/helpers/Error'
], function(Gizmo, Error) {

  describe('Ronald/helpers/Error', function() {
    var error;

    beforeEach(function() {
      error = Error.construct('error', 'message');
    });

    describe('Ronald/helpers/Error', function() {
      it('Should extend Gizmo.', function() {
        Error.instanceOf(Gizmo).should.be.true;
        error.instanceOf(Gizmo).should.be.true;
      });
    });

    describe('#construct', function() {
      it('Should contain an name field matching argument.', function() {
        error.should.have.property('name', 'error');
      });

      it('Should populate name if one is not provided.', function() {
        Error.construct().should.have.property('name', 'Unknown');
      });

      it('Should contain a message field matching argument.', function() {
        error.should.have.property('message', 'message');
      });

      it('Should populate message if one is not provided.', function() {
        Error.construct().should.have.property('message', 'No details');
      });
    });

    describe('#toString', function() {
      it('Should return a string in the form of "message".', function() {
        error.toString().should.equal('message');
      });
    });
  });
});