import mysql from "mysql2";
import { config } from "dotenv";
config();

const pool = mysql
  .createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  })
  .promise();

export async function findRow(long_url) {
  const [rows] = await pool.query(
    `
  SELECT * 
  FROM urls
  WHERE long_url = ?
  `,
    [long_url]
  );
  return rows[0];
}

export async function addRow(long_url) {
  const [result] = await pool.query(
    `
  INSERT INTO urls (long_url)
  VALUES (?)
  `,
    [long_url]
  );
  const id = result.insertId;
  return id;
}

export async function addShortCode(id, shortCode) {
  const [result] = await pool.query(
    `
  UPDATE urls
  SET shortCode = ?
  WHERE id = ?
  `,
    [shortCode, id]
  );
}

export async function findURL(id) {
  const [rows] = await pool.query(
    `
  SELECT * 
  FROM urls
  WHERE id = ?
  `,
    [id]
  );
  return rows[0];
}
