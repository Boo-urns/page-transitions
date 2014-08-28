module.exports = function(grunt) {
 
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        sass: {
            dist: {
                // NO POINT IN COMPRESSING SINCE AUTOPREFIXER UNCOMPRESSES 
                // - WE RECOMPRESS WITH CSSO
                options: {
                    style: 'compressed'
                },
                files: {
                    'css/main.css': 'scss/main.scss'
                }
            }
        },

        autoprefixer: {
            dist: {
                options: {
                  browsers: ['last 2 version', 'ie 8'],
                  flatten: true
                },
                files: {
                    'css/main.css': 'css/main.css'
                }
            }
        },
        // concat: {
        //     dist: {
        //         src: [
        //             'js/libs/*.js', // ALL JS in libs folder (jquery / modernizr)
        //             'js/global.js'  // Global contains: Dropdown, Slidemenu and Hiding the main nav
        //         ],
        //         dest: 'js/build/production.js'
        //     }
        // },
        csso: {             // BECAUSE autoprefixer uncompresses files we need to recompress!
            compress: {
                options: {
                    report: 'min'
                },
                files: {
                    'css/build/main.css': 'css/main.css'
                }
            }
        },

        // uglify: {
        //     // UGLIFYING CONCATENATED JAVASCRIPT FILES
        //     build: {
        //         src: 'js/build/production.js',
        //         dest: 'js/build/production.min.js'
        //     }
        // },
        // uncss: {
        //   dist: {
        //     src: ['index2.php', 'default-template.php', 'default-template-3-col.php'],
        //     dest: 'css/dist/tidy.css',
        //     options: {
        //       report: 'min' // optional: include to report savings
        //     }
        //   }
        // },
        watch: {
            options: {
                livereload: true
            },
            css: {
                files: ['*.scss', 'scss/*.scss'],
                tasks: ['sass', 'autoprefixer', 'csso'],
                options: {
                    spawn: false
                }
            },
            html: {
                files: ['index.html'],
                options: {
                    livereload: true
                }
            },
            // scripts: {
            //     files: ['js/*.js'],
            //     tasks: ['concat', 'uglify'],
            //     options: {
            //         spawn: false
            //     }
            // }
        }

    });

    var register_arr = [],
           lastIndex = 0;
    
    Object.keys(require('./package.json').devDependencies).forEach(function(dep) {
      if(dep.substring(0,6) === "grunt-") {
        grunt.loadNpmTasks(dep);
      }
      
      // Only works with grunt-contrib-NAME or grunt-NAME NOT grunt-NAME-NAME
      lastIndex = dep.lastIndexOf('-');
      if(lastIndex !== -1) {
        register_arr.push(dep.substring(lastIndex+1));
      }
    });

    
    // The above outputs all loadNpmTasks
    //grunt.loadNpmTasks('grunt-concat');
    //grunt.loadNpmTasks('grunt-contrib-uglify');
    // there is more... check package.json
    // grunt.loadNpmTasks('grunt-contrib-sass');
    // grunt.loadNpmTasks('grunt-autoprefixer');
    // grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['watch']);
};