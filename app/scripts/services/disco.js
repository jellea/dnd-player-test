'use strict';

angular.module('playerApp')
  .service('disco', function disco($rootScope, $localStorage) {

    var disco = {
      theka: [],
      add: function(tags, path, file){
        var exist = disco.theka.filter(function (i) {
          if (i.path == path){
            return i;
          }
        });
        if (exist.length > 0) {
          disco.theka.map(function (i) {
            if (i.path == path){
              if (typeof i.artist == "undefined" && typeof i.title == "undefined") {
                i.artist = tags.artist;
                i.title = tags.album;
              }
              i.tracks.push({title: tags.title, file:file});
            }
          });
        }else{
          disco.theka.push({
            title: tags.album,
            artist: tags.artist,
            path: path,
            tracks: [{title: tags.title, file:file}]
          });
        }
        $rootScope.$broadcast('newtrackadded');
      }
    }
    return disco;
  });
