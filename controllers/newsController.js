const axios = require('axios');
const _ = require('underscore');
const message = require("../config/message");

exports.news = async function (req, res) {
    var objParam = req.query;
    let apiUrl = process.env.NEWS_API;
    if (objParam.search) {
        apiUrl += "?q=" + objParam.search
    }
    apiUrl += "&apiKey=" + process.env.NEWS_APIKEY
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
    }).catch(() => {
        res.status(500).json(message.message.SERVER_ERROR);
    });
};