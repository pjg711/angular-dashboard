'use strict';

/**
 * @ngdoc function
 * @name clientesApp.controller:ClientesCtrl
 * @description
 * # ClientesCtrl
 * Controller of the clientesApp
 */
angular.module('clientesApp')
    .controller('ClientesCtrl', function($scope, $http, $rootScope, Clientes, $timeout, dateFilter, toastr){
        console.log("cargo clientes controller");
        $scope.clientes = [];
        $scope.editarDatos = [];
        
        $scope.sortType     = 'nombre'; // set the default sort type
        $scope.sortReverse  = false;  // set the default sort order
        $scope.searchFish   = '';     // set the default search/filter term        
        $scope.guardarClientes = function(clie){
            //debugger;
            console.log("pase por guardarClientes");
            var dataCliente = {
                nombre: clie.nombre.$modelValue,
                apellido: clie.apellido.$modelValue,
                direccion: clie.direccion.$modelValue,
                email: clie.email.$modelValue,
                telefono: clie.telefono.$modelValue
            };
            //debugger;
            Clientes.crear(dataCliente).then(function(res){
                toastr.success('Se creo que cliente '+dataCliente.nombre,'Crear Cliente');
                console.log("Se guardo cliente");
                $('#cargarCliente').modal('hide');
                $scope.listarClientes();
            });
        }
        $scope.idClienteBorrar = '';
        $scope.confirmarBorrarCliente = function(idCliente) {
            $scope.idClienteBorrar = idCliente;
        }
        $scope.borrarCliente = function(idCliente) {
            $http.delete($rootScope.config.service_url+'/clientes/'+idCliente)
            .success(function(res){
                toastr.success('Se borró el cliente con id'+idCliente,'Borrar Cliente');
                console.log("Cliente borrado");
                $scope.listarClientes();
                $('#myModal').modal('hide');
            });

        }
        // borrado en la seleccion multiple
        $scope.borrarSeleccionados = function() {
            var borrados = false;
            angular.forEach($scope.clientes, function(value){
                if (value.isselected) {
                    $http.delete($rootScope.config.service_url+'/clientes/'+value.id)
                    .success(function(res){
                        console.log("Cliente con id="+value.id+" en seleccion múltiple borrado");
                        borrados=true;
                    });
                    console.log("Id seleccionado-->"+value.id);
                }
            });
            if(borrados) {
                toastr.success('Se borraron los clientes seleccionados','Borrar Selección');
            }
        }
        // listar los clientes
        $scope.listarClientes = function(){
            $http.get($rootScope.config.service_url+'/clientes').then(function(res){
                console.log("success!", res);
                $scope.clientes = res.data;
            }, function(){
                console.log("error!");
            });
        }
        // ------------------------------------------------------------------------------------
        // edicion de cliente
	$scope.editarDatos = [];
        angular.forEach($scope.clientes, function(value){
            $scope.editarDatos[value.id]=false;
        })
	$scope.editarCliente = function(clie) {
            $scope.editarDatos[clie.id] = true;
            $scope.editarDatos[0] = true;
	}
        $scope.cancelarCliente = function(idCliente) {
            $scope.editarDatos[idCliente] = false;
            $scope.editarDatos[0] = false;
        }
        // actualizar información del cliente
        $scope.actualizarCliente = function(clie) {
            var dataCliente = {
                nombre: clie.nombre.$modelValue,
                apellido: clie.apellido.$modelValue,
                direccion: clie.direccion.$modelValue,
                email: clie.email.$modelValue,
                telefono: clie.telefono.$modelValue
            };
            console.log("actualizar nombre-->"+clie.nombre.$modelValue);
        }
        // seleccionar clientes para borrar
        $scope.countChecked = function(){
            //debugger;
            var count = 0;
            angular.forEach($scope.clientes, function(value){
                if (value.isselected) count++;
            });
            return count;
        }
        // funcion para actualizar reloj
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
        //
        $scope.listarClientes();
        $scope.updateTime();
  });