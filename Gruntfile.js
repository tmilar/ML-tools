// Generated on 2015-06-18 using generator-chrome-extension 0.3.1
"use strict";

// # Globbing
// for performance reasons we"re only matching one level down:
// "test/spec/{,*/}*.js"
// use this if you want to recursively match all subfolders:
// "test/spec/**/*.js"

module.exports = function (grunt) {

	// Load grunt tasks automatically
	require("load-grunt-tasks")(grunt);

	// Time how long tasks take. Can help when optimizing build times
	require("time-grunt")(grunt);

	// Configurable paths
	var config = {
		app: "src",
		dist: "dist"
	};

//	require("matchdep").filterAll("grunt-*").forEach(grunt.loadNpmTasks);
// elegir la de abajo o arriba

	grunt.loadNpmTasks('grunt-webpack');

	var webpack = require("webpack");
	var webpackConfig = require("./webpack.config.js");

	grunt.initConfig({

		// Project settings
		config: config,

		webpack: {
			options: webpackConfig,
			build: {
				plugins: webpackConfig.plugins.concat(
					new webpack.DefinePlugin({
						"process.env": {
							// This has effect on the react lib size
							"NODE_ENV": JSON.stringify("production")
						}
					}),
					new webpack.optimize.DedupePlugin(),
					new webpack.optimize.UglifyJsPlugin()
				)
			},
			"build-dev": {
				devtool: "sourcemap",
				debug: true
			}
		},
		"webpack-dev-server": {
			options: {
				webpack: webpackConfig,
				publicPath: "/" + webpackConfig.output.publicPath
			},
			start: {
				keepAlive: true,
				webpack: {
					devtool: "eval",
					debug: true
				}
			}
		},

		// Watches files for changes and runs tasks based on the changed files
		watch: {
			bower: {
				files: ["bower.json"],
				tasks: ["bowerInstall"]
			},
			js: {
				files: ["<%= config.app %>/{,*/}*.js"],
				tasks: ["jshint"],
				options: {
					livereload: "<%= connect.options.livereload %>"
				}
			},

			gruntfile: {
				files: ["Gruntfile.js"]
			},
			styles: {
				files: ["<%= config.app %>/styles/{,*/}*.css"],
				tasks: [],
				options: {
					livereload: "<%= connect.options.livereload %>"
				}
			},
			livereload: {
				options: {
					livereload: "<%= connect.options.livereload %>"
				},
				files: [
					"<%= config.app %>/*.html",
					"<%= config.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}",
					"<%= config.app %>/manifest.json",
					"<%= config.app %>/_locales/{,*/}*.json"
				]
			}
		},


		// Grunt server and debug server setting
		connect: {
			options: {
				port: 9000,
				livereload: 35729,
				// change this to "0.0.0.0" to access the server from outside
				hostname: "localhost"
			},
			chrome: {
				options: {
					open: false,
					base: [
						"<%= config.app %>"
					]
				}
			},
			test: {
				options: {
					open: false,
					base: [
						"test",
						"<%= config.app %>"
					]
				}
			}
		},

		// Empties folders to start fresh
		clean: {
			chrome: {
			},
			dist: {
				files: [
					{
						dot: true,
						src: [
							"<%= config.dist %>/*",
							"!<%= config.dist %>/.git*"
						]
					}
				]
			}
		},

		// Make sure code styles are up to par and there are no obvious mistakes
		jshint: {
			options: {

				jshintrc: ".jshintrc",
				reporter: require("jshint-stylish"),
				ignoreWarning: { //TODO fix, for some reason won"t work...
					options: {
						jshintrc: false,
						"-W098": true //ignore "defined but never used" warning
					},
					src: ["**/*.js"]
				},
				"-W098": true
			},
			all: [
				//"Gruntfile.js",
				"<%= config.src %>/{,*/}*.js",
				"!<%= config.app %>/lib/*"
				//"test/spec/{,*/}*.js"
			]
		},
//    mocha: {
//      all: {
//        options: {
//          run: true,
//          urls: ["http://localhost:<%= connect.options.port %>/index.html"]
//        }
//      }
//    },

		// Compiles Sass to CSS and generates necessary files if requested
//	  compass: {
//		  options: {
//			  sassDir: '<%= config.app %>/styles',
//			  cssDir: '<%= config.dist %>/styles',
//			  generatedImagesDir: '<%= config.dist %>/images/generated',
//			  imagesDir: '<%= config.app %>/images',
//			  javascriptsDir: '<%= config.app %>/scripts',
//			  fontsDir: '<%= config.app %>/styles/fonts',
//			  importPath: '<%= config.app %>/bower_components',
//			  httpImagesPath: '/images',
//			  httpGeneratedImagesPath: '/images/generated',
//			  httpFontsPath: '/styles/fonts',
//			  relativeAssets: false,
//			  assetCacheBuster: false
//		  },
//		  chrome: {
//			  options: {
//				  cssDir: '<%= config.app %>/styles',
//				  generatedImagesDir: '<%= config.app %>/images/generated',
//				  debugInfo: true
//			  }
//		  },
//		  dist: {
//		  },
//		  test: {
//		  }
//	  },

		// Automatically inject Bower components into the HTML file
		bowerInstall: {
			app: {
				src: [
					"<%= config.app %>/*.html"
				]
			}
		},

		// Reads HTML for usemin blocks to enable smart builds that automatically
		// concat, minify and revision files. Creates configurations in memory so
		// additional tasks can operate on them
		useminPrepare: {
			options: {
				dest: "<%= config.dist %>"
			},
			html: [
				"<%= config.app %>/popup.html",
				"<%= config.app %>/options.html"
			]
		},

		// Performs rewrites based on rev and the useminPrepare configuration
		usemin: {
			options: {
				assetsDirs: ["<%= config.dist %>", "<%= config.dist %>/images"]
			},
			html: ["<%= config.dist %>/{,*/}*.html"],
			css: ["<%= config.dist %>/styles/{,*/}*.css"]
		},

		// The following *-min tasks produce minifies files in the dist folder
		imagemin: {
			dist: {
				files: [
					{
						expand: true,
						cwd: "<%= config.app %>/images",
						src: "{,*/}*.{gif,jpeg,jpg,png}",
						dest: "<%= config.dist %>/images"
					}
				]
			}
		},

		svgmin: {
			dist: {
				files: [
					{
						expand: true,
						cwd: "<%= config.app %>/images",
						src: "{,*/}*.svg",
						dest: "<%= config.dist %>/images"
					}
				]
			}
		},

		htmlmin: {
			dist: {
				options: {
					// removeCommentsFromCDATA: true,
					// collapseWhitespace: true,
					// collapseBooleanAttributes: true,
					// removeAttributeQuotes: true,
					// removeRedundantAttributes: true,
					// useShortDoctype: true,
					// removeEmptyAttributes: true,
					// removeOptionalTags: true
				},
				files: [
					{
						expand: true,
						cwd: "<%= config.app %>",
						src: "*.html",
						dest: "<%= config.dist %>"
					}
				]
			}
		},

		// By default, your `index.html`"s <!-- Usemin block --> will take care of
		// minification. These next options are pre-configured if you do not wish
		// to use the Usemin blocks.
		// cssmin: {
		//   dist: {
		//     files: {
		//       "<%= config.dist %>/styles/main.css": [
		//         "<%= config.app %>/styles/{,*/}*.css"
		//       ]
		//     }
		//   }
		// },
		// uglify: {
		//   dist: {
		//     files: {
		//       "<%= config.dist %>/scripts/scripts.js": [
		//         "<%= config.dist %>/scripts/scripts.js"
		//       ]
		//     }
		//   }
		// },
		// concat: {
		//   dist: {}
		// },

		// Copies remaining files to places other tasks can use
		copy: {
			dist: {
				files: [
					{
						expand: true,
						dot: true,
						cwd: "<%= config.app %>",
						dest: "<%= config.dist %>",
						src: [
							"*.{ico,png,txt}",
							"images/{,*/}*.{webp,gif}",
							"{,*/}*.html",
							"styles/{,*/}*.css",
							"styles/fonts/{,*/}*.*",
							"_locales/{,*/}*.json"
						]
					}
				]
			}
		},

		// Run some tasks in parallel to speed up build process
		concurrent: {
			chrome: [
			],
			dist: [
				"imagemin",
				"svgmin"
			],
			test: [
			]
		},

		// Auto buildnumber, exclude debug files. smart builds that event pages
		chromeManifest: {
			dist: {
				options: {
					buildnumber: true,
					indentSize: 2,
					background: {
						target: "scripts/background.js",
						exclude: [
							"scripts/chromereload.js"
						]
					}
				},
				src: "<%= config.app %>",
				dest: "<%= config.dist %>"
			}
		},

		// Compres dist files to package
		compress: {
			dist: {
				options: {
					archive: function () {
						var manifest = grunt.file.readJSON("app/manifest.json");
						return "package/ML-tools-" + manifest.version + ".zip";
					}
				},
				files: [
					{
						expand: true,
						cwd: "dist/",
						src: ["**"],
						dest: ""
					}
				]
			}
		}
	});

	grunt.registerTask("debug", function () {
		grunt.task.run([
			"jshint",
			"concurrent:chrome",
			"connect:chrome",
			"watch"
		]);
	});

	// Build and watch cycle (another option for development)
	// Advantage: No server required, can run app from filesystem
	// Disadvantage: Requests are not blocked until bundle is available,
	//               can serve an old app on too fast refresh
	grunt.registerTask("dev", function () {
		grunt.task.run([
			"jshint",
			"webpack:build-dev",
			"watch"
		]);
	});

	grunt.registerTask("test", [
		"connect:test"
//    "mocha"
	]);

	grunt.registerTask("build", [
		"clean:dist",
		"webpack:build",
		"chromeManifest:dist",
		"useminPrepare",
		"concurrent:dist",
		// No UI feature selected, cssmin task will be commented
		// "cssmin",
		"concat",
		"uglify",
		"copy",
		"usemin"
//    "compress"
	]);

	grunt.registerTask("default", [
		"jshint",
		"test",
		"build"
	]);

};
