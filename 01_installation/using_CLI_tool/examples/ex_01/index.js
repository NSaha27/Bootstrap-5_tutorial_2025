import fs from "fs";
import http from "http";
import path from "path";
import bootstrap from "bootstrap";

function setPort(){
  const nodeEnvs = {
    staging: {
      env: "staging",
      port: 3000
    },
    production: {
      env: "production",
      port: 5000
    }
  };

  const environment = typeof process.env.NODE_ENV === "string" ? process.env.NODE_ENV.toLowerCase() : "staging";
  const port = typeof nodeEnvs[environment] === "object" ? nodeEnvs[environment].port : nodeEnvs["staging"].port;
  return port;
}

const server = http.createServer((req, res) => {
  const filePath = path.resolve(process.cwd(), "src", "index.html");
  const rs = fs.createReadStream(filePath);
  rs.on("error", (err) => {
    res.writeHead(404);
    res.end("no such file exists!");
  });
  rs.pipe(res);
});

server.listen(setPort(), "127.0.0.1", (err) => {
  if(!err){
    console.log(`server is running at http://${"127.0.0.1"}:${setPort()}`);
  }else{
    console.error("something went wrong, unable to start the server!");
  }
});
