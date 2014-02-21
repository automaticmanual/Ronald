define([
  'Gizmo',
  'Ronald/db/DriverProvider',
  'Ronald/db/Driver',
  'Ronald/db/Request',
  'Ronald/db/AdapterErrors',
  'Ronald/db/Adapter'
], function(Gizmo, Provider, Driver, Request, Errors, Adapter) {

  describe('Ronald/helper/Adapter', function() {
    var provider;

    beforeEach(function() {
      provider = Provider.construct();

      provider
        .register(Driver.extend({
          supported: false,
          name: 'unsupported'
        }))
        .register(Driver.extend({
          supported: true,
          name: 'supported'
        }));
    });

    describe('Ronald/helper/Adapter', function() {
      it('Should extend Gizmo.', function() {
        Adapter.instanceOf(Gizmo).should.be.true;

        Adapter
          .construct(provider)
          .instanceOf(Gizmo)
          .should.be.true;
      });
    });

    describe('#construct', function() {
      it('Should throw a Ronald/db/AdapterErrors#NotProvider if a none Ronald/db/Provider is passed.', function() {
        var throwMe = function() {
          Adapter.construct({});
        };

        throwMe.should.throw(Errors.NotProvider.construct().toString());
      });

      it('Should construct an instance if a Ronald/db/Provider is passed.', function() {
        Adapter
          .construct(provider)
          .instanceOf(Adapter)
          .should.be.true;
      });

      it('Should construct an empty object option if one is not provided.', function() {
        Adapter
          .construct(provider)
          .options
          .should.be.an('object');
      });

      it('Should use the provided options object.', function() {
        var options = {
          cat: 'ronnie'
        };

        Adapter
          .construct(provider, options)
          .options
          .should.equal(options);
      });
    });

    describe('#locator', function() {
      it('Should get values from options.locator.', function() {
        Adapter
          .construct(provider, {
            locator: {
              driver: 'apple'
            }
          })
          .locator('driver')
          .should.equal('apple');
      });

      it('Should not delete default values.', function() {
        Adapter
          .construct(provider, {
            locator: {
              cat: 'ronnie'
            }
          })
          .locator('driver')
          .should.equal('driver');
      });
    });

    describe('#driver', function() {
      it('Should detect a driver neede to resolve model.', function() {
        provider.register(Driver);

        Adapter
          .construct(Provider
            .construct()
            .register(Driver))
          .driver({
            driver: 'Driver'
          })
          .should.equal(Driver);
      });

      it('Should return nothing on non resolved drivers.', function() {
        var adapter = Adapter.construct(provider);

        should.not.exist(adapter.driver({}));
      });
    });

    describe('#query', function() {
      it('Should throw a Ronald/db/AdapterErrors#DriverNotFound if a driver is not found.', function() {
        var throwMe = function() {
          Adapter
            .construct(provider)
            .query('construct', {
              driver: 'driver'
            });
        };

        throwMe.should.throw(Errors.DriverNotFound.construct().toString());
      });

      it('Should throw a Ronald/db/AdapterErrors#DriverNotSupported if a driver is not supported.', function() {
        var throwMe = function() {
          Adapter
            .construct(provider)
            .query('construct', {
              driver: 'unsupported'
            });
        };

        throwMe.should.throw(Errors.DriverNotSupported.construct().toString());
      });

      it('Should throw a Ronald/db/AdapterErrors#UnsupportedMethod if a unsupported method is used.', function() {
        var throwMe = function() {
          Adapter
            .construct(provider)
            .query('method', {
              driver: 'supported'
            });
        };

        throwMe.should.throw(Errors.UnsupportedMethod.construct().toString());
      });

      it('Should return a Ronald/db/Request object on query.', function() {
        Adapter
          .construct(provider)
          .query('construct', {
            driver: 'supported'
          })
          .instanceOf(Request)
          .should.be.true;
      });
    });
  });
});