const express = require("express");
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client("878858859701-ngt2r2j69sfrad7josmdce93rmfcip7h.apps.googleusercontent.com");
app.use(bodyParser.json())

app.use(cors())
app.post('/api/google-login', async (req, res)=> {
   // console.log(req.body.token)

    const ticket = await client.verifyIdToken({
        idToken: req.body.token,
    })
    res.status(200).json(ticket.getPayload())
})
app.listen(4001, () => {
    console.log(`server is ready at http://localhost:4001`)
})