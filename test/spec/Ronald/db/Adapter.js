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
      provider = Provider.create();

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
          .create(provider)
          .instanceOf(Gizmo)
          .should.be.true;
      });
    });

    describe('#create', function() {
      it('Should throw a Ronald/db/AdapterErrors#NotProvider if a none Ronald/db/Provider is passed.', function() {
        var throwMe = function() {
          Adapter.create({});
        };

        throwMe.should.throw(Errors.NotProvider.create().toString());
      });

      it('Should create an instance if a Ronald/db/Provider is passed.', function() {
        Adapter
          .create(provider)
          .instanceOf(Adapter)
          .should.be.true;
      });

      it('Should create an empty object option if one is not provided.', function() {
        Adapter
          .create(provider)
          .options
          .should.be.an('object');
      });

      it('Should use the provided options object.', function() {
        var options = {
          cat: 'ronnie'
        };

        Adapter
          .create(provider, options)
          .options
          .should.equal(options);
      });
    });

    describe('#locator', function() {
      it('Should get values from options.locator.', function() {
        Adapter
          .create(provider, {
            locator: {
              driver: 'apple'
            }
          })
          .locator('driver')
          .should.equal('apple');
      });

      it('Should not delete default values.', function() {
        Adapter
          .create(provider, {
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
          .create(Provider
            .create()
            .register(Driver))
          .driver({
            driver: 'Driver'
          })
          .should.equal(Driver);
      });

      it('Should return nothing on non resolved drivers.', function() {
        var adapter = Adapter.create(provider);

        should.not.exist(adapter.driver({}));
      });
    });

    describe('#query', function() {
      it('Should throw a Ronald/db/AdapterErrors#DriverNotFound if a driver is not found.', function() {
        var throwMe = function() {
          Adapter
            .create(provider)
            .query('create', {
              driver: 'driver'
            });
        };

        throwMe.should.throw(Errors.DriverNotFound.create().toString());
      });

      it('Should throw a Ronald/db/AdapterErrors#DriverNotSupported if a driver is not supported.', function() {
        var throwMe = function() {
          Adapter
            .create(provider)
            .query('create', {
              driver: 'unsupported'
            });
        };

        throwMe.should.throw(Errors.DriverNotSupported.create().toString());
      });

      it('Should throw a Ronald/db/AdapterErrors#UnsupportedMethod if a unsupported method is used.', function() {
        var throwMe = function() {
          Adapter
            .create(provider)
            .query('method', {
              driver: 'supported'
            });
        };

        throwMe.should.throw(Errors.UnsupportedMethod.create().toString());
      });

      it('Should return a Ronald/db/Request object on query.', function() {
        Adapter
          .create(provider)
          .query('create', {
            driver: 'supported'
          })
          .instanceOf(Request)
          .should.be.true;
      });
    });
  });
});