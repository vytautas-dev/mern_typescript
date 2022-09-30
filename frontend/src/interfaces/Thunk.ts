export interface ThunkAPI {
  dispatch: Function;
  getState: Function;
  extra?: any;
  requestId: string;
  signal: AbortSignal;
  rejectWithValue: Function;
}
