module.exports = {
  improve: 'apostrophe-users',
  hiddenUser: 'superadmin',
  hiddenGroup: 'superadmin',
  moogBundle: {
    directory: 'lib/modules',
    modules: [ 'apostrophe-groups-hidden-admin' ]
  },
  afterConstruct: function(self) {
    // Work around a timing issue that prevents us from just using lib/cursor.js for this purpose
    self.apos.define('apostrophe-users-cursor', require('./lib/usersCursor.js'));
  },
  construct: function(self, options) {
    self.addTask('hidden-admin-password', 'Set the password for the "' + self.options.hiddenAdmin + '" user, who does not appear in the "Manage Users" list.', async function(apos, argv) {
      const req = self.apos.tasks.getReq();
      let group = await self.apos.groups.find(req, { slug: 'groups-' + self.options.hiddenGroup }).hiddenGroup(true).toObject();
      if (!group) {
        group = self.apos.groups.newInstance(req);
        group.title = self.options.hiddenGroup;
        group.slug = 'groups-' + self.options.hiddenGroup;
      }
      group.permissions = [ 'admin' ];
      console.log('adding group');
      console.log(group);
      if (group._id) {
        await self.apos.groups.update(req, group);  
      } else {
        await self.apos.groups.insert(req, group);  
      }
      let user = await self.find(req, { slug: 'users-' + self.options.hiddenUser }).hiddenUser(true).toObject();
      console.log('found:', user);
      if (!user) {
        user = self.newInstance(req);
        user.title = self.options.hiddenUser;
        user.slug = 'users-' + self.options.hiddenUser;
      }
      user.permissions = [ 'admin' ];
      user.password = argv._[1];
      if (!user.password) {
        throw 'You must specify a password as the first argument after the task name.';
      }
      console.log('adding user');
      if (user._id) {
        await self.apos.users.update(req, user);  
      } else {
        await self.apos.users.insert(req, user);  
      }
    });
  }
};
