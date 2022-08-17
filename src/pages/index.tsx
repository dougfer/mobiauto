import React from 'react'
import Head from 'next/head'
import { Form } from 'src/components'
import { getBrands } from 'src/service'
import type { InferGetServerSidePropsType } from 'next'
import { Typography, Stack, styled, alpha } from '@mui/material'

const Home = ({ brands }: InferGetServerSidePropsType<typeof getServerSideProps>) => {

  const Container = styled(Stack)({
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: alpha('#d9a7c7', 0.2)
  })

  return (
    <div>
      <Head>
        <title>Buscar</title>
      </Head>
      <Container>
        <Typography variant='h4'>Tabela Fipe</Typography>
        <Typography variant='h6'>Consulte o valor de um veículo de forma gratuita</Typography>
        <Form brands={brands} />
      </Container>

    </div>
  )
}

export default Home

export async function getServerSideProps() {
  const result = await getBrands()

  return {
    props: {
      brands: result
    }
  }
}
