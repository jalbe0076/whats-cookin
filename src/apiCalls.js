// =====================================================================
// =========================  FETCH REQUESTS  ==========================
// =====================================================================

function getData(data) {

// let test = new Promise((resolve, reject) => {

  // resolve(
    
   return fetch(`https://what-s-cookin-starter-kit.herokuapp.com/api/v1/${data}`)
    .then(response => response.json())
    .then(recipes => {return recipes})
    .catch(err => console.log('ERROR', err))
}
// });
// console.log(fetchData('recipes'))

// const test2 = test.then(result => {
//   // console.log(result)
//   return result.recipes
// })



// }
// console.log('function', test2)
// setTimeout(() => {
//   console.log('another function', test2)
// }, 1000)
// console.log(recipesFetch())
// console.log(setTimeout(() => {recipesFetch()}, 5000));

  // console.log(recipesFetch())

//   const work = () => {
//     recipesFetch().then(rest => {
//       // console.log(rest)
//       return ['ads']
//     })
//     return recipesFetch();
//   }
//   const test = work()
// console.log(test)
  // console.log(work)
  // console.log('tst')

export {
  getData
}

