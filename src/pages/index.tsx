import React, { useEffect } from 'react'
import type { InferGetServerSidePropsType } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { Typography, Stack, Card, styled, alpha } from '@mui/material'
import { Form } from 'src/components'
import { getBrands } from 'src/service'



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
