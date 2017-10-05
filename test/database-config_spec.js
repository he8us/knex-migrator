var config = require('../lib/database-configuration'),
    should = require('should');


describe('Database Configuration', function () {

    describe('ensureObject', function () {
        it('doesn\'t modify the connection object if it\'s not a string', function () {

            var testObject = {
                connection: {
                    host: '127.0.0.1',
                    user: 'user',
                    password: 'password',
                    charset: 'utf8',
                    database: 'ghost'
                }
            };

            var resultObject = config.ensureObject(testObject);

            should(resultObject).be.deepEqual(testObject);
        });

        it('converts a basic connection string to a connection object', function () {
            var testObject = {
                connection: 'mysql://user:password@127.0.0.1:12345/ghost'
            }

            var resultObject = config.ensureObject(testObject);

            should(resultObject.connection).be.deepEqual({
                host: '127.0.0.1',
                user: 'user',
                password: 'password',
                port: '12345',
                database: 'ghost'
            });
        });

        it('converts a connection string to a connection object with an optional port', function () {
            var testObject = {
                connection: 'mysql://user:password@127.0.0.1/ghost'
            }

            var resultObject = config.ensureObject(testObject);

            should(resultObject.connection).be.deepEqual({
                host: '127.0.0.1',
                user: 'user',
                password: 'password',
                database: 'ghost'
            });
        });

        it('converts a connection string with the charset defined to a connection object', function () {
            var testObject = {
                connection: 'mysql://user:password@127.0.0.1:12345/ghost?characterEncoding=utf8'
            }

            var resultObject = config.ensureObject(testObject);

            should(resultObject.connection).be.deepEqual({
                host: '127.0.0.1',
                user: 'user',
                password: 'password',
                charset: 'utf8',
                port: '12345',
                database: 'ghost'
            });
        });
    });
});
