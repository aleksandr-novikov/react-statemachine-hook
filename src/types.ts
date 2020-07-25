export type Reset = 'RESET';
export type Reducer = (prevState: string, action: string) => string;

export interface ModelState {
  [key: string]: { [key: string]: string };
}
export interface Model {
  initialState: string;
  states: ModelState;
}
