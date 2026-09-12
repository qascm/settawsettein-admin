import fs from "fs";
import path from "path";
import { google } from "googleapis";

const credentialsPath = path.join(
  process.cwd(),
  "google-service-account.json"
);

const credentials = JSON.parse(
  fs.readFileSync(credentialsPath, "utf8")
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