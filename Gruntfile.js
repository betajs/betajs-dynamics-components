module.exports = function (grunt) {

    var pkg = grunt.file.readJSON('package.json');
    var gruntHelper = require('betajs-compile');
    var dist = 'betajs-dynamics-components';
    var betajsTemplates = require("grunt-betajs-templates");

    gruntHelper.init(pkg, grunt)

    .scopedclosurerevisionTask(null, "src/components/**/*.js", "dist/" + dist + "-noscoped.js", {
        "module": "global:BetaJS.Dynamics.Components",
        "base": "global:BetaJS",
        "browser": "global:BetaJS.Browser",
        "dynamics": "global:BetaJS.Dynamics",
        "ui": "global:BetaJS.UI"
    }, {
        "base:version": pkg.devDependencies.betajs,
        "browser:version": pkg.devDependencies["betajs-browser"],
        "dynamics:version": pkg.devDependencies["betajs-dynamics"],
        "ui:version": pkg.devDependencies["betajs-ui"]
    }, null, betajsTemplates.concatProcess(grunt))
    .concatTask('concat-scoped', [require.resolve("betajs-scoped"), 'dist/' + dist + '-noscoped.js'], 'dist/' + dist + '.js')
    .uglifyTask('uglify-noscoped', 'dist/' + dist + '-noscoped.js', 'dist/' + dist + '-noscoped.min.js')
    .uglifyTask('uglify-scoped', 'dist/' + dist + '.js', 'dist/' + dist + '.min.js')
    .packageTask()
    .jsbeautifyTask("beautify1", "src/**/**/**/**/*.js")
    .jsbeautifyTask("beautify2", "src/**/**/**/**/**/*.js")
    .jsbeautifyTask("beautify4", "src/**/**/**/**/**/**/**/*.js")
    .concatsassTask('concat-dist-css', [
        'src/global/**/*.scss',
        'src/**/*.scss'
    ], 'dist/' + dist + '.css')
    .cssminTask('cssmin-dist', 'dist/' + dist + '.css', 'dist/' + dist + '.min.css')

    /* Testing */
    .lintTask(null, ['./src/**/*.js', 'dist/' + dist + '-noscoped.js', 'dist/' + dist + '.js', './Gruntfile.js', './tests/**/*.js'])
    .browserqunitTask(null, 'tests/tests.html', true)

    /* Markdown Files */
    .readmeTask()
    .licenseTask();

    grunt.initConfig(gruntHelper.config);

    grunt.registerTask('default', ['package', 'readme', 'license', 'beautify1', 'beautify2', 'beautify4', 'scopedclosurerevision', 'concat-scoped', 'uglify-noscoped', 'uglify-scoped', 'concat-dist-css', 'cssmin-dist', 'lint']);
    grunt.registerTask('check', ['lint', 'browserqunit']);

};
