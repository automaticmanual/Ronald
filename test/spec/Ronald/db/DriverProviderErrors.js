define([
  'Ronald/helpers/Error',
  'Ronald/db/DriverProviderErrors'
], function(Error, Errors) {

  /*jshint loopfunc: true */

  describe('Ronald/db/DriverProviderErrors', function() {
    for(var errorKey in Errors) {
      
      var ProviderError = Errors[errorKey];

      describe('Ronald/db/DriverProviderErrors.' + errorKey, function() {

        describe('Ronald/db/DriverProviderErrors.' + errorKey, function() {
          it('Should extend Ronald/helpers/Error', function() {
            ProviderError.instanceOf(Error).should.be.true;
            ProviderError.create().instanceOf(Error).should.be.true;
          });
        });

        describe('#create', function() {
          var providerError = ProviderError.create();

          it('Should take no arguments.', function() {
            ProviderError.create('error', 'message').should.have.property('name', providerError.name);
            ProviderError.create('error', 'message').should.have.property('message', providerError.message);
          });
        });
      });
    }
  });

  /*jshint loopfunc: false */
});