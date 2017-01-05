app.controller('ContaCtrl', function ($scope, $state, $stateParams, $ionicHistory, utilAPI, usuarioAPILocal, md5, $ionicSideMenuDelegate) {
    $scope.conta = [];

    $scope.$on('$ionicView.beforeEnter', function () {
        if (usuarioLogin && usuarioLogin.id) {
            $scope.conta = usuarioLogin;
            $scope.conta.senha = null;
            $scope.conta.confirmar = null;
        } else if ($stateParams.email) {
            $scope.conta.email = $stateParams.email;
        }
    });

    $scope.salvar = function () {
        var conta = $scope.conta;
        if (conta && conta.email && conta.senha && conta.confirmar) {
            if (conta.senha == conta.confirmar) {
                //Implementar rotina para salvar dados no servidor. Hoje esta apenas salvando a conta localmente.
                if (!Number(conta.id)) {
                    usuarioAPILocal.delete().then(function () {
                        var usuario = [];
                        usuario.nome = conta.nome;
                        usuario.email = conta.email;
                        usuario.senha = md5.createHash(conta.senha);
                        usuarioAPILocal.insert(usuario).then();
                        usuarioAPILocal.getByEmailSenha(usuario.email, usuario.senha).then(function (res) {
                            if (res) {
                                usuarioLogin = res;
                                utilAPI.avisoTemp("Sua conta foi criada");
                                $ionicHistory.nextViewOptions({
                                    disableBack: true
                                });
                                $state.go("app.projetos");
                            }
                        });
                    });
                } else {
                    var usuario = [];
                    usuario.id = conta.id;
                    usuario.nome = conta.nome;
                    usuario.email = conta.email;
                    usuario.senha = md5.createHash(conta.senha);
                    usuarioAPILocal.edit(usuario).then(function () {
                        utilAPI.avisoTemp("Sua conta foi atualizada");
                        $ionicHistory.nextViewOptions({
                            disableBack: true
                        });
                        $state.go("app.projetos");
                    });
                }
            } else {
                utilAPI.avisoTemp("Senhas informadas não coincidem")
            }
        } else {
            utilAPI.avisoTemp("Todos os campos devem ser preenchidos")
        }
    }
});
