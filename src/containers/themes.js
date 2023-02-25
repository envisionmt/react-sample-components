import { createMuiTheme } from '@material-ui/core/styles'

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#1d1d1d',
    },
  },
  typography: {
    useNextVariants: true,
  },
})