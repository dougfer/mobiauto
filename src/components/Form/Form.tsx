import React, { useMemo } from 'react'
import { Card, Autocomplete, TextField, Stack, styled, Button } from '@mui/material'
import { BrandResponse } from 'src/types'

type FormProps = {
  brands: BrandResponse[]
}

export const Form: React.FC<FormProps> = ({ brands }) => {

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

  return (
    <Card sx={{ marginTop: 4 }}>
      <FormContainer spacing={4}>
        <Autocomplete
          disableClearable
          disablePortal
          id='combo-box-demo'
          options={brandData}
          sx={{ width: 350 }}
          renderInput={(params) => <TextField {...params} label='Marca' />}
        />
        <Autocomplete
          disableClearable
          disablePortal
          id='combo-box-demo'
          options={top100Films}
          sx={{ width: 350 }}
          renderInput={(params) => <TextField {...params} label='Movie' />}
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
