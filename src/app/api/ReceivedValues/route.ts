"use server";

import { connectToDatabase } from '../../../connectionDB';

export async function GET() {
  const pool = await connectToDatabase();
    try {
      const select = await pool.request().query(`
        USE AppExtensao;
        SELECT idValue, nameReceived, valueReceived
        FROM receivedValues;
        `)
      return Response.json(select.recordset)
    } catch (e) {
      return Response.json(e)
    }
}


