app.factory("utilAPI", function ($ionicPopup, $timeout) {
    var self = this;
    self.confirmarExclusao = function () {
        return $ionicPopup.confirm({
            title: "Confirmação de Exclusão",
            subTitle: "Deseja realmente excluir o registro selecionado?",
            cancelText: "Cancelar",
            okText: "Excluir",
            okType: "button-assertive"
        });
    }
    
    self.confirmar = function (titulo, subtitulo = null, okText = "Sim", cancelText = "Não", okType = "button-dark", cancelType = null) {
        return $ionicPopup.confirm({
            title: titulo,
            subTitle: subtitulo,
            cancelText: cancelText,
            cancelType: cancelType,
            okText: okText,
            okType: okType
            
        });
    }
    

    self.avisoTemp = function (titulo, subtitulo = null, segundos = 2000) {
        var popup = $ionicPopup.show({
            title: titulo,
            subTitle: subtitulo,
            buttons: [{text: 'OK', type: 'button-dark'}]
        });
        popup.then();
        $timeout(function () {
            popup.close();
        }, segundos);
    }
    
    return self;
});

