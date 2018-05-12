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
        "base:version": pkg.dependencies.betajs,
        "browser:version": pkg.dependencies["betajs-browser"],
        "dynamics:version": pkg.dependencies["betajs-dynamics"],
        "ui:version": pkg.dependencies["betajs-ui"]
    }, null, betajsTemplates.concatProcess(grunt))
    .concatTask('concat-scoped', [require.resolve("betajs-scoped"), 'dist/' + dist + '-noscoped.js'], 'dist/' + dist + '.js')
    .concatTask('concat-simulator-js', ["simulator/tests/**/*.js"], 'simulator/dist/scripts.js')
    .concatsassTask('concat-simulator-css', [
        'src/global/**/*.scss',
        'simulator/tests/**/*.scss',
        'tests/demotests/**/*.scss'
    ], 'simulator/dist/styles.css')
    .uglifyTask('uglify-noscoped', 'dist/' + dist + '-noscoped.js', 'dist/' + dist + '-noscoped.min.js')
    .uglifyTask('uglify-scoped', 'dist/' + dist + '.js', 'dist/' + dist + '.min.js')
    .packageTask()
    .autoincreasepackageTask(null, "package-source.json")
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

    grunt.registerTask('default', ['autoincreasepackage', 'package', 'readme', 'license', 'beautify1', 'beautify2', 'beautify4', 'scopedclosurerevision', 'concat-scoped', 'uglify-noscoped', 'uglify-scoped', 'concat-dist-css', 'cssmin-dist', 'lint', 'simulator']);
    grunt.registerTask('simulator', ['concat-simulator-js', 'concat-simulator-css']);
    grunt.registerTask('tests', ['browserqunit']);
    grunt.registerTask('check', ['lint', 'browserqunit']);

};
