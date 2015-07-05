var autoprefixer = require('autoprefixer-core');
var csswring = require('csswring');

module.exports = function (grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    postcss: {
      options: {
        map: false,
        processors: [
          // browsers: 'last 1 version'
          autoprefixer({browsers: ['> 0.9%', 'last 4 version']}).postcss,
          csswring.postcss
        ]
      },
      dist: {
        src: ['style.css'],
        dest: 'production/style.css'
      }
    }, // end postcss
    uglify: {
      options: {
        //        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          'production/sliderConcat.min.js': ['<%= concat.dist.dest %>']
        }
      }
    }, // end uglify
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: 'slider.js',
        dest: 'production/sliderConcat.js'
      }
    } // end concat
  }); // end initConfig()

  // Load the plugins that provides the "postcss" task, uglify, contact
  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');

  // Default task(s).
  grunt.registerTask('default', ['postcss', 'uglify', 'concat']);

  // Task invoked with 'grunt hello'
  grunt.registerTask('hello', 'grunt hello function', function () {
    grunt.log.write('Hello2\n').ok();
  });
};