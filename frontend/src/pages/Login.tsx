import { useState, useEffect } from 'react';
import { ILoginFormData } from '../interfaces/Form';
import { FaSignInAlt } from 'react-icons/fa';
import { AppDispatch, RootState } from '../app/store';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login, reset } from '../features/auth/authSlice';
import Spinner from '../components/Spinner';
import { toast } from 'react-toastify';

const useAppDispatch: () => AppDispatch = useDispatch;

function Login() {
  const [formData, setFormData] = useState<ILoginFormData>({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector((state: RootState) => state.auth);

  const { email, password } = formData;

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      navigate('/');
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.target as HTMLInputElement;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const userData = { email, password };
    dispatch(login(userData));
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section className='heading'>
        <h1>
          <FaSignInAlt /> Login
        </h1>
        <p>Login and start setting goals</p>
      </section>
      <section className='form'>
        <form onSubmit={onSubmit}>
          <fieldset className='form-group'>
            <input type='email' className='form-control' id='email' name='email' value={email} placeholder='Enter your email' onChange={onChange} />
            <input type='password' className='form-control' id='password' name='password' value={password} placeholder='Enter password' onChange={onChange} />
          </fieldset>
          <button type='submit' className='btn btn-block'>
            Submit
          </button>
        </form>
      </section>
    </>
  );
}

export default Login;
