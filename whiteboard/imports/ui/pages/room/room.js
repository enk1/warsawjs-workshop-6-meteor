import {Meteor} from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Rooms } from '/imports/api/rooms/rooms.js';
import { CanvasManager } from '/imports/utils/client/canvas_manager.js';
import './room.html';
import './room.css';

let init = false;
let canvas_manager = null;

Template.App_room.onCreated(function(){
    init = null;
    Meteor.subscribe('rooms.show', FlowRouter.getParam('id'));
});

Template.App_room.onRendered(function(){
    this.autorun(() => {
        if(!init) {
            const canvas = document.getElementById('canvas');
            const room = Rooms.findOne(FlowRouter.getParam('id'));
            if(room) {               
                canvas_manager = new CanvasManager(canvas,{
                    instant: true,
                    callback(){
                        Meteor.call('rooms.updateDataUrl', room._id, canvas.toDataURL());
                    }
                });
                canvas_manager.load(room.dataUrl);
                init = true;
            }
        }
    });
});

Template.App_room.helpers({
    room(){
        const room = Rooms.findOne(FlowRouter.getParam('id'));
        if(room && canvas_manager) {
            canvas_manager.load(room.dataUrl);
        }
        return Rooms.findOne(FlowRouter.getParam('id'));
    }
});

Template.App_room.events({
    'click .clear'(event){
        event.preventDefault();
        if(canvas_manager){
            canvas_manager.clear();
        }
    },
    'change .size-selector input': function(e) {
        if(canvas_manager){
        const size = $(e.currentTarget).val();
        canvas_manager.size = size;
        }
    },
    'click .color-selector .option': function (e) {
        e.preventDefault();
        if(canvas_manager){
        const color = $(e.currentTarget).data('color');
        canvas_manager.color = color;
        }
    },
});