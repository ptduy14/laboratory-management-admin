export enum MeasurementUnit {
    ml = 8,
    l = 9,
    g = 10,
    kg = 11,
    m = 12,
  }
  
  interface MeasurementUnitNamesType {
      [key: number]: string
  }
  
  export const MeasurementUnitNames: MeasurementUnitNamesType = {
      [MeasurementUnit.ml]: "ml",
      [MeasurementUnit.l]: "l",
      [MeasurementUnit.g]: "g",
      [MeasurementUnit.kg]: "kg",
      [MeasurementUnit.m]: "m",
  }
  