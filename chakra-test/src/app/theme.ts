import { extendTheme, type ThemeConfig } from '@chakra-ui/react'

// Color mode config
const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
}

// Custom colors for Birmingham AI Navigator
const colors = {
  primary: {
    50: '#e6f7ff',
    100: '#b3e0ff',
    200: '#80caff',
    300: '#4db3ff',
    400: '#1a9dff',
    500: '#0087e6',
    600: '#0068b3',
    700: '#004a80',
    800: '#002b4d',
    900: '#000d1a',
  },
  accent: {
    50: '#f0e6ff',
    100: '#d1bfff',
    200: '#b399ff',
    300: '#9473ff',
    400: '#754cff',
    500: '#5626ff',
    600: '#4c1edb',
    700: '#4316b8',
    800: '#390f94',
    900: '#2f0871',
  },
  background: {
    card: 'rgba(30, 30, 40, 0.5)',
    page: '#0f0f12',
  },
}

// Custom component styles
const components = {
  Card: {
    baseStyle: {
      container: {
        backgroundColor: 'background.card',
        backdropFilter: 'blur(10px)',
        borderRadius: 'xl',
        borderWidth: '1px',
        borderColor: 'rgba(255, 255, 255, 0.1)',
        overflow: 'hidden',
      },
    },
  },
}

// Global styles
const styles = {
  global: (props: any) => ({
    body: {
      bg: 'background.page',
      color: 'white',
    },
  }),
}

// Extended theme
export const theme = extendTheme({
  config,
  colors,
  components,
  styles,
}) 