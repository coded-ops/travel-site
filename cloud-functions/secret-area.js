exports.handler = function(event, context, callback) {

    // CORS solution to test locally. Can also use Netlify dev
    const headers = {
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Headers' : 'Content-Type'
    }

    if (event.httpMethod !== 'POST') {
        return callback(null, {
            statusCode: 200,
            body: 'This was not a POST request',
            headers,
        })
    }

    const secretContent = `
        <h3>Welcome To The Secret Area</h3>
        <p>Here we can tell you that the sky is <strong>blue</>, and two plus two equals four.</p>
    `;

    let body;

    if (event.body) {
        body = JSON.parse(event.body)
    } else {
        body = {}
    }

    if (body.password == 'javascript') {
        callback(null, {
            statusCode: 200,
            body: secretContent,
            headers,
        });
    } else {
        callback(null, {
            statusCode: 401,
            headers,
        });
    }

}