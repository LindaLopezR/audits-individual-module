// Import Tinytest from the tinytest Meteor package.
import { Tinytest } from "meteor/tinytest";

// Import and rename a variable exported by audits-individual-module.js.
import { name as packageName } from "meteor/audits-individual-module";

// Write your tests here!
// Here is an example.
Tinytest.add('audits-individual-module - example', function (test) {
  test.equal(packageName, "audits-individual-module");
});
