import { ObjectMonth } from "../types";

type TemporaryObjectValuesReceived = {
  idValue: number,
  nameReceived: string,
  valueReceived: number,
}

type TemporaryObjectValuesSpent = {
  idValue: number,
  nameSpent: string,
  valueSpent: number,
}

async function getReceiveds(object: ObjectMonth[]) {
  const response2: TemporaryObjectValuesReceived[] =  await (await fetch('/api/ReceivedValues', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    },
  })).json();
  for (const i of object) {
    i.arrayReceiveds = [];
    for (const a of response2) {
      if (i.idValue === a.idValue) i.arrayReceiveds?.push({
        name: a.nameReceived,
        value: a.valueReceived,
      });
    }
  }
}

async function getSpents(object: ObjectMonth[]) {
  const response2: TemporaryObjectValuesSpent[] =  await (await fetch('/api/SpentValues', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    },
  })).json();
  for (const i of object) {
    i.arraySpents = [];
    for (const a of response2) {
      if (i.idValue === a.idValue) i.arraySpents?.push({
        name: a.nameSpent,
        value: a.valueSpent,
      });
    }
  }
}

export const getRequisition = async () => {
    const response: ObjectMonth[] = await (await fetch('/api/MonthsTable', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })).json();
    await getReceiveds(response);
    await getSpents(response);
    return response
}

export const postRequisition = async (data: ObjectMonth[]) => {
    const verifyMonth = await getRequisition();
    for (const object of verifyMonth) {
        let acumulator: number = 0;
        if (object.month.slice(0, 10) === data[acumulator].month) {
            throw new Error('Month must be unique in table Months')
        };
        acumulator++;
    }
    const testRequisition = await fetch('/api/MonthsTable', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    return testRequisition.json();
}

export const updateRequisition = async (data: ObjectMonth[]) => {
    const testRequisition = await fetch('/api/MonthsTable', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return await testRequisition.json();
}