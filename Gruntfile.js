'use strict';

module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		jade: {
			compile: {
				options: {
					data: {
						debug: false
					}
				},
				files: [{
					expand: true,
					cwd: '__jade__/app/',
					src: '*.jade',
					dest: 'html/',
					ext: '.html'
				}]
			}
		},
		stylus: {
			compile: {
				options: {
					use: [
						require('jeet'),
						require('nib'),
						require('rupture')
					]
				},
				files: {
					'css/main.css': '__stylus__/*.styl'
				}
			}
		},

		watch: {
			jade: {
				files: ['__jade__/*.jade', '__jade__/app/*.jade'],
				tasks: 'jade'
			},
			stylus: {
				files: ['__stylus__/*.styl'],
				tasks: 'stylus'
			}
		}
	});

  require('load-grunt-tasks')(grunt);

  grunt.registerTask('default',['watch']);

};