var http = require('http');
var fs = require('fs');
var path = require('path');

const PORT = 8080;
/* hacemos una funcion f1, que toma dos parametros. le damos p1.end(string) y esa es nuestra response.
	hacemos un server (http.createServer) y le pasamos la funcion f1.
	
	*/
	/*este cacho es una funcion linda que trabaja con strings, nothing fancy, not regexp here*/

  function bufferFile(relPath) {
    try{ return fs.readFileSync(path.join(__dirname, relPath),{encoding:'utf8'}); }
			catch(e){return '404 man wtf!'}
  }
	var BUFFER = bufferFile('./test.html');
function stringBetweenSlashes(stringy){
	if(stringy[0]!=='/'){return 'invalid'}
	else {
		nextSlash = stringy.length
		for(i = 1 ; i<stringy.length;i++){
			if (stringy[i]=='/' && i<nextSlash){
				return (stringy.split('')).splice(1,i-1).join('')	
			}
		}
		return (stringy.split('')).splice(1,nextSlash).join('')	
	}
	
}
function handleRequest(request,response){
	response.end(bufferFile('./'+stringBetweenSlashes(request.url)+'.html'));
	
}

var server = http.createServer(handleRequest);
server.listen(PORT,function(){
	console.log('asd')
	console.log('server is at:'+PORT.toString())
})