var nowPlaying = [];
var nowPlayingListDiv = document.getElementById('now-playing-list');

window.onload = loadNowPlaying;

function loadNowPlaying(){
    var npText = localStorage.getItem('now-playing');

    if(npText){
        nowPlaying = JSON.parse(npText);
        
        var html = "";
        
        nowPlaying.forEach(function (song){
            html += getNowPlayingSongTemplate(song.songId, song.songName);
        });

        nowPlayingListDiv.innerHTML = html;
    }
}

function addToNowPlaying(songId, songName, callback){
    var song = nowPlaying.filter(function (song) { return song.songId == songId })[0];

    if (song == null){
        nowPlaying.push({ songId : songId, songName : songName });
        localStorage.setItem('now-playing', JSON.stringify(nowPlaying));

        nowPlayingListDiv.innerHTML += getNowPlayingSongTemplate(songId, songName);
    };
    if(callback) callback();
}

function removeFromNowPlaying(caller, songId) {
    var song = nowPlaying.filter(function (song) { return song.songId == songId })[0];

    if(song){
        var songIndex = nowPlaying.indexOf(song);
        nowPlaying.splice(songIndex, 1);
        localStorage.setItem('now-playing', JSON.stringify(nowPlaying));
    }

    caller.parentNode.parentNode.removeChild(caller.parentNode);
}

function playNextSong(songId){
    var song = nowPlaying.filter(function (song) { return song.songId == songId })[0];

    if(song){
        var npPlayBtn = document.getElementById(songId + '-np-play-btn');

        npPlayBtn.style.color = "white";
        npPlayBtn.innerHTML = "<span class=\"fa fa-play\"></span></a>";

        var songIndex = nowPlaying.indexOf(song);

        if(songIndex == (nowPlaying.length - 1)){
            songIndex = -1;
        }

        var nextSong = nowPlaying[songIndex + 1];
        play(nextSong.songId, nextSong.songName);
    }
    else{
        var nextSong = nowPlaying[0];
        play(nextSong.songId, nextSong.songName);
    }
}

function playPreviousSong(songId){
    var song = nowPlaying.filter(function (song) { return song.songId == songId })[0];

    if(song){
        var npPlayBtn = document.getElementById(songId + '-np-play-btn');

        npPlayBtn.style.color = "white";
        npPlayBtn.innerHTML = "<span class=\"fa fa-play\"></span></a>";
        var songIndex = nowPlaying.indexOf(song);

        if(songIndex == 0){
            songIndex = nowPlaying.length;
        }

        var previousSong = nowPlaying[songIndex - 1];

        play(previousSong.songId, previousSong.songName);
    }
    else{
        var previousSong = nowPlaying[0];

        play(previousSong.songId, previousSong.songName);
    }
}

function toggleNowPlayingList(){
    if(nowPlayingListDiv.style.display == "none"){
        nowPlayingListDiv.style.display = "";
    }
    else{
        nowPlayingListDiv.style.display = "none";
    }
}