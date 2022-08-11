import React, { useMemo, useState } from 'react'
import { Card, Autocomplete, TextField, Stack, styled, Button } from '@mui/material'
import { BrandResponse, ModelResponse } from 'src/types'
import { getModelsByBrand, getYearsByModel } from 'src/service'
import { useAppDispatch, useAppSelector } from 'src/store/hooks'
import { updateModel } from 'src/store/Slice'

type FormProps = {
  brands: BrandResponse[]
}

type Options = {
  label: string
  code: string
}

export const Form: React.FC<FormProps> = ({ brands }) => {
  const [iseLoading, setIsLoading] = useState(false)
  const [brand, setBrand] = useState<Options | undefined>()
  const [model, setModel] = useState<Options | undefined>()
  const [year, setYear] = useState<Options | undefined>()

  const dispatch = useAppDispatch()
  const { modelos, anos } = useAppSelector((state) => state.vehicle)

  const getModel = async (brand: string) => {
    setIsLoading(true)
    const result = await getModelsByBrand(brand)
    dispatch(updateModel(result))
    setIsLoading(false)
  }

  const top100Films = [
    { label: 'The Shawshank Redemption', year: 1994 },
    { label: 'The Godfather', year: 1972 },
    { label: 'The Godfather: Part II', year: 1974 },
    { label: 'The Dark Knight', year: 2008 },
    { label: '12 Angry Men', year: 1957 },
    { label: 'Schindler\'s List', year: 1993 },
    { label: 'Pulp Fiction', year: 1994 },
  ]

  const FormContainer = styled(Stack)({
    padding: 40,
  })

  const brandData = useMemo(() => {
    return brands.map((brand) => ({ label: brand.nome, code: brand.codigo }))
  }, [brands])

  const modelData = useMemo(() => modelos.map((model) => ({ label: model.nome, code: model.codigo })), [modelos])

  return (
    <Card sx={{ marginTop: 4 }}>
      <FormContainer spacing={4}>
        <Autocomplete
          disableClearable
          disablePortal
          id='combo-box-demo'
          options={brandData}
          sx={{ width: 350 }}
          value={brand}
          onChange={(event: any, newValue: Options) => {
            getModel(newValue.code)
            setBrand(newValue)
          }}
          renderInput={(params) => <TextField {...params} label='Marca' />}
        />
        <Autocomplete
          disableClearable
          disablePortal
          id='combo-box-demo'
          options={modelData}
          sx={{ width: 350 }}
          value={model}
          onChange={(event: any, newValue: Options) => {
            setModel(newValue)
          }}
          renderInput={(params) => <TextField {...params} label='Modelo' />}
        />
        <Autocomplete
          disableClearable
          disablePortal
          id='combo-box-demo'
          options={top100Films}
          sx={{ width: 350 }}
          renderInput={(params) => <TextField {...params} label='Movie' />}
        />
        <Stack>
          <Button variant='contained'>Consultar Preço</Button>
        </Stack>
      </FormContainer>
    </Card>
  )
}
