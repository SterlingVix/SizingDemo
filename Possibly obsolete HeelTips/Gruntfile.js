module.exports = function (grunt) {
  // Load grunt tasks automatically, when needed
  require('jit-grunt')(grunt, {
    useminPrepare: 'grunt-usemin',
    buildcontrol: 'grunt-build-control'
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');


  ////////////////////////////////////////////////////
  // Main configuration tasks
  ////////////////////////////////////////////////////

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

        clean: {
      default: { // name that appears on this task. You can add more argument names at this heirarchy
        files: {
          src: 'min/*.*'
        }
      }
    }, // end clean

    stylus: { // Compiles Stylus to CSS
      compile: {
        options: {
          paths: [
            'client/bower_components',
            'client/app/**/*.styl',
            'client/components'
          ],
          "include css": true
        },
        files: {
          'client/app/app.css': 'client/app/app.styl'
        }
      } // end compile
    }, // end stylus

    // injector: {
    //   options: {
    //   },
    //   // Inject component styl into app.styl
    //   stylus: {
    //     options: {
    //       transform: function(filePath) {
    //         filePath = filePath.replace('/client/app/', '');
    //         filePath = filePath.replace('/client/components/', '');
    //         return '@import \'' + filePath + '\';';
    //       },
    //       starttag: '// injector',
    //       endtag: '// endinjector'
    //     },
    //     files: {
    //       'client/app/app.styl': [
    //         'client/{app,components}/**/*.styl',
    //         '!client/app/app.styl'
    //       ]
    //     }
    //   }, // end stylus

    //   // Inject component css into index.html
    //   css: {
    //     options: {
    //       transform: function(filePath) {
    //         filePath = filePath.replace('/client/', '');
    //         filePath = filePath.replace('/.tmp/', '');
    //         return '<link rel="stylesheet" href="' + filePath + '">';
    //       }, // transform
    //       starttag: '<!-- injector:css -->',
    //       endtag: '<!-- endinjector -->'
    //     },
    //     files: {
    //       'client/index.html': [
    //         'client/{app,components}/**/*.css'
    //       ]
    //     }
    //   } // end css
    // }, // end injector


    // Automatically inject Bower components into the app
    wiredep: {
      target: {
        src: 'client/index.html',
        ignorePath: 'client/',
        exclude: [/bootstrap-sass-official/, /bootstrap.js/, '/json3/', '/es5-shim/', /bootstrap/]
      }
    }, // wiredep

    autoprefixer: {
      options: {
        browsers: ['> 1%']
      },
      dist: {
        files: {
          'client/app/app.build.css' : 'client/app/app.css'
        }
      }
    },

    concat: { // concatenate js and css files
      options: {
        separator: ';'
      },
      js: {
        src: ['client/**/*.js', '!client/**/*.cat.js', '!client/**/*.min.js', '!client/bower_components/**/*.*'],
        dest: 'client/app/min/app.cat.js'
      }, // end .js
    }, // end concat

    cssmin: { // minifies css
      options: {
        keepSpecialComments: 0
      },
      css: {
        files: [{
          src: ['client/app/app.build.css', '!client/**/*.min.css'],
          dest: 'client/app/min/app.min.css'
        }] // end files[]
      }
    }, // end cssmin

    uglify: { // minifies js
      options: {
        banner: '/*! Aaron, Kelly, & Wai-Yin. Uglified by Grunt. <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      js: {
        files: [{
          src: ['client/app/min/app.cat.js',
          '!client/**/*.min.js',
          '!client/bower_components'],
          dest: 'client/app/min/app.min.js'
        }] // end files[]
      }
    }, // end uglify

    watch: {
      stylus: {
        files: ['client/app/**/*.styl', 'client/components/**/*.styl'],
        tasks: ['cssmin'] // , 'autoprefixer']
      }, // end stylus
      gruntfile: {
        files: ['Gruntfile.js']
      }, // end gruntfile
      livereload: {
        files: [
          'client/app/**/*.css', 'client/components/**/*.css',
          'client/app/**/*.html', 'client/components/**/*.html',
          'client/app/**/*.js', 'client/components/**/*.js',
          '!client/app/**/*.spec.js', '!client/components/**/*.spec.js',
          '!client/app/**/*.mock.js', '!client/components/**/*.mock.js',
        ],
        options: {
          livereload: true
        }
      }, // end livereload
      express: {
        files: [
          'server/**/*.js'
        ],
        tasks: ['express:dev', 'wait'],
        options: {
          livereload: true,
          nospawn: true // Without this option specified express won't be reloaded
        }
      }, // end express
    }, // end watch

    exec: { // executes on the command line
      startExec: {
        cmd: 'echo " = = = = Installing NPM and Bower components = = = ="'
      },
      appception: {
        command: 'bower install --recursive' // install bower but NOT npm, or we'll be in a loop!!!
      },
      nimble: {  // package
        cwd: './nimble',
        command: 'npm install --recursive && grunt build'
      },
      extensibility: {  // Including - I think Nimble pulls in brackets dependencies from here...
        cwd: './nimble/src/extensibility/node',
        command: 'npm install --recursive'
      },
      mustache: {  // package
        cwd: './nimble/src/thirdparty/mustache',
        command: 'npm install --recursive'
      },
      acorn: {  // package
        cwd: './nimble/src/extensions/default/JavaScriptCodeHints/thirdparty/acorn',
        command: 'npm install --recursive'
      },
      tern: {  // package
        cwd: './nimble/src/extensions/default/JavaScriptCodeHints/thirdparty/tern',
        command: 'npm install --recursive'
      },
      makedriveSyncIcon: {  // package  &&  bower
        cwd: './nimble/src/extensions/default/makedrive-sync-icon',
        command: 'npm install --recursive --force'
      },
      codemirror: {  // package  &&  bower
        cwd: './nimble/src/thirdparty/CodeMirror2',
        command: 'npm install --recursive && bower install --recursive'
      },
      makedrive: {  // package  &&  bower
        cwd: './nimble/src/thirdparty/makedrive',
        command: 'npm install --recursive && bower install --recursive'
      },
      requirejs: {  // package
        cwd: './nimble/src/thirdparty/requirejs',
        command: 'npm install --recursive'
      },
      text: {  // NO INSTALL package. Keeping for reference to "main" in package.json (which may be meaningless)
        cwd: './nimble/src/thirdparty/text',
        command: 'npm install --recursive'
      }
    } // end exec
  }); // end initConfig()


  /**********************************************
   *     Grunt tasks
   *********************************************/

  // Used for delaying livereload until after server has restarted
  grunt.registerTask('wait', function() {
    grunt.log.ok('Waiting for server reload...');

    var done = this.async();

    setTimeout(function() {
      grunt.log.writeln('Done waiting!');
      done();
    }, 1500);
  });

  grunt.registerTask('express-keepalive', 'Keep grunt running', function() {
    this.async();
  });

  grunt.registerTask('test', [
    'exec',
    'exec:changeDir'
    // 'injector',
    // 'wiredep',
    // 'useminPrepare',
    // 'autoprefixer',
    // 'ngtemplates',
    // 'ngAnnotate',
    // 'cdnify',
    // 'usemin'
  ]);

  grunt.registerTask('build', [
    'clean',
    'stylus',
    'autoprefixer',
    'concat',
    'cssmin',
    'uglify'
  ]);

  grunt.registerTask('serve', function(target) {
    if (target === 'production') {
      return grunt.task.run([
      'express:dev',
      'wait',
      'open'
    ])}

    else if (target === 'local') {
      return grunt.task.run([
        'express:dev',
        'wait',
        'open',
        'watch'
    ])}
  }); // end 'serve'

  grunt.registerTask('deploy', [
    'build',
    'exec'
    //'serve:production'
  ]);

  grunt.registerTask('default', [
    'build',
    'serve:local'
  ]);
}; // end Gruntfile
