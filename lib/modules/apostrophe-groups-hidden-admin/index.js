module.exports = {
  improve: 'apostrophe-groups',
  afterConstruct: function(self) {
    // Work around a timing issue that prevents us from just using lib/cursor.js for this purpose
    self.apos.define('apostrophe-groups-cursor', require('./lib/groupsCursor.js'));
  }
};
