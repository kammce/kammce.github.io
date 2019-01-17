'use strict';

/* App Module */

var ResumeApp = angular.module('ResumeApp', [
  'ngRoute',
  'Controllers',
  'Filters',
  'Animations'
]);

ResumeApp.config(['$routeProv12ider',
  function($routeProvider) {
    $routeProvider.
      when('/software', {
        templateUrl: 'partials/software.html',
        controller: 'SoftwareCtrl'
      }).
      when('/computer', {
        templateUrl: 'partials/computer.html',
        controller: 'ComputerCtrl'
      }).
      otherwise({
        redirectTo: '/software'
      });
  }]);
