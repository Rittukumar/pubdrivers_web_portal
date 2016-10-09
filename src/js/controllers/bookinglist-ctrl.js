
angular.module('RDash')
    .controller('BookingListCtrl', ['$scope', '$cookieStore','$http', BookingListCtrl]);


function BookingListCtrl($scope, $cookieStore,$http) {
    $scope.getBookingList ={};
    $scope.currentUserPage = 1;
    $scope.userId = $cookieStore.get('userId');

    $scope.loadBookingList = function()
        {
            //$http.get('http://52.220.4.248/adminportal/public/v1/customer/allbookingStatus/11').
            $http.get('http://localhost:8000/v1/customer/allbookingStatus/'+$scope.userId+'?page='+$scope.currentUserPage).
            success(function(data)
            {
                $scope.getBookingList = data.data;
                $scope.paginationTotal = data.total;
                $scope.totalPage = data.last_page;
            }).error(function (data) {
                  $scope.alerts = [{
                        type: 'danger',
                        msg: 'Error occured while loading the pub detail. Please contact the administrator'
                    }];
            });
        }

        $scope.pageChanged = function (pageNum) {
            $scope.currentUserPage=pageNum;
            //alert('Page changed to: ' + pageNum);
            $scope.loadBookingList();
        };

    $scope.loadBookingList();

    $scope.getNumber = function(num) {
            return new Array(num);   
    }

     $scope.showDetailBookingStatus = function(bookingObj) {
            $cookieStore.remove('bookingDetailObj');
            $cookieStore.put('bookingDetailObj',bookingObj);
            location.href="#/bookingdetails";
    }
}


