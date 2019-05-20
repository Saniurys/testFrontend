angular.module('testfrontendApp')
  .service('webService',['$http','$q', function($http,$q) {

    function createRequest(method, info){
  		var defer=$q.defer();
  		return {
  			  promise:$http({
          method:method,
          url:'../dataJson/' + info.url,
          data:info.data,
          timeout: defer.promise}),
  			cancel:function(reason){
  	         defer.resolve(reason);
  	    }
  		}
  	}

    function buscarCompanies(method){
      return createRequest(method, {
        url: 'companies.json'
        
      });
    }

    function buscarClientes(method, data){
      return createRequest(method, {
        url: 'clients' + data + '.json',
        data:data
      });
    }

    function buscarProductos(method, data){
      return createRequest(method, {
        url: 'products' + data + '.json',
        data: data
      });
    }


    return {
        buscarCompanies: function(data){
         
        return buscarCompanies ('GET')
      },

      buscarClientes: function(data){
        return buscarClientes ('GET', data)
      },

      buscarProductos: function(data){
        return buscarProductos ('GET', data)
      }
    }

  }]);
