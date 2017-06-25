function showMyTracks(userId) {
    var resultsDiv = document.getElementById('results');
    if(!myTracks || myTracks.length == 0){
            resultsDiv.innerHTML = "<div style=\"text-align:center\">You have no tracks</div>";
        }
        else {
            var html = "<div class=\"result-box\">";
            myTracks.forEach(function (item){
                html += getMyTracksTemplate(item);
            })
            html += "</div>";

            resultsDiv.innerHTML = html;
        }
}

function addToMyTracks(caller, trackId, trackName) {
    var userId = localStorage.getItem('user-id');
    caller.innerHTML = 'ADDING TRACK...';
    caller.disabled = true;
    caller.onclick = "";
    
    makeHTTPRequest('/user/tracks/add?trackId=' + trackId + '&userId=' + userId, 'POST', function (responseText){
        myTracks.push({track_id : trackId, name : trackName });
        caller.innerHTML = '<span class=\"fa fa-check-circle\"></span> ADDED';
    })
}

function removeTrack(caller, trackId) {
    var userId = localStorage.getItem('user-id');
    caller.innerHTML = '...';
    makeHTTPRequest('/user/tracks/remove?trackId=' + trackId + '&userId=' + userId, 'POST', function (responseText){
        var track = myTracks.filter(function (t){ return t.track_id == trackId })[0];
        if(track != null){
            caller.parentNode.parentNode.removeChild(caller.parentNode);
            var trackIndex = myTracks.indexOf(track);
            myTracks.splice(trackIndex, 1);
        }
    })
}