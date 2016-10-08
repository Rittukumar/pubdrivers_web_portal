
angular.module('RDash')
    .controller('ChangepasswordCtrl', ['$scope', '$cookieStore','$http', ChangepasswordCtrl]);


function ChangepasswordCtrl($scope, $cookieStore,$http) {
    $scope.alerts ={};
    $scope.userId = $cookieStore.get('userId');
    //$cookieStore.get('userId') 
    //$cookieStore.put('user', credentials.email);
    $scope.changepassword = function()
        { 
            if((typeof $scope.oldpassword ==  "undefined") || $scope.oldpassword == null){
                    $scope.alerts = [{
                        type: 'danger',
                        msg: 'Please enter the old password.'
                    }];
            }else if((typeof $scope.newpassword ==  "undefined") || $scope.newpassword == null){
                    $scope.alerts = [{
                        type: 'danger',
                        msg: 'Please enter the new password.'
                    }];
            }else if((typeof $scope.confirmpassword ==  "undefined") || $scope.confirmpassword == null){
                    $scope.alerts = [{
                        type: 'danger',
                        msg: 'Please enter the confirm password.'
                    }];
            }else if($scope.newpassword != $scope.confirmpassword){
                    $scope.alerts = [{
                        type: 'danger',
                        msg: 'New password and confirm password doesnt match.'
                    }];
            }else{
                    //$http.post('http://52.220.4.248/adminportal/public/v1/customer/sendBookingRequest' 
                    $http.post('http://localhost:8000/v1/customer/changepassword'
                    ,{
                            data: {
                                customerid: "12", //$scope.userId
                                current_password: $scope.oldpassword,
                                new_password: $scope.newpassword,
                                confirm_password: $scope.confirmpassword
                            },
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded'
                            }
                      })
                    .success(function(data)
                    {
                        alert("inside success block");
                        alert(data);
                        /*if(success){

                        }else{

                        }*/
                        $scope.alerts = [{
                            type: 'success',
                            msg: 'Your password has been changed successfully.'
                        }];

                    }).error(function (data) {
                         alert("Inside error block" + data );
                         $scope.alerts = [{
                            type: 'danger',
                            msg: 'Opps.. Error occured while changing the password. Please try again later.'
                        }];
                    }); 
                }
        }

        $scope.closeAlert = function(index) {
            $scope.alerts.splice(index, 1);
        };

}


