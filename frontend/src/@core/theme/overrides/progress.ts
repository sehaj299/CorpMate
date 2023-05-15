// ** MUI Imports
import { Theme } from '@mui/material/styles'

const Progress = (theme: Theme) => {
  return {
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          height: 6,
          borderRadius: theme.shape.borderRadius,
          '&.MuiLinearProgress-colorPrimary': {
            backgroundColor: (theme.palette.primary.main, 0.12)
          },
          '&.MuiLinearProgress-colorSecondary': {
            backgroundColor: (theme.palette.secondary.main, 0.12)
          },
          '&.MuiLinearProgress-colorSuccess': {
            backgroundColor: (theme.palette.success.main, 0.12)
          },
          '&.MuiLinearProgress-colorError': {
            backgroundColor: (theme.palette.error.main, 0.12)
          },
          '&.MuiLinearProgress-colorWarning': {
            backgroundColor: (theme.palette.warning.main, 0.12)
          },
          '&.MuiLinearProgress-colorInfo': {
            backgroundColor: (theme.palette.info.main, 0.12)
          }
        },
        bar: {
          borderRadius: theme.shape.borderRadius
        }
      }
    }
  }
}

export default Progress
