var optionsModal = document.getElementById('options-modal');

function showSearchItemOptions(videoId, title){
    var optionsContent = document.getElementById('options-content');

    var html = "<div style=\"padding:7px;text-align:center;background:#4285f4;color:white;font-weight:bold\">"
                + title
            + "</div>"
            + "<div onclick=\"playFromOptionsModal('" + videoId + "','" + title + "')\" style=\"cursor:pointer;padding:7px;text-align: center;border-bottom:1px solid lightgray\">"
                + "PLAY SONG"
            + "</div>"
            + "<div onclick=\"addToNowPlayingFromOptionsModal('" + videoId + "','" + title + "')\" style=\"cursor:pointer;padding:7px;text-align: center;border-bottom:1px solid lightgray\">"
                + "ADD TO 'NOW PLAYING'"
            + "</div>"
            + "<div onclick=\"hideOptions()\" style=\"cursor:pointer;padding:7px;text-align: center;background:#eee;border:lightgray\">"
                + "Cancel"
            + "</div>";
    
    optionsContent.innerHTML = html;
    
    optionsModal.style.display = "";
}

function showMyTrackItemOptions(videoId, title){
    var optionsContent = document.getElementById('options-content');

    var html = "<div style=\"padding:7px;text-align:center;background:#4285f4;color:white;font-weight:bold\">"
                + title
            + "</div>"
            + "<div onclick=\"playFromOptionsModal('" + videoId + "','" + title + "')\" style=\"cursor:pointer;padding:7px;text-align: center;border-bottom:1px solid lightgray\">"
                + "PLAY SONG"
            + "</div>"
            + "<div onclick=\"addToNowPlayingFromOptionsModal('" + videoId + "','" + title + "')\" style=\"cursor:pointer;padding:7px;text-align: center;border-bottom:1px solid lightgray\">"
                + "ADD TO 'NOW PLAYING'"
            + "</div>"
            + "<div onclick=\"hideOptions()\" style=\"cursor:pointer;padding:7px;text-align: center;background:#eee;border:lightgray\">"
                + "Cancel"
            + "</div>";
    
    optionsContent.innerHTML = html;
    
    optionsModal.style.display = "";
}

function hideOptions(){
    optionsModal.style.display = "none";
}


function playFromOptionsModal(videoId, title){
    hideOptions();
    play(videoId, title);
}

function addToNowPlayingFromOptionsModal(videoId, title){
    hideOptions();
    addToNowPlaying(videoId, title);
}

function removeTrackFromOptionsModal(caller, videoId){
    hideOptions();
    removeTrack(caller, videoId);
}