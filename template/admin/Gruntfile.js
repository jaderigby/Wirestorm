'use strict';

	var poststylus = function() {
		return require('poststylus')(['lost'])
	};


	module.exports = function(grunt) {

		grunt.initConfig({
			pkg: grunt.file.readJSON('package.json'),
			pageContent: grunt.file.readJSON('__data__/content.json'),

			pug: {
				dev: {
					options: {
						pretty: true,
						data: {
							enviro: 'dev',
							devRoot: '/',
							pageData: '<%= pageContent %>',
							debug: false
						}
					},
					files: [{
						expand: true,
						cwd: '__pages__/',
						src: '*.pug',
						dest: '<%= pkg.dev.html.path %>',
						ext: '.<%= pkg.dev.html.ext %>'
					}]
				},
				dist: {
					options: {
						pretty: true,
						data: {
							enviro: 'dist',
							distRoot: '<%= pkg.dist.root %>',
							pageData: '<%= pageContent %>',
							debug: false
						}
					},
					files: [{
						expand: true,
						cwd: '__pages__/',
						src: '*.pug',
						dest: '<%= pkg.dist.html.path %>',
						ext: '.<%= pkg.dist.html.ext %>'
					}]
				},
			},
			stylus: {
				dev: {
					options: {
						compress: false,
						use: [
							require('nib'),
							require('rupture'),
							poststylus
						]
					},
					files: {
						'<%= pkg.dev.css.path %>': '__styles__/*.styl'
					}
				},
				dist: {
					options: {
						compress: false,
						use: [
							require('nib'),
							require('rupture'),
							poststylus
						]
					},
					files: {
						'<%= pkg.dist.css.path %>': '__styles__/*.styl'
					}
				}
			},
			exec: {
				dev: {
					cmd: 'sed -i -e "s/https\:/http\:/g" "<%= pkg.dev.css.path %>"'
				},
				dist: {
					cmd: 'scp <%= pkg.dev.js.directory %>\{<%= pkg.dist.js.files %>\} <%= pkg.dist.js.directory %> && scp <%= pkg.dev.css.directory %>\{<%= pkg.dist.css.files %>\} <%= pkg.dist.css.directory %> && sed -i -e "s/http\:/https\:/g" "<%= pkg.dist.css.path %>" && scp -r <%= pkg.dev.images.directory %> <%= pkg.dist.images.directory %>'
				}
			},

			watch: {
				pages: {
					files: ['__pages__/*.pug'],
					tasks: ['newer:pug:dev'],
					options: {
						livereload: true,
					},
				},
				core: {
					files: ['__pages__/__core__/*.pug'],
					tasks: ['pug:dev'],  // Full rebuild for development when core files change
					options: {
						livereload: true,
					},
				},
				stylus: {
					files: ['__styles__/*.styl'],
					tasks: 'stylus',
					options: {
						livereload: true,
					},
				}
			}
		});

		require('load-grunt-tasks')(grunt);

		grunt.registerTask('default',['watch']);
		grunt.registerTask('dev', ['pug:dev', 'stylus:dev', 'exec:dev']);
		grunt.registerTask('dist', ['pug:dist', 'stylus:dist', 'exec:dist']);

	};