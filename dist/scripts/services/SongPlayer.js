 (function() {
     function SongPlayer(Fixtures) {

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

		 var getSongIndex = function(currentAlbum, song) {
		 	return currentAlbum.songs.indexOf(song);

		 };

		 var stopSong = function(song) {
		 	currentBuzzObject.stop();
		 	song.playing = null;

		 };

		 /**
* @desc current song
* @type {Object}
*/
          SongPlayer.currentSong = null;

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

          return SongPlayer;
     };
 
		 SongPlayer.previous = function() {
		 	var currentSoundIndex = getSongIndex(SongPlayer.currentSong);
		 	currentSoundIndex--;

		 	if(currentSoundIndex < 0) {
		 		 currentBuzzObject.stop();
		 		 SongPlayer.currentSong,playing = null;
		 	} else {
		 		var song = currentAlbum.songs[currentSoundIndex];
		 		setSong(song);
		 		playSong(song);
		 	}
		 };

		 SongPlayer.next = function() {
		 	var currentSoundIndex = getSongIndex(SongPlayer.currentSong);
		 	currentSoundIndex++;

		 	if(currentSoundIndex > currentAlbum.songs.length) {
		 		currentBuzzObject.stop();
		 		SongPlayer.currentSong,playing = null;
		 	} else {
		 		var song = currentAlbum.songs[currentSoundIndex];
		 		setSong(song);
		 		playSong(song);
		 	}
		 };

     angular
         .module('blocJams')
         .factory('SongPlayer', ['Fixtures', SongPlayer]);

 })();



