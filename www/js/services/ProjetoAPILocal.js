app.factory("projetoAPILocal", function (dbAPILocal) {
    var self = this;
    
    self.get = function () {
        return dbAPILocal.query("SELECT * FROM projeto").then(function (result) {
            return dbAPILocal.getAll(result);
        });
    }
    
    self.getById = function (id) {
        var parameters = [id];
        return dbAPILocal.query("SELECT * FROM projeto WHERE id = ?", parameters).then(function (result) {
            return dbAPILocal.getById(result);
        });
    }
    
    self.getLastInsertId = function(){
        return dbAPILocal.query("SELECT last_insert_rowid() AS id FROM projeto LIMIT 1").then(function(result){
            return dbAPILocal.getById(result);
        });
    }
    
    self.insert = function(projeto) {
        var parameters = [projeto.nome, projeto.descricao, projeto.empresa, projeto.responsavel, projeto.compartilhado, projeto.dt_criacao, projeto.dt_finalizado, app.usuarioLogin.id];
        return dbAPILocal.query("INSERT INTO projeto (nome, descricao, empresa, responsavel, compartilhado, dt_criacao, dt_finalizado, id_usuario) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", parameters);
    }
    
    self.insertParticipante = function(id_projeto, id_usuario) {
        var parameters = [id_projeto, id_usuario];
        return dbAPILocal.query("INSERT INTO participantes (id_projeto, id_usuario) VALUES (?, ?)", parameters);
    }
    
    self.edit = function(projeto) {
        var parameters = [projeto.nome, projeto.descricao, projeto.empresa, projeto.responsavel, projeto.compartilhado, projeto.dt_criacao, projeto.dt_finalizado, projeto.id_usuario, projeto.id];
        return dbAPILocal.query("UPDATE projeto SET nome = ?, descricao = ?, empresa = ?, responsavel = ?, compartilhado = ?, dt_criacao = ?, dt_finalizado = ?, id_usuario = ? WHERE id = ?", parameters);
    }
    
    self.delete = function(id) {
        var parameters = [id];
        return dbAPILocal.query("DELETE FROM projeto WHERE id = ?", parameters);
    }
    
    self.deleteChilds = function(id) {
        var parameters = [id];
        dbAPILocal.query("DELETE FROM secoes WHERE id_projeto = ?", parameters).then();
        dbAPILocal.query("DELETE FROM participantes WHERE id_projeto = ?", parameters).then();
        dbAPILocal.query("DELETE FROM interessados WHERE id_projeto = ?", parameters).then();
        dbAPILocal.query("DELETE FROM requisito_usuario WHERE id_projeto = ?", parameters).then();
        dbAPILocal.query("DELETE FROM requisito_usuario_interessados WHERE NOT EXISTS(SELECT ru.id FROM requisito_usuario ru WHERE ru.id = id_requisito_usuario) OR NOT EXISTS(SELECT i.id FROM interessados i WHERE i.id = id_interessado)").then();
    }
    return self;
});