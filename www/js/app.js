// Ionic Starter App
var app = angular.module('appsers', ['ionic', 'ionic-material', 'ngCordova']);
var db = null;
app.run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {

        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }

        //iniciando banco de dados local
        if (window.cordova) {
            db = $cordovaSQLite.openDB({ name: "db_sers.db"});
        }else{
            db = window.openDatabase("db_sers.db", '1.0', 'db_sers', 2 * 1024 * 1024);
        }
        db.transaction(function (tx) {
            tx.executeSql("CREATE TABLE IF NOT EXISTS projetos (id_ INTEGER PRIMARY KEY, nome TEXT, descricao TEXT, empresa TEXT, responsavel TEXT, compartilhado INTEGER DEFAULT 0, dt_criacao TEXT, dt_finalizado TEXT)");
        }, function(error) {
            console.log('Transaction ERROR: ' + error.message);
        }, function() {
            console.log('Populated database OK');
        });
    });
})

app.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
    
    .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl'
    })

    .state('app.projetos', {
        url: '/projetos',
        views: {
            'menuContent': {
                templateUrl: 'templates/projetos.html',
                controller: 'ProjetosCtrl'
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
                controller: 'ProjetoCtrl'
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
                controller: 'ProjetoCtrl'
          }
        }
    })

    .state('app.projeto-secoes', {
        url: '/projetos/:projetoId/secoes',
        views: {
            'menuContent': {
                templateUrl: 'templates/projeto-secoes.html',
                controller: 'ProjetoCtrl'
          }
        }
    })

    .state('app.projeto-requsuario', {
        url: '/projetos/:projetoId/requsuario',
        views: {
            'menuContent': {
                templateUrl: 'templates/projeto-requsuario.html',
                controller: 'ProjetoCtrl'
          }
        }
    })

    .state('app.projeto-reqsistema', {
        url: '/projetos/:projetoId/reqsistema',
        views: {
            'menuContent': {
                templateUrl: 'templates/projeto-reqsistema.html',
                controller: 'ProjetoCtrl'
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

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/projetos');
});
