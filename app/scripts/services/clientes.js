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
        listar: function(data){
            return req('GET', '', data);
        },
        crear: function(data){
            return req('POST', '', data);
        },
        actualizar: function(data){
            return req('PUT','/'+data.id, data);
        },
        borrar: function(idCliente){
            return req('DELETE','/'+idCliente, []);
        },
        cargar_ejemplo: function(json) {
            debugger;
            return req('GET', '', json);
        },
        grabar_ejemplo: function(json) {
            return req('POST', '', json);
        }
    };
  });