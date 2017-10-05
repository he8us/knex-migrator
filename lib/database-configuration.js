var url = require('url'),
    _ = require('lodash/lodash'),
    errors = require('./errors');

var queryStringToObject = function (queryString) {
    var params = {};
    var queryParams = queryString.split('&');

    var paramKeyValue;
    for(var i = 0, ln = queryParams.length; i < ln; i++){
        paramKeyValue = queryParams[i].split('=');
        params[paramKeyValue[0]] = paramKeyValue[1];
    }

    return params;
}

var parseDbString = function (str) {
    let parsedUrl = url.parse(str);

    let auth = [];
    if (parsedUrl.auth) {
        auth = parsedUrl.auth.split(':');
    }

    var connectionObject = {
        host: parsedUrl.hostname,
        user: auth[0],
        password: auth[1],
        database: parsedUrl.pathname.substr(1)
    };

    if (null !== parsedUrl.port) {
        connectionObject.port = parsedUrl.port;
    }

    if (null === parsedUrl.query) {
        return connectionObject;
    }

    var queryObject = queryStringToObject(parsedUrl.query);

    if(undefined !== queryObject.characterEncoding){
        connectionObject.charset = queryObject.characterEncoding;
    }

    return connectionObject;
}

exports.ensureObject = function (databaseConfig) {
    if (_.isObject(databaseConfig.connection)) {
        return databaseConfig;
    }

    if (_.isString(databaseConfig.connection)) {
        databaseConfig.connection = parseDbString(databaseConfig.connection);
        return databaseConfig;
    }

    throw new errors.KnexMigrateError({
        code: 'DATABASE_CONNECTION_UNSUPPORTED'
    })
}
