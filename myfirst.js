var http = require('http');
var fs = require('fs');
let dict = '';
let search = 'nails';
http.createServer(function (req, res) {
    fs.readFile('LetterGame.html', function(err, data) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        return res.end();
    });
}).listen(9090);




    fs.readFile('test.txt', 'utf8', function(err, data){
        if(err) throw(err);
        dict = data;
        let re = new RegExp('(\r\n|\n|\r)' + search + '(\r\n|\n|\r)');
        console.log('nice');

        if(re.test(dict)){
            console.log('nice');
        }
    });
    


process.on('uncaughtException', err =>{
    console.error('There was an uncaught error: ${err}');
    process.exit(1);
})