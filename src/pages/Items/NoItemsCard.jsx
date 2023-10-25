import React from 'react'
import { Box, Typography } from '@mui/material'
import CustomButton from '../../components/ui/CustomButton'

const NoItemsCard = () => {
  return (
    <Box display={'flex'} justifyContent={'center'} flexDirection={'column'} padding={'10%'}>
    <Typography variant="h3" alignSelf={'center'} mb={'4%'}>
      You have no items in that category.
    </Typography>
    <Typography variant="h4" alignSelf={'center'} mb={'4%'}>
      Click the button and add some!
    </Typography>
    <CustomButton backgroundColor="#00FF00" color="black" buttonText="ADD ITEM" breakpointWidth="3dvw" breakpointHeight="3dvh" />
  </Box>
  )
}

export default NoItemsCard