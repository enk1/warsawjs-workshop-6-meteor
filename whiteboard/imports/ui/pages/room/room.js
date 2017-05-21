import {Meteor} from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Rooms } from '/imports/api/rooms/rooms.js';
import './room.html';

Template.App_room.onCreated(function(){
    Meteor.subscribe('rooms.show', FlowRouter.getParam('id'));
});

Template.App_room.helpers({
    room(){
        return Rooms.findOne(FlowRouter.getParam('id'));
    }
});