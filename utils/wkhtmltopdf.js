const { spawn, exec } = require("child_process");
var wkhtmltopdf_path = 'wkhtmltopdf';

module.exports = function (html, options = []) {
    return new Promise(((resolve, reject) => {
        console.log("1");
        const bufs = [];
        const ls = exec('ls -l', function (error, stdout, stderr) {
            if (error) {
              console.log(error.stack);
              console.log('Error code: '+error.code);
              console.log('Signal received: '+error.signal);
              reject(error);
            }
            console.log('Child Process STDOUT: '+stdout);
            console.log('Child Process STDERR: '+stderr);

            resolve("success");
          });
          
          ls.on('exit', function (code) {
            console.log('Child process exited with exit code '+code);
            reject(new Error(`wkhtmltopdf process exited with code ${code}`));
          });
        // const proc = spawn("/bin/sh", ["-o", "pipefail", "-c", `./bin/wkhtmltopdf ${options.join(" ")} - - | cat`]);
        // const proc = spawn("/bin/sh", ["ls"]);

        // proc.on("error", error => {
        //     console.log("3");
        //     reject(error);
        // }).on("exit", code => {
        //     console.log("4");
        //     if (code) {
        //         reject(new Error(`wkhtmltopdf process exited with code ${code}`));
        //     } else {
        //         resolve(Buffer.concat(bufs));
        //     }
        // });
        // console.log("5");
        // proc.stdin.end(html);
        // console.log("6");
        // proc.stdout.on("data", data => {
        //     console.log("7");
        //     bufs.push(data);
        // }).on("error", error => {
        //     console.log("8");
        //     reject(error);
        // });
    }));
};