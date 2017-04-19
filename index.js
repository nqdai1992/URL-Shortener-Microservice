var express = require('express')
var app = express()
var data = {}
function getRandomNumber(min,max) {
    return Math.floor(Math.random()*(max - min + 1) + min)
}
app.use('/',express.static('public'));
app.get('/new/*', function (req, res) {
    var url = req.url;
    var link = url.replace(/\/new\//gi,'');
    var randomNumber = getRandomNumber(1000,9999);
    data[randomNumber] = link;
    res.send({
        "original_url": link,
        "short_url": req.protocol + '://' + req.get('host') + '/' + randomNumber
    });
});
app.get('/:id', function (req, res) {
    var id = req.params.id;
    var linkInData = data[id] || null;
    if(linkInData){
        res.writeHead(301,{
            Location: linkInData
        })
    }
    res.end();
})

app.listen(process.env.PORT||5000);