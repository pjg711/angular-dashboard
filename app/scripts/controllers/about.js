'use strict';

/**
 * @ngdoc function
 * @name clientesApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the clientesApp
 */
angular.module('clientesApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
