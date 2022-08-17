export type BrandResponse = {
  nome: string
  codigo: string
}

export type ModelResponse = {
  anos: BrandResponse[]
  modelos: BrandResponse[]
}

export type Options = {
  label: string
  code: string
}

export type TransformedResponse = {
  anos: Options[]
  modelos: Options[]
}

export type GetPriceResponse = {
  AnoModelo: number
  CodigoFipe: string
  Combustivel: string
  Marca: string
  MesReferencia: string
  Modelo: string
  SiglaCombustivel: string
  TipoVeiculo: number
  Valor: string
}

export type GetPriceParams = {
  brand: string,
  model: string,
  year: string
}
