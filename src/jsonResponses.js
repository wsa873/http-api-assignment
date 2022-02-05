const respond = (request, response, status, content, mimetype) => {
    response.writeHead(status, { 'Content-Type': mimetype });
    response.write(content);
    response.end();
};

const success = (request, response, acceptedTypes) => {
    const responseJSON = {
        message: 'This is a successful response',
    };

    //If accepted type is xml, send xml
    if(acceptedTypes[0] === 'text/xml') {
        const xmlString = `<response>
            <message>${responseJSON.message}</message>
        </response>`;

        return respond(request, response, 200, xmlString, 'text/xml');
    }

    //Otherwise
    const jsonString = JSON.stringify(responseJSON);
    return respond(request, response, 200, jsonString, 'application/json');
};

const badRequest = (request, response, acceptedTypes, params) => {
    const responseJSON = {
        message: 'This request has the required parameters.',
    };

    //   /badRequest?valid=true
    if(!params.valid || params.valid !== 'true') {
        responseJSON.message = 'Missing valid query param set to true';
        responseJSON.id = 'badRequestMissingParam';

        //if acceptedTypes is xml, send back xml
        if(acceptedTypes[0] === 'text/xml') {
            const xmlString = `<response>
                <message>${responseJSON.message}</message>
                <id>${responseJSON.id}</id>
            </response>`;
    
            return respond(request, response, 400, xmlString, 'text/xml');
        }
        //otherwise send json
        const jsonString = JSON.stringify(responseJSON);
        return respond(request, response, 400, jsonString, 'application/json');
    }

    //if acceptedTypes is xml, send back xml
    if(acceptedTypes[0] === 'text/xml') {
        const xmlString = `<response>
            <message>${responseJSON.querySelector('message').textContent}</message>
        </response>`;

        return respond(request, response, 200, xmlString, 'text/xml');
    }

    //otherwise send json
    const jsonString = JSON.stringify(responseJSON);
    return respond(request, response, 200, jsonString, 'application/json');
}

const unauthorized = (request, response, acceptedTypes, params) => {
    const responseJSON = {
        message: 'This request has the required parameters.',
    };

    if(!params.loggedIn || params.loggedIn !== 'yes')
    {
        responseJSON.message = 'Missing loggedIn query parameter set to yes';
        responseJSON.id = 'unauthorizedMissingParam';
        if(acceptedTypes[0] === 'text/xml')
        {
            const xmlString = `<response><message>${responseJSON.message}</message><id>${responseJSON.id}</id></response>`;
            return respond(request, response, 401, xmlString, 'text/xml');
        }

        const jsonString = JSON.stringify(responseJSON);
        return respond(request, response, 401, jsonString, 'application/json');
    }

    if(acceptedTypes[0] === 'text/xml')
    {
        const xmlString = `<response><message>${responseJSON.querySelector('message').textContent}</message></response>`;
        return respond(request, response, 200, xmlString, 'text/xml');
    }

    const jsonString = JSON.stringify(responseJSON);
    return respond(request, response, 200, jsonString, 'application/json');
}

const forbidden = (request, response, acceptedTypes) => {
    const responseJSON = {
        message: 'You do not have access to this content.',
        id: 'forbidden',
    };

    if(acceptedTypes[0] === 'text/xml') {
        const xmlString = `<response><message>${responseJSON.message}</message><id>${responseJSON.id}</id></response>`;

        return respond(request, response, 403, xmlString, 'text/xml');
    }

    const jsonString = JSON.stringify(responseJSON);
    return respond(request, response, 403, jsonString, 'application/json');
}

const internal = (request, response, acceptedTypes) => {
    const responseJSON = {
        message: 'Internal Server Error. Something went wrong.',
        id: 'internalError',
    };

    if(acceptedTypes[0] === 'text/xml') {
        const xmlString = `<response><message>${responseJSON.message}</message><id>${responseJSON.id}</id></response>`;

        return respond(request, response, 500, xmlString, 'text/xml');
    }

    const jsonString = JSON.stringify(responseJSON);
    return respond(request, response, 500, jsonString, 'application/json');
}

const notImplemented = (request, response, acceptedTypes) => {
    const responseJSON = {
        message: 'This page has not been implemented yet. Check back later for updates.',
        id: 'notImplemented',
    };

    if(acceptedTypes[0] === 'text/xml') {
        const xmlString = `<response><message>${responseJSON.message}</message><id>${responseJSON.id}</id></response>`;

        return respond(request, response, 501, xmlString, 'text/xml');
    }

    const jsonString = JSON.stringify(responseJSON);
    return respond(request, response, 501, jsonString, 'application/json');
}

const notFound = (request, response, acceptedTypes) => {
    const responseJSON = {
        message: 'The page you are looking for does not exist.',
        id: 'notFound',
    };

    if(acceptedTypes[0] === 'text/xml') {
        const xmlString = `<response><message>${responseJSON.message}</message><id>${responseJSON.id}</id></response>`;

        return respond(request, response, 404, xmlString, 'text/xml');
    }

    const jsonString = JSON.stringify(responseJSON);
    return respond(request, response, 404, jsonString, 'application/json');
}

module.exports = {
    success,
    badRequest,
    unauthorized,
    forbidden,
    internal,
    notImplemented,
    notFound
}