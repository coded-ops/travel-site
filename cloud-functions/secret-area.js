exports.handler = function(even, context, callback) {
    callback(null, {
        statusCode: 200,
        body: 'Welcome to the super secret area',
    });
}