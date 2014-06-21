/*global module:false*/
module.exports = function(grunt) {

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n',

        clean: ["pkg/"],

        env : {
            options : {
            },
            dev: {
                NODE_ENV : 'DEVELOPMENT'
            },
            prod : {
                NODE_ENV : 'PRODUCTION'   
            }
        },

        bump: {
            options: {
                commit: false,
                createTag: false,
                push: false
            }
        },

        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: 'public/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'pkg/public'
                }]
            }
        },

        copy: {
            package: {
                src: 'package.json',
                dest: 'pkg/',
            },
            server1: {
                src: 'app.js',
                dest: 'pkg/',
            },
            server2: {
                src: 'views/**/*',
                dest: 'pkg/',
            },
            server3: {
                src: 'public/css/*',
                dest: 'pkg/',
            },
            //            server4: {
            //                src: 'public/docs/*',
            //                dest: 'pkg/',
            //            },
            server5: {
                src: 'public/js/*',
                dest: 'pkg/',
            },
            server6: {
                src: 'public/favicon.ico',
                dest: 'pkg/',
            },
            server7: {
                src: 'public/favicon.png',
                dest: 'pkg/',
            }
        },

        'sftp-deploy': {
            prod: {
                auth: {
                    host: '91.121.177.78',
                    port: 22,
                    authKey: 'prod'
                },
                src: 'pkg',
                dest: '/home/GsellMe-prod/GsellMe',
                exclusions: ['pkg/package.json', 'pkg/server/*'],
                server_sep: '/'
            }
        },
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-env');
    grunt.loadNpmTasks('grunt-bump');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-sftp-deploy');

    grunt.registerTask('prod', ['env:prod', 'clean', 'bump', 'imagemin', 'copy', 'sftp-deploy:prod']);
};