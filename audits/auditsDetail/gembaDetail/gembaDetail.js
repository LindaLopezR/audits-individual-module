import { Template } from 'meteor/templating';
import { TAPi18n } from 'meteor/tap:i18n';
import { Session } from 'meteor/session';
import { Categories } from 'meteor/igoandsee:categories-collection';
import { Locations } from 'meteor/igoandsee:locations-collection';

import moment from 'moment';
import duration from 'moment-duration-format';

import './gembaDetail.html';

Template.gembaDetail.rendered = function(){
	if(this.data){
		//If Data
		if(this.data.gemba){
			//If gemba
			let locations = this.data.gemba.locations;
			console.log("Setting location", locations);
			Session.set('CURRENT_LOCATION', locations[0]._id);
		}
	}

	$('#loadingGemba').hide();
};

Template.gembaDetail.helpers({

	categoryLabel(category) {
		return Categories.findOne({_id:category}).name;
	},

	dateLabel() {
		return moment(this.gemba.date).format('MMM-DD-YYYY hh:mm A');
	},

	timeToCompleteLabel() {
		return moment.duration(this.gemba.timeToComplete, "minutes").format("d[d] hh:mm", { trim: false });
	},

	repeatLabel() {
		return this.gemba.repeat.number + ' ' + this.gemba.repeat.period;
	},

	getLocations() {

		let sorted = _.sortBy(this.gemba.locations, 'order');

		return _.map(sorted, function(doc, index) {
			let newLocationObject = Locations.findOne({_id:doc._id});
			newLocationObject.index = index + 1;
			return newLocationObject;
		});

	},

	getLocationColor(locationId) {
		return  Session.get('CURRENT_LOCATION') == locationId ? 'blue' : '';
	}

});

Template.gembaDetail.events({

	'submit .form'(e) {
		e.preventDefault();
	},

	'click .btnLoc'(e) {
		let id = $(e.target).data('id');
		 console.log(id);
		Session.set('CURRENT_LOCATION',id);
	},

	'click #btnEditGemba'(e) {
		let id = $(e.target).closest('button').data('id');
		console.log(id);
		Router.go('editGemba',{id:id});
	},

	'click #printReport'(e) {
		let gembaId = this.gemba._id;

		Meteor.call('getUrlForGembaWalkReport', gembaId, function(error, result) {

			$('#loadingGemba').hide();

			if (error) {
				console.log(error);
				let message = error.reason || 'Error';
				Session.set('ERROR_MESSAGE', message);
				$('#modalError').modal('show');
			}

			if (result) {
				console.log(result);
				try {
					var win = window.open(result, '_blank');
					win.focus();
				} catch(err) {
					console.log(err);
				}
			}

		});
	}

});