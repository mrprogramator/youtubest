var express = require('express');
var path    = require("path");
var app = express();
var youtubeDL = require('node-youtube-dl');


app.use(express.static(__dirname ));

var listener = app.listen(process.env.PORT || 8080, (err) => {
    console.log('listening on', listener.address().port);
});

app.get('/mobile', (req,res) => {
    res.sendFile(path.join(__dirname+'/mobile.html'));
})

app.get('/play', (req,res) => {
    var videoId = req.query.videoId;
    youtubeDL.download(videoId, 'bestaudio').then((stream) => {
        res.setHeader('Content-type', 'audio/mpeg');
        stream.pipe(res);
    })
})