const { Command, EmbedBuilder } = require('../../../utils')
const Helper = require('../../../structures/util/Helper')
const { CommandBase, CommandOptions } = require('eris')

module.exports = class HelpCommand extends Command {
  constructor() {
    super({
      name: 'help',
      aliases: ['ajuda', 'comandos', 'commands'],
      hasUsage: true,
      permissions: [{
        entity: 'bot',
        permissions: ['embedLinks']
      }],
      slash: new CommandBase()
        .setName('help')
        .setDescription('Command Help for more information about commands.')
        .addOptions(
          new CommandOptions()
            .setType(3)
            .setName('command')
            .setDescription('Command name')
        )
    })
  }

  async run(ctx) {
    const command = ctx.client.slashCommandRegistry
    const commandLength = command.filterByCategory('economy').length + command.filterByCategory('fun').length + command.filterByCategory('minecraft').length + command.filterByCategory('misc').length + command.filterByCategory('mod').length + command.filterByCategory('social').length + command.filterByCategory('utils').length + command.filterByCategory('image').length
    const embed = new EmbedBuilder()
    embed.setColor('DEFAULT')
    embed.setThumbnail(ctx.client.user.avatarURL)
    embed.setTitle(ctx._locale('commands:help.commandList'))
    embed.setDescription(ctx._locale('commands:help.explain', { 0: '/' }))
    embed.setTimestamp()
    embed.setFooter(ctx._locale('commands:help.commandsLoaded', { 0: commandLength }))
    embed.addField(ctx._locale('commands:help.economy', { 0: command.filterByCategory('economy').length }), command.filterByCategory('economy').map(cmd => `\`/${cmd.name}\``).join(', '))
    embed.addField(ctx._locale('commands:help.fun', { 0: command.filterByCategory('fun').length }), command.filterByCategory('fun').map(cmd => `\`/${cmd.name}\``).join(', '))
    embed.addField(ctx._locale('commands:help.image', { 0: command.filterByCategory('image').length }), command.filterByCategory('image').map(cmd => `\`/${cmd.name}\``).join(', '))
    embed.addField(ctx._locale('commands:help.minecraft', { 0: command.filterByCategory('minecraft').length }), command.filterByCategory('minecraft').map(cmd => `\`/${cmd.name}\``).join(', '))
    embed.addField(ctx._locale('commands:help.misc', { 0: command.filterByCategory('misc').length }), command.filterByCategory('misc').map(cmd => `\`/${cmd.name}\``).join(', '))
    embed.addField(ctx._locale('commands:help.mod', { 0: command.filterByCategory('mod').length }), command.filterByCategory('mod').map(cmd => `\`/${cmd.name}\``).join(', '))
    embed.addField(ctx._locale('commands:help.social', { 0: command.filterByCategory('social').length }), command.filterByCategory('social').map(cmd => `\`/${cmd.name}\``).join(', '))
    embed.addField(ctx._locale('commands:help.utils', { 0: command.filterByCategory('utils').length }), command.filterByCategory('utils').map(cmd => `\`/${cmd.name}\``).join(', '))
    embed.addField(ctx._locale('commands:help.additionalLinks.embedTitle'), ctx._locale('commands:help.additionalLinks.embedDescription', { 0: ctx.client.user.id }))

    if (!ctx.args.get('command')?.value) return ctx.send(embed.build())
    if (!command.findByName(ctx.args.get('command').value?.toLowerCase())) return ctx.send(embed.build())
    const helper = new Helper(ctx, command.findByName(ctx.args.get('command').value.toLowerCase()).name, command.findByName(ctx.args.get('command').value?.toLowerCase()).aliases, ctx._locale(`commands:${command.findByName(ctx.args.get('command').value?.toLowerCase()).name}.usage`), ctx._locale(`commands:${command.findByName(ctx.args.get('command').value?.toLowerCase()).name}.description`), command.findByName(ctx.args.get('command').value?.toLowerCase()).permissions)
    return helper.help()
  }
}
