import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { GetPriceParams, GetPriceResponse, ModelResponse, TransformedResponse } from 'src/types'

export const carInfoApi = createApi({
  reducerPath: 'carInfoApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://parallelum.com.br/fipe/api/v1/carros/marcas' }),
  endpoints: (builder) => ({
    getModelAndYearByBrand: builder.query<TransformedResponse, string>({
      query: (brand) => `/${brand}/modelos`,
      transformResponse: (data: ModelResponse) => (Object.entries(data).reduce((acc, cur) => {
        return {
          ...acc,
          [cur[0]]: cur[1].map((item) => ({ label: item.nome, code: item.codigo }))
        }
      }, {} as TransformedResponse))
    }),
    getPrice: builder.query<GetPriceResponse, GetPriceParams>({
      query: ({ brand, model, year }) => `/${brand}/modelos/${model}/anos/${year}`,

    })
  }),
})

export const { useLazyGetModelAndYearByBrandQuery, useLazyGetPriceQuery } = carInfoApi
