import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#1976d2' },
    secondary: { main: '#0288d1' },
    background: {
      default: '#f4f6f8',
      paper: '#ffffff'
    },
    text: {
      primary: '#1a1a1a',
      secondary: '#6b7280'
    }
  },
  typography: {
    fontFamily: 'Inter, Roboto, "Helvetica Neue", Arial, sans-serif',
    h6: { fontWeight: 600 },
    subtitle2: { fontWeight: 500 }
  },
  shape: {
    borderRadius: 12
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
          borderRadius: 12,
        }
      }
    },
    MuiGrid: {
      styleOverrides: {
        root: {
          alignItems: 'stretch'
        }
      }
    }
  }
})

export default theme
