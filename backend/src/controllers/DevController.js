const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {
  async index(request, response){
    const devs = await Dev.find();
    return response.json(devs);
  },
  async destroy(request, response){
    const del = await Dev.deleteOne({ _id: request.params.id });
    return response.json(del);
  },
  async store(request, response){
    const { github_username, techs, latitude, longitude } = request.body;
    let dev = await Dev.findOne({ github_username });

    if(!dev){
      const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);
      const { name = login, avatar_url, bio } = apiResponse.data;
      const techsArray  = parseStringAsArray(techs);

      const location = {
        type:'Point',
        coordinates: [longitude, latitude]
      }

      dev = await Dev.create({
        github_username,
        name,
        avatar_url,
        bio,
        techs: techsArray,
        location,
      });
    }
    else{

    }


    return response.json(dev);
  }
};
