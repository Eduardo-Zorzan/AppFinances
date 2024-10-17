"use server";

import { connectToDatabase } from '../../../connectionDB';
import { DeleteBody } from '@/app/types';

export async function GET() {
  const pool = await connectToDatabase();
    try {
      const select = await pool.request().query(`
        USE AppExtensao;
        SELECT idValue, nameReceived, valueReceived, idReceived
        FROM receivedValues;
        `)
      return Response.json(select.recordset)
    } catch (e) {
      return Response.json(e)
    }
}

export async function POST(req: Request) {
  const pool = await connectToDatabase();
  const reqBody: DeleteBody[] = await req.json();
    try {
      const select = await pool.request().query(`
        USE AppExtensao;
        DELETE FROM receivedValues
        WHERE idReceived = ${reqBody[0].idReceived};
        `)
      return Response.json(select.recordset)
    } catch (e) {
      return Response.json(e)
    }
}


