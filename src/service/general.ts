import axios from 'axios'
import { BrandResponse, ModelResponse } from 'src/types'

export const getBrands = async (): Promise<BrandResponse[]> => {
  try {
    const response = await axios.get('https://parallelum.com.br/fipe/api/v1/carros/marcas')

    return response.data
  } catch (err: any) {
    return err
  }
}

export const getModelsByBrand = async (brand: string): Promise<ModelResponse> => {
  try {
    const response = await axios.get(`https://parallelum.com.br/fipe/api/v1/carros/marcas/${brand}/modelos`)

    return response.data
  } catch (err: any) {
    return err
  }
}

export const getYearsByModel = async (brand: string, model: string, year: string): Promise<BrandResponse[]> => {
  try {
    const response = await axios.get(`https://parallelum.com.br/fipe/api/v1/carros/marcas/${brand}/modelos/${model}/${year}/anos`)

    return response.data
  } catch (err: any) {
    return err
  }
}
