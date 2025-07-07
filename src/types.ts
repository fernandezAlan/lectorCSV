type Contador = {
  [key: string]: string;
};

export type Alldata = {
  total: Contador;
  parcial: Contador;
};

export type HoraData = {
  [hour: string]: Alldata;
};

export type DataMap = {
  [date: string]: HoraData;
};