'use strict';

angular.module('playerApp')
.factory('dndfiles', function ($document, $rootScope, disco) {
  // Service logic
  // ...

  function DnDFileController(onDropCallback) {
    var el_ = document.documentElement;

    this.dragenter = function(e) {
      e.stopPropagation();
      e.preventDefault();
      el_.classList.add('dropping');
    };

    this.dragover = function(e) {
      e.stopPropagation();
      e.preventDefault();
    };

    this.dragleave = function(e) {
      e.stopPropagation();
      e.preventDefault();
      //el_.classList.remove('dropping');
    };

    this.drop = function(e) {
      e.stopPropagation();
      e.preventDefault();

      el_.classList.remove('dropping');
      onDropCallback(e.dataTransfer.files, e);
      return false;
    };

    el_.addEventListener('dragenter', this.dragenter, false);
    el_.addEventListener('dragover', this.dragover, false);
    el_.addEventListener('dragleave', this.dragleave, false);
    el_.addEventListener('drop', this.drop, false);
  };

  var dnd = new DnDFileController(function(files, e) {
    var items = e.dataTransfer.items;
    dirRead(items, function(result){
      $rootScope.$broadcast('file-Drop', result);
    });
  });

  var asynccounter = 0

  // TODO needs to be put in a worker and ID3v2 + ID4 support
  var getTags = function (file) {
    file.file(function (fileObject) {

      var parentFolder = file.fullPath.split('/')[file.fullPath.split('/').length-2];

      if(fileObject.type == 'audio/mp3'){
        var arrayBufferReader = new FileReader();

        arrayBufferReader.onload = function(e) {
          var dv = new jDataView(this.result);

          if (dv.getString(3, dv.byteLength - 128) == 'TAG') {
            var tags = {
              title : dv.getString(30, dv.tell()),
              artist: dv.getString(30, dv.tell()),
              album: dv.getString(30, dv.tell()),
              year: dv.getString(4, dv.tell())
            }
            disco.add(tags, parentFolder, fileObject);
          } else{
            // no ID3v1 data found.
          }
        };

        arrayBufferReader.readAsArrayBuffer(fileObject);
      }
      else if (fileObject.type.split('/')[0] == 'image')
      {
        var dataUrl = new FileReader();
        dataUrl.onload = (function (e) {
          var exist = disco.theka.filter(function (i) {if(i.path==parentFolder)return i});
          if (exist.length==0){
            disco.theka.push({albumart:e.target.result, path: parentFolder, tracks: []});
          }else{}
        });
        dataUrl.readAsDataURL(fileObject);
      }
      else
      {
        // unknown files
      }
    })
  }

  var dirRead = function(entries, callback){
    var entries = entries

    var errorHandler = function(error){console.log(error)};

    var readPath = function(path){
      if(path.isDirectory){
        var dirReader = path.createReader();

        dirReader.readEntries(function(results)
            {
              for (var i = 0; i < results.length; ++i)
              {
                readPath(results[i]);
              };
            }, errorHandler);
      }else{

        getTags(path);
      }
    }

    for (var i = 0; i < entries.length; ++i) {
      readPath(entries[i].webkitGetAsEntry());
    }

  };

  // Public API here
  return {
    dnd: dnd,
    dirRead: dirRead
  };
});
