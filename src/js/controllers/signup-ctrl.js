
angular.module('RDash')
    .controller('SignupCtrl', ['$scope', '$cookieStore','$http', SignupCtrl]);


function SignupCtrl($scope, $cookieStore,$http) {
    $scope.alerts ={};
    //$cookieStore.get('userId') 
    //$cookieStore.put('user', credentials.email);
    $scope.signup = function()
        { 
            if((typeof $scope.name ==  "undefined") || $scope.name == null){
                    $scope.alerts = [{
                        type: 'danger',
                        msg: 'Please enter your name.'
                    }];
            }else if((typeof $scope.email ==  "undefined") || $scope.email == null){
                    $scope.alerts = [{
                        type: 'danger',
                        msg: 'Please enter your email id.'
                    }];
            }else if((typeof $scope.phone ==  "undefined") || $scope.phone == null){
                    $scope.alerts = [{
                        type: 'danger',
                        msg: 'Please enter your phone number.'
                    }];
            }else if((typeof $scope.password ==  "undefined") || $scope.password == null){
                    $scope.alerts = [{
                        type: 'danger',
                        msg: 'Please enter your password.'
                    }];
            }else if((typeof $scope.confirmpassword ==  "undefined") || $scope.confirmpassword == null){
                    $scope.alerts = [{
                        type: 'danger',
                        msg: 'Please enter confirm password.'
                    }];
            }else if($scope.confirmpassword != $scope.password){
                    $scope.alerts = [{
                        type: 'danger',
                        msg: 'Confirm password is not matching with entered password.'
                    }];
            }else{
                    //$http.post('http://52.220.4.248/adminportal/public/v1/customer/sendBookingRequest' 
                    $http.post('http://localhost:8000/v1/customer/signup'
                    ,{
                            data: {
                                name: $scope.name,
                                email: $scope.email,
                                phone: $scope.phone,
                                password: $scope.password
                            },
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded'
                            }
                      })
                    .success(function(data)
                    {

                        if(data.code == 200){
                            $cookieStore.put('userId', data.customer.id);
                            $cookieStore.put('userName', data.customer.name);
                            $cookieStore.put('userEmail', data.customer.email);
                            location.reload();
                        }else if(data.code == 401){
                            $scope.alerts = [{
                                type: 'danger',
                                msg: 'User exits with given email id and phone number'
                            }];   
                        }else{
                            $scope.alerts = [{
                                type: 'danger',
                                msg: 'Error occured while signup.'
                            }];    
                        }
                        location.href = "#";

                    }).error(function (data) {
                         alert("Inside error block" + data );
                         $scope.alerts = [{
                            type: 'danger',
                            msg: 'Opps.. We are not able to process your request for signup. Please try again later.'
                        }];
                    }); 
                }
        }

        $scope.closeAlert = function(index) {
            $scope.alerts.splice(index, 1);
        };

}


