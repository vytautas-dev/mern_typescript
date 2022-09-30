import { useDispatch } from 'react-redux';
import { AppDispatch } from '../app/store';
import { deleteGoal } from '../features/goals/goalSlice';

const useAppDispatch: () => AppDispatch = useDispatch;

interface IGoalProps {
  goal: {
    _id: string;
    user: string;
    text: string;
  };
}

function GoalItem({ goal }: IGoalProps) {
  const dispatch = useAppDispatch();

  return (
    <div className='goal'>
      <h2>{goal.text}</h2>
      <button className='close' onClick={() => dispatch(deleteGoal(goal._id))}>
        X
      </button>
    </div>
  );
}

export default GoalItem;
