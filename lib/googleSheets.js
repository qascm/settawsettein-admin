import { google } from "googleapis";

const credentials = JSON.parse(
  process.env.GOOGLE_SERVICE_ACCOUNT_JSON
);

const auth = new google.auth.GoogleAuth({
  credentials,
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

const sheets = google.sheets({
  version: "v4",
  auth,
});

const spreadsheetId = process.env.GOOGLE_SHEET_ID;

export { sheets, spreadsheetId };