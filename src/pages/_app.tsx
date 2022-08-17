import React from 'react'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { store } from 'src/store/store'
import { SnackbarProvider } from 'notistack'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <SnackbarProvider maxSnack={1}>
        <Component {...pageProps} />
      </SnackbarProvider>
    </Provider>
  )
}

export default MyApp
