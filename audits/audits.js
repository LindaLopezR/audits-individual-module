import { Template } from 'meteor/templating';
import { TAPi18n } from 'meteor/tap:i18n';
import { Session } from 'meteor/session';
import { Categories } from 'meteor/igoandsee:categories-collection';

import './audits.html';

Template.audits.helpers({

    settings() {
        return {
            collection: 'gembas-pages',
            rowsPerPage: 15,
            showFilter: true,
            showColumnToggles : false,
            noDataTmpl: Template.noDataGembaBtn,
            fields: [
                {
                    key: 'active',
                    label: '',
                    fn(value, object) {

                      if (object.periodical) {
                        if(value){
                            return new Spacebars.SafeString('<center><i class="circle icon green"></i></center>');
                        }else{
                            return new Spacebars.SafeString('<center><i class="circle icon red"></i></center>');
                        }
                      } else {
                        return new Spacebars.SafeString('<center>-</center>');
                      }

                    }
                },
                {
                    key: 'name',
                    label: TAPi18n.__('gemba_walk'),
                    sortable: true,
                },
                {
                    key: 'category',
                    label: TAPi18n.__('category'),
                    fn(value) {
                        let cat = Categories.findOne({_id:value});
                        if(cat){
                            return cat.name;
                        }else{
                            return TAPi18n.__('generic');
                        }
                    }
                },
                {
                    key: 'locations',
                    label: TAPi18n.__('locations'),
                    sortable: false,
                    fn(value) {
                        return value.length;
                    }
                },
                {
                    key: 'repeat',
                    label: TAPi18n.__('repeat'),
                    sortable: false,
                    fn(value) {
                      if (!value) {
                        return TAPi18n.__('on_demmand');
                      }
                      return value.number + ' ' + value.period;
                    }
                },
                {
                    key: '_id',
                    label: TAPi18n.__('view'),
                    sortable: false,
                    fn(value) {
                        return new Spacebars.SafeString('<center><a href="/auditDetail/' + value + '" class="circular ui icon button teal tiny"><i class="unhide icon"></i></a></center>')
                    }
                },
                {
                    key: '_id',
                    label: TAPi18n.__('edit'),
                    sortable: false,
                    fn(value) {
                        return Spacebars.SafeString('<center><a href="/edit/gemba/' + value + '" class="circular ui icon button blue tiny"><i class="edit icon"></i></a></center>');
                    }
                },
                {
                    key: '_id',
                    label: TAPi18n.__('clone'),
                    sortable: false,
                    fn(value) {
                      return Spacebars.SafeString('<center><a href="/clone/gemba/' + value + '" class="circular ui icon button buttonPdf tiny"><i class="clone icon"></i></a></center>');
                    }
                },
                {
                    key: '_id',
                    label: TAPi18n.__('delete'),
                    sortable: false,
                    fn(value) {
                        return Spacebars.SafeString('<a data-id="' + value + '" class="circular ui icon button red deleteGemba tiny"><i class="remove icon"></i></a>');
                    }
                },

            ]
        };
    }

});

Template.audits.events({

    'click #btnNew'(e) {
        e.preventDefault();
        Router.go('newGemba');
    },

    'click #btnNewGemba'(e) {
        e.preventDefault();
        Router.go('newGemba');
    },

    'click .deleteGemba'(e) {
        let id = $(e.target).closest('.button').data('id');
         console.log(id);

        Session.set('OPTIONS_MESSAGE',TAPi18n.__('delete_gemba'));
        $('#modalOptions').modal({
            closable  : false,
            onDeny() {

            },
            onApprove() {

                Meteor.call('deleteGembaWalk', id, function(err, result){
                    if(err){
                        Session.set('ERROR_MESSAGE',TAPi18n.__('error_deleting_gemba'));
                        $('#modalError').modal('show');
                    }else if(result){
                        Session.set('SUCCESS_MESSAGE',TAPi18n.__('gemba_deleted'));
                        $('#modalSuccess').modal('show');
                    }
                });

            }
        }).modal('show');
    },

});