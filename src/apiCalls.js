// =====================================================================
// =========================  FETCH REQUESTS  ==========================
// =====================================================================
import { setData, updateUser } from './scripts';

const getData = (data) => {
  return fetch(`http://localhost:3001/api/v1/${data}`)
      .then(response => response.json())
      .catch(error => console.log("ERROR", error));
};

const postData = (data) => {
  fetch('http://localhost:3001/api/v1/usersRecipes', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' }
  })
    .then(response => response.json())
    .then(resolve => {
      console.log('post')
      setData();
      // updateUser();
    })
    .catch(err => console.log(err));
};

const deleteData = (data) => {
  fetch('http://localhost:3001/api/v1/usersRecipes', {
    method: 'DELETE',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' }
  })
    .then(response => response.json())
    .then(resolve => setData())
    .catch(err => console.log(err));
};

const getAllData = () => {
  return Promise.all([ getData('users'), getData('ingredients'), getData('recipes') ]);
};

export {
  getAllData,
  getData,
  postData,
  deleteData
};

