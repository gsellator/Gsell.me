/*global module:false*/
module.exports = function(grunt) {
    
    grunt.initConfig({
        
        pkg: grunt.file.readJSON('package.json'),
        banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
        '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
        '* Copyright (c) <%= grunt.template.today("yyyy") %>;' +
        ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
        
        clean: ["pkg/"],
        
        env : {
            options : {
                /* Shared Options Hash */
                //globalOption : 'foo'  
            },
            dev: {
                NODE_ENV : 'DEVELOPMENT'
            },
            prod : {
                NODE_ENV : 'PRODUCTION'   
            }  
        },
        
        copy: {
            css: {
                src: 'site/css/*',
                dest: 'pkg/',
            },
            files: {
                src: 'site/files/*',
                dest: 'pkg/',
            },
            font: {
                src: 'site/font/*',
                dest: 'pkg/',
            },
            js: {
                src: 'site/js/*',
                dest: 'pkg/',
            },
            favicon: {
                src: 'site/favicon.ico',
                dest: 'pkg/',
            },
            cv: {
                src: 'site/index.html',
                dest: 'pkg/',
            }
        },
        
        /*preprocess : {
            dev : {
                src : 'app/index-master.html',
                dest : 'app/index.html'  
            },
            prod : {
                src : 'app/index-master.html',
                dest : 'pkg/app/index.html',
            }   
        },*/
        
        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: 'site/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'pkg/site/'
                }]
            }
        },
        
        cssmin: {
            combine: {
                files: {
                    'pkg/site/css/cv.min.css': [
                        'site/css/cv.css'
                    ]
                }
            }
        }
    });
    
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-env');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-preprocess');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    
    grunt.registerTask('default', ['clean', 'env:dev', 'copy', 'imagemin', 'cssmin']);
};
