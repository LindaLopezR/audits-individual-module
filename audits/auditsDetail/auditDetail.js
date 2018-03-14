import { Template } from 'meteor/templating';
import { TAPi18n } from 'meteor/tap:i18n';
import { Session } from 'meteor/session';

import './gembaDetail/gembaDetail.js';
import './locationDetail/locationDetail.js';
import './taskDetail/taskDetail.js';
import './auditDetail.html';

Template.auditDetail.rendered = function() {
	Session.set('CURRENT_TASK', undefined);
}