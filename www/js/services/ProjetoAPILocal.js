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
    
    self.insert = function(projeto) {
        var parameters = [projeto.nome, projeto.descricao, projeto.empresa, projeto.responsavel, projeto.compartilhado, projeto.dt_criacao, projeto.dt_finalizado];
        return dbAPILocal.query("INSERT INTO projeto (nome, descricao, empresa, responsavel, compartilhado, dt_criacao, dt_finalizado) VALUES (?, ?, ?, ?, ?, ?, ?)", parameters);
    }
    
    self.edit = function(projeto) {
        var parameters = [projeto.nome, projeto.descricao, projeto.empresa, projeto.responsavel, projeto.compartilhado, projeto.dt_criacao, projeto.dt_finalizado, projeto.id];
        return dbAPILocal.query("UPDATE projeto SET nome = ?, descricao = ?, empresa = ?, responsavel = ?, compartilhado = ?, dt_criacao = ?, dt_finalizado = ? WHERE id = ?", parameters);
    }
    
    return self;
});