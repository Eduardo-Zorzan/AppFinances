"use server";

import { connectToDatabase } from '../../../connectionDB';
import { DeleteBody } from '@/app/types';

export async function GET() {
  const pool = await connectToDatabase();
    try {
      const select = await pool.request().query(`
        USE AppExtensao;
        SELECT idValue, nameSpent, valueSpent, idSpent 
        FROM spentValues;
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
        DELETE FROM spentValues
        WHERE idSpent= ${reqBody[0].idSpent};
        `)
      return Response.json(select.recordset)
    } catch (e) {
      return Response.json(e)
    }
}


