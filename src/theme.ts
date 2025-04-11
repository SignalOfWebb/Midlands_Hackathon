import { extendTheme, type ThemeConfig } from '@chakra-ui/react'

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
}

const colors = {
  primary: {
    50: '#e3f2fd',
    100: '#bbdefb',
    200: '#90caf9',
    300: '#64b5f6',
    400: '#42a5f5',
    500: '#2196f3',
    600: '#1e88e5',
    700: '#1976d2',
    800: '#1565c0',
    900: '#0d47a1',
  },
  accent: {
    50: '#f3e5f5',
    100: '#e1bee7',
    200: '#ce93d8',
    300: '#ba68c8',
    400: '#ab47bc',
    500: '#9c27b0',
    600: '#8e24aa',
    700: '#7b1fa2',
    800: '#6a1b9a',
    900: '#4a148c',
  },
  gray: {
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#eeeeee',
    300: '#e0e0e0',
    400: '#bdbdbd',
    500: '#9e9e9e',
    600: '#757575',
    700: '#616161',
    800: '#1E1E24',
    900: '#0F0F12',
  },
}

// Component-specific styling
const components = {
  Button: {
    baseStyle: {
      fontWeight: '600',
      borderRadius: 'lg',
    },
    variants: {
      primary: {
        bg: 'primary.500',
        color: 'white',
        _hover: {
          bg: 'primary.600',
        },
      },
    },
  },
  Heading: {
    baseStyle: {
      fontWeight: '700',
    },
  },
  Card: {
    baseStyle: {
      container: {
        bg: 'gray.800',
        borderRadius: 'xl',
        overflow: 'hidden',
      },
    },
  },
  Progress: {
    baseStyle: {
      track: {
        bg: 'gray.700',
      },
      filledTrack: {
        bg: 'primary.500',
      },
    },
  },
  Alert: {
    baseStyle: {
      container: {
        borderRadius: 'md',
      },
    },
  },
}

const theme = extendTheme({
  config,
  colors,
  components,
  styles: {
    global: {
      body: {
        bg: 'gray.900',
        color: 'white',
      },
    },
  },
  fonts: {
    heading: `'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`,
    body: `'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`,
  },
})

export default theme 