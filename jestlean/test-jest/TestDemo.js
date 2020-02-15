import axios from 'axios';

const fetchData = () => {
  return axios.get('/').then(res => res.data);
}

const getNumber = () => {
  return 123;
}
export {
  fetchData,
  getNumber
};