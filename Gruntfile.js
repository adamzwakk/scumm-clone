module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat:{
        	required: {
        		src: [
        			'bower_components/jquery/dist/jquery.js',
                    'bower_components/PxLoader/PxLoader.js',
                    'bower_components/PxLoader/PxLoaderImage.js',
                    'bower_components/PxLoader/PxLoaderSound.js',
                    'bower_components/javascript-astar/astar.js',
        		],
        		dest: 'public/js/require.js'
        	},
        	game: {
                options:{
                    banner:'$(document).ready(function(){ \n',
                    footer:'\n });',
                },
        		src:[
                    'enginesrc/system.js',
                    'enginesrc/utils.js',
                    'enginesrc/Classes/*',
                    'enginesrc/controls.js',
                    'gamesrc/objects/items/*',
                    'gamesrc/objects/actors/*',
                    'gamesrc/objects/dialogs/*',
                    'gamesrc/objects/scenes/*',
        			'gamesrc/world.js',
                    'gamesrc/index.js',
        		],
        		dest: 'public/js/main.js'
        	}
        },
        uglify: {
        	required: {
        		files : {
        			'public/js/require.js':'public/js/require.js'
        		}
        	},
        	game: {
        		files: {
        			'public/js/main.js':'public/js/main.js',
        		}
        	}
        },
        watch: {
        	game: {
        		files: ['gamesrc/**/*.js', 'enginesrc/*.js','enginesrc/Classes/*.js'],
        		tasks:['concat:game', 'copy:game']
        	}
        },
        copy:{
            game:{
                files:[
                    {expand:true,src:['assets/**'], dest:'public/',cwd:'gamesrc/'}
                ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('default', ['concat:required', 'concat:game', 'copy:game', 'watch:game']);
    grunt.registerTask('dist', ['concat:required', 'concat:game', 'uglify:required', 'uglify:game']);
};