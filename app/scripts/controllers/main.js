'use strict';

/**
 * @ngdoc function
 * @name clientesApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the clientesApp
 */
angular.module('clientesApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
