'use strict';

angular.module('playerApp')
  .factory('audio', function audio($document) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var audio = $document[0].createElement('audio');
    return audio;
  });
