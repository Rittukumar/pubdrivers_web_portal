
angular.module('RDash')
    .controller('IndexCtrl', ['$scope', '$cookieStore','$http', IndexCtrl]);


function IndexCtrl($scope, $cookieStore,$http) {
    
    $scope.userName = $cookieStore.get('userName');
    if((typeof $scope.userName ==  "undefined") || $scope.userName == null){
        $scope.userName ="NA";
    }
    
    $scope.logout = function()
    {
        $cookieStore.remove('userName');
        $cookieStore.remove('userEmail');
        $cookieStore.remove('userPhone');
        location.reload(); 
    }


}


