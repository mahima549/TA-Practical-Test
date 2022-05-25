const express = require('express');
require('dotenv').config();
var router = express.Router();
const axios = require('axios');
const _ = require('underscore');

router.get('/weather', async function (req, res) {
    var objParam = req.query;
    let apiUrl = process.env.weatherApi;
    if (objParam.location) {
        apiUrl += "?q=" + objParam.location
    }else{
        apiUrl += "?q=" + "surat"
    }
    apiUrl += "&appid=" + process.env.weatherApiKey
    await axios.get(apiUrl).then(response => {
        let finalResp = []
        _.each(response.data.list, (newsData) => {
            let data = {
                date:newsData.dt_txt,
                main:newsData.weather[0].main,
                temp:newsData.main.temp
            }
            finalResp.push(data);
          });
        res.status(200).json({count:response.data.cnt,location:response.data.city.name,data:finalResp});
    }).catch(error => {
        res.status(500).json({
            msg: error
        });
    });
})

module.exports = router;