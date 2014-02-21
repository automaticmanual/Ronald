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
            ProviderError.construct().instanceOf(Error).should.be.true;
          });
        });

        describe('#construct', function() {
          var providerError = ProviderError.construct();

          it('Should take no arguments.', function() {
            ProviderError.construct('error', 'message').should.have.property('name', providerError.name);
            ProviderError.construct('error', 'message').should.have.property('message', providerError.message);
          });
        });
      });
    }
  });

  /*jshint loopfunc: false */
});