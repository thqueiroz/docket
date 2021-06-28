import { ToastProvider } from 'react-toast-notifications';
import { theme } from '../styles/theme';
import { ChakraProvider } from '@chakra-ui/react';
import { DocumentsProvider } from '../contexts/documents';

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme} resetCSS>
      <ToastProvider>
        <DocumentsProvider>
          <Component {...pageProps} />
        </DocumentsProvider>
      </ToastProvider>
    </ChakraProvider>
  );
}

export default MyApp
