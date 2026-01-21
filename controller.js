import { shortenURL, getLongURL } from "./service.js";

export async function getShortURL(req, res) {
  try {
    const { long_url } = req.body;

    // add input validation code here
    var pattern = /^https?:\/\//; // Regex to check if it starts with "http://" or "https://"
    if (!long_url.match(pattern)) {
      // console.log("Invalid Long URL Provided!");
      throw new Error("Invalid Long URL Provided!");
    }

    const shortCode = await shortenURL(long_url); // point to service
    const response = {
      longURL: long_url,
      shortCode: shortCode,
    };
    res.send(response);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}

export async function redirectURL(req, res) {
  try {
    const long_url = await getLongURL(req.params.code);

    res.redirect(302, long_url);

    // Send html text that redirects on opens in same tab the long url link
    // res.send(`
    // <!DOCTYPE html>
    // <html>
    //   <head>
    //     <title>Redirect on Load</title>
    //   </head>
    //   <body
    //     onload="window.location.href = '${long_url}';"
    //   ></body>
    // </html>
    // `);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}
