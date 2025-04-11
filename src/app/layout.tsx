import { Providers as ChakraProviders } from './chakra-providers'
import './globals.css'
import { Providers } from './providers'

export const metadata = {
  title: 'Birmingham AI Navigator',
  description: 'AI literacy training platform for Birmingham Council staff',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ChakraProviders>
          <Providers>
            {children}
          </Providers>
        </ChakraProviders>
      </body>
    </html>
  )
}
