export type BrandResponse = {
  nome: string
  codigo: string
}

export type ModelResponse = {
  anos: BrandResponse[]
  modelos: BrandResponse[]
}