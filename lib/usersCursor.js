module.exports = {
  construct: function(self, options) {
    self.addFilter('hiddenUser', {
      finalize: function() {
        if (self.get('hiddenUser') !== true) {
          console.log('adding criteria with self.and');
          console.log(self.and);
          try {
            self.and({
              slug: { $ne: 'users-' + self.options.module.options.hiddenUser }
            });
          } catch (e) {
            console.error(e);
          }
          console.log('criteria after:');
          console.log(self.get('criteria'));
        }
      }
    });
  }
};
