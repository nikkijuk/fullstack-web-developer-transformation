'use strict';

// create controllers for app

angular.module('conFusion.controllers', [])

.controller('AppCtrl', function ($scope, $ionicModal, $timeout, $localStorage, $ionicPlatform, $cordovaCamera, $cordovaImagePicker) {	

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = $localStorage.getObject('userinfo','{}');
  console.log('Found login data ', $scope.loginData);

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);
    $localStorage.storeObject('userinfo',$scope.loginData);    

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
  
  // -- for reservation
  
  $scope.reservation = {};

  // Create the reserve modal that we will use later
  $ionicModal.fromTemplateUrl('templates/reserve.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.reserveform = modal;
  });

  // Triggered in the reserve modal to close it
  $scope.closeReserve = function() {
    $scope.reserveform.hide();
  };

  // Open the reserve modal
  $scope.reserve = function() {
    $scope.reserveform.show();
  };

  // Perform the reserve action when the user submits the reserve form
  $scope.doReserve = function() {
    console.log('Doing reservation', $scope.reservation);

    // Simulate a reservation delay. Remove this and replace with your reservation
    // code if using a server system
    $timeout(function() {
      $scope.closeReserve();
    }, 1000);
  };

  // -- for registration

  // Registration object is empty
  $scope.registration = {};

    // Create the registration modal that we will use later
    $ionicModal.fromTemplateUrl('templates/register.html', {
        scope: $scope
    }).then(function (modal) {
        $scope.registerform = modal;
    });

    // Triggered in the registration modal to close it
    $scope.closeRegister = function () {
        $scope.registerform.hide();
    };

    // Open the registration modal
    $scope.register = function () {
        $scope.registerform.show();
    };

    // Perform the registration action when the user submits the registration form
    $scope.doRegister = function () {
        // Simulate a registration delay. Remove this and replace with your registration
        // code if using a registration system
        $timeout(function () {
            $scope.closeRegister();
        }, 1000);
    };

    // -- register camera

    $ionicPlatform.ready(function() {
        var options = {
            quality: 50,
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType: Camera.PictureSourceType.CAMERA,
            allowEdit: true,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 100,
            targetHeight: 100,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: false
        };
         $scope.takePicture = function() {
            // http://ngcordova.com/docs/plugins/camera/ 
            // cordova plugin add cordova-plugin-camera 
            $cordovaCamera.getPicture(options).then(function(imageData) {
                $scope.registration.imgSrc = "data:image/jpeg;base64," + imageData;
            }, function(err) {
                console.log(err);
            });

            $scope.registerform.show();

        };
    });
    
    // -- gallery
    
    $scope.selectPicture = function () {

	    var options = {
	     maximumImagesCount: 1,
	     width: 100,
	     height: 100,
         quality: 50
	    };
	
        // week 4.1
	    // TODO: select pic from gallery
	    // http://ngcordova.com/docs/plugins/imagePicker/
        // cordova plugin add https://github.com/wymsee/cordova-imagePicker.git
	    $cordovaImagePicker.getPictures(options)
	      .then(function (results) {
              if (results.length === 1) {  
	    	    // should always be only one
	    	    $scope.registration.imgSrc = results[0]; // set image to url 
              } else {
            	 // not exactly one
                  console.log("Not exactly one picture selected");
              }
	        }, function(error) {
	        	// error getting photos
                console.log(error);
	      });
    }

})

