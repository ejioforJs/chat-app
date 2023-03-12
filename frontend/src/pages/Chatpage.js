import { Box } from "@chakra-ui/layout";
import { useState } from "react";
import ChatBox from "../components/ChatBox";
import MyChats from "../components/MyChats";
import SideDrawer from "../components/miscelleneous/SideDrawer";
import { ChatState } from "../context/ChatProvider";
// import { useEffect }  from 'react'

const Chatpage = () => {
  const [fetchAgain, setFetchAgain] = useState(false);
  const { user } = ChatState();

  // useEffect(() => {
  //   if(!user){
  //     setUser(JSON.parse(localStorage.getItem("userInfo")))
  //   }
  //   console.log(user)
  // }, [user, setUser])

  return (
    <div style={{ width: "100%" }}>
      {user && <SideDrawer />}
      <Box display="flex" justifyContent="space-between" w="100%" h="91.5vh" p="10px">
        {user && <MyChats fetchAgain={fetchAgain} />}
        {user && (
          <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
      </Box>
    </div>
  );
};

export default Chatpage;
