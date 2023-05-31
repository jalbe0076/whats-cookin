// =====================================================================
// =========================  FETCH REQUESTS  ==========================
// =====================================================================

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
    .catch(err => alert(err))
};

const getAllData = () => {
  return Promise.all([ getData('users'), getData('ingredients'), getData('recipes') ]);
};

export {
  getAllData,
  getData,
  postData
};

