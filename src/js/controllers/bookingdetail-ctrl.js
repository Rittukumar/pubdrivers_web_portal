
angular.module('RDash')
    .controller('BookingDetailCtrl', ['$scope', '$cookieStore','$http', BookingDetailCtrl]);


function BookingDetailCtrl($scope, $cookieStore,$http) {
    $scope.bookingDetailObj ={};
    
    $scope.loadBookingDetails = function()
    {
        $scope.bookingDetailObj = $cookieStore.get('bookingDetailObj');
    }

    $scope.loadBookingDetails();
}