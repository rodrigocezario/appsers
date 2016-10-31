app.controller('ContaCtrl', function ($scope, $state, $stateParams, usuarioAPILocal, md5) {
    
    $scope.conta = [];
    
    if($stateParams.email){
        $scope.conta.email = $stateParams.email;
    }
    
    $scope.salvar = function(conta) {
        if(conta && conta.email && conta.senha && conta.confirmarSenha){
            if(conta.senha == conta.confirmarSenha){
                usuarioAPILocal.delete().then(function(){
                    var usuario = [];
                    usuario.nome = conta.nome;
                    usuario.email = conta.email;
                    usuario.senha = md5.createHash(conta.senha);
                    usuarioAPILocal.insert(usuario);
                    $state.go("app.projetos");
                });
            }else{
                alert("Senhas informadas não coincidem");
            }
        }else{
            alert("Preencha todos os campos");
        }
    }
});
