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
          { expand: true, cwd: 'source-files/', src: ['*/**'], dest: 'temp/assets/', filter: 'isFile' },
          { expand: true, cwd: 'source-files/', src: [ 'index.php' ], dest: 'temp/', filter: 'isFile' }
          //index must not be moved to assets but remain in root. 

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
          archive: 'zips/artifact.zip'
        },
        files: [
          {src: ['temp/**', "!**/*.scss"]},
        ]
      }
    },
    babel: {
      options: {
        presets: ["minify"]
      },
      dist: {
        files: {
          'temp/assets/js/script.js': 'temp/assets/js/script.js', //dest: src
          'temp/assets/js/conditional-script.js': 'temp/assets/js/conditional-script.js'
        }
      }
    }
  });

  // Load tasks here.
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('babel-preset-minify');
  grunt.loadNpmTasks('grunt-babel');
  
  // Define aliases here.
  grunt.registerTask('default', 'My default task description', function() {
    grunt.log.writeln( 'This is the default grunt task, create a new task and configure.' );
  });
  grunt.registerTask('artifact', ['copy','sass', 'babel', 'compress']);
};
