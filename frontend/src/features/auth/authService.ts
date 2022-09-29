import axios from 'axios';
import { ILoginFormData, IRegisterFormData } from '../../interfaces/Form';

const API_URL = '/api/users/';

//Register user
const register = async (userData: IRegisterFormData) => {
  const response = await axios.post(API_URL + 'register', userData);
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};

//Login user
const login = async (userData: ILoginFormData) => {
  const response = await axios.post(API_URL + 'login', userData);
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};

//Logout user
const logout = () => {
  localStorage.removeItem('user');
};

const authService = { register, login, logout };

export default authService;
