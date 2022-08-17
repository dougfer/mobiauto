import React, { useEffect } from 'react'
import { useAppSelector } from 'src/store/hooks'
import { Stack, Typography, Chip, styled, Button } from '@mui/material'
import { useRouter } from 'next/router'
import Head from 'next/head'

const Result: React.FC = () => {
  const router = useRouter()

  const info = useAppSelector((state) => state.vehicle)

  const Container = styled(Stack)({
    height: '100vh',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2ebf91',
  })

  useEffect(() => {
    if(!info.brand) {
      router.push('/')
    }
  }, [info.brand, router])

  return (
    <div>
      <Head>
        <title>Resultado</title>
      </Head>
      <Container spacing={2}>
        <Typography variant='h4'>{info.brand} {info.model} {info.year}</Typography>
        <Chip variant='filled' color='success' sx={{ fontSize: 35, padding: 3 }} label={info.value} />
        <Typography variant='body1'>Esse é o preço de compra do veículo</Typography>
        <Button onClick={() => router.push('/')} variant='contained'>Voltar</Button>
      </Container>
    </div>
  )
}

export default Result