import { ObjectMonth } from "../types";

export const getRequisition = async () => {
    const response: ObjectMonth[] = await (await fetch('/api/MonthsTable', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })).json(); 
    return response
}


export const postRequisition = async (data: ObjectMonth[]) => {
    const verifyMonth = await getRequisition();
    for (const object of verifyMonth) {
        let acumulator: number = 0;
        if (object.month.slice(0, 10) === data[acumulator].month) {
            return new Error('Month must be unique in table Months')
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
    console.log(data)
    const testRequisition = await fetch('/api/MonthsTable', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return await testRequisition.json();
}