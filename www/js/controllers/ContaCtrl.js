app.controller('ContaCtrl', function ($scope, $state, $stateParams, $ionicHistory, utilAPI, usuarioAPILocal, md5) {
    $scope.conta = [];
    
    if($stateParams.email){
        $scope.conta.email = $stateParams.email;
    }
    
    $scope.salvar = function(conta) {
        if(conta && conta.email && conta.senha && conta.confirmarSenha){
            if(conta.senha == conta.confirmarSenha){
                //Implementar rotina para salvar dados no servidor. Hoje esta apenas salvando a conta localmente.
                usuarioAPILocal.delete().then(function(){
                    var usuario = [];
                    usuario.nome = conta.nome;
                    usuario.email = conta.email;
                    usuario.senha = md5.createHash(conta.senha);
                    usuarioAPILocal.insert(usuario);
                    utilAPI.avisoTemp("Sua conta foi criada com sucesso!")
                    $state.go("app.projetos");
                    $ionicHistory.nextViewOptions({
                        disableBack: true
                    });
                });
            }else{
                utilAPI.avisoTemp("Senhas informadas não coincidem")
            }
        }else{
            utilAPI.avisoTemp("Todos os campos devem ser preenchidos")
        }
    }
});
