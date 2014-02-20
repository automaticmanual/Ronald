define([
  'Ronald/db/Adapter',
  'Ronald/db/Driver',
  'Ronald/db/Provider',
  'Ronald/db/adapters/Backbone'
], function(Adapter, Driver, Provider, Backbone) {

  describe('Ronald/db/adapters/Backbone', function() {
    var backbone, provider;

    beforeEach(function() {
      var backboneDriver = Driver
        .extend({
          name: 'Backbone'
        });

      provider = Provider
        .create()
        .register(backboneDriver)
        .register(Driver);

      backbone = Backbone.create(provider);
    });

    describe('Ronald/db/adapters/Backbone', function() {
      it('Should extend Ronald/db/Adapter.', function() {
        Backbone.instanceOf(Adapter).should.be.true;
        backbone.instanceOf(Adapter).should.be.true;
      });
    });

    describe('#driver', function() {
      it('Should return proper driver if model has a driver locator.', function() {
        backbone
          .driver({
            driver: 'Driver'
          })
          .should.equal(Driver);

        var shouldntExist = backbone.driver({
          driver: 'non-existant'
        });

        should.not.exist(shouldntExist);
      });

      it('Should return a Ronald/db/adapters/Backbone if driver locator is not set.', function() {
        backbone
          .driver({})
          .should.have.property('name', 'Backbone');
      });
    });
  });
});