import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch, TypedUseSelectorHook } from 'react-redux';
import { AppDispatch, RootState } from '../app/store';
import { logout, resetAuth } from '../features/auth/authSlice';
import { resetGoals } from '../features/goals/goalSlice';

const useAppDispatch: () => AppDispatch = useDispatch;

function Header() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { user } = useSelector((state: RootState) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(resetAuth());
    dispatch(resetGoals());
    navigate('/');
  };

  return (
    <header className='header'>
      <div className='logo'>
        <Link to='/'>GoalSetter</Link>
      </div>
      <ul>
        {user ? (
          <li>
            <button className='btn' onClick={onLogout}>
              <FaSignOutAlt /> Logout
            </button>
          </li>
        ) : (
          <>
            <li>
              <Link to='/login'>
                <FaSignInAlt /> Login
              </Link>
            </li>
            <li>
              <Link to='/register'>
                <FaUser /> Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
  );
}

export default Header;
