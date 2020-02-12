import axios from 'axios';

function fetchDatas (callback) {
  const url = 'http://localhost:8080/api/test1.json'
  return axios.get(url);
}

export {
  fetchDatas
};