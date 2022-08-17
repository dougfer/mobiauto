import React, { useMemo, useCallback, useState } from 'react'
import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack'
import { LoadingButton } from '@mui/lab'
import { BrandResponse } from 'src/types'
import { SelectInput } from './components'
import { updateCarInfo } from 'src/store/Slice'
import { useAppDispatch } from 'src/store/hooks'
import { useLazyGetModelAndYearByBrandQuery, useLazyGetPriceQuery } from 'src/service/vehicle'
import { Card, Collapse, Stack, styled, SelectChangeEvent } from '@mui/material'

type FormProps = {
  brands: BrandResponse[]
}
export const Form: React.FC<FormProps> = ({ brands }) => {
  const dispatch = useAppDispatch()
  const { enqueueSnackbar } = useSnackbar()
  const [brand, setBrand] = useState('')
  const [model, setModel] = useState('')
  const [year, setYear] = useState('')
  const [trigger, args] = useLazyGetModelAndYearByBrandQuery()
  const [getPrice, priceArgs] = useLazyGetPriceQuery()

  const { data, isLoading } = args
  const router = useRouter()
  
  const FormContainer = styled('form')({
    padding: 40,
    width: '400px',
  })

  const brandData = useMemo(() => {
    return brands.map((brand) => ({ label: brand.nome, code: brand.codigo }))
  }, [brands])

  const handleBrandChange = useCallback((event: SelectChangeEvent) => {
    setBrand(event.target.value)
    setModel('')
    setYear('')
    trigger(event.target.value)
  }, [trigger])

  const handleModelChange = useCallback((event: SelectChangeEvent) => {
    setModel(event.target.value)
  }, [])

  const handleYearChange = useCallback((event: SelectChangeEvent) => {
    setYear(event.target.value)
  }, [])
  
  const isButtonEnabled = !!brand && !!model && !!year

  const onSubmit = async () => {
    if(brand && model && year) {
      const brandLabel = brandData.find((item) => item.code === brand)!.label
      const modelLabel = data!.modelos.find((item) => item.code === model)!.label
      const yearLabel = data!.anos.find((item) => item.code === year)!.label

      getPrice({ 
        brand,
        model,
        year
      }).then(({ data }) => {
        dispatch(updateCarInfo({
          brand: brandLabel,
          model: modelLabel,
          year: yearLabel,
          value: data!.Valor
        }))
        return router.push('/Result', '/result')
      }).catch(() => enqueueSnackbar('Ops, houve um problema. Tente novamente!', {
        variant: 'error'
      }))
    }
  }

  return (
    <Card sx={{ marginTop: 4 }}>
      <FormContainer>
        <SelectInput label='Marcas' handleChange={handleBrandChange} options={brandData} value={brand} />
        <SelectInput label='Modelos' disabled={isLoading} handleChange={handleModelChange} options={data?.modelos} value={model} />
        <Collapse in={!!model}>
          <SelectInput label='Ano' handleChange={handleYearChange} options={data?.anos} value={year} />
        </Collapse>
        <Stack>
          <LoadingButton 
            loadingPosition='start'
            loading={priceArgs.isLoading}
            onClick={onSubmit} 
            disabled={!isButtonEnabled} 
            variant='contained'>
              Consultar Preço
          </LoadingButton>
        </Stack>
      </FormContainer>
    </Card>
  )
}