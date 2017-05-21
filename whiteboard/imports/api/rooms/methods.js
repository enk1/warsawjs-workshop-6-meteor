// Methods related to links

import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Rooms } from './rooms.js';

Meteor.methods({
  'rooms.insert'(title) {
    check(title, String);

    return Rooms.insert({
      title,
      createdAt: new Date(),
    });
  },
  'rooms.remove'(linkId){
    check(linkId, String);
    Rooms.remove(linkId);
  }
});
