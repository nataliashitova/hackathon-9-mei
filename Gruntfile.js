/*global module:false*/
module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    copy: {
      main: {
        files: [
          // includes files within path
          {expand: true, cwd: 'source-files/', src: ['**'], dest: 'temp/assets/', filter: 'isFile'},
     
          // includes files within path and its sub-directories
          {expand: true, src: ['index.html'], dest: 'temp/'},
        ],
      },
    },
    sass: {                              
      dist: {
        options: {
          style: 'expanded',
          sourcemap: 'none'
        },
        files: {                           
          'temp/assets/css/style.css': 'temp/assets/css/style.scss',
          'temp/assets/css/conditional-style.css': 'temp/assets/css/conditional-style.scss',
        }
      }
    },
    compress: {
      main: {
        options: {
          archive: 'zips/task2.zip'
        },
        files: [
          {src: ['temp/**', "!**/*.scss"]},
        ]
      }
    }
  });

  // Load tasks here.
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-compress');

  // Define aliases here.
  grunt.registerTask('default', 'My default task description', function() {
    grunt.log.writeln( 'This is the default grunt task, create a new task and configure.' );
  });
  grunt.registerTask('task2', ['copy','sass','compress']);
};
