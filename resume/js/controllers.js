'use strict';

/* Controllers */

var Controllers = angular.module('Controllers', []);

Controllers.controller('SoftwareCtrl', ['$scope',
	function($scope) {
		$scope.test = "software";
		$scope.name = "Khalil A. Estell";
		$scope.logoURL = "img/logo-2014.png";
		$scope.logoStyle =  {
			height: '100px',
			marginTop: '30px'
		};
	}
]);

Controllers.controller('ComputerCtrl', ['$scope',
	function($scope) {
		$scope.test = "computer";
	}
]);
