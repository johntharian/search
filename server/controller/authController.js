const dotenv = require("dotenv").config();
const asyncHandler = require("express-async-handler");
const { OAuth2Client } = require("google-auth-library");

const User = require("../Model/userModel");

// @desc user registration
const registerUser = async (userData, tokens) => {
  const name = userData.name;
  const email = userData.email;
  const given_name = userData.given_name;
  const picture = userData.picture;
  const access_token = tokens.access_token;
  const refresh_token = tokens.refresh_token;
  const expiry_date = tokens.expiry_date;

  const userExists = await User.findOne({ email: email });

  if (userExists) {
    await User.findOneAndUpdate(
      { email: email },
      {
        name: name,
        given_name: given_name,
        picture: picture,
        access_token: access_token,
        refresh_token: refresh_token,
        expiry_date: expiry_date,
      }
    );
    console.log("user signed in");
  } else {
    await User.create({
      name,
      given_name,
      email,
      picture,
      access_token,
      refresh_token,
      expiry_date,
      indexed: false,
    });
    console.log("user registered");
  }
  return true;
};

//  @desc return user information from server
const getUserFromAPI = async (tokens) => {
  const access_token = tokens["access_token"];

  const res = await fetch(
    `https://www.googleapis.com/oauth2/v2/userinfo?alt=json`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  );

  const userData = await res.json();

  registerUser(userData, tokens);

  const data = {
    name: userData.given_name,
    email: userData.email,
    picture: userData.picture,
    indexed: userData.indexed,
  };

  console.log(data);
  return data;
};

// @desc authenticate user

const authUser = asyncHandler(async (req, res) => {
  const clientId = process.env.CLIENT_ID;

  const oAuth2Client = new OAuth2Client(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    "postmessage"
  );

  const { tokens } = await oAuth2Client.getToken(req.body.code); // exchange code for tokens
  const user = await getUserFromAPI(tokens);
  console.log(4, user);
  res.json(user);
});

module.exports = authUser;
