define([
  'Ronald/helpers/patterns/Provider',
  'Ronald/db/DriverProvider',
  'Ronald/db/Adapter',
  'Ronald/db/AdapterProviderErrors',
  'Ronald/db/AdapterProvider'
], function(Provider, DriverProvider, Adapter, Errors, AdapterProvider) {

  describe('Ronald/db/AdapterProvider', function() {
    var adapterProvider;

    beforeEach(function() {
      adapterProvider = AdapterProvider.construct(DriverProvider);
    });

    describe('Ronald/db/AdapterProvider', function() {
      it('Should extend Ronald/helpers/patterns/Provider.', function() {
        AdapterProvider.instanceOf(Provider).should.be.true;
        adapterProvider.instanceOf(Provider).should.be.true;
      });
    });

    describe('#construct', function() {
      it('Should throw a Ronald/db/AdapterProviderErrors#NotDriverProvider with non Ronald/db/DriverProvider argument', function() {
        var throwMe = function() {
          AdapterProvider.construct();
        };

        throwMe.should.throw(Errors.NotDriverProvider.construct().toString());
      });
    });

    describe('#register', function() {
      it('Should throw a Ronald/db/AdapterProviderErrors#NotAdapter with a non Ronald/db/Adapter argument', function() {
        var throwMe = function() {
          adapterProvider.register({});
        };

        throwMe.should.throw(Errors.NotAdapter.construct().toString());
      });

      it('Should return self.', function() {
        adapterProvider.register(Adapter).should.equal(adapterProvider);
      });

      it('Should register an Ronald/db/Adapter.', function() {
        adapterProvider
          .register(Adapter)
          .has('Adapter')
          .should.be.true;
      });
    });

    describe('#support', function() {
      it('Should determine if an adapter is supported.', function() {
        adapterProvider
          .register(Adapter)
          .register(Adapter.extend({
            supported: false,
            name: 'notsupported'
          }));

        adapterProvider.supported('Adapter').should.be.true;
        adapterProvider.supported('notsupported').should.be.false;
      });
    });

    describe('#create', function() {
      it('Should throw Ronald/db/AdapterProviderErrors#DoesntExist if requested adapter doesnt exist.', function() {
        var throwMe = function() {
          adapterProvider
            .create('Adapter');
        };

        throwMe.should.throw(Errors.DoesntExist.construct().toString());
      });

      it('Should throw Ronald/db/AdapterProviderErrors#NotSupported if requested adapter isnt supported.', function() {
        var throwMe = function() {
          adapterProvider
            .register(Adapter.extend({
              supported: false
            }))
            .create('Adapter');
        };

        throwMe.should.throw(Errors.NotSupported.construct().toString());
      });

      it('Should return the adapter.', function() {
        adapterProvider
          .register(Adapter)
          .create('Adapter')
          .should.deep.equal(Adapter.construct(DriverProvider));
      });
    });
  });
});