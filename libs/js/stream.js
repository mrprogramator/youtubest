function play(videoId, fixedTitle) {
    var audio = document.getElementsByTagName('audio')[0];
    if(audio != null){
        var previousPB = document.getElementById(audio.getAttribute('songid') + '-np-play-btn');

        if(previousPB){
            previousPB.style.color = "white";
            previousPB.innerHTML = "<span class=\"fa fa-play\"></span></a>";
        }
    }

    var mediaURL = "/play?videoId=" + videoId + "&videoName=" + fixedTitle;
    document.getElementById('player').innerHTML = getNowPlayingTemplate(videoId, fixedTitle, mediaURL);
    
    addToNowPlaying(videoId, fixedTitle, function (){
        var npPlayBtn = document.getElementById(videoId + '-np-play-btn');

        npPlayBtn.style.color = "#4285f4";
        npPlayBtn.innerHTML = "<span class=\"fa fa-pause\"></span></a>";

        
    });
}

function downloadURI(uri, name) {
    var link = document.createElement("a");
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    delete link;
}

