module.exports = {
  improve: 'apostrophe-groups',
  construct: function(self, options) {
    const superFindForEditing = self.findForEditing;
    self.findForEditing = function(req, criteria, projection) {
      return superFindForEditing(req, criteria, projection).and({
        slug: { $ne: 'groups-' + self.apos.users.options.hiddenGroup }
      });
    };
  }
};
