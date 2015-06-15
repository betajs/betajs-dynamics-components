module.banner = '/*!\n<%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\nCopyright (c) <%= pkg.contributors %>\n<%= pkg.license %> Software License.\n*/\n';

module.exports = function(grunt) {

	grunt
		.initConfig({
			pkg : grunt.file.readJSON('package.json'),
			'revision-count' : {
				options : {
					property : 'revisioncount',
					ref : 'HEAD'
				}
			},
			concat : {
				options : {
					banner : module.banner
				},
				dist_raw : {
					dest : 'dist/betajs-dynamics-components-raw.js',
					src : [
						'src/fragments/begin.js-fragment',
						'dist/betajs-dynamics-components-templates.js',
						'src/environment/config/components.js',
						'src/components/**/*.js',
						'src/environment/environment/**/*.js',
						'src/fragments/end.js-fragment'
					]
				},
				dist_scoped : {
					dest : 'dist/betajs-dynamics-components.js',
					src : [ 'vendors/scoped.js',
						'dist/betajs-dynamics-components-noscoped.js',
					]
				},
				dist_scss: {
					dest: 'dist/betajs-dynamics-components.scss',
					src: [
						'src/global/**/*.scss',
						'src/**/*.scss'
					]
				}
			},
			sass: {
				dist: {
					files: {
						'dist/betajs-dynamics-components.css': 'dist/betajs-dynamics-components.scss'
					}
				}
			},
			preprocess : {
				options : {
					context : {
						MAJOR_VERSION : '<%= revisioncount %>',
						MINOR_VERSION : (new Date()).getTime()
					}
				},
				dist : {
					src : 'dist/betajs-dynamics-components-raw.js',
					dest : 'dist/betajs-dynamics-components-noscoped.js'
				}
			},
			clean : {
				raw: "dist/betajs-dynamics-components-raw.js",
				templates: "dist/betajs-dynamics-components-templates.js"
			},
			uglify : {
				options : {
					banner : module.banner
				},
				dist : {
					files : {
						'dist/betajs-dynamics-components-noscoped.min.js' : [ 'dist/betajs-dynamics-components-noscoped.js' ],
						'dist/betajs-dynamics-components.min.js' : [ 'dist/betajs-dynamics-components.js' ]
					}
				}
			},
			jshint : {
				options: {
					es5: false,
					es3: true
				},
				source : [ "./src/**/*.js"],
				dist : [ "./dist/betajs-dynamics-components-noscoped.js", "./dist/betajs-dynamics-components.js" ],
				gruntfile : [ "./Gruntfile.js" ],
				tests: [  ]
			},
			wget : {
				dependencies : {
					options : {
						overwrite : true
					},
					files : {
						"./vendors/jquery-hashchange.js" : "http://cdn.rawgit.com/cowboy/jquery-hashchange/master/jquery.ba-hashchange.js",
						"./vendors/scoped.js" : "https://raw.githubusercontent.com/betajs/betajs-scoped/master/dist/scoped.js",
						"./vendors/beta.js" : "https://raw.githubusercontent.com/betajs/betajs/master/dist/beta.js",
						"./vendors/betajs-ui.js" : "https://raw.githubusercontent.com/betajs/betajs-ui/master/dist/beta-ui.js",
						"./vendors/beta-browser-noscoped.js" : "https://raw.githubusercontent.com/betajs/betajs-browser/master/dist/beta-browser-noscoped.js",
						"./vendors/betajs-dynamics-noscoped.js" : "https://raw.githubusercontent.com/betajs/betajs-dynamics/master/dist/betajs-dynamics-noscoped.js",
						"./vendors/jquery-1.9.closure-extern.js" : "https://raw.githubusercontent.com/google/closure-compiler/master/contrib/externs/jquery-1.9.js"
					}
				}
			},
			shell : {
				tests: {
					command: "open tests/tests.html"
				}
			},
			cssmin: {
				target: {
					files: {
						'dist/betajs-dynamics-components.css.min': 'dist/betajs-dynamics-components.css'
					}
				}
			},
			jsdoc : {
				dist : {
					src : [ './README.md', './src/*/*.js' ],
					options : {
						destination : 'docs',
						template : "node_modules/grunt-jsdoc/node_modules/ink-docstrap/template",
						configure : "./jsdoc.conf.json",
						tutorials: "./docsrc/tutorials",
						recurse: true
					}
				}
			},
			template : {
				"readme" : {
					options : {
						data: {
							indent: "",
							framework: grunt.file.readJSON('package.json')
						}
					},
					files : {
						"README.md" : ["readme.tpl"]
					}
				}
			},
			betajs_templates: {
				dist: {
					files: {
						"dist/betajs-dynamics-components-templates.js": [
							"src/**/*.html"
						]
					},
					options: {
						namespace: 'BetaJS.Dynamics.Dynamic.Components.Templates'
					}
				}
			},
			watch: {
				scripts: {
					files: ['src/**/*.js', 'src/**/*.scss', 'src/**/*.html'],
					tasks: ['default'],
					options: {
						spawn: false,
						livereload: 1337
					}
				}
			}
		});

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-git-revision-count');
	grunt.loadNpmTasks('grunt-preprocess');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-wget');
	grunt.loadNpmTasks('grunt-closure-tools');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-node-qunit');
	grunt.loadNpmTasks('grunt-jsdoc');
	grunt.loadNpmTasks('grunt-shell');
	grunt.loadNpmTasks('grunt-template');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-betajs-templates');

	grunt.registerTask('default', [ 'revision-count', "betajs_templates", 'concat:dist_raw', 'concat:dist_scss', 'sass:dist',
		'preprocess', 'clean:raw', 'clean:templates', /*"cssmin",*/ 'concat:dist_scoped'/*, 'uglify'*/ ]);
	grunt.registerTask('qunit', [ 'shell:tests' ]);
	grunt.registerTask('lint', [ 'jshint:source', 'jshint:dist',
		'jshint:gruntfile', "jshint:tests" ]);
	grunt.registerTask('check', [ 'lint', 'qunit' ]);
	grunt.registerTask('dependencies', [ 'wget:dependencies' ]);
	grunt.registerTask('readme', [ 'template:readme' ]);
	grunt.registerTask('server',[
		'connect'
	]);

};