import React from 'react'
import { withStyles } from '@mui/material';
import {Colors} from '../../Colors'

export default function Button(isActive) {

  const StyledButton = withStyles({
    root: {
      backgroundColor: Colors.hacettepe,
      color: '#fff',
      '&:hover': {
        backgroundColor: '#fff',
        color: '#3c52b2',
    },
  }})(Button);

  return (
    <div>
      {/* ToDo: this will render a red button when active and a borderless button when passive */}
      {/* for passive check go Back button in design */}
        {isActive && <></>}
    </div>
  )
}
