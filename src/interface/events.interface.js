const channels = require('../utils/channels');
const newBundleNotifierSub = require('../event/bundle.trigger');

function startSubscribers() {
    newBundleNotifierSub(channels.newBundleNotifierChannel);
}

module.exports = startSubscribers;
