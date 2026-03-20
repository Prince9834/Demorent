// api/chatbot.js
const { google } = require('googleapis');
const keys = require('./service-account.json'); // your service account JSON

const spreadsheetId = "13rRnwWJF8SsHjHxkGaqCE5hEdhoPfZ4ecOeq_S94DvI"; // replace with your Sheet ID
const sheetName = "Sheet1";

const auth = new google.auth.GoogleAuth({
  credentials: keys,
  scopes: ["https://www.googleapis.com/auth/spreadsheets"]
});

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ status: 'error', message: 'Only POST allowed' });
    return;
  }

  try {
    const data = req.body;

    if (!data.name || !data.phone) {
      return res.status(400).json({ status: 'error', message: 'Name and phone required' });
    }

    const client = await auth.getClient();
    const googleSheets = google.sheets({ version: 'v4', auth: client });

    await googleSheets.spreadsheets.values.append({
      spreadsheetId,
      range: `${sheetName}!A:F`,
      valueInputOption: 'RAW',
      resource: {
        values: [
          [
            data.name || "",
            data.phone || "",
            data.email || "",
            data.requirement || "",
            data.date || "",
            new Date().toLocaleString()
          ]
        ]
      }
    });

    res.status(200).json({ status: 'success' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'error', message: err.message });
  }
      }
