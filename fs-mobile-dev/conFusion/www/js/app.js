// ConFusion app

// angular.module is a global place for creating, registering and retrieving Angular modules

angular.module('conFusion', ['ionic', 'ngCordova', 'conFusion.controllers','conFusion.services'])

// Use this method to register work which should be performed when the injector is done loading all modules.
.run(function($ionicPlatform, $rootScope, $ionicLoading, $cordovaSplashscreen, $timeout) {

	// ensure that ionic platform is ready
	$ionicPlatform.ready(function() {
		
	    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
	    // for form inputs)
	    if (window.cordova && window.cordova.plugins.Keyboard) {
	      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
	      cordova.plugins.Keyboard.disableScroll(true);
	
	    }
	    if (window.StatusBar) {
	      // org.apache.cordova.statusbar required
	      StatusBar.styleDefault();
	    }
	    
	    // show and hide spinner
	    
	    $rootScope.$on('loading:show', function () {
	        $ionicLoading.show({
	            template: '<ion-spinner></ion-spinner> Loading ...'
	        })
	    });
	
	    $rootScope.$on('loading:hide', function () {
	        $ionicLoading.hide();
	    });
	
	    // catch state changes coming from ui router
	    
	    $rootScope.$on('$stateChangeStart', function () {
	        console.log('Loading ...');
	        $rootScope.$broadcast('loading:show');
	    });
	
	    $rootScope.$on('$stateChangeSuccess', function () {
	        console.log('done');
	        $rootScope.$broadcast('loading:hide');
	    });

        // close splash screen

        $timeout(function(){
           $cordovaSplashscreen.hide();
        },20000);
  });
})

// Use this method to register work which needs to be performed on module loading
.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  // sidebar
  
  .state('app', {
	url: '/app',
	abstract: true,
	templateUrl: 'templates/sidebar.html',
	controller: 'AppCtrl'
  })

  // added menus
  
  .state('app.home', {
    url: '/home',
    views: {
      'mainContent': {
        templateUrl: 'templates/home.html',
        controller: 'IndexController',
        resolve: {
            dish: ['menuFactory', function(menuFactory){
                return menuFactory.get({id:0});
            }],
            promotion: ['promotionFactory', function(promotionFactory) {
            	return promotionFactory.get({id:0});
            }],
	        leader: ['corporateFactory', function(corporateFactory) {
	        	return corporateFactory.get({id:3});
	        }]
        }
      }
    }
  })

  .state('app.aboutus', {
      url: '/aboutus',
      views: {
        'mainContent': {
          templateUrl: 'templates/aboutus.html',
          controller: 'AboutController',
          resolve: {
  	        leaders: ['corporateFactory', function(corporateFactory) {
  	        	return corporateFactory.query();
  	        }]
          }
        }
      }
    })

   .state('app.contactus', {
      url: '/contactus',
      views: {
        'mainContent': {
          templateUrl: 'templates/contactus.html'
        }
      }
    })

    .state('app.menu', {
      url: '/menu',
      views: {
        'mainContent': {
          templateUrl: 'templates/menu.html',
          controller: 'MenuController',
          resolve: {
              dishes: ['menuFactory', function(menuFactory){
                  return menuFactory.query();
              }]
          }
        }
      }
    })

  .state('app.dishdetails', {
    url: '/menu/:id',
    views: {
      'mainContent': {
        templateUrl: 'templates/dishdetail.html',
        controller: 'DishDetailController',
        resolve: {
            dish: ['$stateParams','menuFactory', function($stateParams, menuFactory){
                return menuFactory.get({id:parseInt($stateParams.id, 10)});
            }]
        }
      }
    }
  })

  .state('app.favorites', {
      url: '/favorites',
      views: {
        'mainContent': {
          templateUrl: 'templates/favorites.html',
            controller:'FavoritesController',
            resolve: {
                dishes:  ['menuFactory', function(menuFactory){
                  return menuFactory.query();
                }],
                favorites: ['favoriteFactory', function(favoriteFactory) {
                    return favoriteFactory.getFavorites();
                }]
            }
        }
      }
    });
  
  // default case
  
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home');
});
