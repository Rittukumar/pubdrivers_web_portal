
angular.module('RDash')
    .controller('BookingCtrl', ['$scope', '$cookieStore','$http', BookingCtrl]);


function BookingCtrl($scope, $cookieStore,$http) {
    $scope.publist = {};
    $scope.transtype=1;
    $scope.master = {};
    $scope.alerts ={};
    $scope.userId = $cookieStore.get('userId');
    $scope.pubList = function()
        {
            alert(" == Loading the pub list 1== ");
            $http.get('http://52.220.4.248/adminportal/public/v1/master/getPubs').
            success(function(data)
            {
                $scope.publist = data;
            }).error(function (data) {
                  $scope.alerts = [{
                        type: 'danger',
                        msg: 'Error occured while loading the pub detail. Please contact the administrator'
                    }];
            });
        }
    //$cookieStore.get('userId') 
    //$cookieStore.put('user', credentials.email);
    $scope.pubList();

    $scope.bookingRequest = function()
        {
            var acceptTerm = 0;
            if($scope.acceptterms)acceptTerm=1;
            if((typeof $scope.selectedOption ==  "undefined") || $scope.selectedOption == null) {
                    $scope.alerts = [{
                        type: 'danger',
                        msg: 'Please select the pub name.'
                    }];
            }else if($scope.cartype == "0"){
                    $scope.alerts = [{
                        type: 'danger',
                        msg: 'Please select the car type.'
                    }];
            }else if(acceptTerm == 0){
                    $scope.alerts = [{
                        type: 'danger',
                        msg: 'Please accept the terms & conditions.'
                    }];
            }else{
                    //$http.post('http://52.220.4.248/adminportal/public/v1/customer/sendBookingRequest' 
                    $http.post('http://localhost:8000/v1/customer/sendBookingRequest'
                    ,{
                            data: {
                                customer_id: "11", //$scope.userId
                                pub_id: $scope.selectedOption.id,
                                transmission_id: $scope.transtype,
                                car_type_id: $scope.cartype,
                                terms_and_cond_accepted: acceptTerm,
                                device_id: "webportal"
                            },
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded'
                            }
                      })
                    .success(function(data)
                    {
                        alert("inside success block");
                        alert(data);
                       $scope.alerts = [{
                            type: 'success',
                            msg: 'Wow!! You have successully booked the driver. Your booking referece number is [TODO]. We will get back to you with the driver details shortly. Thankyou!'
                        }];
                        $scope.selectedOption=null;
                        $scope.transtype = 1;
                        $scope.cartype = 0;
                        $scope.acceptterms = false;

                    }).error(function (data) {
                         alert("Inside error block" + data );
                         $scope.alerts = [{
                            type: 'danger',
                            msg: 'Opps.. We are not able to process your request right now. Please try again later.'
                        }];
                    }); 
                }
        }

        $scope.closeAlert = function(index) {
            $scope.alerts.splice(index, 1);
        };

}