.controller('MenuController', ['$scope', 'dishes', 'favoriteFactory', 'baseURL', '$ionicListDelegate', '$ionicPlatform', '$cordovaLocalNotification', '$cordovaToast', 
        function ($scope, dishes, favoriteFactory, baseURL, $ionicListDelegate, $ionicPlatform, $cordovaLocalNotification, $cordovaToast) {
    
    $scope.addFavorite = function (index) {
        console.log("index is " + index);
        favoriteFactory.addToFavorites(index);
        $ionicListDelegate.closeOptionButtons();

        $ionicPlatform.ready(function () {

            // show notification 
            $cordovaLocalNotification.schedule({
                id: 1,
                title: "Added Favorite",
                text: $scope.dishes[index].name
            }).then(function () {
                console.log('Added Favorite '+$scope.dishes[index].name);
            },
            function () {
                console.log('Failed to add Notification ');
            });

            // show toast
            $cordovaToast
              .show('Added Favorite '+$scope.dishes[index].name, 'long', 'center')
              .then(function (success) {
                  // success
              }, function (error) {
                  // error
              });
        });

    }
	
    $scope.baseURL = baseURL;
	
    $scope.tab = 1;
    $scope.filtText = '';
    $scope.showDetails = false;
    
    $scope.dishes = dishes;
    $scope.showMenu = true;
                
    $scope.select = function(setTab) {
        $scope.tab = setTab;
        
        if (setTab === 2) {
            $scope.filtText = "appetizer";
        }
        else if (setTab === 3) {
            $scope.filtText = "mains";
        }
        else if (setTab === 4) {
            $scope.filtText = "dessert";
        }
        else {
            $scope.filtText = "";
        }
    };

    $scope.isSelected = function (checkTab) {
        return ($scope.tab === checkTab);
    };

    $scope.toggleDetails = function() {
        $scope.showDetails = !$scope.showDetails;
    };
}])

.controller('ContactController', ['$scope', function($scope) {

    $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
    
    var channels = [{value:"tel", label:"Tel."}, {value:"Email",label:"Email"}];
    
    $scope.channels = channels;
    $scope.invalidChannelSelection = false;
                
}])

.controller('FeedbackController', ['$scope', 'feedbackFactory', function($scope,feedbackFactory) {
    
    $scope.sendFeedback = function() {
	    console.log($scope.feedback);
	    
	    if ($scope.feedback.agree && ($scope.feedback.mychannel == "")) {
	        $scope.invalidChannelSelection = true;
	        console.log('incorrect');
	    } else {
	        $scope.invalidChannelSelection = false;
	        feedbackFactory.save($scope.feedback);
	        $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
	        $scope.feedback.mychannel="";
	        $scope.feedbackForm.$setPristine();
	        console.log($scope.feedback);
	    }
    };
}])

.controller('DishDetailController', ['$scope', '$stateParams', 'dish', 'menuFactory', 'favoriteFactory', 'baseURL', '$ionicPopover', '$ionicModal', '$cordovaLocalNotification', '$cordovaToast', function ($scope, $stateParams, dish, menuFactory, favoriteFactory, baseURL, $ionicPopover, $ionicModal, $cordovaLocalNotification, $cordovaToast) {	

	$scope.baseURL = baseURL;
    
    $scope.dish = dish;
    
    $scope.showDish = true;
    $scope.message="Loading ...";
        
    // load popover
    
	 $ionicPopover.fromTemplateUrl('templates/dish-detail-popover.html', {
		    scope: $scope
		  }).then(function(popover) {
		    console.log ('popover loaded');
		    $scope.dishDetailsPopover = popover; // set popover to scope
		  });

    // showActions

    // usage of event taken from here -- don't know why it's needed or is it needed at all
    // http://ionicframework.com/docs/api/service/$ionicPopover/
    $scope.showActions = function ($event) {
        console.log ('show actions');
        $scope.dishDetailsPopover.show($event); // show details popover
    }
    
    // addFavorites
    $scope.addFavorites = function (index) {
        console.log ('add favorites : '+index);
        $scope.dishDetailsPopover.hide(); // hide details popover after adding
        favoriteFactory.addToFavorites(index);
        
        // week 4.2
        // TODO: Show notification
        // http://ngcordova.com/docs/plugins/localNotification/
        // ionic plugin add https://github.com/katzer/cordova-plugin-local-notifications.git
        $cordovaLocalNotification.schedule({
            id: 1,
            title: 'Favorites',
            text: 'Added to facorites : '+index
          }).then(function (result) {
            // shown
          });
        
        };
        
        // week 4.2
        // TODO: Toast
        // http://ngcordova.com/docs/plugins/toast/
        // cordova plugin add https://github.com/EddyVerbruggen/Toast-PhoneGap-Plugin.git
        $cordovaToast.showLongBottom('Added to facorites : '+index).then(function(success) {
            // success
          }, function (error) {
            // error
          });      
        
    }
    
    // load modal
                                     
    $ionicModal.fromTemplateUrl('templates/dish-comment.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.dishRatingModal = modal; // 
    });
                                     
    // addComment
    $scope.addComment = function (index) {
        console.log ('add comment : '+index);
        
        $scope.mycomment = {rating:5, comment:"", author:"", date:""}; // initialize with default values
        $scope.dishDetailsPopover.hide(); // close popover before opening rating
        $scope.dishRatingModal.show(); // show rating modal
    }

  $scope.cancelComment = function(index) {
        console.log ('cancel comment : '+index);
        $scope.dishRatingModal.hide(); // close rating modal after cancel    
  };
                                     
}])

