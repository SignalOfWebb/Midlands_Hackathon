'use client'

import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { ReactNode } from 'react'

const theme = extendTheme({
  colors: {
    primary: {
      50: '#e6e8ff',
      100: '#c9ccff',
      200: '#9da3ff',
      300: '#7179ff',
      400: '#4154de', // Main blue accent color
      500: '#3745be',
      600: '#2d379f',
      700: '#232a7f',
      800: '#191c60',
      900: '#0f0f40',
    },
    gray: {
      50: '#f7f7f7',
      100: '#ededed',
      200: '#d9d9d9',
      300: '#c4c4c4',
      400: '#9d9d9d',
      500: '#818181',
      600: '#666666',
      700: '#4d4d4d',
      800: '#333333',
      900: '#1a1a1a',
    },
    accent: {
      400: '#4154de',
      500: '#3745be',
      600: '#2d379f',
      700: '#232a7f',
      800: '#191c60',
      900: '#0f0f40',
    },
    background: {
      primary: '#ffffff',
      secondary: '#f5f5f5',
      dark: '#111111'
    }
  },
  styles: {
    global: {
      body: {
        bg: '#111111',
        color: 'white',
      },
    },
  },
  components: {
    Button: {
      variants: {
        solid: {
          bg: 'primary.400',
          color: 'white',
          _hover: {
            bg: 'primary.500',
          },
        },
        outline: {
          borderColor: 'primary.400',
          color: 'primary.400',
          _hover: {
            bg: 'whiteAlpha.100',
          },
        },
        ghost: {
          color: 'primary.400',
          _hover: {
            bg: 'whiteAlpha.100',
          },
        },
      },
      defaultProps: {
        colorScheme: 'primary',
      },
    },
  },
})

export function Providers({ children }: { children: ReactNode }) {
  return (
    <CacheProvider>
      <ChakraProvider theme={theme}>
        {children}
      </ChakraProvider>
    </CacheProvider>
  )
} 