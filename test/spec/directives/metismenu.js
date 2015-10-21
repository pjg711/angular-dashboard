'use strict';

describe('Directive: metismenu', function () {

  // load the directive's module
  beforeEach(module('clientesApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<metismenu></metismenu>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the metismenu directive');
  }));
});
