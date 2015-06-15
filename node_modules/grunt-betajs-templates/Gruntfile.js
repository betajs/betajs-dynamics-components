/*
 * grunt-betajs-templates
 * https://github.com/betajs/grunt-betajs-templates
 *
 * Copyright (c) 2015 Oliver Friedmann
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp']
    },

    /* jshint camelcase: false */
    betajs_templates: {
      dest: {
        files: {
          'tmp/expected.js': [
            'test/fixtures/*.html'
          ],
        },
        options: {
          namespace: 'App.Templates'
        }
      },
      newNamespace: {
        files: {
          'tmp/newNamespace.js': [
            'test/fixtures/*.html'
          ]
        },
        options: {
          namespace: 'App.NewNamespace'
        }
      },
      noNamespace: {
        files: {
          'tmp/noNamespace.js': [
            'test/fixtures/*.html'
          ]
        }
      }
    },
    /* jshint camelcase: true */

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-continue');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result. grunt-continue is used to test
  // betajs_templates:noNamespace which exits with a failure. Continuing allows
  // writing tests to ensure the `noNamespace.js` file was not created.
  grunt.registerTask('test', [
    'clean',
    'betajs_templates:dest',
    'betajs_templates:newNamespace',
    'continue:on',
    'betajs_templates:noNamespace',
    'continue:off',
    'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
