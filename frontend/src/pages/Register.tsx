import { useState, useEffect } from 'react';
import { IRegisterFormData } from '../interfaces/Form';
import { FaUser } from 'react-icons/fa';

function Register() {
  const [formData, setFormData] = useState<IRegisterFormData>({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const { name, email, password, password2 } = formData;

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
