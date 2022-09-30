import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { IRegisterFormData } from '../interfaces/Form';
import { FaUser } from 'react-icons/fa';
import { register, resetAuth } from '../features/auth/authSlice';
import { AppDispatch, RootState } from '../app/store';
import Spinner from '../components/Spinner';

const useAppDispatch: () => AppDispatch = useDispatch;

function Register() {
  const [formData, setFormData] = useState<IRegisterFormData>({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const { name, email, password, password2 } = formData;

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess || user) {
      console.log(user);
      navigate('/');
    }
    dispatch(resetAuth());
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

    if (password !== password2) {
      toast.error('Passwords do not match');
    } else {
      const userData = { name, email, password, password2 };
      dispatch(register(userData));
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section className='heading'>
        <h1>
          <FaUser /> Register
        </h1>
        <p>Please create an account</p>
      </section>
      <section className='form'>
        <form onSubmit={onSubmit}>
          <fieldset className='form-group'>
            <input type='text' className='form-control' id='name' name='name' value={name} placeholder='Enter your name' onChange={onChange} />
            <input type='email' className='form-control' id='email' name='email' value={email} placeholder='Enter your email' onChange={onChange} />
            <input type='password' className='form-control' id='password' name='password' value={password} placeholder='Enter password' onChange={onChange} />
            <input type='password' className='form-control' id='password2' name='password2' value={password2} placeholder='Confirm password' onChange={onChange} />
          </fieldset>
          <button type='submit' className='btn btn-block'>
            Submit
          </button>
        </form>
      </section>
    </>
  );
}

export default Register;
