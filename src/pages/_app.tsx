import store from '@/lib/redux';
import { AppProps } from 'next/app'
import '@/styles/globals.css'
import { Provider } from 'react-redux'


export default function App({ Component, pageProps }: AppProps) {
    return (
      <>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </>
    )
}
