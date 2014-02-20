define([
  'Ronald/helpers/patterns/Provider',
  'Ronald/db/Driver',
  'Ronald/db/DriverProviderErrors',
  'Ronald/db/DriverProvider'
], function(Provider, Driver, Errors, DriverProvider) {

  describe('Ronald/db/DriverdriverProvider', function() {
    var driverProvider;

    beforeEach(function() {
      driverProvider = DriverProvider.create();
    });

    describe('Ronald/db/DriverdriverProvider', function() {
      it('Should extend Ronald/helpers/patterns/Provider.', function() {
        driverProvider.instanceOf(Provider).should.be.true;
        driverProvider.instanceOf(Provider).should.be.true;
      });
    });

    describe('#register', function() {
      it('Should return self.', function() {
        driverProvider
          .register(Driver)
          .should.equal(driverProvider);
      });

      it('Should throw a Ronald/helpers/Error when non Ronald/db/Drivers are registered.', function() {
        var throwMe = function() {
          driverProvider.register({});
        };

        throwMe.should.throw(Errors.NotDriver.create().toString());
      });

      it('Should register a Ronald/db/Drivers.', function() {
        driverProvider
          .register(Driver)
          .has('Driver')
          .should.be.true;
      });
    });

    describe('#supported', function() {
      it('Should determine if a driver type is supported.', function() {
        driverProvider
          .register(Driver)
          .supported('Driver')
          .should.be.true;

        driverProvider
          .register(Driver.extend({
            name: 'NonSupported',
            supported: false
          }))
          .supported('NonSupported')
          .should.be.false;
      });

      it('Should return false on non-registered drivers.', function() {
        driverProvider
          .supported('non-registered')
          .should.be.false;
      });
    });
  });
});