.controller('DishCommentController', ['$scope', 'menuFactory', 'baseURL', function($scope, menuFactory, baseURL) {
	
    $scope.baseURL = baseURL;
    $scope.mycomment = {rating:5, comment:"", author:"", date:""};

    $scope.submitComment = function () {
        
        // save
        $scope.mycomment.date = new Date().toISOString();
        $scope.dish.comments.push($scope.mycomment);
        menuFactory.update({id:$scope.dish.id},$scope.dish);
        $scope.dishRatingModal.hide();  // close rating modal after save

        console.log("Comment saved :"+$scope.mycomment);
        
        // cleanup for next
        $scope.mycomment = {rating:5, comment:"", author:"", date:""}; // initialize with default values
    }
    
            
}])

.controller('IndexController', ['$scope', 'dish', 'promotion', 'leader', 'baseURL', function($scope, dish, promotion, leader, baseURL) {
                                
    $scope.baseURL = baseURL;

    $scope.leader = leader;
    $scope.promotion = promotion;
    $scope.dish = dish;

    $scope.showDish = true;
}])

.controller('AboutController', ['$scope', 'leaders', 'baseURL', function($scope, leaders, baseURL) {

    $scope.baseURL = baseURL;
    
	$scope.leaders = leaders;	
}])

.controller('FavoritesController', ['$scope', 'dishes', 'favorites', 'favoriteFactory', 'baseURL', '$ionicListDelegate', '$ionicPopup', '$ionicLoading', '$timeout', '$cordovaVibration', function ($scope, dishes, favorites, favoriteFactory, baseURL, $ionicListDelegate, $ionicPopup, $ionicLoading, $timeout, $cordovaVibration) {

	$scope.baseURL = baseURL;
    $scope.shouldShowDelete = false;
    
    $scope.favorites = favorites;
    $scope.dishes = dishes;
    
    console.log($scope.dishes, $scope.favorites);
    
    $scope.toggleDelete = function () {
        $scope.shouldShowDelete = !$scope.shouldShowDelete;
        console.log($scope.shouldShowDelete);
    }
    
    $scope.deleteFavorite = function (index) {

        var confirmPopup = $ionicPopup.confirm({
            title: 'Confirm Delete',
            template: 'Are you sure you want to delete this item?'
        });

        confirmPopup.then(function (res) {
            if (res) {
                console.log('Ok to delete');
                favoriteFactory.deleteFromFavorites(index);
                
                // week 4.3
                // TODO: Vibrate
                // http://ngcordova.com/docs/plugins/vibration/
                // cordova plugin add cordova-plugin-vibration
                $cordovaVibration.vibrate(100);
                
            } else {
                console.log('Canceled delete');
            }
        });
        
        $scope.shouldShowDelete = false;
    }
    
}])

.filter('favoriteFilter', function () {

	return function (dishes, favorites) {
        var out = [];
        for (var i = 0; i < favorites.length; i++) {
            for (var j = 0; j < dishes.length; j++) {
                if (dishes[j].id === favorites[i].id)
                    out.push(dishes[j]);
            }
        }
        return out;
    }

});

;
