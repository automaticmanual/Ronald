define([
  'Ronald/helpers/Error',
  'Ronald/db/AdapterProviderErrors'
], function(Error, Errors) {

  /*jshint loopfunc: true */

  describe('Ronald/db/AdapterProviderErrors', function() {
    for(var errorKey in Errors) {
      
      var ProviderError = Errors[errorKey];

      describe('Ronald/db/AdapterProviderErrors.' + errorKey, function() {

        describe('Ronald/db/AdapterProviderErrors.' + errorKey, function() {
          it('Should extend Ronald/helpers/Error', function() {
            ProviderError.instanceOf(Error).should.be.true;
            ProviderError.create().instanceOf(Error).should.be.true;
          });
        });

        describe('#create', function() {
          var ProviderError, providerError;

          ProviderError = Errors[errorKey];

          providerError = ProviderError.create();

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