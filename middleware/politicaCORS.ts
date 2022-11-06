import Cors from 'cors'
import { NextApiRequest,NextApiResponse, NextApiHandler } from 'next'
const express = require('express');
const cors1 = require('cors');
const app = express();
app.use(cors1());

// Initializing the cors middleware
const cors = Cors({
    methods: ['GET','POST','PUT','DELETE', 'HEAD'],
})

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(req: NextApiRequest, res: NextApiResponse, fn:any) {
    return new Promise((resolve, reject) => {
        fn(req, res, (result:any) => {
            if (result instanceof Error) {
                return reject(result)
            }

            return resolve(result)
        })
    })
}

export const politicaCORS = (handler: NextApiHandler) =>
    async (req: NextApiRequest, res: NextApiResponse) => {
    // Run the middleware
    await runMiddleware(req, res, cors)

    // Rest of the API logic
    return handler(req,res);
}
