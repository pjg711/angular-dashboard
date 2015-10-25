'use strict';

/**
 * @ngdoc overview
 * @name clientesApp
 * @description
 * # clientesApp
 *
 * Main module of the application.
 */
angular
  .module('clientesApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'toastr'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/clientes.html',
        controller: 'ClientesCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .run(function ($rootScope, $location, $route, $timeout) {
      console.log($location.url());
      $rootScope.layout = {};
      $rootScope.layout.loading = true;
      $rootScope.config = {};
      $rootScope.config.service_url = 'http://localhost:9001';
      $rootScope.config.base_url = '';
      $rootScope.config.base_url += $location.protocol()+'://';
      $rootScope.config.base_url += $location.host();
      if($location.port()!=80){
        $rootScope.config.base_url += ':'+$location.port();
      }
      $rootScope.$on('$routeChangeStart', function () {
          console.log('$routeChangeStart');
          //show loading gif
          $timeout(function(){
            $rootScope.layout.loading = true;
          });
      });
      $rootScope.$on('$routeChangeSuccess', function () {
          console.log('$routeChangeSuccess');
          //hide loading gif
          $timeout(function(){
            $rootScope.layout.loading = false;
          }, 200);
      });
      $rootScope.$on('$routeChangeError', function () {
          //hide loading gif
          console.log('error');
          $rootScope.layout.loading = false;
      });
  });