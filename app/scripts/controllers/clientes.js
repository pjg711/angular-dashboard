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
                toastr.success('Crear Cliente', 'Se creo que cliente '+dataCliente.nombre);
                console.log("Se guardo cliente");
                $('#cargarCliente').modal('hide');
                $scope.listarClientes();
            });
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
        $scope.idClienteBorrar = '';
        $scope.confirmarBorrarCliente = function(idCliente) {
            $scope.idClienteBorrar = idCliente;
        }
        $scope.borrarCliente = function(idCliente) {
            $http.delete($rootScope.config.service_url+'/clientes/'+idCliente)
            .success(function(res){
                console.log("Cliente borrado");
                $scope.listarClientes();
                $('#myModal').modal('hide');
            });

        }
        $scope.borrarSeleccionados = function() {
            angular.forEach($scope.clientes, function(value){
                if (value.isselected) console.log("Id seleccionado-->"+value.id);
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
        $scope.actualizarCliente = function(clie) {
            var dataCliente = {
                nombre: clie.nombre.$modelValue,
                apellido: clie.apellido.$modelValue,
                direccion: clie.direccion.$modelValue,
                email: clie.email.$modelValue,
                telefono: clie.telefono.$modelValue
            };
            
        }
        // seleccionar clientes para borrar
        // tomado de http://stackoverflow.com/questions/31066554/how-to-enable-disable-button-when-checkbox-is-checked-in-a-table-using-angularjs
        $scope.countChecked = function(){
            //debugger;
            var count = 0;
            angular.forEach($scope.clientes, function(value){
                if (value.isselected) count++;
            });
            return count;
        }
        //
        $scope.listarClientes();
        $scope.updateTime();
  });