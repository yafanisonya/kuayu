var http = require("http");
var fs = require("fs");
var url = require("url");
var port = process.argv[2];

if (!port) {
  console.log("请指定端口号!Example:\nnode server.js 8888 ");
  process.exit(1);
}

var server = http.createServer(function (request, response) {
  var parsedUrl = url.parse(request.url, true);
  var pathWithQuery = request.url;
  var queryString = "";
  if (pathWithQuery.indexOf("?") >= 0) {
    queryString = pathWithQuery.substring(pathWithQuery.indexOf("?"));
  }
  var path = parsedUrl.pathname;
  var query = parsedUrl.query;
  var method = request.method;

  console.log("有人发请求过来！路径为：" + pathWithQuery);

  if (path === "/index.html") {
    response.statusCode = 200;
    response.setHeader("Content-Type", "text/html;charset=utf-8");
    response.write(fs.readFileSync('./public/index.html'));
    response.end();
  } else if (path === "/qq.js") {
    response.statusCode = 200;
    response.setHeader("Content-Type", "text/javascript;charset=utf-8");
    response.write(fs.readFileSync('./public/qq.js'));
    response.end();
  } else if (path === "/friends.json") {
    response.statusCode = 200;
    response.setHeader("Content-Type", "text/json;charset=utf-8");
    response.setHeader('Access-Control-Allow-Origin', 'http://frank.com:8889')
    response.write(fs.readFileSync('./public/friends.json'));
    response.end();
  } else if (path === "/friends.js") {
    if (request.headers["referer"].indexOf("http://frank.com:8889") === 0) {
      response.statusCode = 200;
      // console.log(query.functionName)
      response.setHeader("Content-Type", "text/javascript;charset=utf-8");
      //const string = fs.readFileSync('./public/friends.js').toString();
      const string = `window['{{xxx}}']({{ data }})`
      const data = fs.readFileSync('./public/friends.json').toString();
      const string2 = string.replace("{{ data }}", data).replace("{{xxx}}", query.callback);
      response.write(string2);
      response.end();
    } else {
      response.statusCode = 404;
      response.end();
    }
  } else {
    response.statusCode = 404;
    response.setHeader("Content-Type", "text/html;charset=utf-8");
    response.write("你访问的页面不存在");
    response.end();
  }
});

server.listen(port);
console.log(
  "开启" + port + "端口监听成功，请用浏览器打开 http://localhost:" + port
);
