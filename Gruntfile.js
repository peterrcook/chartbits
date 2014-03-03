module.exports = function(grunt){

    var files = ['bar/js/bar.js',
                  'connectedLabels/js/connectedLabels.js',
                  'groupedBar/js/groupedBar.js',
                  'layerMenu/js/layerMenu.js',
                  'legend/js/legend.js',
                  'line/js/line.js',
                  'lineTooltip/js/lineTooltip.js',
                  'multiLine/js/multiLine.js',
                  'multiLineTooltip/js/multiLineTooltip.js',
                  'quartersAxis/js/quartersAxis.js',
                  'stackedBar/js/stackedBar.js',
                  'toolTip/js/toolTip.js',
                  'treeMap/js/treeMap.js',
                  'yearsAxis/js/yearsAxis.js'];

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
          files: files
        },
        uglify: {
            options: {
              banner: '/* (C)2014 Peter Cook prcweb.co.uk */'
            },
            build: {
                files: {
                    'build/js/chartbits.min.js': files
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    grunt.registerTask('default', [/*'jshint',*/ 'uglify']);

};