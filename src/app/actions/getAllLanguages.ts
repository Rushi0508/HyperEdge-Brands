import axios from "axios";
import _ from 'lodash'

const apiUrl = 'https://restcountries.com/v2/all';

export async function getAllLanguages() {
  try {
    const response = await axios.get(apiUrl);
    
    if (response.status === 200) {
      const countries = response.data;

      // Extract unique languages using lodash
      const allLanguages = _(countries)
      .flatMap('languages')
      .map('name')
      .compact() // Removes undefined values
      .uniq()
      .map((language, index) => ({ value: index.toString(), label: language }))
      .value();

      return allLanguages
    } else {
      return []
    }
  } catch (error:any) {
    console.error(`Error: ${error.message}`);
  }
}
