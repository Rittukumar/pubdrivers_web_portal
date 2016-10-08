
angular.module('RDash')
    .controller('HomeCtrl', ['$scope', '$cookieStore','$http', HomeCtrl]);


function HomeCtrl($scope, $cookieStore,$http) {
    $scope.alerts1 ={};
    $scope.alerts2 ={};
    $scope.alerts3 ={};
    $scope.signup ={};
    $scope.forgotpasword = 0;

    $scope.userName = $cookieStore.get('userName');
    //$scope.loginuser="";
    //$scope.password="";
    //alert($scope.userName);

    //$cookieStore.get('userId') 
    //$cookieStore.put('user', credentials.email);

    $scope.signup = function(){
        location.href="#/signup";
    }

    $scope.signin = function(){
    alert($scope.signup.loginuser);

        if((typeof $scope.signup.loginuser ==  "undefined") || $scope.signup.loginuser == null){
                    $scope.alerts2 = [{
                        type: 'danger',
                        msg: 'Please enter the user name.'
                    }];
        }else if((typeof $scope.signup.password ==  "undefined") || $scope.signup.password == null){
                $scope.alerts2 = [{
                    type: 'danger',
                    msg: 'Please enter the password.'
                }];
        }else{
                //$http.post('http://52.220.4.248/adminportal/public/v1/customer/sendBookingRequest' 
                $http.post('http://localhost:8000/v1/customer/signin'
                ,{
                        data: {
                            cred: $scope.signup.loginuser,
                            password: $scope.signup.password
                        },
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        }
                  })
                .success(function(data)
                {
                    alert("Logged In successful!");
                    //alert(data);
                    /*if(success login){

                    }else{

                    }
*/                  $cookieStore.put('userName', 'TODO');
                    $cookieStore.put('userName', 'TODO');
                    $cookieStore.put('userEmail', 'TODO');
                    $cookieStore.put('userPhone', 'TODO');
                    //location.href = "#";
                    location.reload();

                }).error(function (data) {
                     alert("Inside error block" + data );
                     $scope.alerts2 = [{
                        type: 'danger',
                        msg: 'Error occured while login.'
                    }];
                }); 

        }
        
    }

    $scope.closeAlert1 = function(index) {
        $scope.alerts1.splice(index, 1);
    };

    $scope.closeAlert2 = function(index) {
        $scope.alerts2.splice(index, 1);
    };

    $scope.closeAlert3 = function(index) {
        $scope.alerts3.splice(index, 1);
    };

    $scope.bookdriver = function(){
        if((typeof $scope.userName ==  "undefined") || $scope.userName == null){
            $scope.alerts1 = [{
                        type: 'danger',
                        msg: 'You are not loged in currently. In order to book the driver and enjoy other services you need to login to pubdrivers. If you are a registered member please login or else please signup.'
                    }];
        }else{
            location.href="#/bookdriver";    
        }
    }

   $scope.showforgotpassword = function(){
         $scope.forgotpasword = 1;
    }

    $scope.closeforgotpassword = function(){
        $scope.forgotpasword = 0;
    }

    $scope.resetpassword = function(){
        alert($scope.signup.forgotpwduser);
        if((typeof $scope.signup.forgotpwduser ==  "undefined") || $scope.signup.forgotpwduser == null){
                    $scope.alerts3 = [{
                        type: 'danger',
                        msg: 'Please enter the email id.'
                    }];
        }else{
                //$http.post('http://52.220.4.248/adminportal/public/v1/customer/sendBookingRequest' 
                $http.post('http://localhost:8000/v1/customer/forgotpassword'
                ,{
                        data: {
                            email: $scope.signup.forgotpwduser
                        },
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        }
                  })
                .success(function(data)
                {
                    alert("Logged In successful!");
                    //alert(data);
                    /*if(success login){

                    }else{

                    }*/
                    $scope.alerts3 = [{
                        type: 'success',
                        msg: 'The password reset link has been sent to your registered email id.'
                    }];
                    $scope.signup.forgotpwduser ="";
                }).error(function (data) {
                     alert("Inside error block" + data );
                     $scope.alerts3 = [{
                        type: 'danger',
                        msg: 'Error occured while login.'
                    }];
                }); 

        }
      
    }

}


