
angular.module('RDash')
    .controller('BookingListCtrl', ['$scope', '$cookieStore','$http', BookingListCtrl]);


function BookingListCtrl($scope, $cookieStore,$http) {
    $scope.getBookingList ={};
    $scope.currentUserPage = 1;
    $scope.maxSize = 5;
    $scope.bookingListPagination = {};

    $scope.loadBookingList = function()
        {
            //$http.get('http://52.220.4.248/adminportal/public/v1/customer/allbookingStatus/11').
            $http.get('http://localhost:8000/v1/customer/allbookingStatus/11?page='+$scope.currentUserPage).
            success(function(data)
            {
                alert("Inside success");
                $scope.getBookingList = data.data;
                /*$scope.bookingListPagination = data.meta.pagination;*/
                $scope.paginationTotal = data.total;
                alert($scope.paginationTotal);

            }).error(function (data) {
                  $scope.alerts = [{
                        type: 'danger',
                        msg: 'Error occured while loading the pub detail. Please contact the administrator'
                    }];
            });
        }

        $scope.pageChanged = function () {
            alert('Page changed to: ' + $scope.currentUserPage);
            $scope.loadBookingList();
        };

    $scope.loadBookingList();



}


