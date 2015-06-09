/*
 * grunt-git-revision-count
 *
 * Copyright (c) 2014 Matthias Permien
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {
  grunt.registerTask('revision-count', 'Retrieves the current git revision count', function(property) {
    var options = this.options({
      property: 'revision-count',
      ref: 'HEAD'
    });

    var done = this.async();

    grunt.util.spawn({
      cmd: 'git',
      args: ['rev-list', '--count', options.ref].filter(Boolean)
    }, function(err, result) {
      if (err) {
        grunt.log.error(err);

        return done(false);
      }

      var revision = result.toString();

      grunt.config(options.property, revision);
      grunt.log.writeln(options.ref + ' at revision count ' + revision);

      done(true);
    });
  });
};
