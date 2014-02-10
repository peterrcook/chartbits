module.exports = function(grunt){

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
          files: ['bar/js/bar.js',
                  'connectedLabels/js/connectedLabels.js',
                  'layerMenu/js/layerMenu.js',
                  'legend/js/legend.js',
                  'line/js/line.js',
                  'lineTooltip/js/lineTooltip.js',
                  'multiLine/js/multiLine.js',
                  'quartersAxis/js/quartersAxis.js',
                  'stackedBar/js/stackedBar.js',
                  'toolTip/js/toolTip.js',
                  'treeMap/js/treeMap.js',
                  'yearsAxis/js/yearsAxis.js']
        },
        uglify: {
            options: {
              banner: '/* (C)2014 Peter Cook prcweb.co.uk */'
            },
            build: {
                files: {
                    'build/js/chartbits.min.js': [
                      'bar/js/bar.js',
                      'connectedLabels/js/connectedLabels.js',
                      'layerMenu/js/layerMenu.js',
                      'legend/js/legend.js',
                      'line/js/line.js',
                      'lineTooltip/js/lineTooltip.js',
                      'multiLine/js/multiLine.js',
                      'quartersAxis/js/quartersAxis.js',
                      'stackedBar/js/stackedBar.js',
                      'toolTip/js/toolTip.js',
                      'treeMap/js/treeMap.js',
                      'yearsAxis/js/yearsAxis.js'
                    ]
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    grunt.registerTask('default', [/*'jshint',*/ 'uglify']);

};