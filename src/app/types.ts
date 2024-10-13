export type ObjectValues = {
  name: string,
  value: number,
};

export type ObjectMonth = {
  month: string,
  idValue?: number,
  totalReceived: number,
  totalSpent: number,
  profit: number,
  arrayReceiveds?: ObjectValues[],
  arraySpents?: ObjectValues[],
};

export type DeleteBody = {
  month: string,
};
