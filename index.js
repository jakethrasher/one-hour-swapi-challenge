const fetch = require('node-fetch');

const getCrew = async (urlArray) => {
    const res = await Promise.all(
        urlArray.map(async (url)=>{
            const data = await fetch(`${url}`)
            return data.json()
        }));

    const sum = res.reduce((acc, value)=> {
        if(value.crew){
            acc += Number(value.crew)
        }else acc += 1
        return acc
    }, 0)
    return sum
}
const getCrewSize = async (id) => {
    const res = await fetch(`https://swapi.dev/api/people/${id}`)
    const {starships} = await res.json();

    const crew = await getCrew(starships)

    return crew
}

getCrewSize(1).then(res=>console.log(res))