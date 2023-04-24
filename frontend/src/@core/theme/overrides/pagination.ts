// ** MUI Imports
import { Theme } from '@mui/material/styles'

const Pagination = (theme: Theme) => {
  return {
    MuiPaginationItem: {
      styleOverrides: {
        outlined: {
          borderColor: `rgba(${theme.palette.customColors.main}, 0.22)`
        },
        outlinedPrimary: {
          '&.Mui-selected': {
            backgroundColor: (theme.palette.primary.main, 0.12),
            '&:hover': {
              backgroundColor: `${(theme.palette.primary.main, 0.24)} !important`
            }
          }
        },
        outlinedSecondary: {
          '&.Mui-selected': {
            backgroundColor: (theme.palette.secondary.main, 0.12),
            '&:hover': {
              backgroundColor: `${(theme.palette.secondary.main, 0.24)} !important`
            }
          }
        },
        rounded: {
          borderRadius: 8
        }
      }
    }
  }
}

export default Pagination
