import axios from 'axios'
import { BrandResponse } from 'src/types'

export const getBrands = async (): Promise<BrandResponse[]> => {
  try {
    const response = await axios.get('https://parallelum.com.br/fipe/api/v1/carros/marcas')

    return response.data
  } catch (err: any) {
    return err
  }
}
