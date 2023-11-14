// pages/api/google-docs.js
import fetch from 'node-fetch';

export default async function handler(req, res) {
  const { url } = req.query;

  try {
    const response = await fetch(url);
    const text = await response.text();
    res.send(text);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
}
