app.factory("dbAPILocal", function ($cordovaSQLite, $q, $ionicPlatform) {
    var self = this;
    
    self.query = function (query, parameters) {
        parameters = parameters || [];
        var q = $q.defer();

        $ionicPlatform.ready(function () {
            $cordovaSQLite.execute(db, query, parameters).then(function (result) {
                q.resolve(result);
            }, function (error) {
                console.warn('I found an error');
                console.warn(error);
                q.reject(error);
            });
        });
        return q.promise;
    }
    
    self.getAll = function(result) {
        var output = [];
        for (var i = 0; i < result.rows.length; i++) {
          output.push(result.rows.item(i));
        }
        return output;
    }
    
    self.getById = function(result) {
        var output = null;
        output = angular.copy(result.rows.item(0));
        return output;
    }
    
    self.openDB = function() {
        if (window.cordova) {
            return $cordovaSQLite.openDB({name: "db_sers.db", location: 'default'});
        } else {
            return window.openDatabase("db_sers.db", '1.0', 'db_sers', -1);
        }
    };
    return self;
});