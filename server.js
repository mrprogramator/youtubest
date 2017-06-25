var express = require('express');
var path    = require("path");
var app = express();
var youtubedl = require('youtube-dl');

var pg = require('pg');
var jsonFile = require('jsonfile');

var conString = "";
var dbName = "";

jsonFile.readFile('config.json', function (err, obj){
    conString = obj.dbConnectionString;
    dbName = obj.dbName;
})

app.use(express.static(__dirname ));

var listener = app.listen(process.env.PORT || 8080, (err) => {
    console.log('listening on', listener.address().port);
});

app.get('/mobile', (req,res) => {
    res.sendFile(path.join(__dirname+'/mobile.html'));
})

app.get('/play', (req,res) => {
    var videoId = req.query.videoId;
    var videoName = req.query.videoName;

    var video = youtubedl(videoId);
    video.pipe(res);

    registerTrackFrequency(videoId, videoName);

    video.on('error', function (err){
        res.send(null);
    })
})

app.post('/user/register', (req,res) => {
    var tokenId = req.query.tokenId;
    var fullName = req.query.fullName;
    var givenName = req.query.givenName;
    var familyName = req.query.familyName;
    var imageURL = req.query.imageURL;
    var email = req.query.email;

    var client = new pg.Client(conString);
    client.connect();
    try
    {
        var registerUser = client.query({
            name : 'register user',
            text : 'insert into ' + dbName + '.public.ytuser (token_id, full_name, given_name, family_name, image_url, email, date_added) values($1, $2, $3, $4, $5, $6, $7)',
            values : [tokenId, fullName, givenName, familyName, imageURL, email, new Date()]
        });

        registerUser.on('end', function (){
            client.end();
            res.send(true);
        });
    }
    catch(e){
        res.send(false);
    }
})

app.post('/user/verify', (req,res) => {
    var tokenId = req.query.tokenId;

    var client = new pg.Client(conString);
    client.connect();
    try
    {
        var verifyUser = client.query({
            name : 'verify user',
            text : "select token_id, full_name, given_name, family_name, image_url, email, date_added from " + dbName + ".public.ytuser where token_id = $1",
            values : [tokenId]
        });

        var user = null;
        verifyUser.on('row', function (row){
            user = row;
        })
        verifyUser.on('end', function (){
            client.end();
            res.send({
                result : true,
                user : user
            });
        });
    }
    catch(e){
        client.end();
        res.send({ result : false });
    }
})

app.post('/user/tracks/add', (req, res) => {
    try
    {
        var userId = req.query.userId;
        var trackId = req.query.trackId;
        
        var client = new pg.Client(conString);
        client.connect();

        var registerUserTrack = client.query({
            name : 'register usertrack',
            text : 'insert into ' + dbName + '.public.ytusertrack (user_id, track_id, date_added) values($1, $2, $3)',
            values : [userId, trackId, new Date()]
        });

        registerUserTrack.on('end', function (){
            client.end();
            res.send(true);
        });
    }
    catch(e){
        console.log(e);
        res.send(false);
    }
})

app.post('/user/tracks/remove', (req, res) => {
    try
    {
        var userId = req.query.userId;
        var trackId = req.query.trackId;
        
        var client = new pg.Client(conString);
        client.connect();

        var removeUserTrack = client.query({
            name : 'remove usertrack',
            text : 'delete from ' + dbName + '.public.ytusertrack where user_id = $1 and track_id = $2',
            values : [userId, trackId]
        });

        removeUserTrack.on('end', function (){
            client.end();
            res.send(true);
        });
    }
    catch(e){
        console.log(e);
        res.send(false);
    }
})

app.post('/user/tracks', (req, res) => {
    try
    {
        var userId = req.query.userId;
        
        var client = new pg.Client(conString);
        client.connect();

        var tracks = [];

        var getUserTracks = client.query({
            name : 'get tracks by user',
            text : 'select ' + dbName + '.public.ytusertrack.track_id, ' + dbName + '.public.yttrack.name from ' + dbName + '.public.ytusertrack '
                    + 'join ' + dbName + '.public.yttrack on ' + dbName + '.public.yttrack.track_id = ' + dbName + '.public.ytusertrack.track_id '
                    + 'where ' + dbName + '.public.ytusertrack.user_id = $1',
            values : [userId]
        });

        getUserTracks.on('row', function (row){
            tracks.push(row);
        })

        getUserTracks.on('end', function (){
            client.end();
            res.send(tracks);
        });
    }
    catch(e){
        console.log(e);
        res.send([]);
    }
})

function registerTrackFrequency(trackId, trackName){
    var client = new pg.Client(conString);
    client.connect();
    
    var checkTrack = client.query({
        name : 'check track',
        text : 'select track_id, freq from ' + dbName + '.public.yttrack where track_id = $1',
        values : [trackId]
    });

    var track = null;
    checkTrack.on('row', function (row){
        track = row;
    })
    checkTrack.on('end', function (){
        if (track == null) {
            var registerTrack = client.query({
                name : 'register track',
                text : 'insert into ' + dbName + '.public.yttrack (track_id, name, freq, date_added) values($1, $2, $3, $4)',
                values : [trackId, trackName, 1, new Date()]
            });

            registerTrack.on('end', function (){
                client.end();
            })
        }
        else{
            var updateTrack = client.query({
                name : 'update track',
                text : 'update ' + dbName + '.public.yttrack set freq = $1 where track_id = $2',
                values : [track['freq'] + 1, track['track_id']]
            })

            updateTrack.on('end', function (){
                client.end();

            })
        }
    });
}