'use strict';

describe('Service: audio', function () {

  // load the service's module
  beforeEach(module('playerApp'));

  // instantiate service
  var audio;
  beforeEach(inject(function (_audio_) {
    audio = _audio_;
  }));

  it('should do something', function () {
    expect(!!audio).toBe(true);
  });

  it('should create and return html5 audio element', inject(function(audio) {
    expect(audio.nodeName).toBe('AUDIO');
  }));

});
