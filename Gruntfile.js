module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    //typescript tasks
    ts: {
      options: {
        target: "es5",
        module: "commonjs",
        moduleResolution: "node",
        sourceMap: true,
        emitDecoratorMetadata: true,
        experimentalDecorators: true,
        lib: [ "es2015", "dom" ],
        suppressImplicitAnyIndexErrors: true,
        compile: true,                 // perform compilation. [true (default) | false]
        comments: false,               // same as !removeComments. [true | false (default)]
        sourceRoot: '',                // where to locate TypeScript files. [(default) '' == source ts location]
        mapRoot: '',                   // where to locate .map.js files. [(default) '' == generated js location.]
        declaration: false,            // generate a declaration .d.ts file for every output js file. [true | false (default)]                                                            // Both html templates accept the ext and filename parameters.
        noImplicitAny: false          // set to true to pass --noImplicitAny to the compiler. [true | false (default)]
      },
       //compile on start development
       preServer: {
         outDir: "",
         src: ['./server/*.ts'],
         options: {
            fast:"never"
          }
       }

      }
    });

  // Load the plugin that provides the tasks.
  grunt.loadNpmTasks('grunt-ts');

  //Task registration
  grunt.registerTask('startDevelop', function () {
    var tasks = [
              'ts:preServer'
      ];
      tasks.forEach(function (task) {
          grunt.task.run(task);
      });
  });
};
