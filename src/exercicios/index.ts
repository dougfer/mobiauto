export const maskify = (toMask: string) => {
  if(toMask.length > 4) {
    const chaaractersToMask = toMask.substring(0, toMask.length - 4)
    const lastFourCharacters = toMask.substring(toMask.length - 4, toMask.length)

    return `${chaaractersToMask.replace(/\w/g, '#').replace(/\s/g, '')}${lastFourCharacters}`
  }
  return toMask
}

type GenericObject = Record<string, any>

export const updateData = (currentObject: GenericObject, newDataObject: GenericObject) => {
  return Object.keys(newDataObject).reduce((acc, curr) => {
    if(currentObject[curr]) {
      return {
        ...currentObject,
        ...acc,
        [curr]: newDataObject[curr]
      }
    }
    return {
      ...currentObject
    }
  }, {})
}

const fetchRickAndMortyData = async () => {
  return fetch('https://rickandmortyapi.com/api/character')
    .then((res: any) => res.json())
    .then((data: any) => data)
    .catch((err): any => err)
}

export const getRickAndMortySpecificCharacters = async () => {
  const names = ['Rick Sanchez', 'Morty Smith', 'Summer Smith', 'Beth Smith', 'Jerry Smith']
  const { results } = await fetchRickAndMortyData()

  const gender: Record<string, string> = {
    Male: 'Homem',
    Female: 'Mulher'
  }

  const specie: Record<string, string> = {
    Human: 'Humano'
  }

  return results.reduce((acc: any, cur: any) => {
    if(names.includes(cur.name)) {
      acc.push({
        nome: cur.name,
        genero: gender[cur.gender],
        avatar: cur.image,
        especie: specie[cur.species]
      })
    }
    return acc
  }, [])
}

export const checkIfTheFirstLetterIsUppercase = (word: string) => {
  return word.split('')[0] === word.split('')[0].toLocaleLowerCase()
}

module.exports = {
  maskify,
  updateData,
  getRickAndMortySpecificCharacters,
  checkIfTheFirstLetterIsUppercase
}