'use strict';
var LIVERELOAD_PORT = 35729;
var lrSnippet = require('connect-livereload')({port: LIVERELOAD_PORT});
var mountFolder = function (connect, dir) {
    return connect.static(require('path').resolve(dir));
};

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to match all subfolders:
// 'test/spec/**/*.js'
// templateFramework: 'lodash'

module.exports = function (grunt) {
    // show elapsed time at the end
    require('time-grunt')(grunt);
    // load all grunt tasks
    require('load-grunt-tasks')(grunt);

    // configurable paths
    var yeomanConfig = {
        app: 'app',
        dist: 'dist',
		pgdebug: 'debug'
    };

    grunt.initConfig({
        yeoman: yeomanConfig,
        watch: {
            options: {
                nospawn: true
            },
            coffee: {
                files: ['<%= yeoman.app %>/scripts/{,*/}*.coffee'],
                tasks: ['coffee:dist']
            },
            coffeeTest: {
                files: ['test/spec/{,*/}*.coffee'],
                tasks: ['coffee:test']
            },
            compass: {
                files: ['<%= yeoman.app %>/styles/{,*/}*.{scss,sass}'],
                tasks: ['compass']
            },
            livereload: {
                options: {
                    livereload: LIVERELOAD_PORT
                },
                files: [
                    '<%= yeoman.app %>/*.html',
                    '{.tmp,<%= yeoman.app %>}/styles/{,*/}*.css',
                    '{.tmp,<%= yeoman.app %>}/scripts/{,*/}*.js',
                    '<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp}'
                ]
            },
            jst: {
                files: [
                    '<%= yeoman.app %>/scripts/templates/*.ejs'
                ],
                tasks: ['jst']
            }
        },
        connect: {
            options: {
                port: 9000,
                // change this to '0.0.0.0' to access the server from outside
                hostname: 'localhost'
            },
            livereload: {
                options: {
                    middleware: function (connect) {
                        return [
                            lrSnippet,
                            mountFolder(connect, '.tmp'),
                            mountFolder(connect, yeomanConfig.app)
                        ];
                    }
                }
            },
            test: {
                options: {
                    middleware: function (connect) {
                        return [
                            mountFolder(connect, '.tmp'),
                            mountFolder(connect, 'test'),
                            mountFolder(connect, yeomanConfig.app)
                        ];
                    }
                }
            },
            dist: {
                options: {
                    middleware: function (connect) {
                        return [
                            mountFolder(connect, yeomanConfig.dist)
                        ];
                    }
                }
            }
        },
        open: {
            server: {
                path: 'http://localhost:<%= connect.options.port %>'
            }
        },
        clean: {
            dist: ['.tmp', '<%= yeoman.dist %>/*'],
            server: '.tmp',
			debug: ['.tmp', '<%= yeoman.pgdebug %>/**']
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: [
                'Gruntfile.js',
                '<%= yeoman.app %>/scripts/{,*/}*.js',
                '!<%= yeoman.app %>/scripts/vendor/*',
                'test/spec/{,*/}*.js'
            ]
        },
        mocha: {
            all: {
                options: {
                    run: true,
                    urls: ['http://localhost:<%= connect.options.port %>/index.html']
                }
            }
        },
        coffee: {
            dist: {
                files: [{
                    // rather than compiling multiple files here you should
                    // require them into your main .coffee file
                    expand: true,
                    cwd: '<%= yeoman.app %>/scripts',
                    src: '{,*/}*.coffee',
                    dest: '.tmp/scripts',
                    ext: '.js'
                }]
            },
            test: {
                files: [{
                    expand: true,
                    cwd: 'test/spec',
                    src: '{,*/}*.coffee',
                    dest: '.tmp/spec',
                    ext: '.js'
                }]
            }
        },
        compass: {
            options: {
                sassDir: '<%= yeoman.app %>/styles',
                cssDir: '.tmp/styles',
                imagesDir: '<%= yeoman.app %>/images',
                javascriptsDir: '<%= yeoman.app %>/scripts',
                fontsDir: '<%= yeoman.app %>/styles/fonts',
                importPath: '<%= yeoman.app %>/bower_components',
                relativeAssets: true
            },
            dist: {},
			debug: {},
            server: {
                options: {
                    debugInfo: true
                }
            }
        },
        requirejs: {
            dist: {
                // Options: https://github.com/jrburke/r.js/blob/master/build/example.build.js
                options: {
                    // `name` and `out` is set by grunt-usemin
                    baseUrl: '<%= yeoman.app %>/scripts',
                    optimize: 'none',
                    paths: {
                        'templates': '../../.tmp/scripts/templates'
                    },
                    // TODO: Figure out how to make sourcemaps work with grunt-usemin
                    // https://github.com/yeoman/grunt-usemin/issues/30
                    //generateSourceMaps: true,
                    // required to support SourceMaps
                    // http://requirejs.org/docs/errors.html#sourcemapcomments
                    preserveLicenseComments: false,
                    useStrict: true,
                    wrap: true
                    //uglify2: {} // https://github.com/mishoo/UglifyJS2
                }
            },
			debug: {
                options: {
                    baseUrl: '<%= yeoman.app %>/scripts',
                    optimize: 'none',
                    paths: {
                        'templates': '../../.tmp/scripts/templates'
                    },
                    useStrict: true,
                    wrap: true
                    //uglify2: {} // https://github.com/mishoo/UglifyJS2
                }
			}
        },
        useminPrepare: {
            html: '<%= yeoman.app %>/index.html',
            options: {
                dest: '<%= yeoman.dist %>'
            }
        },
        usemin: {
            html: ['<%= yeoman.dist %>/{,*/}*.html'],
            css: ['<%= yeoman.dist %>/styles/{,*/}*.css'],
            options: {
                dirs: ['<%= yeoman.dist %>']
            }
        },
        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>/images',
                    src: '{,*/}*.{png,jpg,jpeg}',
                    dest: '<%= yeoman.dist %>/images'
                }]
            }
        },
        cssmin: {
            dist: {
                files: {
                    '<%= yeoman.dist %>/styles/main.css': [
                        '.tmp/styles/{,*/}*.css',
                        '<%= yeoman.app %>/styles/{,*/}*.css'
                    ]
                }
            }
        },
        htmlmin: {
            dist: {
                options: {
                    /*removeCommentsFromCDATA: true,
                    // https://github.com/yeoman/grunt-usemin/issues/44
                    //collapseWhitespace: true,
                    collapseBooleanAttributes: true,
                    removeAttributeQuotes: true,
                    removeRedundantAttributes: true,
                    useShortDoctype: true,
                    removeEmptyAttributes: true,
                    removeOptionalTags: true*/
                },
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>',
                    src: '*.html',
                    dest: '<%= yeoman.dist %>'
                }]
            }
        },
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= yeoman.app %>',
                    dest: '<%= yeoman.dist %>',
                    src: [
                        '*.{ico,txt}',
                        '.htaccess',
                        'images/{,*/}*.{webp,gif}',
						'scripts/nls/*.js',
						'scripts/nls/he-il/*.js'
                    ]
                }]
            },
			debug: {
				files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= yeoman.app %>',
                    dest: '<%= yeoman.pgdebug %>',
                    src: [
                        'bower_components/**/*.js',
						'images/**',
						'scripts/**',
						'templates/**',
						'*',
						'!.idea**'
                    ]
                }, {
					src: '.tmp/styles/main.css',
                    dest: '<%= yeoman.pgdebug %>/styles/main.css'  
				}]
			}
        },
        bower: {
            all: {
                rjsConfig: '<%= yeoman.app %>/scripts/config.js'
            }
        },
        jst: {
            options: {
                amd: true
            },
            compile: {
                files: {
                    '.tmp/scripts/templates.js': ['<%= yeoman.app %>/scripts/templates/*.ejs']
                }
            }
        },
        rev: {
            dist: {
                files: {
                    src: [
                        //'<%= yeoman.dist %>/scripts/{,*/}*.js',
						'<%= yeoman.dist %>/scripts/main.js',
                        '<%= yeoman.dist %>/styles/{,*/}*.css',
                        '<%= yeoman.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp}',
                        '<%= yeoman.dist %>/styles/fonts/*'
                    ]
                }
            }
        },
		// https://npmjs.org/package/grunt-phonegap
		phonegap: {
			config: {
			  root: 'debug', // Point phonegap.config.root to the output of your other build steps (where your index.html file is located)
			  config: 'debug/config.xml', // Point phonegap.config.config to your config.xml file.
			  cordova: 'phonegap/.cordova', // phonegap.config.cordova should be the .cordova directory that is generated by phonegap create. It must contain a config.json file or your app cannot be built.
			  path: 'phonegap_build', // working directory for the phonegap build process
			  //plugins: ['/local/path/to/plugin', 'http://example.com/path/to/plugin.git'],
			  platforms: ['android'],
			  maxBuffer: 200, // You may need to raise this for iOS.
			  verbose: true,
			  releases: 'releases',
			  releaseName: function(){
				var pkg = grunt.file.readJSON('package.json');
				return(pkg.name + '-' + pkg.version);
			  },
			  androidMinSdkVersion: 7

			  // Add a key if you plan to use the `release:android` task
			  // See http://developer.android.com/tools/publishing/app-signing.html
			  /*
			  key: {
				store: 'release.keystore',
				alias: 'release',
				aliasPassword: function(){
				  // Prompt, read an environment variable, or just embed as a string literal
				  return('');
				},
				storePassword: function(){
				  // Prompt, read an environment variable, or just embed as a string literal
				  return('');
				}
			  },

			  // Set an app icon at various sizes (optional)
			  icon: {
				ldpi: 'icon-36-ldpi.png',
				mdpi: 'icon-48-mdpi.png',
				hdpi: 'icon-72-hdpi.png',
				xhdpi: 'icon-96-xhdpi.png'
			  },

			  // Android-only integer version to increase with each release.
			  // See http://developer.android.com/tools/publishing/versioning.html
			  versionCode: function(){ return(1) }
			  */
			}
		}
    });
	
	grunt.loadNpmTasks('grunt-phonegap');

    grunt.registerTask('createDefaultTemplate', function () {
        grunt.file.write('.tmp/scripts/templates.js', 'this.JST = this.JST || {};');
    });

    grunt.registerTask('server', function (target) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'open', 'connect:dist:keepalive']);
        } else if (target === 'test') {
            return grunt.task.run([
                'clean:server',
                'coffee',
                'createDefaultTemplate',
                'jst',
                'compass:server',
                'connect:test:keepalive'
            ]);
        }

        grunt.task.run([
            'clean:server',
            'coffee:dist',
            'createDefaultTemplate',
            'jst',
            'compass:server',
            'connect:livereload',
            'open',
            'watch'
        ]);
    });

    grunt.registerTask('test', [
        'clean:server',
        'coffee',
        'createDefaultTemplate',
        'jst',
        'compass',
        'connect:test',
        'mocha'
    ]);

	// Release build
    grunt.registerTask('build', [
        'clean:dist',
        'coffee',
        'createDefaultTemplate',
        'jst',
        'compass:dist',
        'useminPrepare',
        'requirejs:dist',
        'imagemin',
        'htmlmin',
        'concat',
        'cssmin',
        'uglify',
        'copy',
        'rev',
        'usemin'
    ]);
	
	// Debug build
	grunt.registerTask('dbuild', [
        'clean:debug',
		'compass:debug',
		'copy:debug',
    ]);
	
	// Phonegap build
	grunt.registerTask('pgbuild', [
        'dbuild',
		'phonegap:build'
    ]);
	
	grunt.registerTask('runOnAndroidDevice', function () {
        var exec = require('child_process').exec,
			child,
			done = grunt.task.current.async(); // Tells Grunt that an async task is complete

		var apk_path = 'phonegap_build/platforms/android/bin/CheckAndDate-debug.apk';
		child = exec('adb install -r ' + apk_path, {
			},
			function(error, stdout, stderr){
				grunt.log.writeln('stdout: ' + stdout);
				grunt.log.writeln('stderr: ' + stderr);
				done(error);
			}
		);
    });
	
	// Phonegap build and run (on Android only!)
	grunt.registerTask('pgrun', [
        'pgbuild',
		'runOnAndroidDevice'
    ]);

    grunt.registerTask('default', [
        'jshint',
        'test',
        'build'
    ]);
};
