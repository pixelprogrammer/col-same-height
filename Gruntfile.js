module.exports = function( grunt ) {

	grunt.initConfig( {

		// Import package manifest
		pkg: grunt.file.readJSON( "package.json" ),

		// Banner definitions
		meta: {
			banner: "/*\n" +
				" *  <%= pkg.title || pkg.name %> - v<%= pkg.version %>\n" +
				" *  <%= pkg.description %>\n" +
				" *  <%= pkg.homepage %>\n" +
				" *\n" +
				" *  Author <%= pkg.author.name %>\n" +
				" *  Website <%= pkg.author.url %>\n" +
				" *  Under <%= pkg.license %> License\n" +
				" */\n"
		},

		concat: {
			options: {
				banner: "<%= meta.banner %>"
			},
			dist: {
				src: [ "src/jquery.col-same-height.js" ],
				dest: "dist/jquery.col-same-height.js"
			}
		},

		uglify: {
			dist: {
				src: [ "src/jquery.col-same-height.js" ],
				dest: "dist/jquery.col-same-height.min.js"
			},
			options: {
				banner: "<%= meta.banner %>"
			}
		},
		jshint: {
			all: ["src/jquery.col-same-height.js"]
		},
		watch: {
			files: [ "src/*.js" ],
			tasks: [ "build" ]
		}

	} );

	grunt.loadNpmTasks( "grunt-contrib-concat" );
	grunt.loadNpmTasks( "grunt-contrib-jshint" );
	grunt.loadNpmTasks( "grunt-contrib-uglify" );
	grunt.loadNpmTasks( "grunt-contrib-watch" );

	grunt.registerTask( "build", [ "jshint", "concat", "uglify" ] );
};