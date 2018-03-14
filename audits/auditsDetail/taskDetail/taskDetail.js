import { Template } from 'meteor/templating';
import { TAPi18n } from 'meteor/tap:i18n';
import { Session } from 'meteor/session';
import { Tasks } from 'meteor/igoandsee:tasks-collection';

import '../docsDetail/docsDetail.js';
import './taskDetail.html';

const MIMES = {
	audio : ['mp3'],
	video : ['mp4'],
	pdf   : ['pdf'],
	image : ['png', 'jpg', 'jpeg']
};

Template.taskDetail.helpers({

	showTask() {
		return !!getCurrentTask(this.gemba);
	},

	getTask() {
		return getCurrentTask(this.gemba);
	},

	getDocumentsByType(documents, type){
		let allowed = MIMES[type];
	  return documents.filter(function(url) {
			let endsWith = false;
			allowed.forEach( (mime) => { endsWith = endsWith || url.endsWith(mime); } );
			return endsWith;
		});
	}

});

let getCurrentTask = function(gemba){
	let idTask = Session.get('CURRENT_TASK');
	let idLocation = Session.get('CURRENT_LOCATION');
	if(idTask){
		let location = gemba.locations.find((location) => location._id == idLocation);
		let task = location.tasks.find((task) => task._id == idTask);
		let tempTask = Tasks.findOne(idTask);
		tempTask.critical = task.critical;
		return tempTask;
	}
	return;
};
