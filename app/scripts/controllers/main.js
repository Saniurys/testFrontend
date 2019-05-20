'use strict';

/**
 * @ngdoc function
 * @name testfrontendApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the testfrontendApp
 */
angular.module('testfrontendApp')
.controller('MainCtrl', function ($scope, $window, webService, $rootScope) {
  //Switch para controlar el card que abre para ver los detalles
    $scope.switch = 0;  

  $scope.cambiarSwitch = function(){
    if($scope.switch == 0){
      $scope.switch = 1;
    }else{
      $scope.switch = 0;
    }  
  }
  $scope.buscarDetalle = function(companie){
    $scope.switch = 1;
    //Guarda la empresa seleccionada 
    $scope.companieSelect = companie;
    //Buscar Clientes
    webService.buscarClientes(companie.id).promise
      .then(function(response){
        $scope.clientes = response.data.result.clients
        if($scope.clientes.length == 0){
          alert("No se poseen Clientes", )
        }
      }),function (error) {
        alert('Error buscando Clientes', error)
      };

      //Buscar Productos
      webService.buscarProductos(companie.id).promise
      .then(function(response){
        $scope.productos = response.data.result.productos
        if($scope.productos.length == 0){
          alert("No se poseen Productos", )
        }
      }),function (error) {
        alert('Error buscando Productos', error)
      };
  }

  $scope.buscarCompanies = function(){
   webService.buscarCompanies().promise
        .then(function(response){
          $scope.companies = response.data.result.companies
          if($scope.companies.length == 0){
            alert("No se poseen Empresas", )
          }
        }),function (error) {
          alert('Error buscando Empresas', error)
        };
    }

    //Llamada al primer método que carga las empresas.
    $scope.buscarCompanies();
});
