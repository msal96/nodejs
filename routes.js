const fs = require('fs')

const requestHandler = (req, res) => {
const url = req.url
const method = req.method

if (url === "/") {
    res.write("<html>");
    res.write("<head><title>My first page</title></head>");
    res.write(
      "<body><form action='/message' method='POST'><input type='text' name='message' /> <button type='submit' name='message'>SubmitBtn</button></form></body>"
    );
    res.write("</html>");
    return res.end();
  }

  if (url === "/message" && method === "POST") {
    let body = [];
    req.on("data", (chunk) => {
      console.log("chunk: ", chunk);
      body.push(chunk);
    });
    return req.on("end", () => {
      console.log("body: ", body);
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split("&")[0].split('=')[1];
      fs.writeFile("message.txt", message, err => {
          console.log("parsedBody: ", message);
          res.statusCode = 302;
          res.setHeader("Location", "/");
          return res.end();
      });
    });
  }
  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title>My first page</title></head>");
  res.write("<body><h1>Hello from node js server</h1></body>");
  res.write("</html>");
  res.end();
}

module.exports = requestHandler