app.factory("reqUsuarioAPILocal", function ($cordovaSQLite) {

    var _get = function () {
        var retorno = [];
        $cordovaSQLite.execute(db, "SELECT *, (SELECT COUNT(id) FROM requisito_usuario ru WHERE ru.id <= requisito_usuario.id AND ru.id_projeto = requisito_usuario.id_projeto) AS id_requisito FROM requisito_usuario ORDER BY id").then(
                function (res) {
                    if (res.rows.length > 0) {
                        for (var i = 0; i < res.rows.length; i++) {
                            retorno.push(res.rows.item(i));
                        }
                    } else {
                        console.log('No records found');
                    }
                }
        );
        return retorno;
    };

    var _getById = function (id) {
        return $cordovaSQLite.execute(db, "SELECT *, (SELECT COUNT(id) FROM requisito_usuario ru WHERE ru.id <= requisito_usuario.id AND ru.id_projeto = requisito_usuario.id_projeto) AS id_requisito FROM requisito_usuario WHERE id = ?", [id]).then(
                function (res) {
                    if (res.rows.length > 0) {
                        return res.rows.item(0);
                    } else {
                        console.log('No records found');
                    }
                }
        );
    };

    var _getByIdProjeto = function (id) {
        var retorno = [];
        $cordovaSQLite.execute(db, "SELECT *, (SELECT COUNT(id) FROM requisito_usuario ru WHERE ru.id <= requisito_usuario.id AND ru.id_projeto = requisito_usuario.id_projeto) AS id_requisito FROM requisito_usuario WHERE id_projeto = ? ORDER BY id", [id]).then(
                function (res) {
                    if (res.rows.length > 0) {
                        for (var i = 0; i < res.rows.length; i++) {
                            retorno.push(res.rows.item(i));
                        }
                    } else {
                        console.log('No records found');
                    }
                }
        );
        return retorno;
    };
    
    var _getInteressados = function (id_projeto, id) {
        var retorno = [];
        $cordovaSQLite.execute(db, "SELECT *, EXISTS(SELECT ri.id FROM req_usu_interessado ri WHERE ri.id_interessado = i.id AND ri.id_requisito_usuario = ?) AS is_check FROM interessados i WHERE i.id_projeto = ?", [id, id_projeto]).then(
                function (res) {
                    if (res.rows.length > 0) {
                        for (var i = 0; i < res.rows.length; i++) {
                            retorno.push(res.rows.item(i));
                        }
                    } else {
                        console.log('No records found');
                    }
                }
        );
        return retorno;
    };
    var _insert = function (requisitoUsuario) {
        var query = "INSERT INTO requisito_usuario (id_projeto, descricao) VALUES (?, ?);";
        var values = [requisitoUsuario.id_projeto, requisitoUsuario.descricao];
        $cordovaSQLite.execute(db, query, values).then(
                function (res) {
                    console.log('INSERTED ID: ' + res.insertId);
                    requisitoUsuario.id = res.insertId;
                    inserirInteressados(requisitoUsuario);
                },
                function (err) {
                    console.log('ERROR: ' + err);
                    alert("Falha ao executar ação");
                }
        );
        
    };
    
    var _edit = function (requisitoUsuario) {
        var query = "UPDATE requisito_usuario SET id_projeto = ?, descricao = ? WHERE id = ?";
        var values = [requisitoUsuario.id_projeto, requisitoUsuario.descricao, requisitoUsuario.id];

        $cordovaSQLite.execute(db, query, values).then(
            function (res) {
                console.log('UPDATE ID: ' + requisitoUsuario.id);
                inserirInteressados(requisitoUsuario);
            },
            function (err) {
                console.log('ERROR: ' + err);
                alert("Falha ao executar ação");
            }
        );
    };
    
    function inserirInteressados(requisitoUsuario){
        var sucesso = true;
        $cordovaSQLite.execute(db, "DELETE FROM req_usu_interessado WHERE id_requisito_usuario = '"+requisitoUsuario.id+"'", []).then(
            function(res){
                var query = "INSERT INTO req_usu_interessado (id_requisito_usuario, id_interessado) VALUES (?, ?);";
                angular.forEach(requisitoUsuario.interessados, function(interessado) {
                    if(interessado.is_check == true){
                        var values = [requisitoUsuario.id, interessado.id];
                        $cordovaSQLite.execute(db, query, values).then(
                            function (res2) {
                                console.log('INSERTED INTERESSADO ID: ' + res2.insertId);
                            },
                            function (err2) {
                                console.log('ERROR INTERESSADO: ' + err2);
                                sucesso = false;
                            }
                        );
                    }
                });
            },
            function (err) {
                console.log('ERROR INTERESSADO: ' + err);
            }
        );
        if(sucesso){
            alert("Registro enviado com sucesso");
        }else{
            alert("Falha ao executar ação");
        }
    }
    
    return {
        get: _get,
        getById: _getById,
        getByIdProjeto: _getByIdProjeto,
        getInteressados: _getInteressados,
        insert: _insert,
        edit: _edit
    };
});