const http = require('http');

const server = http.createServer((req, res) => {
    console.log(req.url, req.method);
    res.end("helloNode");

})

server.listen(3060, () => {
    console.log("서버 실행중");
})