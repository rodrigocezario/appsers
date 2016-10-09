app.factory("reqUsuarioAPILocal", function ($cordovaSQLite) {

    var _get = function () {
        var retorno = [];
        $cordovaSQLite.execute(db, "SELECT * FROM requisito_usuario").then(
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
        return $cordovaSQLite.execute(db, "SELECT * FROM requisito_usuario WHERE id = ?", [id]).then(
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
        $cordovaSQLite.execute(db, "SELECT * FROM requisito_usuario WHERE id_projeto = ?", [id]).then(
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
        var query = "INSERT INTO requisito_usuario (id_projeto, id_interessado, descricao) VALUES (?, ?, ?);";
        var values = [requisitoUsuario.id_projeto, requisitoUsuario.id_interessado, requisitoUsuario.descricao];

        $cordovaSQLite.execute(db, query, values).then(
                function (res) {
                    console.log('INSERTED ID: ' + res.insertId);
                },
                function (err) {
                    console.log('ERROR: ' + err);
                }
        );
    };

    var _edit = function (requisitoUsuario) {
        var query = "UPDATE requisito_usuario SET id_projeto = ?, id_interessado = ?, descricao = ? WHERE id = ?";
        var values = [requisitoUsuario.id_projeto, requisitoUsuario.id_interessado, requisitoUsuario.descricao, requisitoUsuario.id];

        $cordovaSQLite.execute(db, query, values).then(
                function (res) {
                    console.log('UPDATE ID: ' + requisitoUsuario.id);
                },
                function (err) {
                    console.log('ERROR: ' + err);
                }
        );
    };

    return {
        get: _get,
        getById: _getById,
        getByIdProjeto: _getByIdProjeto,
        insert: _insert,
        edit: _edit
    };
});