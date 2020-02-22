const Command = require("../../structures/command")
module.exports = class CongaParrotCommand extends Command {
    constructor (client) {
        super (client, {
            name: 'congaparrot',
            category: 'fun',
            aliases: [],
            UserPermission: null,
            ClientPermission: null,
            OnlyDevs: false,
            hidden: false
        })
    }
    run({message, args, server}, t) {
        if (args[0] > 20) return message.chinoReply('error', t('commands:congaparrot.limited'))
        if (!args[0]) return message.chinoReply('error', t('commands:congaparrot.args-null'))
        
        message.channel.send(this.client.emotes.parrot_dance.repeat(args[0]))
    }
}