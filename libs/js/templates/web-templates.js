function getUserTemplate(user){
    return "<div style=\"color:white;padding:7px;float:right\">"
            + "<table>"
                + "<tr>"
                    + "<td style=\"text-align: right;color:white;padding-right:7px\">"
                        + "<a class=\"option-btn\" onclick=\"showMyTracks('" + user.token_id + "')\">"
                            +"<span class=\"fa fa-music\" style=\"color:#4285f4\"></span> MY TRACKS</a>"
                    + "</td>"
                    + "<td style=\"vertical-align:middle;border-left: 1px solid #4285f4;padding-left:7px\">"
                        + user.given_name
                    +"</td>"
                    +"<td>"
                         + "<img src=\"" + user.image_url + "\" style=\"height:30px;border-radius:100%\" />"
                    +"</td>"
                + "</tr>"
            +"</table>"
        + "</div>";
}

function getMyTracksTemplate(item){
    return "<div style=\"padding:7px;border-bottom:1px solid lightgray\">"
            + "<a style=\"background:transparent;border:1px solid gray;padding:3px 6px;border-radius:100%;cursor:pointer\" onclick=\"play('" + item['track_id']+ "','" + item['name'] + "')\"><span class=\"fa fa-play\"></span></a>"
            + " <a style=\"background:transparent;border:1px solid gray;padding:3px 6px;border-radius:100%;cursor:pointer\" onclick=\"addToNowPlaying('" + item['track_id']+ "','" + item['name'] + "')\"><span class=\"fa fa-plus\"></span></a>"
            + " <a style=\"background:transparent;border:1px solid gray;padding:3px 6px;border-radius:100%;cursor:pointer\" onclick=\"removeTrack(this, '" + item['track_id']+ "')\"><span class=\"fa fa-remove\"></span></a> "
            + " <span class=\"fa fa-music\"></span/> " + item['name'] 
        + "</div>";
}

function getSearchResultItemTemplate(item){
    var fixedTitle = item.snippet.title.replace(/["']/g, "");

    return "<tr>"
            + "<td>"
                + "<div class=\"result-box\">"
                    + "<table style=\"width:100%\">"
                        + "<tr>"
                            + "<td>"
                                + "<div>" 
                                    +item.snippet.title
                                +"</div>"
                                + "<div style=\"padding-top:7px\">"
                                        + "<a onclick=\"play('" + item.id.videoId + "','" + fixedTitle + "')\" style=\"background:transparent;border:1px solid gray;padding:3px 6px;cursor:pointer\">"
                                            + "<span class=\"fa fa-play\"></span> PLAY SONG"
                                        + "</a> "
                                        + "<a onclick=\"addToNowPlaying('" + item.id.videoId + "','" + fixedTitle + "')\" style=\"background:transparent;border:1px solid gray;padding:3px 6px;cursor:pointer\">"
                                            + "<span class=\"fa fa-plus-circle\"></span> ADD TO 'NOW PLAYING'"
                                        + "</a> "
                                    + "</div>"
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
                    + "<td style=\"text-align:center\">"
                        + "<a style=\"background:transparent;border:1px solid gray;padding:3px 6px;border-radius:4px;cursor:pointer\" onclick=\"toggleNowPlayingList()\"><span class=\"fa fa-bars\"></span></a>"
                    +"</td>"
                    + "<td style=\"font-size:19px\">"
                        + "<strong>Now playing: </strong> " + songTitle;
                        if(localStorage.getItem('user-id')){
                            if(myTracks.filter(function (t) { return t['track_id'] == videoId})[0] != null){
                                html += " <button style=\"background:transparent;color:white;border:1px solid gray;padding:3px 6px;cursor:pointer\" disabled=\"true\" >"
                                    +"<span class=\"fa fa-check-circle\"></span> ADDED"
                                +"</button>";
                            }
                            
                            else{
                                html += " <button style=\"background:transparent;color:white;border:1px solid gray;padding:3px 6px;cursor:pointer\" onclick=\"addToMyTracks(this, '" + videoId + "','" + songTitle + "')\" >"
                                        +"<span class=\"fa fa-plus-circle\"></span> ADD TO MY TRACKS"
                                    +"</button>";
                            }
                        }
                        else{
                            html += " <button style=\"background:transparent;color:white;border:none;padding:3px 6px\">"
                                    +"SIGN IN TO ADD THIS SONG TO YOUR SONGS!"
                                +"</button>";
                        }                        
                        
                        html += " <button style=\"background:transparent;color:white;border:1px solid gray;padding:3px 6px;cursor:pointer\" onclick=\"downloadURI('" + songURL + "','" + songTitle + ".mp3')\" >"
                            +"<span class=\"fa fa-download\"></span> DOWNLOAD"
                        +"</button>"
                    + "</td>"
                + "</tr>"
                + "<tr>"
                    + "<td style=\"text-align:center\">"
                        + "<a style=\"background:transparent;border:1px solid gray;padding:3px 6px;border-radius:100%;cursor:pointer\" onclick=\"playPreviousSong('" + videoId + "')\"><span class=\"fa fa-backward\"></span></a> "
                        + "<a style=\"background:transparent;border:1px solid gray;padding:3px 6px;border-radius:100%;cursor:pointer\" onclick=\"playNextSong('" + videoId + "')\"><span class=\"fa fa-forward\"></span></a>"
                    +"</td>"
                    + "<td>"
                        + "<audio controls onended=\"playNextSong('" + videoId + "')\" onerror=\"playNextSong('" + videoId + "')\" autoplay src=\"" + songURL + "\" songid=\"" + videoId + "\" style=\"width:100%;background:transparent;color:white\">"
                        + "</audio>"
                    + "</td>"
                + "</tr>"
            + "</table>";

    return html;
}

function getNowPlayingSongTemplate(songId, songName){
    return "<div style=\"padding:7px;border-bottom:1px solid lightgray\">"
                    + "<a id=\"" + songId + "-np-play-btn\" style=\"background:transparent;border:1px solid gray;padding:3px 6px;border-radius:100%;cursor:pointer\" onclick=\"play('" + songId + "','" + songName + "')\"><span class=\"fa fa-play\"></span></a>"
                    + " <a style=\"background:transparent;border:1px solid gray;padding:3px 6px;border-radius:100%;cursor:pointer\" onclick=\"removeFromNowPlaying(this, '" + songId + "')\"><span class=\"fa fa-remove\"></span></a> "
                    + " <span class=\"fa fa-music\"></span/> " + songName
                + "</div>";
}

function getAddingTemplate(){
    return 'ADDING TRACK...';
}

function getAddedTemplate(){
    return '<span class=\"fa fa-check-circle\"></span> ADDED';
}