Package.describe({
  name: 'igoandsee:audits-individual-module',
  version: '0.0.1',
  summary: '',
  git: '',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.4.4.2');
  api.use('blaze-html-templates@1.0.4');
  api.use('ecmascript');
  api.use('templating');
  api.use('session');
  api.use('tap:i18n@1.8.2');
  api.use('igoandsee:categories-collection');
  api.use('igoandsee:locations-collection');
  api.use('igoandsee:tasks-collection');
  api.use('igoandsee:tasks-lists-collection');
  api.mainModule('audits-individual-module.js', 'client');
});

Npm.depends({
  moment: '2.18.1',
  'moment-duration-format' : '1.3.0'
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('audits-individual-module');
  api.mainModule('audits-individual-module-tests.js');
});
