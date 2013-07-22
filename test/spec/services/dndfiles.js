'use strict';

describe('Service: dndfiles', function () {

  // load the service's module
  beforeEach(module('playerApp'));

  // instantiate service
  var dndfiles;
  beforeEach(inject(function (_dndfiles_) {
    dndfiles = _dndfiles_;
  }));

  it('should do something', function () {
    expect(!!dndfiles).toBe(true);
  });

});
