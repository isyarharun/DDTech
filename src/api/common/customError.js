class BadRequestError extends Error {
    constructor(args) {
        super(args)
        this.name = 'BadRequestError'
        this.message = args.message
    }
}

class NotFoundError extends Error {
    constructor(args) {
        super(args)
        this.name = 'NotFoundError'
        this.message = args.message
    }
}

function mapDomainErrorToHttpResponse(res, err) {
    if (err instanceof BadRequestError) {
        res.status(400).send({
            error: err.message
        })
    } else if (err instanceof NotFoundError) {
        res.status(404).send({
            error: err.message
        })
    } else {
        res.status(500).send({
            error: 'Internal server error'
        })
    }
}

module.exports = {
    BadRequestError,
    NotFoundError,
    mapDomainErrorToHttpResponse
}
