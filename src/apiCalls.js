// =====================================================================
// =========================  FETCH REQUESTS  ==========================
// =====================================================================

const getData = (data) => {
  return fetch(`https://what-s-cookin-starter-kit.herokuapp.com/api/v1/${data}`)
      .then(response => response.json())
      .catch(error => console.log("ERROR", error));
};

const getAllData = () => {
  return Promise.all([ getData('users'), getData('ingredients'), getData('recipes') ]);
};

export {
  getAllData,
  getData
};

