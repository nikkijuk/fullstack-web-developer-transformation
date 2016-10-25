'use strict';

angular.module('conFusion.services', ['ngResource'])
.constant("baseURL", "http://192.168.207.57:3000/") //"http://localhost:3000/")
 
.factory('$localStorage', ['$window', function($window) {
  return {

	// save string
    store: function(key, value) { 
      $window.localStorage[key] = value;
    },
    
    // load string
    get: function(key, defaultValue) {
      return $window.localStorage[key] || defaultValue;
    },
    
    // save json 
    storeObject: function(key, value) {
      $window.localStorage[key] = JSON.stringify(value);
      console.log ('saved "'+key+'" to local storage :'+value)
    },
    
    // load json
    getObject: function(key,defaultValue) {
      var value = JSON.parse($window.localStorage[key] || defaultValue);
      console.log ('load "'+key+'" from local storage :'+value)
      return value;
    }
    
  }
}])

.factory('menuFactory', ['$resource', 'baseURL', function ($resource, baseURL) {
    return $resource(baseURL + "dishes/:id", null, {
        'update': {
            method: 'PUT'
        }
    });
}])

.factory('promotionFactory', ['$resource', 'baseURL', function ($resource, baseURL) {
    return $resource(baseURL + "promotions/:id");
}])

.factory('corporateFactory', ['$resource', 'baseURL', function($resource,baseURL) {
    return $resource(baseURL+"leadership/:id");
}])

.factory('feedbackFactory', ['$resource', 'baseURL', function($resource,baseURL) {
    return $resource(baseURL+"feedback/:id");
}])

.factory('favoriteFactory', ['$localStorage', 'baseURL', function ($localStorage, baseURL) {
    var favFac = {};
    
    // favorites array is local to factory
    // favorites is initialized from local storage using 'favorites' as key 
    var favorites = $localStorage.getObject('favorites','[]');

    favFac.addToFavorites = function (index) {
    	
    	// if already contained to favorites do nothing
        for (var i = 0; i < favorites.length; i++) {
            if (favorites[i].id == index) {
                return;
            }
        }
        
        // update local favorites array
        // write favorites to local storage using 'favorites' as key
        favorites.push({id: index});
        $localStorage.storeObject('favorites', favorites);         
    };
    
    favFac.deleteFromFavorites = function (index) {
        for (var i = 0; i < favorites.length; i++) {
            if (favorites[i].id == index) {

            	// delete from local array
            	// save to local storage
                favorites.splice(i, 1);
                $localStorage.storeObject('favorites', favorites); 
            }
        }
    }

    favFac.getFavorites = function () {
        return favorites;
    };
    
    return favFac;
}])

;