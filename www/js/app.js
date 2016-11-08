var db = null;
var usuarioLogin = null;
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
            $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS usuario (id INTEGER PRIMARY KEY, nome TEXT, email TEXT, senha TEXT, tipo INTEGER, id_usuario INTEGER)");
            //$cordovaSQLite.execute(db, "DROP TABLE projeto");
            $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS projeto (id INTEGER PRIMARY KEY, nome TEXT, descricao TEXT, empresa TEXT, responsavel TEXT, compartilhado INTEGER DEFAULT 0, dt_criacao TEXT, dt_finalizado TEXT, id_usuario INTEGER)");
            //$cordovaSQLite.execute(db, "DROP TABLE participantes");
            $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS participantes (id INTEGER PRIMARY KEY, id_projeto INTEGER, id_usuario INTEGER)");
            //$cordovaSQLite.execute(db, "DROP TABLE secoes");
            $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS secoes (id INTEGER PRIMARY KEY, id_projeto INTEGER, proposito TEXT, escopo TEXT, def_acron_abrev TEXT, referencias TEXT, organizacao TEXT, perspectiva TEXT, funcionalidades TEXT, caracteristicas_utilizador TEXT, restricoes TEXT, assuncoes_dependencias TEXT, id_usuario INTEGER)");
            //$cordovaSQLite.execute(db, "DROP TABLE interessados");
            $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS interessados (id INTEGER PRIMARY KEY, id_projeto INTEGER, nome TEXT, papel TEXT, funcao TEXT, email TEXT, telefone TEXT, id_usuario INTEGER)");
            //$cordovaSQLite.execute(db, "DROP TABLE requisito_usuario");
            $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS requisito_usuario (id INTEGER PRIMARY KEY, id_projeto INTEGER, descricao TEXT, id_usuario INTEGER)");
            //$cordovaSQLite.execute(db, "DROP TABLE requisito_usuario_interessados");
            $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS requisito_usuario_interessados (id INTEGER PRIMARY KEY, id_requisito_usuario INTEGER, id_interessado INTEGER)");

            //$cordovaSQLite.execute(db, "DROP TABLE requisito_sistema");
            $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS requisito_sistema (id INTEGER PRIMARY KEY, id_padrao INTEGER, tipo INTEGER, resumo TEXT, descricao TEXT, id_usuario INTEGER)");

            //$cordovaSQLite.execute(db, "DROP TABLE requisito_sistema_projeto");
            $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS requisito_sistema_projeto (id INTEGER PRIMARY KEY, id_requisito_sistema INTEGER, id_requisito_usuario INTEGER, reuso INTEGER, id_projeto INTEGER, id_vinculo INTEGER, importancia INTEGER, urgencia INTEGER, observacao TEXT)");

            var sql;
            sql = "INSERT INTO requisito_sistema (tipo, resumo, descricao, id_usuario) VALUES(1,'Cadastrar planos','Deve haver uma função para cadastrar planos. Um cadastro de plano deve conter as seguintes informações:',1)";
            //$cordovaSQLite.execute(db, sql);
            sql = "INSERT INTO requisito_sistema_projeto (id_requisito_sistema, id_requisito_usuario, reuso, id_projeto, importancia, urgencia, observacao) VALUES(1,1,0,1,1,1,'')";
            //$cordovaSQLite.execute(db, sql);
            sql = "INSERT INTO requisito_sistema (tipo, resumo, descricao, id_usuario) VALUES(2,'Acesso a exclusão de planos','Um Funcionário não deverá ser capaz de excluir um produto se o mesmo não tiver autorização.',1)";
            //$cordovaSQLite.execute(db, sql);
            sql = "INSERT INTO requisito_sistema_projeto (id_requisito_sistema, id_requisito_usuario, reuso, id_projeto, importancia, urgencia, observacao) VALUES(2,1,0,1,1,2,'')";
            //$cordovaSQLite.execute(db, sql);
            sql = "INSERT INTO requisito_sistema (tipo, resumo, descricao, id_usuario) VALUES(1,'Contas a receber','O sistema deve armazenar as seguintes informações sobre contas a receber:',1)";
            //$cordovaSQLite.execute(db, sql);
            sql = "INSERT INTO requisito_sistema_projeto (id_requisito_sistema, id_requisito_usuario, reuso, id_projeto, importancia, urgencia, observacao) VALUES(3,1,0,1,2,1,'')";
            //$cordovaSQLite.execute(db, sql);
            sql = "INSERT INTO requisito_sistema (tipo, resumo, descricao, id_usuario) VALUES(1,'Contas a Pagar','O sistema deve armazenar as seguintes informações sobre contas a pagar:',1)";
            //$cordovaSQLite.execute(db, sql);
            sql = "INSERT INTO requisito_sistema_projeto (id_requisito_sistema, id_requisito_usuario, reuso, id_projeto, importancia, urgencia, observacao) VALUES(4,2,0,1,3,2,'')";
            //$cordovaSQLite.execute(db, sql);
            sql = "INSERT INTO requisito_sistema (tipo, resumo, descricao, id_usuario) VALUES(2,'Especificação de banco de dados','O sistema deve armazenar os dados em um banco de dados utilizando um produto de software de banco de dados relacional Postgresql na versão 9.5.',1)";
            //$cordovaSQLite.execute(db, sql);
            sql = "INSERT INTO requisito_sistema_projeto (id_requisito_sistema, id_requisito_usuario, reuso, id_projeto, importancia, urgencia, observacao) VALUES(5,2,0,1,2,3,'')";
            //$cordovaSQLite.execute(db, sql);

            //$cordovaSQLite.execute(db, "UPDATE requisito_sistema_projeto SET reuso = 1 WHERE id = 3");

            /*$cordovaSQLite.execute(db, "INSERT INTO usuario(nome, email) VALUES ('Juvencio','juv@gmail.com')");
             $cordovaSQLite.execute(db, "INSERT INTO usuario(nome, email) VALUES ('Lindomar','lindomar@gmail.com')");*/

            /*$cordovaSQLite.execute(db, "INSERT INTO participantes(id_projeto, id_usuario) VALUES (1,2)");
             $cordovaSQLite.execute(db, "INSERT INTO participantes(id_projeto, id_usuario) VALUES (1,3)");
             $cordovaSQLite.execute(db, "INSERT INTO participantes(id_projeto, id_usuario) VALUES (2,1)");
             $cordovaSQLite.execute(db, "INSERT INTO participantes(id_projeto, id_usuario) VALUES (2,2)");*/


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