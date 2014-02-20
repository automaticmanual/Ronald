define([
  'Gizmo',
  'Ronald/helpers/Error',
  'Ronald/db/Driver',
  'Ronald/db/Provider'
], function(Gizmo, Error, Driver, Provider) {

  describe('Ronald/db/Provider', function() {
    var provider;

    beforeEach(function() {
      provider = Provider.create();
    });

    describe('Ronald/db/Provider', function() {
      it('Should extend Gizmo.', function() {
        Provider.instanceOf(Gizmo).should.be.true;
        provider.instanceOf(Gizmo).should.be.true;
      });
    });

    describe('#register', function() {
      it('Should return self.', function() {
        provider
          .register(Driver)
          .should.equal(provider);
      });

      it('Should throw a Ronald/helpers/Error when non Ronald/db/Drivers are registered.', function() {
        var throwMe = function() {
          provider.register({});
        };

        throwMe.should.throw(Error);
      });

      it('Should register a Ronald/db/Drivers.', function() {
        provider
          .register(Driver)
          .has('Driver')
          .should.be.true;
      });
    });

    describe('#has', function() {
      it('Should determine if Driver exists.', function() {
        provider
          .has('Driver')
          .should.be.false;

        provider
          .register(Driver)
          .has('Driver')
          .should.be.true;
      });
    });

    describe('#supported', function() {
      it('Should determine if a driver type is supported.', function() {
        provider
          .register(Driver)
          .supported('Driver')
          .should.be.true;

        provider
          .register(Driver.extend({
            name: 'NonSupported',
            supported: false
          }))
          .supported('NonSupported')
          .should.be.false;
      });

      it('Should return false on non-registered drivers.', function() {
        provider
          .supported('non-registered')
          .should.be.false;
      });
    });

    describe('#get', function() {
      it('Should return a registered driver.', function() {
        provider
          .register(Driver)
          .get('Driver')
          .should.equal(Driver);
      });

      it('Should return nothing for non-registered drivers.', function() {
        should.not.exist(provider.get('non-registered'));
      });
    });

    describe('#keys', function() {
      it('Should return a list of driver names that are registered', function() {
        provider
          .register(Driver)
          .register(Driver.extend({
            name: 'AnotherDriver'
          }))
          .register(Driver.extend({
            name: 'AndAnotherDriver'
          }))
          .keys()
          .should.deep.equal(['Driver', 'AnotherDriver', 'AndAnotherDriver']);
      });
    });
  });
});