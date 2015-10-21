'use strict';

/**
 * @ngdoc service
 * @name clientesApp.Clientes
 * @description
 * # Clientes
 * Factory in the clientesApp.
 */
angular.module('clientesApp')
  .factory('Clientes', function ($http, $rootScope) {
    // Service logic
    // ...
    var req = function(method, path, data){
        return $http({
            method: method,
            url: $rootScope.config.service_url+'/clientes'+path,
            data: data
        });
    }

    // Public API here
    return {
         crear: function(data){
             return req('POST', '', data);
         }
    };
  });
