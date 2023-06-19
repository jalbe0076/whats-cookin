// =====================================================================
// =========================  FETCH REQUESTS  ==========================
// =====================================================================
import { setData, updateUser } from './scripts';

const getData = (data) => {
  return fetch(`https://whats-cookin-api-ivory.vercel.app/api/v1/${data}`)
      .then(response => response.json())
      .catch(error => console.log("ERROR", error));
};

const postData = (data) => {
  fetch('https://whats-cookin-api-ivory.vercel.app/api/v1/usersRecipes', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' }
  })
    .then(response => response.json())
    .then(resolve => setData())
    .catch(err => console.log("ERROR", err));
};

const deleteData = (data) => {
  fetch('https://whats-cookin-api-ivory.vercel.app/api/v1/usersRecipes', {
    method: 'DELETE',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' }
  })
    .then(response => response.json())
    .then(resolve => setData())
    .catch(err => console.log("ERROR", err));
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

