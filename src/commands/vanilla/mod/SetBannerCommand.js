const Helper = require('../../../structures/util/Helper')
const { Command, EmbedBuilder } = require('../../../utils')
const axios = require('axios')

module.exports = class SetBannerCommand extends Command {
  constructor() {
    super({
      name: 'setbanner',
      hasUsage: true,
      permissions: [{
        entity: 'both',
        permissions: ['manageGuild']
      }]
    })
  }

  async run(ctx) {
    if (!ctx.message.guild.features.includes('BANNER')) return ctx.replyT('error', 'commands:setbanner.missingFeature')
    if (!ctx.message.attachments[0] && !ctx.args[0]) return new Helper(ctx, this.name, this.aliases, ctx._locale(`commands:${this.name}.usage`, ctx._locale(`commands:${this.name}.description`))).help()

    const url = ctx.args[0] ?? ctx.message.attachments[0].url
    const buffer = await axios.get(url, { responseType: 'arraybuffer' }).then(d => Buffer.from(d.data, 'binary').toString('base64'))
    const base64Banner = `data:image/${url.substr(url.length - 3)};base64,${buffer}`

    ctx.message.guild.edit({
      banner: base64Banner
    })
      .then(() => {
        const embed = new EmbedBuilder()
          .setTitle(ctx._locale('commands:setbanner.success'))
          .setColor('DEFAULT')
          .setImage(url)
        ctx.send(embed.build())
      })
  }
}
