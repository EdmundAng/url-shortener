import { findRow, addRow, addShortCode, findURL } from "./repository.js";

const CHARS = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

function base62Encode(num) {
  let result = "";

  if (num === 0) return CHARS[0];

  while (num > 0) {
    result = CHARS[num % 62] + result;
    num = Math.floor(num / 62);
  }

  return result;
}

function base62Decode(code) {
  let num = 0;

  // console.log(`code: ${code}`);

  if (code === CHARS[0]) return 0;

  while (code.length > 0) {
    // Normal Division Formula: num_prev - (num * 62) = remainder]
    // Rearrange -> num_prev = remainder + (num * 62)
    // let code = "ba",
    // code = "ba", num = 0, remainder = CHARS.indexOf(code[0]) = 1, num_prev = 1
    // code = "a", num = 1, remainder = CHARS.indexOf(code[0]) = 0, num_prev = 62
    // code = "", terminate loop

    num = CHARS.indexOf(code[0]) + num * 62;
    // console.log(`num: ${num}`);
    code = code.slice(1); // remove first character from string
    // console.log(`code: ${code}`);
  }

  return num;
}

// For Step 1 (User creats short url + prevent duplicate entry):
export async function shortenURL(long_url) {
  const row = await findRow(long_url);
  console.log(row);

  if (row === undefined) {
    // if row doesn't exist
    // await addRow (add long to database, and get)
    const rowID = await addRow(long_url);
    const shortCode = base62Encode(rowID);
    addShortCode(rowID, shortCode);
    return shortCode; // return newly generated short code
  } else {
    // return existing shortCode
    return row.shortCode;
  }
}

// For Step 2 (User request to access short_url link, REDIRECTING):
export async function getLongURL(shortCode) {
  const row = await findURL(base62Decode(shortCode));
  console.log(row);

  if (row === undefined) {
    // this error propogates back to controller catch error
    throw new Error("Invalid Short URL Provided!");
  } else {
    return row.long_url;
  }
}
