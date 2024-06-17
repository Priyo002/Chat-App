import { Dialog, DialogTitle, InputAdornment, List, ListItem, ListItemText, Stack, TextField } from '@mui/material'
import React, {useEffect, useState} from 'react'
import {useInputValidation} from '6pp'
import { Search as SearchIcon } from '@mui/icons-material'
import UserItem from '../shared/UserItem'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { setIsSearch } from '../../redux/reducers/misc.js'
import { useLazySearchUserQuery, useSendFriendRequesMutation } from '../../redux/api/api.js'
import { useAsyncMutation } from '../../hooks/hook.jsx'

const users = [1,2,3]

function Search() {

  const dispatch = useDispatch();

  const {isSearch} = useSelector(state => state.misc);

  const [searchUser] = useLazySearchUserQuery();

  const [sendFriendRequest, isLoadingSendFriendRequest] = useAsyncMutation(useSendFriendRequesMutation);

  const search = useInputValidation("")

  const [users, setUsers] = useState([]);

  const addFriendHandler = async (id) => {
    await sendFriendRequest("Sending Friend request...",{userId : id});
  }
  
  const searchCloseHandler = () => dispatch(setIsSearch(false));

  useEffect(() => {

    const timeOutId = setTimeout(() => {
      
      searchUser(search.value)
      .then(({data}) => setUsers(data?.users ? data?.users : []))
      .catch((err) => console.log(err));

    },500);

    return () => {
      clearTimeout(timeOutId);
    }

  },[search.value]);

  return (
    <Dialog open={isSearch} onClose={searchCloseHandler}>
      <Stack p={"2rem"} direction={"column"} width={"25rem"}>
        <DialogTitle textAlign={"center"}>Find People</DialogTitle>
        <TextField 
          label="" 
          value={search.value} 
          onChange={search.changeHandler}
          variant="outlined"
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon/>
              </InputAdornment>
            )
          }}
        />

        <List>
          {
            users.map((i) => (
              <UserItem 
                user={i} 
                key={i._id} 
                handler={addFriendHandler} 
                hadlerIsLoading={isLoadingSendFriendRequest}
              />
            ))
          }
        </List>

      </Stack>
    </Dialog>
  )
}

export default Search