'use strict';

angular.module('playerApp')
  .controller('PlaylistCtrl',
    function($scope, $rootScope, $http, player, disco, $localStorage) {
    $scope.player = player;
    $scope.albums = disco.theka;

    $rootScope.$on('newtrackadded', function refreshPlaylist() {
      console.log('newtrackadded');
      $scope.$apply();
    });
  });
