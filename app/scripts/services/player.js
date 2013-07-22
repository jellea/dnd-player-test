'use strict';

angular.module('playerApp')
  .factory('player', function player(audio, $rootScope) {
    var player,
        playlist = [],
        paused = false,
        current = {
          album: 0,
          track: 0
        };

    player = {
      playlist: playlist,

      current: current,

      playing: false,

      play: function(track, album) {
        if (!playlist.length) return;

        if (angular.isDefined(track)) current.track = track;
        if (angular.isDefined(album)) current.album = album;

        var dataUrlReader = new FileReader();
        player.playing = true;
        dataUrlReader.onload = function(e) {
          audio.src = e.target.result;
          audio.play();
          paused = false;
        };
        dataUrlReader.readAsDataURL(playlist[current.album].tracks[current.track].file);
      },

      pause: function() {
        if (player.playing) {
          audio.pause();
          player.playing = false;
          paused = true;
        }
      },

      reset: function() {
        player.pause();
        current.album = 0;
        current.track = 0;
      },

      next: function() {
        if (!playlist.length) return;
        paused = false;
        if (playlist[current.album].tracks.length > (current.track + 1)) {
          current.track++;
        } else {
          current.track = 0;
          current.album = (current.album + 1) % playlist.length;
        }
        if (player.playing) player.play();
      },

      previous: function() {
        if (!playlist.length) return;
        paused = false;
        if (current.track > 0) {
          current.track--;
        } else {
          current.album = (current.album - 1 + playlist.length) % playlist.length;
          current.track = playlist[current.album].tracks.length - 1;
        }
        if (player.playing) player.play();
      }
    };

    playlist.add = function(album) {
      if (playlist.indexOf(album) != -1) return;
      playlist.push(album);
    };

    playlist.remove = function(album) {
      var index = playlist.indexOf(album);
      if (index == current.album) player.reset();
      playlist.splice(index, 1);
    };

    audio.addEventListener('ended', function() {
      $rootScope.$apply(player.next);
    }, false);

    return player;
  });
