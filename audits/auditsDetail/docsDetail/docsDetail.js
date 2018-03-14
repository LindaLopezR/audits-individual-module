import { Template } from 'meteor/templating';
import { TAPi18n } from 'meteor/tap:i18n';

import './docsDetail.html';

Template.docsDetail.helpers({
	
	getDataCell() {
		switch(this.type){
			case 0 :
				return Spacebars.SafeString('<a target="_blank" href="' + this.url +'">' + this.name +'</a>');
			case 1 :
				return Spacebars.SafeString('<a target="_blank" href="' + this.url +'">' + this.name +'</a>');
			case 2 :
				return Spacebars.SafeString('<a target="_blank" href="' + this.url +'">' + this.name +'</a>');
			case 3 :
				return Spacebars.SafeString('<a target="_blank" href="' + this.url +'">' + this.name +'</a>');
			case 5 :
				return this.data + TAPi18n.__('seconds');
			case 6 :
				return this.data;
			default :
				return TAPi18n.__('n_a');
		}
		
	},

	getTypeCell() {
		switch(this.type){
			case 0 :
				return TAPi18n.__('picture');
			case 1 :
				return TAPi18n.__('audio');
			case 2 :
				return TAPi18n.__('video');
			case 3 :
				return TAPi18n.__('pdf');
			case 5 :
				return TAPi18n.__('time');
			case 6 :
				return TAPi18n.__('note');
			default :
				return TAPi18n.__('n_a');
		}
		
	}

});

/*

Template.docsDetail.events({

	'click a'(e) {
		e.preventDefault();
		let url = $(e.target).attr('href');
		win
	}

});

*/