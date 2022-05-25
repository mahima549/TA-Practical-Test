var express = require('express');
require('dotenv').config();
var router = express.Router();
const axios = require('axios');
const _ = require('underscore');
var Auth = require('../middleware/auth');

router.get('/news', Auth.verifyToken, async function (req, res) {
    var objParam = req.query;
    let apiUrl = process.env.newsApi;
    if (objParam.search) {
        apiUrl += "?q=" + objParam.search
    }
    apiUrl += "&apiKey=" + process.env.newsApiKey
    await axios.get(apiUrl).then(response => {
        let finalResp = []
        _.each(response.data.articles, (newsData) => {
            let data = {
                headline: newsData.title,
                link: newsData.url
            }
            finalResp.push(data);
          });
        res.status(200).json({count:response.data.totalResults,data:finalResp});
    }).catch(error => {
        res.status(500).json({
            msg: error
        });
    });
})

module.exports = router;