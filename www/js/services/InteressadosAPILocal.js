app.factory("interessadosAPILocal", function ($cordovaSQLite) {
	
	var _get = function() {
		var retorno = [];
		$cordovaSQLite.execute(db, "SELECT * FROM interessados").then(
			function(res) {
				if (res.rows.length > 0) {
					for (var i = 0; i < res.rows.length; i++) {
						retorno.push(res.rows.item(i));
					}
				}else{
					console.log('No records found');
				}
			}
		);
		return retorno;
	};
	
	var _getById = function(id) {
		return $cordovaSQLite.execute(db, "SELECT * FROM interessados WHERE id = ?", [id]).then(
			function(res) {
				if (res.rows.length > 0) {
					return res.rows.item(0);
				}else{
					console.log('No records found');
				}
			}
		);
	};

	var _getByIdProjeto = function(id) {
		var retorno = [];
		$cordovaSQLite.execute(db, "SELECT * FROM interessados WHERE id_projeto = ?", [id]).then(
			function(res) {
				if (res.rows.length > 0) {
					for (var i = 0; i < res.rows.length; i++) {
						retorno.push(res.rows.item(i));
					}
				}else{
					console.log('No records found');
				}
			}
		);
		return retorno;
	};

	var _insert = function(interessado) {
		var query = "INSERT INTO interessados (id_projeto, nome, papel, funcao, email, telefone) VALUES (?, ?, ?, ?, ?, ?);";
		var values = [interessado.id_projeto, interessado.nome, interessado.papel, interessado.funcao, interessado.email, interessado.telefone];

		$cordovaSQLite.execute(db, query, values).then(
			function(res) {
				console.log('INSERTED ID: '+res.insertId);
			},
			function(err) {
				console.log('ERROR: '+err);
			}
		);
	};

	var _edit = function(interessado) {
		var query = "UPDATE interessados SET id_projeto = ?, nome = ?, papel = ?, funcao = ?, email = ?, telefone = ? WHERE id = ?";
		var values = [interessado.id_projeto, interessado.nome, interessado.papel, interessado.funcao, interessado.email, interessado.telefone, interessado.id];

		$cordovaSQLite.execute(db, query, values).then(
			function(res) {
				console.log('UPDATE ID: '+interessado.id);
			},
			function(err) {
				console.log('ERROR: '+err);
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