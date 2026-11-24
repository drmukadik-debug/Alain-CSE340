function flashMiddleware(req, res, next) {
    if (!req.session.flashMessages) {
        req.session.flashMessages = {};
    }

    req.flash = function (type, message) {
        if (message) {
            if (!req.session.flashMessages[type]) {
                req.session.flashMessages[type] = [];
            }

            req.session.flashMessages[type].push(message);
        } else {
            const messages = req.session.flashMessages[type] || [];
            delete req.session.flashMessages[type];
            return messages;
        }
    };

    res.locals.flashMessages = {};

    for (const type of Object.keys(req.session.flashMessages)) {
        res.locals.flashMessages[type] = req.flash(type);
    }

    next();
}

export default flashMiddleware;