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
        return dbAPILocal.query("SELECT *, (SELECT COUNT(id) FROM requisito_usuario ru WHERE ru.id <= requisito_usuario.id AND ru.id_projeto = requisito_usuario.id_projeto) AS id_requisito, (SELECT GROUP_CONCAT(i.nome, ', ') FROM interessados i WHERE EXISTS(SELECT rui.id FROM requisito_usuario_interessados rui WHERE rui.id_requisito_usuario = requisito_usuario.id AND rui.id_interessado = i.id)) AS interessados FROM requisito_usuario WHERE id_projeto = ? ORDER BY id", parameters).then(function (result) {
            return dbAPILocal.getAll(result);
        });
    }

    self.getInteressados = function (id_projeto, id) {
        var parameters = [id, id_projeto];
        return dbAPILocal.query("SELECT *, EXISTS(SELECT ri.id FROM requisito_usuario_interessados ri WHERE ri.id_interessado = i.id AND ri.id_requisito_usuario = ?) AS is_check FROM interessados i WHERE i.id_projeto = ?", parameters).then(function (result) {
            return dbAPILocal.getAll(result);
        });
    }

    self.insert = function (requisitoUsuario) {
        var parameters = [requisitoUsuario.id_projeto, requisitoUsuario.descricao, usuarioLogin.id];
        dbAPILocal.query("INSERT INTO requisito_usuario (id_projeto, descricao, id_usuario) VALUES (?, ?, ?) ", parameters).then(function () {
            dbAPILocal.query("SELECT last_insert_rowid() AS rowid FROM requisito_usuario LIMIT 1").then(function (result) {
                requisitoUsuario.id = dbAPILocal.getById(result).rowid;
                inserirInteressados(requisitoUsuario);
            });
        });
        
    }

    self.edit = function (requisitoUsuario) {
        var parameters = [requisitoUsuario.id_projeto, requisitoUsuario.descricao, requisitoUsuario.id_usuario, requisitoUsuario.id];
        dbAPILocal.query("UPDATE requisito_usuario SET id_projeto = ?, descricao = ?, id_usuario = ? WHERE id = ?", parameters).then(function(){
            inserirInteressados(requisitoUsuario);
        });
    }
    
    self.delete = function(id) {
        var parameters = [id];
        return dbAPILocal.query("DELETE FROM requisito_usuario WHERE id = ?", parameters);
    }
    
    self.deleteChilds = function() {
        dbAPILocal.query("DELETE FROM requisito_usuario_interessados WHERE NOT EXISTS(SELECT ru.id FROM requisito_usuario ru WHERE ru.id = id_requisito_usuario) OR NOT EXISTS(SELECT i.id FROM interessados i WHERE i.id = id_interessado)").then();
        dbAPILocal.query("UPDATE requisito_sistema_projeto SET id_requisito_usuario = NULL WHERE NOT EXISTS(SELECT ru.id FROM requisito_usuario ru WHERE ru.id = id_requisito_usuario)").then();
    }
    
    function inserirInteressados(requisitoUsuario) {
        dbAPILocal.query("DELETE FROM requisito_usuario_interessados WHERE id_requisito_usuario = '" + requisitoUsuario.id + "' ").then(function () {
            angular.forEach(requisitoUsuario.interessados, function (idInteressado) {
                var parameters = [requisitoUsuario.id, idInteressado];
                dbAPILocal.query("INSERT INTO requisito_usuario_interessados (id_requisito_usuario, id_interessado) VALUES (?, ?) ", parameters).then(function(){});
            });
        });
    }


    return self;
});