app.factory("padraoAPILocal", function (dbAPILocal) {
    var self = this;

    self.get = function () {
        return dbAPILocal.query("SELECT p.*, c.descricao AS categoria, c.tipo AS tipo_categoria FROM padrao p LEFT JOIN padrao_categoria c ON (c.id = p.id_categoria) ORDER BY c.descricao, p.nome").then(function (result) {
            return dbAPILocal.getAll(result);
        });
    }
    
    self.getById = function (id) {
        var parameters = [id];
        return dbAPILocal.query("SELECT p.*, c.descricao AS categoria, c.tipo AS tipo_categoria FROM padrao p LEFT JOIN padrao_categoria c ON (c.id = p.id_categoria) WHERE p.id = ? ORDER BY c.descricao, p.nome",parameters).then(function (result) {
            return dbAPILocal.getById(result);
        });
    }

    self.getCategoria = function () {
        return dbAPILocal.query("SELECT * FROM padrao_categoria").then(function (result) {
            return dbAPILocal.getAll(result);
        });
    }

    self.getCategoriaById = function (id) {
        var parameters = [id];
        return dbAPILocal.query("SELECT * FROM padrao_categoria WHERE id = ?", parameters).then(function (result) {
            return dbAPILocal.getById(result);
        });
    }
    
    self.getTemplateByIdPadrao = function (id) {
        var parameters = [id];
        return dbAPILocal.query("SELECT t.* FROM padrao_template t WHERE t.id_padrao = ? ORDER BY t.resumo, t.definicao",parameters).then(function (result) {
            return dbAPILocal.getAll(result);
        });
    }
    
    self.getTemplateById = function (id) {
        var parameters = [id];
        return dbAPILocal.query("SELECT t.* FROM padrao_template t WHERE t.id = ? ORDER BY t.resumo, t.definicao",parameters).then(function (result) {
            return dbAPILocal.getById(result);
        });
    }

    return self;

});