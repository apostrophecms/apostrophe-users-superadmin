const prompt = require('prompt');

module.exports = {
  improve: 'apostrophe-users',
  hiddenUser: 'superadmin',
  hiddenGroup: 'superadmin',
  moogBundle: {
    directory: 'lib/modules',
    modules: [ 'apostrophe-groups-superadmin' ]
  },
  construct: function(self, options) {
    self.addTask('set-superadmin-password', 'Set the password for the "' + self.options.hiddenAdmin + '" user, who does not appear in the "Manage Users" list.', async function(apos, argv) {
      const req = self.apos.tasks.getReq();
      let group = await self.apos.groups.find(req, { slug: 'groups-' + self.options.hiddenGroup }).toObject();
      if (!group) {
        group = self.apos.groups.newInstance(req);
        group.title = self.options.hiddenGroup;
        group.slug = 'groups-' + self.options.hiddenGroup;
      }
      group.permissions = [ 'admin' ];
      if (group._id) {
        await self.apos.groups.update(req, group);  
      } else {
        await self.apos.groups.insert(req, group);  
      }
      let user = await self.find(req, { slug: 'users-' + self.options.hiddenUser }).toObject();
      if (!user) {
        user = self.newInstance(req);
      }
      user.title = self.options.hiddenUser;
      user.permissions = [ 'admin' ];
      let password = argv._[1] || (await getPassword());
      user.password = password;
      user.slug = 'users-' + self.options.hiddenUser;
      user.username = self.options.hiddenUser;
      if (user._id) {
        await self.apos.users.update(req, user);  
      } else {
        await self.apos.users.insert(req, user);  
      }
    });
    const superFindForEditing = self.findForEditing;
    self.findForEditing = function(req, criteria, projection) {
      return superFindForEditing(req, criteria, projection).and({
        slug: { $ne: 'users-' + self.options.hiddenUser }
      });
    };
  }
};

async function getPassword() {
  return require('util').promisify(get)();
  function get(callback) {
    prompt.start();
    prompt.get({
      properties: {
        password: {
          required: true,
          hidden: true
        }
      }
    }, function(err, result) {
      if (err) {
        return callback(err);
      }
      return callback(null, result.password);
    });
  }
}
