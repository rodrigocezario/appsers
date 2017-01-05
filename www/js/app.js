var db = null;
var usuarioLogin = null;
var app = angular.module('appsers', ['ionic', 'ionic-material', 'ngCordova', 'angular-md5', 'ngMessages']);

app.run(function ($ionicPlatform, dbAPILocal, $state, $rootScope, usuarioAPILocal, $ionicHistory) {
    $ionicPlatform.ready(function () {

        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }

        db = dbAPILocal.openDB();
        dbAPILocal.createTables();
        dbAPILocal.populateTables();

        usuarioAPILocal.get().then(function (res) {
            if (!res[0] && $state.current.name != 'app.conta' && $state.current.name != 'app.login') {
                $ionicHistory.nextViewOptions({
                    disableBack: true
                });
                $state.go("app.login");
            } else if (res[0]) {
                $ionicHistory.nextViewOptions({
                    disableBack: true
                });
                usuarioLogin = res[0];
                $rootScope.usuarioLogin = usuarioLogin;
                $state.go("app.projetos");
            }
            if (navigator && navigator.splashscreen) {
                setTimeout(function () {
                    navigator.splashscreen.hide();
                }, 100);
            }
        });

        $rootScope.$on('$stateChangeStart', function (event, toState) {
            $rootScope.usuarioLogin = usuarioLogin;
            if (!usuarioLogin) {
                if (toState.name != 'app.login' && toState.name != 'app.conta') {
                    $ionicHistory.nextViewOptions({
                        disableBack: true
                    });
                    event.preventDefault();
                    $state.go("app.login");
                }
            }
        });
    });
})

app.config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
    $stateProvider
            .state('app.login', {
                url: '/login',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/login.html',
                        controller: 'LoginCtrl'
                    }
                }
            })

            .state('app', {
                url: '/app',
                abstract: true,
                templateUrl: 'templates/menu.html',
                controller: 'AppCtrl'
            })

            .state('app.conta', {
                url: '/conta',
                params: {
                    email: null
                },
                views: {
                    'menuContent': {
                        templateUrl: 'templates/conta.html',
                        controller: 'ContaCtrl'
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

            .state('app.projeto-reqsistema-funcional', {
                url: '/projetos/:projetoId/reqsistema/funcional',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/projeto-reqsistema-funcional.html',
                        controller: 'ReqSistemaFuncionalListCtrl'
                    }
                }
            })

            .state('app.projeto-reqsistema-naofuncional', {
                url: '/projetos/:projetoId/reqsistema/naofuncional',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/projeto-reqsistema-naofuncional.html',
                        controller: 'ReqSistemaNaoFuncionalListCtrl'
                    }
                }
            })

            .state('app.projeto-reqsistema-add', {
                url: '/projetos/:projetoId/reqsistema/cadastro/:tipoId',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/projeto-reqsistema-cadastro.html',
                        controller: 'ReqSistemaCtrl'
                    }
                }
            })

            .state('app.projeto-reqsistema-cadastro', {
                url: '/projetos/:projetoId/reqsistema/:requisitoId/cadastro',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/projeto-reqsistema-cadastro.html',
                        controller: 'ReqSistemaCtrl'
                    }
                }
            })

            .state('app.projeto-reqsistema-padroes', {
                url: '/projetos/:projetoId/reqsistema/:requisitoId/padroes',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/projeto-reqsistema-padroes.html',
                        controller: 'ReqSistemaPadroesCtrl'
                    }
                }
            })

            .state('app.projeto-reqsistema-padroes-filtro', {
                url: '/projetos/:projetoId/reqsistema/:requisitoId/padroes-filtro',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/projeto-reqsistema-padroes-filtro.html',
                        controller: 'ReqSistemaPadroesFiltroCtrl'
                    }
                }
            })

            .state('app.projeto-reqsistema-sugestoes', {
                url: '/projetos/:projetoId/reqsistema/:requisitoId/sugestoes',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/projeto-reqsistema-sugestoes.html',
                        controller: 'ReqSistemaSugestoesCtrl'
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
                        controller: 'ParticipanteListCtrl'
                    }
                }
            })

            .state('app.projeto-participantes-add', {
                url: '/projetos/:projetoId/participantes/cadastro',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/projeto-participantes-cadastro.html',
                        controller: 'InteressadoCtrl'
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