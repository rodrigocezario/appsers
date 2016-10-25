app.factory("reqUsuarioAPILocal", function (dbAPILocal) {
    var self = this;
    
    self.get = function () {
        return dbAPILocal.query("SELECT *, (SELECT COUNT(id) FROM requisito_usuario ru WHERE ru.id <= requisito_usuario.id AND ru.id_projeto = requisito_usuario.id_projeto) AS id_requisito FROM requisito_usuario ORDER BY id").then(function (result) {
            return dbAPILocal.getAll(result);
        });
    }
    
    self.getById = function (id) {
        var parameters = [id];
        return dbAPILocal.query("SELECT *, (SELECT COUNT(id) FROM requisito_usuario ru WHERE ru.id <= requisito_usuario.id AND ru.id_projeto = requisito_usuario.id_projeto) AS id_requisito FROM requisito_usuario WHERE id = ?", parameters).then(function (result) {
            return dbAPILocal.getById(result);
        });
    }
    
    self.getByIdProjeto = function (id) {
        var parameters = [id];
        return dbAPILocal.query("SELECT *, (SELECT COUNT(id) FROM requisito_usuario ru WHERE ru.id <= requisito_usuario.id AND ru.id_projeto = requisito_usuario.id_projeto) AS id_requisito FROM requisito_usuario WHERE id_projeto = ? ORDER BY id", parameters).then(function (result) {
            return dbAPILocal.getAll(result);
        });
    }
    
    self.getInteressados = function (id_projeto, id) {
        var parameters = [id, id_projeto];
        return dbAPILocal.query("SELECT *, EXISTS(SELECT ri.id FROM req_usu_interessado ri WHERE ri.id_interessado = i.id AND ri.id_requisito_usuario = ?) AS is_check FROM interessados i WHERE i.id_projeto = ?", parameters).then(function (result) {
            return dbAPILocal.getAll(result);
        });
    };
    
    self.insert = function(requisitoUsuario) {
        var parameters = [requisitoUsuario.id_projeto, requisitoUsuario.descricao];
        return dbAPILocal.query("INSERT INTO requisito_usuario (id_projeto, descricao) VALUES (?, ?) ", parameters);
    }
    
    self.edit = function(requisitoUsuario) {
        var parameters = [requisitoUsuario.id_projeto, requisitoUsuario.descricao, requisitoUsuario.id];
        return dbAPILocal.query("UPDATE requisito_usuario SET id_projeto = ?, descricao = ? WHERE id = ?", parameters);
    }
    
    self.inserirInteressados = function(requisitoUsuario){
        dbAPILocal.query("DELETE FROM req_usu_interessado WHERE id_requisito_usuario = '"+requisitoUsuario.id+"' ").then(function(){
            angular.forEach(requisitoUsuario.interessados, function(interessado) {
                var parameters = [requisitoUsuario.id, interessado.id];
                dbAPILocal.query("INSERT INTO req_usu_interessado (id_requisito_usuario, id_interessado) VALUES (?, ?) ", parameters).then();
            });
        });
    }
    
    
    return self;
});