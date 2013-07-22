'use strict';

describe('Service: disco', function () {

  // load the service's module
  beforeEach(module('playerApp'));

  // instantiate service
  var disco;
  beforeEach(inject(function (_disco_) {
    disco = _disco_;
  }));

  it('should do something', function () {
    expect(!!disco).toBe(true);
  });

});
