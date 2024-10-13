"use server";

import { connectToDatabase } from '../../../connectionDB';
import { ObjectMonth } from '@/app/types';
import { DeleteBody } from '@/app/types';

export async function GET() {
  const pool = await connectToDatabase();
    try {
      const select = await pool.request().query(`
        SELECT M.idMonth, M.month, T.idValue, T.totalReceived, T.totalSpent, 
        T.profit FROM Months AS M
        INNER JOIN transactionValues AS T
        ON M.idValue = T.idValue;
        `)
      return Response.json(select.recordset)
    } catch (e) {
      return Response.json(e)
    }
}

export async function POST(req: Request) {
  const pool = await connectToDatabase();
  let globalResult: string = '';
  const reqBody: ObjectMonth[] = await req.json()
    for (const object of reqBody) {
      try {
          const result = await pool.request().query(`
          USE AppExtensao;
          INSERT INTO transactionValues (totalReceived, totalSpent, profit)
          VALUES (${object.totalReceived}, ${object.totalSpent}, ${object.profit});
          DECLARE @id_value INT;
          SET @id_value = (SELECT TOP 1 idValue FROM transactionValues ORDER BY idValue DESC);
          INSERT INTO Months (month, idValue)
          VALUES (CONVERT(DATE, '${object.month}', 120), @id_value);
        `);
        if(object.arrayReceiveds) {
          for (const objectChild of object.arrayReceiveds) {
            const resultChild = await pool.request().query(`
              DECLARE @id_value INT;
              SET @id_value = (SELECT TOP 1 idValue FROM transactionValues ORDER BY idValue DESC);
              INSERT INTO receivedValues (nameReceived, valueReceived, idValue)
              VALUES ('${objectChild.name}', '${objectChild.value}', @id_value);  
            `);
            globalResult = `${globalResult} ${resultChild.output}`;
          };
        }
        if(object.arraySpents) {
          for (const objectChild of object.arraySpents) {
            const resultChild = await pool.request().query(`
              USE AppExtensao;
              DECLARE @id_value INT;
              SET @id_value = (SELECT TOP 1 idValue FROM transactionValues ORDER BY idValue DESC);
              INSERT INTO spentValues (nameSpent, valueSpent, idValue)
              VALUES ('${objectChild.name}', '${objectChild.value}', @id_value);  
            `);
            globalResult = `${globalResult} ${resultChild.output}`;
          };
        }
        globalResult = `${globalResult} ${result.output}`;
        return Response.json(globalResult)
      } catch (e) {
          return Response.json(e)
      }
    }
};

export async function PATCH(req: Request) {
  const pool = await connectToDatabase();
  let globalResult: string = '';
  const reqBody: ObjectMonth[] = await req.json()
    for (const object of reqBody) {
      try {
        const result = await pool.request().query(`
          USE AppExtensao;
          DECLARE @id_value INT;
          SET @id_value = (SELECT idValue FROM Months WHERE month = (CONVERT(DATE, '${object.month}', 120)));
          UPDATE transactionValues SET totalReceived = ${object.totalReceived},
          totalSpent = ${object.totalSpent}, 
          profit = ${object.profit}
          WHERE idValue = @id_value;
          UPDATE Months SET month = CONVERT(DATE, '${object.month}', 120)
          WHERE idValue = @id_value;
        `);
        if(object.arrayReceiveds) {
          for (const objectChild of object.arrayReceiveds) {
            const resultChild = await pool.request().query(`
              USE AppExtensao;
              DECLARE @id_value INT;
              SET @id_value = (SELECT idValue FROM Months WHERE month = (CONVERT(DATE, '${object.month}', 120)));
              INSERT INTO receivedValues (nameReceived, valueReceived, idValue)
              VALUES ('${objectChild.name}', ${objectChild.value}, @id_value);   
            `);
            globalResult = `${globalResult} ${resultChild.output}`;
            console.log(resultChild.output);
          };
        }
        if(object.arraySpents) {
          for (const objectChild of object.arraySpents) {
            const resultChild = await pool.request().query(`
              DECLARE @id_value INT;
              SET @id_value = (SELECT idValue FROM Months WHERE month = (CONVERT(DATE, '${object.month}', 120)));
              INSERT INTO spentValues (nameSpent, valueSpent, idValue)
              VALUES ('${objectChild.name}', ${objectChild.value}, @id_value);    
            `);
            globalResult = `${globalResult} ${resultChild.output}`;
          };
        }
        globalResult = `${globalResult} ${result.output}`;
        return Response.json(globalResult)
      } catch (e) {
          
          return Response.json(e)
      }
    }
};

export async function DELETE(req: Request) {
  const pool = await connectToDatabase();
  const body: DeleteBody[] = await req.json();

  for (const object of body) {
    try {
      const select = await pool.request().query(`
        DECLARE @id_value INT;
        SET @id_value = (SELECT idValue FROM Months WHERE month = '${object.month}');
        DELETE Months WHERE idValue = @id_value;
        DELETE transactionValues WHERE idValue = @id_value;
        DELETE receivedValues WHERE idValue = @id_value;
        DELETE spentValues WHERE idValue = @id_value;
        `)
      return Response.json(select.output)
    } catch (e) {
      return Response.json(e)
    }
  }
}

