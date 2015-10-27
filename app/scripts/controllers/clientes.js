'use strict';

/**
 * @ngdoc function
 * @name clientesApp.controller:ClientesCtrl
 * @description
 * # ClientesCtrl
 * Controller of the clientesApp
 */
angular.module('clientesApp')
    .controller('ClientesCtrl', function($scope, $rootScope, Clientes, $timeout, dateFilter, toastr, hotkeys){
        console.log("cargo clientes controller");
        $scope.clientes = [];
        
        $scope.sortType     = 'nombre'; // set the default sort type
        $scope.sortReverse  = false;  // set the default sort order
        $scope.searchFish   = '';     // set the default search/filter term        
        // crea un cliente
        $scope.guardarClientes = function(clie){
            console.log("pase por guardarClientes");
            var dataCliente = {
                nombre: clie.nombre.$modelValue,
                apellido: clie.apellido.$modelValue,
                direccion: clie.direccion.$modelValue,
                email: clie.email.$modelValue,
                telefono: clie.telefono.$modelValue
            };
            Clientes.crear(dataCliente).then(function(res){
                toastr.success('Se creó el cliente '+clie.nombre.$modelValue,'Crear Cliente');
                console.log("Se creó cliente");
                $('#cargarCliente').modal('hide');
                $scope.listarClientes();
            });
        }
        $scope.idClienteBorrar = '';
        $scope.confirmarBorrarCliente = function(idCliente) {
            $scope.idClienteBorrar = idCliente;
        }
        $scope.borrarCliente = function(idCliente) {
            Clientes.borrar(idCliente).then(function(res){
                toastr.success('Se borró el cliente con id'+idCliente,'Borrar Cliente');
                console.log("Cliente borrado");
                $scope.listarClientes();
                $('#BorrarCliente').modal('hide');
            });
        }
        // borrado en la seleccion multiple
        $scope.borrarSeleccionados = function() {
            var borrados = false;
            angular.forEach($scope.clientes, function(value){
                if (value.isselected) {
                    Clientes.borrar(value.id).then(function(res){
                        console.log("Cliente con id="+value.id+" en seleccion múltiple borrado");
                        borrados=true;
                    });
                    console.log("Id borrado-->"+value.id);
                }
            });
            if(borrados){
                toastr.success('Se borraron los clientes seleccionados','Borrar Selección');
                $scope.listarClientes();
                $('#BorrarSeleccionados').modal('hide');
            }
        }
        // listar los clientes
        $scope.listarClientes = function(){
            Clientes.listar().then(function(res){
                console.log("Lectura exitosa!", res);
                $scope.clientes = res.data;
            }, function(){
                console.log("error!"); 
            });
        }
        // ------------------------------------------------------------------------------------
        // edicion de cliente
	$scope.editarDatos = [];
        $scope.editarDatos[0] = false;
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
            //debugger;
            var dataCliente = {
                id: clie.id,
                nombre: clie.nombre,
                apellido: clie.apellido,
                direccion: clie.direccion,
                email: clie.email,
                telefono: clie.telefono
            };
            Clientes.actualizar(dataCliente).then(function(res){
                toastr.success('Se actualizó el cliente '+clie.nombre,'Actualizar Cliente');
                console.log("Se actualizó cliente");
                $scope.listarClientes();
            });
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
        // funcion para actualizar el reloj
        $scope.updateTime = function() {
            $timeout(function(){
                var date = new Date();
                var options = {
                    weekday: "long", day: "numeric", month: "long"
                };
                $scope.theclock = (dateFilter(date.toLocaleDateString(navigator.language, options)));
                $scope.thehour = (dateFilter(date, 'hh:mm'));
                $scope.updateTime();
            },1000);
        }
        // hotkeys
        hotkeys.add({
            combo: 'n',
            description: 'Abre modal para la creación de nuevo cliente',
            callback: function() {
                $('#cargarCliente').modal('show');
                //console.log("pase por aca");
            }
        });
        //
        $scope.listarClientes();
        $scope.updateTime();
  });