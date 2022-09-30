export interface IGoal {
  _id: string;
  user: string;
  text: string;
}

export interface IGoals {
  count: number;
  goals: IGoal[];
}

export interface IGoalState {
  goals: IGoals;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
}
