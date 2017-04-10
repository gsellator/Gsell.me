/*global module:false*/
module.exports = function(grunt) {

  grunt.initConfig({
    sass: {
      dev: {
        files: [{
          expand: true,
          cwd: 'public/scss/',
          src: ['*.scss'],
          dest: 'public/css',
          ext: '.css'
        }]
      },
    },
  });

  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.registerTask('default', ['sass']);
};