 (function() {
     function SongPlayer($rootScope, Fixtures) {

          var SongPlayer = {};
          var currentAlbum = Fixtures.getAlbum();


/**
* @desc Buzz object audio file
* @type {Object}
*/
         var currentBuzzObject = null;


/**
 * @function setSong
 * @desc Stops currently playing song and loads new audio file as currentBuzzObject
 * @param {Object} song
 */
        var setSong = function(song) {
			    if (currentBuzzObject) {
			        currentBuzzObject.stop();
			        SongPlayer.currentSong.playing = null;
			    }
			 
			    currentBuzzObject = new buzz.sound(song.audioUrl, {
			        formats: ['mp3'],
			        preload: true
			    });

			    currentBuzzObject.bind('timeupdate', function() {
			    	$rootScope.$apply(function() {
			    		SongPlayer.currentTime = currentBuzzObject.getTime();
			    	});
			    });

		    SongPlayer.currentSong = song;

		 };

 /**
 * @function playSong
 * @desc plays the song

 */
		var playSong = function(song) {
		 	currentBuzzObject.play();
		 	song.playing = true;
		 };



		 var stopSong = function(song) {
		 	currentBuzzObject.stop();
		 	song.playing = null;
		 };

		var getSongIndex = function(song) {
		 	return currentAlbum.songs.indexOf(song);
		 };



		 /**
* @desc current song
* @type {Object}
*/
        SongPlayer.currentSong = null;

          /**
 * @desc Current playback time (in seconds) of currently playing song
 * @type {Number}
 */
 		SongPlayer.currentTime = null;

/**
 * @function play songPlayer
 * @desc plays song
 * @param {Object} song
 */	

	    SongPlayer.play = function(song) {
	    	song = song || SongPlayer.currentSong;
	     	if (SongPlayer.currentSong!== song) {
	     		setSong(song);
	         	playSong(song); 
	         } else if(song === null) {
	         	setSong(currentAlbum.songs[0]);
	         	playSong(currentAlbum.songs[0]); 

	         } else if (SongPlayer.currentSong === song) {
	     		if (currentBuzzObject.isPaused()) {
	     			playSong(song);
	     		}
	     	} 
	     };
/**
 * @function pause songPlayer
 * @desc pauses song
 * @param {Object} song
 */	
	     
		SongPlayer.pause = function(song) {
			song = song || SongPlayer.currentSong;
		     currentBuzzObject.pause();
		     song.playing = false;
		 };
     
 
		 SongPlayer.previous = function() {
		 	var currentSoundIndex = getSongIndex(SongPlayer.currentSong);
		 	currentSoundIndex--;

		 	if(currentSoundIndex < 0) {
		 		 stopSong(SongPlayer.currentSong);
		 	} else {
		 		var song = currentAlbum.songs[currentSoundIndex];
		 		setSong(song);
		 		playSong(song);
		 	}
		 };

		 SongPlayer.next = function() {
		 	var currentSoundIndex = getSongIndex(SongPlayer.currentSong);
		 	currentSoundIndex++;

		 	if(currentSoundIndex > currentAlbum.songs.length-1) {
		 		stopSong(SongPlayer.currentSong);
		 	} else {
		 		var song = currentAlbum.songs[currentSoundIndex];
		 		setSong(song);
		 		playSong(song);
		 	}
		 };

		 /**
		 * @function setCurrentTime
		 * @desc Set current time (in seconds) of currently playing song
		 * @param {Number} time
		 */
		 SongPlayer.setCurrentTime = function(time) {
		     if (currentBuzzObject) {
		         currentBuzzObject.setTime(time);
		     }
		 };
		 return SongPlayer;
     };

     angular
         .module('blocJams')
         .factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);

 })();



