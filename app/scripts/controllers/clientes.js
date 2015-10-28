'use strict';

/**
 * @ngdoc function
 * @name clientesApp.controller:ClientesCtrl
 * @description
 * # ClientesCtrl
 * Controller of the clientesApp
 */
angular.module('clientesApp')
    .controller('ClientesCtrl', function($scope, $rootScope, $http, Clientes, $timeout, dateFilter, toastr, hotkeys){
        console.log("cargo clientes controller");
        $scope.clientes = [];
        //
        //$scope.alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
        $scope.alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
        //
        $scope.sortType     = 'nombre'; // set the default sort type
        $scope.sortReverse  = false;  // set the default sort order
        $scope.searchFish   = '';     // set the default search/filter term
        //
        // cargo datos de ejemplo desde un archivo json
        $scope.ejemplo = function(){
            debugger;
            Clientes.cargar_ejemplo($rootScope.config.archivo_ejemplo).then(function(res){
                debugger;
                console.log("Datos json de ejemplo--->",res);
                angular.forEach($scope.clientes, function(value){
                    Clientes.borrar(value.id).then(function(res){
                        debugger;
                        console.log("Cliente con id="+value.id+" en seleccion múltiple borrado");
                    });
                });
                // agrego nuevos
                $scope.clientes = res.data;
                angular.forEach($scope.clientes, function(value){
                    var dataCliente = {
                        nombre: value.nombre,
                        apellido: value.apellido,
                        direccion: value.direccion,
                        email: value.email,
                        telefono: value.telefono
                    };
                    debugger;
                    Clientes.crear(dataCliente).then(function(res){
                        console.log("Se creó cliente "+value.nombre+" "+value.apellido);
                    });
                });
                toastr.success('Se crearon '+$scope.clientes.length+' clientes de ejemplo','Actualizar Cliente');
                $scope.listarClientes();
            });
            // lo hice asi porque no sabia como implementarlo en factory la carga de un archivo json
            /*
            $http.get($rootScope.config.archivo_ejemplo).success(function(data) {
                debugger;
                console.log("datos de ejemplo cargados");
            })
            .error(function (data, status, headers, config) {
                debugger;
                console.log("dio error");
            });
            debugger;
            if(data){ 
                // debo borrar los registros existentes en la base de datos
                debugger;
                angular.forEach($scope.clientes, function(value){
                    Clientes.borrar(value.id).then(function(res){
                        debugger;
                        console.log("Cliente con id="+value.id+" en seleccion múltiple borrado");
                    });
                });
                // agrego nuevos
                $scope.clientes = data;
                angular.forEach($scope.clientes, function(value){
                    var dataCliente = {
                        nombre: value.nombre,
                        apellido: value.apellido,
                        direccion: value.direccion,
                        email: value.email,
                        telefono: value.telefono
                    };
                    debugger;
                    Clientes.crear(dataCliente).then(function(res){
                        console.log("Se creó cliente "+value.nombre+" "+value.apellido);
                    });
                });
                toastr.success('Se crearon '+$scope.clientes.length+' clientes de ejemplo','Actualizar Cliente');
                $scope.listarClientes();
            }
            */
        }
        /*
        $scope.setLetters = function(from, to){
            $scope.fromLetter = from;
            $scope.toLetter = to;
        }
        */
        $scope.setLetters = function(letter) {
            $scope.buscar = letter;
        }
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
                toastr.success('Se creó el cliente '+clie.nombre.$modelValue+' '+clie.apellido.$modelValue,'Crear Cliente');
                console.log("Se creó cliente");
                $('#cargarCliente').modal('hide');
                $scope.listarClientes();
            });
        }
        // ------------------------------------------------------------------------------------
        // borrado de un cliente
        $scope.cliente_borrar = [];
        $scope.confirmarBorrarCliente = function(clie) {
            $scope.cliente_borrar = clie;
        }
        $scope.borrarCliente = function() {
            //debugger;
            Clientes.borrar($scope.cliente_borrar.id).then(function(res){
                //debugger;
                toastr.success('Se borró el cliente '+$scope.cliente_borrar.nombre+' '+$scope.cliente_borrar.apellido,'Borrar Cliente');
                console.log("Cliente borrado");
                $('#BorrarCliente').modal('hide');
                $scope.listarClientes();
            });
        }
        // borrado en la seleccion multiple
        $scope.borrarSeleccionados = function() {
            var borrados = false;
            angular.forEach($scope.clientes, function(value){
                if (value.isselected) {
                    Clientes.borrar(value.id).then(function(res){
                        console.log("Cliente "+value.nombre+" "+value.apellido+" en seleccion múltiple borrado");
                        borrados=true;
                    });
                    console.log("Id borrado-->"+value.id);
                }
            });
            if(borrados===true){
                toastr.success('Se borraron todos los clientes seleccionados','Borrar Selección');
            }
            $('#BorrarSeleccionados').modal('hide');
            $scope.listarClientes();
        }
        // ------------------------------------------------------------------------------------
        // listar los clientes
        $scope.listarClientes = function(){
            Clientes.listar().then(function(res){
                console.log("Lectura exitosa de "+res.data.length+" clientes!", res);
                $scope.clientes = res.data;
                //debugger;
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
                $scope.editarDatos[clie.id]=false;
                $scope.editarDatos[0]=false;
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
            }
        });
        hotkeys.add({
            combo: 'c',
            description: 'Abre calculadora',
            callback: function() {
                $('#Calculadora').modal('show');
            }
        });
        hotkeys.add({
            combo: 'l',
            description: 'Cargo datos json desde archivo',
            callback: function() {
                $scope.ejemplo();
            }
        });
        //$('#Calculadora').css('width', '300px');
        //
        $scope.listarClientes();
        $scope.updateTime();
    });
