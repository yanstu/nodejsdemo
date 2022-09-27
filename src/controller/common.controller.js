const { fileUploadError } = require('../consitant/err.type');
const redis = require('../db/redis');

class CommonController {
  async xintiao(ctx, next) {
    const requestBody = ctx.request.body;
    if (!requestBody || !requestBody.State) {
      ctx.app.emit('error', ctx.request.body, ctx);
    }
    let data = await redis.get('count');
    try {
      data = JSON.parse(data);
    } catch (error) {}
    if (!data) {
      data = {
        Audio: 0,
        SD: 0,
        HD: 0,
      };
    }
    if (parseFloat(requestBody.HD) == 1) {
      data.HD = parseFloat(data.HD) + 1.5;
    }
    if (parseFloat(requestBody.SD) == 1) {
      data.SD = parseFloat(data.SD) + 1.5;
    }
    if (parseFloat(requestBody.Audio) == 1) {
      data.Audio = parseFloat(data.Audio) + 1.5;
    }
    redis.set('count', JSON.stringify(data));
    const result = {
      Audio: Math.ceil(data.Audio / 60) + '分钟',
      SD: Math.ceil(data.SD / 60) + '分钟',
      HD: Math.ceil(data.HD / 60) + '分钟',
    };
    ctx.app.emit('success', result, ctx);
  }
}

module.exports = new CommonController();
