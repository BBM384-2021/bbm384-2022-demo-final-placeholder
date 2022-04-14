import * as React from 'react';
import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    backgroundColor: '#F5F5F5',
    marginRight: theme.spacing(2),
    marginLeft: 0,
    borderRadius: '12px',
    width: '400px',
    display:'flex',
    textAlign: 'center',
    justifyContent: 'space-around',
    
    // [theme.breakpoints.up('sm')]: {
    //   marginLeft: theme.spacing(3),
    //   width: 'auto',
    // },
}));
  
const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(1, 0, 1, 0),
    height: '100%',
    position: 'right',
    pointerEvents: 'none',
    justifyContent: 'center',
}));
  
const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: '#808080',
    '& .MuiInputBase-input': {
      padding: theme.spacing(0, 1, 0, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(2)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '30ch',
      },
    },
}));

export default function SearchBar () {
    return (
    <Search>
        <StyledInputBase
            placeholder="Search…"
            inputProps={{ 'aria-label': 'search' }}
            sx={{fontFamily:'Poppins'}}
        />
        <SearchIconWrapper>
            <SearchIcon htmlColor='#808080' sx= {{transform:'rotate(90deg)'}}/>
        </SearchIconWrapper>
    </Search>
    );
}