import { Template } from 'meteor/templating';
import { TAPi18n } from 'meteor/tap:i18n';
import { Session } from 'meteor/session';
import { Tasks } from 'meteor/igoandsee:tasks-collection';
import { TasksLists } from 'meteor/igoandsee:tasks-lists-collection';

import './locationDetail.html';

Template.locationDetail.events({

	'click .btnTask'(e) {
		let id = $(e.target).data('id');
		console.log('ID: ', id);
		Session.set('CURRENT_TASK',id);
	},

	'click .btnListTask'(e) {
		let id = $(e.target).data('id');
		console.log('ID: ', id);
		Router.go('viewList',{id:id});
	},

	'submit .form'(e) {
		e.preventDefault();
	},

});

Template.locationDetail.helpers({

	getImage(image) {
		//TODO Return placeholder
		return image;
	},

	getTasks(locationId) {

		let template = Template.instance();
		let location = _.find(template.data.gemba.locations, function(value){
			return value._id == locationId;
		});

		if (location) {
			let tasks = location.tasks;
			tasks = tasks.map( (task) => task._id );
			let query = {_id:{$in:tasks}};
			return Tasks.find(query, {sort: {order: 1}}).map(function(doc, index) {
				return _.extend(doc, {index: index + 1});
			});
		} else {
			return [];
		}
	},

	getListTasks(locationId) {

		let template = Template.instance();
		let location = _.find(template.data.gemba.locations, function(value){
			return value._id == locationId;
		});

		if (location) {
			let lists = location.lists;
			lists = lists.map( (list) => list._id );
			let query = {_id:{$in:lists}};
			return TasksLists.find(query, {sort: {order: 1}}).map(function(doc, index) {
				return _.extend(doc, {index: index + 1});
			});
		} else {
			return [];
		}
	},

	getLocation() {
		return getCurrentLocation(this.locations);
	},

	getTaskColor(locationId) {
		return  Session.get('CURRENT_TASK') == locationId ? 'blue' : '';
	}

});

let getCurrentLocation = function(locations){
	locations = locations.fetch();

	let currentLoc = {};
	let idLocation = Session.get('CURRENT_LOCATION');
	if(!idLocation){
		curentLoc = locations[0];
	}else{
		_.each(locations, function(tempLoc){
			if(tempLoc._id == idLocation)
				curentLoc = tempLoc;
		});
	}

	return curentLoc;
};