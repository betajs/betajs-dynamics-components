/* jshint camelcase: false */

'use strict';

var grunt = require('grunt');

exports.betajs_templates = {
  setUp: function(done) {
    done();
  },

  // Test a default configuration.
  default: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/expected.js');
    var expected = grunt.file.read('test/expected/expected.js');
    test.equal(actual, expected, 'Should describe what the default behavior is.');

    test.done();
  },

  // Test specifying a separate namespace for a new subtask.
  newNamespace: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/newNamespace.js');
    var expected = grunt.file.read('test/expected/newNamespace.js');
    test.equal(actual, expected, 
               'Should allow custom specification of a namespace per filegroup.');

    test.done();
  },

  // Ensure task does not execute if `options.namespace` is not specified.
  noNamespace: function(test) {
    test.expect(1);

    test.ok(!grunt.file.exists('tmp/noNamespace.js'),
            'Should not have created dest file when options.namespace was not specified.');

    test.done();
  }
};
