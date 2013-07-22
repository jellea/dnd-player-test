'use strict';

describe('Controller: AudioelemCtrl', function () {

  // load the controller's module
  beforeEach(module('playerApp'));

  var AudioelemCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AudioelemCtrl = $controller('AudioelemCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
