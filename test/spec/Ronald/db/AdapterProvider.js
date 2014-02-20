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
      adapterProvider = AdapterProvider.create(DriverProvider);
    });

    describe('Ronald/db/AdapterProvider', function() {
      it('Should extend Ronald/helpers/patterns/Provider.', function() {
        AdapterProvider.instanceOf(Provider).should.be.true;
        adapterProvider.instanceOf(Provider).should.be.true;
      });
    });

    describe('#create', function() {
      it('Should throw a Ronald/db/AdapterProviderErrors#NotDriverProvider with non Ronald/db/DriverProvider argument', function() {
        var throwMe = function() {
          AdapterProvider.create();
        };

        throwMe.should.throw(Errors.NotDriverProvider.create().toString());
      });
    });

    describe('#register', function() {
      it('Should throw a Ronald/db/AdapterProviderErrors#NotAdapter with a non Ronald/db/Adapter argument', function() {
        var throwMe = function() {
          adapterProvider.register({});
        };

        throwMe.should.throw(Errors.NotAdapter.create().toString());
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
        console.log(adapterProvider.supported('Adapter'));
        adapterProvider.supported('Adapter').should.be.true;
        adapterProvider.supported('notsupported').should.be.false;
      });
    });

    describe('#adapter', function() {
      it('Should throw Ronald/db/AdapterProviderErrors#DoesntExist if requested adapter doesnt exist.', function() {
        var throwMe = function() {
          adapterProvider
            .adapter('Adapter');
        };

        throwMe.should.throw(Errors.DoesntExist.create().toString());
      });

      it('Should throw Ronald/db/AdapterProviderErrors#NotSupported if requested adapter isnt supported.', function() {
        var throwMe = function() {
          adapterProvider
            .register(Adapter.extend({
              supported: false
            }))
            .adapter('Adapter');
        };

        throwMe.should.throw(Errors.NotSupported.create().toString());
      });

      it('Should return the adapter.', function() {
        adapterProvider
          .register(Adapter)
          .adapter('Adapter')
          .should.deep.equal(Adapter.create(DriverProvider));
      });
    });
  });
});