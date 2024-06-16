import React, { memo } from 'react'
import {Button,Avatar, Dialog, DialogTitle, InputAdornment, List, ListItem, ListItemText, Stack, TextField, Typography, Skeleton } from '@mui/material'
import { useAcceptFriendRequestMutation, useGetNotificationsQuery } from '../../redux/api/api.js'
import {useAsyncMutation, useErrors} from '../../hooks/hook.jsx'
import { useSelector } from 'react-redux'
import { setIsNotification } from '../../redux/reducers/misc.js'
import { useDispatch } from 'react-redux'

const Notifications = () => {

  const dispatch = useDispatch();

  const { isNotification } = useSelector((state)=>state.misc);

  const {isLoading, data, error, isError} = useGetNotificationsQuery();

  const [acceptRequest] = useAsyncMutation(useAcceptFriendRequestMutation);

  const friendRequestHandler = async ({_id,accept}) => {
    dispatch(setIsNotification(false));
    await acceptRequest("Accepting...",{requestId: _id, accept});
  }

  const closeHandler = () => {
    dispatch(setIsNotification(false));
  }

  useErrors([{error,isError}]);

  return (
    <Dialog open={isNotification} onClose={closeHandler}>
      <Stack p={{xs: "1rem", sm:"2rem"}} maxWidth={"25rem"}>
        <DialogTitle>Notifications</DialogTitle>
          {
            isLoading ? <Skeleton/> : <>
            { data?.allRequests.length > 0 ?
              ( data?.allRequests.map( ({sender, _id}) => 
                  (<NotificationsItem 
                    sender={sender} 
                    _id={_id} 
                    handler={friendRequestHandler}
                    key={_id}
                  />))
              ) : (
                <Typography textAlign={"center"}>0 Notifications</Typography>
              )
            }
            </>
          }
      </Stack>
    </Dialog>
  )
}

const NotificationsItem = memo(({sender,_id,handler}) => {

  const {name,avatar} = sender;

  return (
    <ListItem>
        <Stack 
            direction={"row"}
            alignItems={"center"}
            spacing={"1rem"}
            width={"100%"}
        >
            <Avatar />
            <Typography
                variant="body1"
                sx={{
                    flexGlow: 1,
                    display: "-webkit-flex",
                    WebkitLineClamp: 1,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    width: "100%",
                }}
            >
                {`${name} sent you a friend request.`}
            </Typography>

            <Stack direction={{
              xs: "column",
              sm: "row"
            }}>
              <Button onClick={() => handler({_id,accept: true})}>
                Accept
              </Button>

              <Button color="error" onClick={() => handler({_id,accept: false})}>
                Reject
              </Button>
            </Stack>
        </Stack>
    </ListItem>
  )
})

export default Notifications