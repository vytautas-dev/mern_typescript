import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../app/store';
import GoalForm from '../components/GoalForm';
import { getGoals, resetGoals } from '../features/goals/goalSlice';
import Spinner from '../components/Spinner';
import GoalItem from '../components/GoalItem';

const useAppDispatch: () => AppDispatch = useDispatch;

function Dashboard() {
  const navigate = useNavigate();

  const { user } = useSelector((state: RootState) => state.auth);
  const { goals, isLoading, isError, message } = useSelector((state: RootState) => state.goals);
  console.log(goals);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }

    dispatch(getGoals());
  }, [user, navigate, isError, message, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section className='heading'>
        <h1>Welcome {user && user.name}</h1>
        <p>Goals Dashboard</p>
      </section>

      <GoalForm />

      <section className='content'>
        {goals.count > 0 ? (
          <div className='goals'>
            {goals.goals.map(goal => (
              <GoalItem key={goal._id} goal={goal} />
            ))}
          </div>
        ) : (
          <h3>You have not set any goals</h3>
        )}
      </section>
    </>
  );
}

export default Dashboard;
