# apostrophe-users-superadmin

## What is it?

This module creates a `superadmin` user on your [apostrophecms](https://apostrophecms.com) site, and prevents regular admins from seeing that user account in the "Manage" view or editing it in any way.

## What can the superadmin do?

The same things a regular `admin` can do. They are a member of a similarly invisible `superadmin` group which always has the `admin` permission.

## Install

```
npm install apostrophe-users-superadmin
```

## Configure

In `app.js`:

```javascript
modules: {
  'apostrophe-users-superadmin': {}
}
```

## Create the user and set their password

```
node app apostrophe-users:set-superadmin-password
[you will be prompted for a password]
``` 

If you do not want to be prompted, you may also specify the password on the command line. This is less secure when typing at the keyboard, but useful in scripts.

## Change the user's password

Just use the task again:

```
node app apostrophe-users:set-superadmin-password
[you will be prompted for a new password]
``` 

## Changing the superadmin username and group name

You may pass the `hiddenUser` and `hiddenGroup` options to the `apostrophe-users` module. Do NOT pass them to `apostrophe-users-superadmin`, that module just "improves" `apostrophe-users` with the ability to understand these options.
