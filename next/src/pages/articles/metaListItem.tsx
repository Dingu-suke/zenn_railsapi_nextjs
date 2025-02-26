import { Box, ListItem, ListItemText } from '@mui/material'
import { ReactNode } from 'react'

type MetaListItemProps = {
  icon: ReactNode
  label: string
  value: string
  divider?: boolean
}

const MetaListItem = ({
  icon,
  label,
  value,
  divider = false,
}: MetaListItemProps) => {
  return (
    <ListItem divider={divider}>
      <Box
        sx={{
          dispaly: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ pr: 1 }}>{icon}</Box>
          <Box>
            <ListItemText primary={label} />
          </Box>
        </Box>
        <Box>
          <ListItemText primary={value} />
        </Box>
      </Box>
    </ListItem>
  )
}
export default MetaListItem
