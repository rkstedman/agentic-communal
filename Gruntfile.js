module.exports = function (grunt) {

  grunt.initConfig({
    serve: {
      options: {
        port: 9000
      }
    },
    coffee: {
      compileWithMaps: {
        options: {
          sourceMap: true
        },
        files: {
          'js/index.js': 'js/index.coffee'
        }
      }
    },
    watch: {
      files: ['js/*.coffee'],
      tasks: ['coffee']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-serve');
  grunt.loadNpmTasks('grunt-contrib-coffee');

  // grunt.registerTask('default', ['jshint']);
  grunt.registerTask('default');

};
