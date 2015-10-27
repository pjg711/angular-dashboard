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
        }
        /*
        cargar_ejemplo: function(json){
            debugger;
            $http.get(json).success(function (data) {
                return data;
            })
            .error(function (data, status, headers, config) {
                debugger;
                console.log("dio error");
            });
        }
        */
    };
  });