const axios = require('axios');
const _ = require('underscore');
const message = require("../config/message");

exports.weather = async function (req, res) {
    var objParam = req.query;
    let apiUrl = process.env.WEATHER_API;
    if (objParam.location) {
        apiUrl += "?q=" + objParam.location
    }else{
        apiUrl += "?q=" + "surat"
    }
    apiUrl += "&appid=" + process.env.WEATHER_APIKEY
    await axios.get(apiUrl).then(response => {
        let finalResp = [];
        _.each(response.data.list, (newsData) => {
            let data = {
                date:newsData.dt_txt,
                main:_.map(newsData.weather,'main')[0],
                temp:newsData.main.temp
            }
            finalResp.push(data);
          });
        res.status(200).json({count:response.data.cnt,location:response.data.city.name,data:finalResp});
    }).catch((errr) => {
        console.log("errr",errr)
        res.status(500).json(message.message.SERVER_ERROR);
    });
};
