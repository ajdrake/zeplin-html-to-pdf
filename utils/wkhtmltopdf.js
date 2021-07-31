const { spawn } = require("child_process");

module.exports = function (html, options = []) {
    return new Promise(((resolve, reject) => {
        console.log("1");
        const bufs = [];
        const proc = spawn("/bin/sh", ["-o", "pipefail", "-c", `wkhtmltopdf ${options.join(" ")} - - | cat`]);
        console.log("2");
        proc.on("error", error => {
            console.log("3");
            reject(error);
        }).on("exit", code => {
            console.log("4");
            if (code) {
                reject(new Error(`wkhtmltopdf process exited with code ${code}`));
            } else {
                resolve(Buffer.concat(bufs));
            }
        });
        console.log("5");
        proc.stdin.end(html);
        console.log("6");
        proc.stdout.on("data", data => {
            console.log("7");
            bufs.push(data);
        }).on("error", error => {
            console.log("8");
            reject(error);
        });
    }));
};