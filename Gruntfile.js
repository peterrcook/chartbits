module.exports = function(grunt){

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
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
                      'line/js/line.js',
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

    grunt.registerTask('default', ['uglify']);

};