const fetch = require('node-fetch');

const getCrewSize = async (id) =>{
  const res = await fetch(`https://swapi.dev/api/people/${id}`)
  const {starships} = await res.json();

  if(starships.length === 0) return 0;

  const shipArray = await Promise.all(
    starships.map(ship=>
      fetch(ship)
      .then(res=>res.json())));
  
  
  return shipArray.reduce((acc,val)=>{
    if(!val.crew){
      acc += 1
    }else acc+=+val.crew
    return acc
  },0)
  

};
getCrewSize(1).then(data=>console.log(data))