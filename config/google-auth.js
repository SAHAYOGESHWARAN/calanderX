const { google } = require('googleapis');
const axios = require('axios');
require('dotenv').config();

const { GOOGLE_CLIENT_ID, 
  GOOGLE_CLIENT_SECRET,
   CALLBACK_URL } = process.env;

const oauth2Client = new google.auth.OAuth2(
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  CALLBACK_URL
);

function getGoogleAuthURL() {
  const scopes = [
    'profile',
    'email',
    'https://www.googleapis.com/auth/calendar'
  ];

  return oauth2Client.generateAuthUrl({
    access_type: 'offline',
    prompt: 'consent',
    scope: scopes,
  });
}
