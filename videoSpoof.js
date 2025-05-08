const originalFetch = window.fetch;

window.fetch = async function (input, init) {
    let body;
    if (input instanceof Request) body = await input.clone().text();
    else if (init && init.body) body = init.body;
    if (features.videoSpoof && body && body.includes('"operationName":"updateUserVideoProgress"')) {
        try {
            let bodyObj = JSON.parse(body);
            if (bodyObj.variables && bodyObj.variables.input) {
                const durationSeconds = bodyObj.variables.input.durationSeconds;
                bodyObj.variables.input.secondsWatched = durationSeconds;
                bodyObj.variables.input.lastSecondWatched = durationSeconds;
                body = JSON.stringify(bodyObj);
                if (input instanceof Request) { input = new Request(input, { body: body }); } 
                else init.body = body; 
            }
        } catch (e) { debug(`🚨 Error @ videoSpoof.js\n${e}`); }
    }
    return originalFetch.apply(this, arguments);
};