export type ObjectValues = {
  name: string,
  value: number,
  idValue?: number,
  idOther?: number,
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
  idReceived?: number,
  idSpent?: number,
};
