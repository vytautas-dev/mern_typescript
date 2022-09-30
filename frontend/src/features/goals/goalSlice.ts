import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IGoalState } from '../../interfaces/Goal';
import { ThunkAPI } from '../../interfaces/Thunk';
import goalService from './goalService';

const initialState: IGoalState = {
  goals: {
    count: 0,
    goals: [],
  },
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

export const createGoal = createAsyncThunk('goal/create', async (goalData: { [key: string]: string }, thunkAPI: ThunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await goalService.createGoal(goalData, token);
  } catch (error: any) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const getGoals = createAsyncThunk('goal/getAll', async (_, thunkAPI: ThunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await goalService.getGoals(token);
  } catch (error: any) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const deleteGoal = createAsyncThunk('goals/delete', async (id: string, thunkAPI: ThunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await goalService.deleteGoal(id, token);
  } catch (error: any) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const goalSlice = createSlice({
  name: 'goal',
  initialState,
  reducers: {
    resetGoals: () => initialState,
  },
  extraReducers: builder => {
    builder
      .addCase(createGoal.pending, state => {
        state.isLoading = true;
      })
      .addCase(createGoal.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.goals.goals.push(action.payload);
        state.goals.count = state.goals.goals.length;
      })
      .addCase(createGoal.rejected, (state, action: any) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getGoals.pending, state => {
        state.isLoading = true;
      })
      .addCase(getGoals.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.goals = action.payload;
      })
      .addCase(getGoals.rejected, (state, action: any) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteGoal.pending, state => {
        state.isLoading = true;
      })
      .addCase(deleteGoal.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.goals.goals = state.goals.goals.filter(goal => goal._id !== action.payload.id);
        state.goals.count = state.goals.goals.length;
      })
      .addCase(deleteGoal.rejected, (state, action: any) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { resetGoals } = goalSlice.actions;
export default goalSlice.reducer;
