'use strict';

/**
 * Route configuration for the RDash module.
 */
angular.module('RDash').config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {

        // For unmatched routes
        $urlRouterProvider.otherwise('/');

        // Application routes
        $stateProvider
            .state('index', {
                url: '/',
                templateUrl: 'templates/home.html'
            })
            .state('bookdriver', {
                url: '/bookdriver',
                templateUrl: 'templates/bookdriver.html'
            })
            .state('bookings', {
                url: '/bookings',
                templateUrl: 'templates/bookings.html'
            })
            .state('pricedetails', {
                url: '/pricedetails',
                templateUrl: 'templates/pricedetails.html'
            })
            .state('userguide', {
                url: '/userguide',
                templateUrl: 'templates/userguide.html'
            })
            .state('contactus', {
                url: '/contactus',
                templateUrl: 'templates/contactus.html'
            })
            .state('terms', {
                url: '/terms',
                templateUrl: 'templates/terms.html'
            })
            .state('privacy', {
                url: '/privacy',
                templateUrl: 'templates/privacy.html'
            })
            .state('changepassword', {
                url: '/changepassword',
                templateUrl: 'templates/changepassword.html'
            });
    }
]);