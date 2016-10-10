'use strict';

angular.module('confusionApp')
    .controller('MenuController', ['$scope', 'menuFactory', function($scope, menuFactory) {            
        
    	$scope.tab = 1;
        $scope.filtText = '';
        $scope.showDetails = false;
                                
        $scope.showMenu = false;
        $scope.message = "Loading ...";
        
        menuFactory.getDishes().query(
            function(response) {
                $scope.dishes = response;
                $scope.showMenu = true;
            },
            function(response) {
                $scope.message = "Error: "+response.status + " " + response.statusText;
            });
                    
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

    .controller('FeedbackController', ['$scope', 'feedbackFactory', function($scope, feedbackFactory) {
        
        $scope.sendFeedback = function() {
            
            console.log($scope.feedback);
            
            if ($scope.feedback.agree && ($scope.feedback.mychannel == "")) {
                $scope.invalidChannelSelection = true;
                console.log('incorrect');
            } else {
            	
                // save new feedback object
                feedbackFactory.getFeedback().save($scope.feedback);

                $scope.invalidChannelSelection = false;
                $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
                $scope.feedback.mychannel="";
                $scope.feedbackForm.$setPristine();
                console.log($scope.feedback);
            }
        };
    }])
    
  .controller('DishDetailController', ['$scope', '$stateParams', 'menuFactory', function($scope, $stateParams, menuFactory) {
      $scope.dish = {};
      $scope.showDish = false;
      $scope.message="Loading ...";
      $scope.dish = menuFactory.getDishes().get({id:parseInt($stateParams.id,10)})
        .$promise.then(
          function(response){
              $scope.dish = response;
              $scope.showDish = true;
          },
          function(response) {
              $scope.message = "Error: "+response.status + " " + response.statusText;
          }
 		);        
   }])
    
    .controller('DishCommentController', ['$scope', 'menuFactory', function($scope,menuFactory) {

    	// list possible ratings for radio buttons
           $scope.ratings = [0,1,2,3,4,5];
 
        	var createEmptyComment = function  () {
        		// this variable is local and new is created each time when fuction is called 
        	var emptyComment = {
                    rating:5,
                    comment:"",
                    author:"",
                    date:""
                }
        	
        	// return fresh variable
        	return emptyComment;
    		
    	}
    	
        //Step 1: Create a JavaScript object to hold the comment from the form
    	$scope.newComment = createEmptyComment(); 
    	
        $scope.submitComment = function () {
            
            //Step 2: This is how you record the date
        	$scope.newComment.date = new Date().toISOString();
            
            // Step 3: Push your comment into the dish's comment array
            $scope.dish.comments.push($scope.newComment);

            // update existing dish 
            menuFactory.getDishes().update({id:$scope.dish.id},$scope.dish);
            
            //Step 4: reset your form to pristine
            // doesn't two way binding handle this automatically when we use $scope.newComment ?
            // so: I see this is needed only when form is not bound to object which is shared between controller and view
            $scope.commentForm.$setPristine();
            
            // show success in log
            console.log('Saved feedback from '+$scope.newComment.author);
            
            //Step 5: reset your JavaScript object that holds your comment
        	$scope.newComment = createEmptyComment(); 
        	
        }
    }])

   // implement the IndexController and About Controller here
    
  .controller('IndexController', ['$scope', 'corporateFactory', 'menuFactory', function($scope, corporateFactory, menuFactory) {

      $scope.showLeader = false;
	  
	  // get CEO (id=3)          
   	  $scope.leader = corporateFactory.getLeaders().get({id:3})
   	  	.$promise.then(
              function(response){
                  $scope.leader = response;
                  $scope.showLeader = true;
              },
              function(response) {
                  $scope.message = "Error: "+response.status + " " + response.statusText;
              }
	 		); 

      $scope.showPromotion = false;

      // get first promotion (id=0)
	  $scope.promotion = menuFactory.getPromotions().get({id:0})
 	  	.$promise.then(
                function(response){
                    $scope.promotion = response;
                    $scope.showPromotion = true;
                },
                function(response) {
                    $scope.message = "Error: "+response.status + " " + response.statusText;
                }
  	 		); 

	  $scope.showDish = false;
      $scope.message="Loading ...";
      
      // get dishes
      $scope.dish = menuFactory.getDishes().get({id:0})
      .$promise.then(
          function(response){
              $scope.dish = response;
              $scope.showDish = true;
          },
          function(response) {
              $scope.message = "Error: "+response.status + " " + response.statusText;
          }
      );
      
  }])

  .controller('AboutController', ['$scope', 'corporateFactory', function($scope, corporateFactory) {

      $scope.showLeaders = false;

      // get leaders
	  $scope.leaders = corporateFactory.getLeaders().query(
              function(response) {
                  $scope.leaders = response;
                  $scope.showLeaders = true;
              },
              function(response) {
                  $scope.message = "Error: "+response.status + " " + response.statusText;
              }
      	);    	  
  }]);
