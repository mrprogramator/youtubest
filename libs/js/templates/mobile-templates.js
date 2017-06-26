function getUserTemplate(user){
    return "<div style=\"height:25%;background:#1c1e27;color:white;background-image: url(/img/user-backg.jpg);background-size:cover\">"
                + "<table style=\"width:100%;height: 100%\">"
                    + "<tr>"
                        +"<td style=\"vertical-align:bottom\">"
                            + "<img src=\"" + user.image_url + "\" style=\"height:30px;border-radius:100%\" />"
                        +"</td>"
                        + "<td style=\"vertical-align:bottom;padding-left:7px;word-break:break-word\">"
                            + user.full_name
                            + "<br>" + user.email
                        +"</td>"
                    + "</tr>"
                + "</table>"
            + "</div>"
            + "<div style=\"height:75%;color: #332f2f\">"
                + "<div onclick=\"showMyTracks('" + user.token_id + "')\" style=\"padding:10px;font-size:1.2em;border-bottom:1px solid lightgray\">"
                    +"<span class=\"fa fa-music\"></span> MY TRACKS"
                + "</div>"
                + "<div onclick=\"hideSideMenu()\" style=\"padding:10px;font-size:1.2em;border-bottom:1px solid lightgray\">"
                    +"<span class=\"fa fa-mail-reply\"></span> HIDE MENU"
                + "</div>"
            +"</div>";
}

function getMyTracksTemplate(item){
    hideSideMenu();
    return "<div style=\"padding:14px 7px;border-bottom:1px solid lightgray\">"
            + "<table style=\"width:100%\">"
                + "<tr>"
                    + "<td style=\"width:30px\">"
                        + " <span class=\"fa fa-music\"></span/> "
                    +"</td>"
                    + "<td onclick=\"showMyTrackItemOptions('" + item.track_id + "','" + item.name + "')\">"
                        + item['name'] 
                    +"</td>"
                    + "<td style=\"width:30px\">"
                        + " <a style=\"background:transparent;border:1px solid gray;padding:3px 6px;border-radius:100%;cursor:pointer\" onclick=\"removeTrack(this, '" + item['track_id']+ "')\"><span class=\"fa fa-remove\"></span></a> "
                    +"</td>"
                +"</tr>"
            +"</table>"
        + "</div>";
}

function getSearchResultItemTemplate(item){
    var fixedTitle = item.snippet.title.replace(/["']/g, "");

    return "<tr>"
            + "<td>"
                + "<div class=\"result-box\">"
                    + "<table style=\"width:100%\">"
                        + "<tr onclick=\"showSearchItemOptions('" + item.id.videoId + "','" + fixedTitle + "')\">"
                            + "<td>"
                                + "<div>" 
                                    +item.snippet.title
                                +"</div>"
                            + "</td>"
                            + "<td style=\"text-align:right\">"
                                + "<img src=\"" + item.snippet.thumbnails.default.url + "\" style=\"cursor:pointer\"/>"
                            +"</td>"
                        + "</tr>"
                    +"</table>"
                + "</div>"
            +"</td>"
        +"</tr>";
}

function getNowPlayingTemplate(videoId, songTitle, songURL){
    var html = "<table style=\"width:100%\">"
                + "<tr>"
                   
                + "</tr>"
                + "<tr>"
                    + "<td>"
                        + "<div style=\"padding:14px;font-size:2em\">"
                            + "<a style=\"background:transparent;border:1px solid gray;padding:3px 6px;border-radius:100%;cursor:pointer\" onclick=\"playPreviousSong('" + videoId + "')\"><span class=\"fa fa-backward\"></span></a> "
                            + "<a style=\"background:transparent;border:1px solid gray;padding:3px 6px;border-radius:100%;cursor:pointer\" onclick=\"playNextSong('" + videoId + "')\"><span class=\"fa fa-forward\"></span></a>";
                            if(localStorage.getItem('user-id')){
                                if(myTracks.filter(function (t) { return t['track_id'] == videoId})[0] != null){
                                    html += " <a style=\"background:transparent;border:1px solid gray;padding:3px 6px;border-radius:100%;cursor:pointer\"><span class=\"fa fa-check-circle\"></span></a>";
                                }
                                
                                else{
                                    html += " <a style=\"background:transparent;border:1px solid gray;padding:3px 6px;border-radius:100%;cursor:pointer\" onclick=\"addToMyTracks(this, '" + videoId + "','" + songTitle + "')\"><span class=\"fa fa-plus-circle\"></span></a>";
                                    
                                }
                            }
                            html += "<a style=\"background:transparent;border:1px solid gray;padding:3px 6px;border-radius:100%;cursor:pointer\" onclick=\"downloadURI('" + songURL + "','" + songTitle + ".mp3')\"><span class=\"fa fa-download\"></span></a>"
                            + "<a style=\"float:right;background:transparent;border:1px solid gray;padding:3px 6px;border-radius:4px;cursor:pointer\" onclick=\"toggleNowPlayingList()\"><span class=\"fa fa-bars\"></span></a> "
                        +"</div>"
                         + "<div style=\"font-size:15px\">"
                            + "<strong>Now playing: </strong> " + songTitle
                        + "</div>"
                        + "<audio controls onended=\"playNextSong('" + videoId + "')\" onerror=\"playNextSong('" + videoId + "')\" autoplay src=\"" + songURL + "\" songid=\"" + videoId + "\" style=\"width:100%;background:transparent;color:white\">"
                        + "</audio>"
                    + "</td>"
                + "</tr>"
            + "</table>";

    return html;
}

function getNowPlayingSongTemplate(songId, songName){
    return "<div style=\"padding:14px 7px;border-bottom:1px solid lightgray\">"
                    + "<a id=\"" + songId + "-np-play-btn\" style=\"background:transparent;border:1px solid gray;padding:3px 6px;border-radius:100%;cursor:pointer\" onclick=\"play('" + songId + "','" + songName + "')\"><span class=\"fa fa-play\"></span></a>"
                    + " <a style=\"background:transparent;border:1px solid gray;padding:3px 6px;border-radius:100%;cursor:pointer\" onclick=\"removeFromNowPlaying(this, '" + songId + "')\"><span class=\"fa fa-remove\"></span></a> "
                    + " <span class=\"fa fa-music\"></span/> " + songName
                + "</div>";
}


function getAddingTemplate(){
    return '...';
}

function getAddedTemplate(){
    return '<span class=\"fa fa-check-circle\"></span>';
}