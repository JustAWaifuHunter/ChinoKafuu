const Listener = require('../../structures/events/Listener')
const Logger = require('../../structures/util/Logger')

module.exports = class DisconnectListener extends Listener {
  constructor () {
    super()
    this.event = 'disconnect'
  }

  async on (client) {
    client.cacheManager.end()
    Logger.shardMessage('Mayday! All shard has died!')
  }
}
