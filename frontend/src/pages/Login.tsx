import { useState, useEffect } from 'react';
import { ILoginFormData } from '../interfaces/Form';
import { FaSignInAlt } from 'react-icons/fa';

function Login() {
  const [formData, setFormData] = useState<ILoginFormData>({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.target as HTMLInputElement;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

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
