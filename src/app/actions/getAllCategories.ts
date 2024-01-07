import data from './categories.json'

export const getAllCategories = async ()=>{

    const indexArray = Object.keys((data.categories)).map((index,i) => ({
        value: i,
        label: index,
        subLabels: data.categories[index]
    }));
    return indexArray
}
