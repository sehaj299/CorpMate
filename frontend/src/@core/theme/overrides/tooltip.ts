// ** MUI Imports
import { Theme } from '@mui/material/styles'

const Tooltip = (theme: Theme) => {
  return {
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          borderRadius: 6,
          lineHeight: 1.455,
          backgroundColor: (theme.palette.customColors.tooltipBg, 0.9)
        },
        arrow: {
          color: (theme.palette.customColors.tooltipBg, 0.9)
        }
      }
    }
  }
}

export default Tooltip
