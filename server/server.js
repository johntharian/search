const express = require('express');
const cors = require('cors')

const connectDb = require("./connection.js");

connectDb()
const app = express();

const port = process.env.PORT || 3001


app.use(cors())
app.use(express.json())

app.use('/auth/google',require('./routes/authRoutes'))
app.use('/index',require('./routes/indexRoutes'))
app.use('/user',require('./routes/userRoutes'))
// app.use('/test',require('./routes/test'))

app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})

// const dotenv=require('dotenv').config();
// const express = require('express');
// const {
//     OAuth2Client,
//   } = require('google-auth-library');
// const cors = require('cors')

// const app = express();

// app.use(cors());
// app.use(express.json());

// const clientId=process.env.CLIENT_ID


// const oAuth2Client = new OAuth2Client(
//     process.env.CLIENT_ID,
//     process.env.CLIENT_SECRET,
//     'postmessage',
//   );

// app.post('/auth/google', async (req, res) => {
//     console.log('reached here', req.body)
//     const { tokens } = await oAuth2Client.getToken(req.body.code); // exchange code for tokens
//     console.log("one step crossed")
//     console.log(tokens);
    
//     res.json(tokens);
//   });
  
// app.post('/auth/google/refresh-token', async (req, res) => {
//     const user = new UserRefreshClient(
//       clientId,
//       clientSecret,
//       req.body.refreshToken,
//     );
//     const { credentials } = await user.refreshAccessToken(); // optain new tokens
//     res.json(credentials);
//   })
  
// app.listen(3001, () => console.log(`server is running ${clientId}`));


