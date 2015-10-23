'use strict';

/**
 * @ngdoc function
 * @name clientesApp.controller:ClientesCtrl
 * @description
 * # ClientesCtrl
 * Controller of the clientesApp
 */
angular.module('clientesApp')
  .controller('ClientesCtrl', function($scope, $http, $rootScope, Clientes, $timeout, dateFilter){
        console.log("cargo clientes controller");
        $scope.clientes = [];
        $scope.guardarClientes = function(clie){
            debugger;
            console.log("pase por guardarClientes");
            var dataCliente = {
                nombre: clie.nombre.$modelValue,
                apellido: clie.apellido.$modelValue,
                direccion: clie.direccion.$modelValue,
                email: clie.email.$modelValue,
                telefono: clie.telefono.$modelValue
            };
            debugger;
            Clientes.crear(dataCliente).then(function(res){
                console.log("creado");
                $('#cargarCliente').modal('hide');
                $scope.listarClientes();
            });
        }
        $scope.updateTime = function() {
            $timeout(function(){
                var date = new Date();
                var options = {
                    weekday: "long", day: "numeric", month: "long"
                };
                //$scope.theclock = (dateFilter(date.toLocaleTimeString(navigator.language, options)));
                $scope.theclock = (dateFilter(date.toLocaleDateString(navigator.language, options)));
                $scope.thehour = (dateFilter(date, 'hh:mm'));
                $scope.updateTime();
            },1000);
        }

        $scope.idClienteBorrar = '';

        $scope.confirmarBorrarCliente = function(idProv) {
            $scope.idClienteBorrar = idProv;
        }
        $scope.borrarCliente = function(idProv) {
            $http.delete($rootScope.config.service_url+'/clientes/'+idProv)
            .success(function(res){
                console.log("creado");
                $scope.listarClientes();
                $('#myModal').modal('hide');
            });

        }
        $scope.listarClientes = function(){
            $http.get($rootScope.config.service_url+'/clientes').then(function(res){
                console.log("success!", res);
                $scope.clientes = res.data;
            }, function(){
                console.log("error!");
            });
        }
        $scope.listarClientes();
        $scope.updateTime();
  });
