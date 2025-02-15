const { Command } = require('../../../utils')

module.exports = class RemoveEmojiCommand extends Command {
  constructor() {
    super({
      name: 'removeemoji',
      aliases: ['removeremoji'],
      hasUsage: true,
      permissions: [{
        entity: 'both',
        permissions: ['manageEmojisAndStickers']
      }],
      arguments: 1
    })
  }

  run(ctx) {
    const guild = ctx.message.guild
    const getEmoji = ctx.args[0].replace(/(<:)/, '').replace(/(<a:)/, '').replace(/(>)/, '').trim().split(':')
    const emoji = guild.emojis.find(emoji => emoji.id === getEmoji[1])
    if (!emoji) return ctx.replyT('error', 'basic:invalidEmoji')

    guild.deleteEmoji(emoji.id).then(() => {
      ctx.replyT('trash', 'commands:removeemoji.successfullyRemoved')
    })
  }
}
