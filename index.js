const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const app = express();
app.use(express.json());
app.set('views', path.join(__dirname, 'views'))
    .set('view engine', 'ejs')
    .get('/', (req, res) => res.render('pages/index'))
    .post('/htmltopdf', (req, res) => 
     {
         console.log(req.body);
        this.handler(req.body, null, (data)=>res.json(data));
      })
    .listen(PORT, () => console.log(`Listening on ${ PORT }`))

process.env.PATH = `${process.env.PATH}:${process.env.LAMBDA_TASK_ROOT}`;
const wkhtmltopdf = require("./utils/wkhtmltopdf");
const errorUtil = require("./utils/error");

exports.handler = function handler(event, context, callback) {
    if (!event.html) {
        const errorResponse = errorUtil.createErrorResponse(400, "Validation error: Missing field 'html'.");
        callback(errorResponse);
        return;
    }
    console.log(event.html);
    wkhtmltopdf(event.html)
        .then(buffer => {
            callback({
                data: buffer.toString("base64")
            });
        }).catch(error => {
            callback(errorUtil.createErrorResponse(500, "Internal server error", error));
        });
};