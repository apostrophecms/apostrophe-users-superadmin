console.log('defining');

module.exports = {
  construct: function(self, options) {
    self.addFilter('hiddenGroup', {
      def: false,
      finalize: function() {
        if (self.get('hiddenGroup') !== true) {
          self.and({
            slug: { $ne: 'groups-' + self.options.module.apos.users.options.hiddenGroup }
          });
        }
      }
    });
  }
};
