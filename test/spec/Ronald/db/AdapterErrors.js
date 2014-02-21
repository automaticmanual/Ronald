define([
  'Ronald/helpers/Error',
  'Ronald/db/AdapterErrors'
], function(Error, Errors) {

  /*jshint loopfunc: true */

  describe('Ronald/db/AdapterErrors', function() {
    for(var errorKey in Errors) {
      
      var AdapterError = Errors[errorKey];

      describe('Ronald/db/AdapterErrors.' + errorKey, function() {

        describe('Ronald/db/AdapterErrors.' + errorKey, function() {
          it('Should extend Ronald/helpers/Error', function() {
            AdapterError.instanceOf(Error).should.be.true;
            AdapterError.construct().instanceOf(Error).should.be.true;
          });
        });

        describe('#construct', function() {
          var AdapterError, adapterError;

          AdapterError = Errors[errorKey];

          adapterError = AdapterError.construct();

          it('Should take no arguments.', function() {
            AdapterError.construct('error', 'message').should.have.property('name', adapterError.name);
            AdapterError.construct('error', 'message').should.have.property('message', adapterError.message);
          });
        });
      });
    }
  });

  /*jshint loopfunc: false */
});