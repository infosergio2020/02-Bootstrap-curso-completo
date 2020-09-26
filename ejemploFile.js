module.exports = function(grunt) {
    require('time-grunt')(grunt);
    require('jit-grunt')(grunt, {
        useminPrepare: 'grunt-usemin'
    });

    grunt.initConfig({
        sass: {
            distgrunt: {
                files: [{
                    expand: true,
                    cwd: 'css',
                    src: ['*.scss'],
                    dest: 'css',
                    ext: '.css'
                }]
            }
        },

        watch: {
            files: ['css/*.scss'],
            tasks: ['css']
        },

        browserSync: {
            dev: {
                bsFiles: { //browser files
                    src: [
                        'css/*.css',
                        '*.html',
                        'js/*.js'
                    ]
                },
                options: {
                    watchTask: true,
                    server: {
                        baseDir: './' //Directorio base para nuestro servidor
                    }
                }
            }
        },

        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: 'images/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'distgrunt/images'
                }]
            }
        },

        copy: {
            html: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: './',
                    src: ['**.html'],
                    dest: 'distgrunt/'
                }]
            },
            fonts: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: 'node_modules/open-iconic/font',
                    src: ['fonts/**.*'],
                    dest: 'distgrunt/'
                }]
            },
        },

        clean: {
            build: {
                src: ['distgrunt/']
            }
        },

        cssmin: {
            distgrunt: {}
        },

        uglify: {
            distgrunt: {}
        },

        filerev: {
            options: {
                encoding: 'utf8',
                algorithm: 'md5',
                length: 20
            },

            release: {
                // filerev: release hashes(md5) all assets (images, js an css)
                // in distgrunt directory
                files: [{
                    src: [
                        'distgrunt/js/*.js',
                        'distgrunt/css/*.css',
                    ]
                }]
            }
        },

        concat: {
            options: {
                separador: ';'
            },
            distgrunt: {}
        },

        useminPrepare: {
            foo: {
                dest: 'distgrunt',
                src: ['index.html', 'about.html', 'precios.html', 'contacto.html', 'terminos.html']
            },
            options: {
                flow: {
                    steps: {
                        css: ['cssmin'],
                        js: ['uglify']
                    },
                    post: {
                        css: [{
                            name: 'cssmin',
                            createConfig: function(context, block) {
                                var generated = context.options.generated;
                                generated.options = {
                                    keepSpecialComments: 0,
                                    rebase: false
                                }
                            }
                        }]
                    }
                }
            }
        },

        usemin: {
            html: ['distgrunt/index.html', 'distgrunt/about.html', 'distgrunt/precios.html', 'distgrunt/contacto.html', 'distgrunt/terminos.html'],
            options: {
                assetsDir: ['distgrunt', 'distgrunt/css', 'distgrunt/js']
            }
        }
    });

    grunt.registerTask('css', ['sass']);
    grunt.registerTask('default', ['browserSync', 'watch']);
    grunt.registerTask('img:compress', ['imagemin']);
    grunt.registerTask('build', [
        'clean',
        'copy',
        'imagemin',
        'useminPrepare',
        'concat',
        'cssmin',
        'uglify',
        'filerev',
        'usemin'
    ])

};