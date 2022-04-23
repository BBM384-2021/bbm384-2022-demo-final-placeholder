import { useState, onChange, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import Box from '@mui/material/Box';
import axios from "axios"

import ProfileBanner from "../commons/ProfileBanner"

import { height } from '@mui/system';

const baseSearchURL = "https://placeholder-backend.herokuapp.com/user/searchUser"
const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    backgroundColor: '#F5F5F5',
    marginRight: theme.spacing(2),
    marginLeft: 0,
    borderRadius: '12px',
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

const GetSimilarConnections = ( input, user_id, setResults ) => {
    axios.get(baseSearchURL, {
        params: {
            "query": input,
            "current_user_id": user_id
        }
    }).then( (response) => {
        if (response.data.code === 200) { // success
            const connectedUsers = response.data?.connectedUsers;
            const nonConnectedUsers = response.data?.nonConnectedUsers;
            const allUsers = connectedUsers.concat(nonConnectedUsers);
            setResults(allUsers);
        } else {
            setResults([]);
        }
    }).catch( (error) => console.log(error));
};

export function handleProfileBannerClick(user) {
    return () => {
        // const user_prof_id = user.cs_mail.split('@')[0]
        window.open("/in/" + user.id, "_blank");
    };
}

export default function SearchBar () {
    const [inputKey, setInputKey] = useState("");
    const [results, setResults] = useState([]);
    
    // TODO!!!!!! USER ID
    useEffect( () => {
        GetSimilarConnections(inputKey.target?.value, 100, setResults);
    },[inputKey])

    return (
    <div style={{width:'400px', display:'flex', flexFlow:'column', justifyContent:'flex-start',
    marginTop:'3.5%', height:'100%'}} >
        <Search sx={{width:'400px'}}>
            <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
                sx={{fontFamily:'Poppins'}}
                onChange={setInputKey}
            />
            <SearchIconWrapper>
                <SearchIcon htmlColor='#808080' sx= {{transform:'rotate(90deg)'}}/>
            </SearchIconWrapper>
        </Search>
        {results.length > 0 &&
            <Box sx={{width:'100%', backgroundColor:'white', display:'flex', flexDirection:'column'}}>
                {
                    results.map((user_elem) => {
                        return (<ProfileBanner 
                            withoutName={false}
                            withStatus={false}
                            isChatBanner={false}
                            user={user_elem}
                            isPostBanner={false}
                            onClick = {handleProfileBannerClick(user_elem)}
                            key={user_elem.id}
                        />);
                    })
                }
            </Box>
        }

    </div>
    );
}