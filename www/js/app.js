var db = null;
// Ionic Starter App
var app = angular.module('appsers', ['ionic', 'ionic-material', 'ngCordova', 'angular-md5']);

app.run(function ($ionicPlatform, $cordovaSQLite) {
    $ionicPlatform.ready(function () {

        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }
        if (!ionic.Platform.is("browser")) {
            db = $cordovaSQLite.openDB({name: "db_sers.db", location: 'default'});
        } else {
            db = window.openDatabase("db_sers.db", '1.0', 'db_sers', -1);
        }
        if (db) {
            //$cordovaSQLite.execute(db, "DROP TABLE usuario");
            $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS usuario (id INTEGER PRIMARY KEY, nome TEXT, email TEXT, senha TEXT, tipo INTEGER)");
            //$cordovaSQLite.execute(db, "DROP TABLE projeto");
            $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS projeto (id INTEGER PRIMARY KEY, nome TEXT, descricao TEXT, empresa TEXT, responsavel TEXT, compartilhado INTEGER DEFAULT 0, dt_criacao TEXT, dt_finalizado TEXT, id_usuario INTEGER)");
            //$cordovaSQLite.execute(db, "DROP TABLE secoes");
            $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS secoes (id INTEGER PRIMARY KEY, id_projeto INTEGER, proposito TEXT, escopo TEXT, def_acron_abrev TEXT, referencias TEXT, organizacao TEXT, perspectiva TEXT, funcionalidades TEXT, caracteristicas_utilizador TEXT, restricoes TEXT, assuncoes_dependencias TEXT, id_usuario INTEGER)");
            //$cordovaSQLite.execute(db, "DROP TABLE interessados");
            $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS interessados (id INTEGER PRIMARY KEY, id_projeto INTEGER, nome TEXT, papel TEXT, funcao TEXT, email TEXT, telefone TEXT)");
            //$cordovaSQLite.execute(db, "DROP TABLE requisito_usuario");
            $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS requisito_usuario (id INTEGER PRIMARY KEY, id_projeto INTEGER, id_usuario INTEGER, descricao TEXT)");
            //$cordovaSQLite.execute(db, "DROP TABLE req_usu_interessado");
            $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS req_usu_interessado (id INTEGER PRIMARY KEY, id_requisito_usuario INTEGER, id_interessado INTEGER)");
        }
    });
})

app.config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
    $stateProvider

            .state('app', {
                url: '/app',
                abstract: true,
                templateUrl: 'templates/menu.html',
                controller: 'AppCtrl'
            })
            
            .state('app.conta', {
                url: '/conta',
                params: {
                    email: null,
                },
                views: {
                    'menuContent': {
                        templateUrl: 'templates/conta.html',
                        controller: 'ContaCtrl'
                    }
                }
            })
            
            .state('app.login', {
                url: '/login',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/login.html',
                        controller: 'LoginCtrl'
                    }
                }
            })
            
            .state('app.projetos', {
                url: '/projetos',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/projetos.html',
                        controller: 'ProjetoListCtrl'
                    }
                }
            })

            .state('app.projeto-add', {
                url: '/projetos/cadastro',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/projeto-cadastro.html',
                        controller: 'ProjetoCtrl'
                    }
                }
            })

            .state('app.projeto-menu', {
                url: '/projetos/:projetoId',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/projeto-menu.html',
                        controller: 'ProjetoMenuCtrl'
                    }
                }
            })

            .state('app.projeto-cadastro', {
                url: '/projetos/:projetoId/cadastro',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/projeto-cadastro.html',
                        controller: 'ProjetoCtrl'
                    }
                }
            })

            .state('app.projeto-interessados', {
                url: '/projetos/:projetoId/interessados',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/projeto-interessados.html',
                        controller: 'InteressadoListCtrl'
                    }
                }
            })

            .state('app.projeto-interessados-add', {
                url: '/projetos/:projetoId/interessados/cadastro',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/projeto-interessados-cadastro.html',
                        controller: 'InteressadoCtrl'
                    }
                }
            })

            .state('app.projeto-interessados-cadastro', {
                url: '/projetos/:projetoId/interessados/:interessadoId/cadastro',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/projeto-interessados-cadastro.html',
                        controller: 'InteressadoCtrl'
                    }
                }
            })

            .state('app.projeto-secoes', {
                url: '/projetos/:projetoId/secoes',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/projeto-secoes.html',
                        controller: 'SecoesCtrl'
                    }
                }
            })

            .state('app.projeto-requsuario', {
                url: '/projetos/:projetoId/requsuario',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/projeto-requsuario.html',
                        controller: 'ReqUsuarioListCtrl'
                    }
                }
            })

            .state('app.projeto-requsuario-add', {
                url: '/projetos/:projetoId/requsuario/cadastro',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/projeto-requsuario-cadastro.html',
                        controller: 'ReqUsuarioCtrl'
                    }
                }
            })

            .state('app.projeto-requsuario-cadastro', {
                url: '/projetos/:projetoId/requsuario/:reqUsuarioId/cadastro',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/projeto-requsuario-cadastro.html',
                        controller: 'ReqUsuarioCtrl'
                    }
                }
            })

            .state('app.projeto-reqsistema', {
                url: '/projetos/:projetoId/reqsistema',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/projeto-reqsistema.html',
                        controller: 'ReqSistemaListCtrl'
                    }
                }
            })

            .state('app.projeto-rastreabilidade', {
                url: '/projetos/:projetoId/rastreabilidade',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/projeto-rastreabilidade.html',
                        controller: 'ProjetoCtrl'
                    }
                }
            })

            .state('app.projeto-participantes', {
                url: '/projetos/:projetoId/participantes',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/projeto-participantes.html',
                        controller: 'ProjetoCtrl'
                    }
                }
            })

            .state('app.config', {
                url: '/config',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/config.html',
                        controller: 'ConfigCtrl'
                    }
                }
            })

            ;
    $ionicConfigProvider.navBar.alignTitle('center');
    $urlRouterProvider.otherwise('/app/projetos');
});