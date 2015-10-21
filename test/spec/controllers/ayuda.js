'use strict';

describe('Controller: AyudaCtrl', function () {

  // load the controller's module
  beforeEach(module('clientesApp'));

  var AyudaCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AyudaCtrl = $controller('AyudaCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
