import { Box,Container,VStack,Button,Input, HStack } from '@chakra-ui/react'
import Message from './message';
import {GoogleAuthProvider,signInWithRedirect,getAuth,onAuthStateChanged,signOut} from "firebase/auth"
import { app } from './firebase';
import { useState,useEffect,useRef } from 'react';
import {getFirestore,addDoc,collection,serverTimestamp,onSnapshot,query,orderBy} from "firebase/firestore"
//import { error } from '@chakra-ui/utils';
//import { async } from '@firebase/util';


const auth =getAuth(app);
const db = getFirestore(app);


const loginHandler = () => {

  const provider = new GoogleAuthProvider();

  signInWithRedirect(auth,provider);

};

const logoutHandler = () => signOut(auth);




function App() {
  
  const[user,setUser]=useState(false);
  const[message,setMessage]=useState("");
  const[messages,setMessages]=useState([]);

  const divForScroll = useRef(null)

  const submitHandler = async (e) => {
    e.preventDefault();
    
     try {
    
    await addDoc (collection(db,"messages"),{
      text:message,
      uid : user.uid,
      uri : user.photoURL,
      createdAt: serverTimestamp()
    });
    
     setMessage("")
     divForScroll.current.scrollIntoView({behaviour : "smooth"})
     } catch(error){
       alert(error)
     }
    };

  useEffect(() => {
    const q= query(collection(db,"messages"),orderBy("createdAt","asc"))
    const unsubscribe=onAuthStateChanged(auth,(data) => {

      setUser(data);

    });

    const unsubscribe1 =onSnapshot(q,(snap) => {
    setMessages(
      snap.docs.map((item) => {
        const id=item.id;
        return { id, ...item.data() };
      
      })
    );

    });

    return() => {
      unsubscribe();
      unsubscribe1();
    }

  },[]);


  return (
  <Box m={[1, 1]} h={"full"}  bgGradient="radial(green.300, blue.400, green.300)"> 
    {
      user?(

        <Container h={"100vh"} bg={"whiteAlpha.700"}>
     <VStack h={"full"} bg='white.600'  paddingY={4}>
       <Button w={"full"} colorScheme={"green"}onClick={logoutHandler} >Logout</Button>
     

     <VStack h={"full"} w={"full"} overflowY="auto" css={"&::-webkit-scrollbar"}>
      {
        messages.map(item=>(
          <Message key={item.id} user={item.uid===user.uid?"me":"other"} text={item.text}  uri={item.uri}/>
        ))
      }
      
      <div ref={divForScroll}></div>
     </VStack>

     

     <form style={{width : "100%"}} onSubmit={submitHandler} >
      <HStack>
      <Input value={message} placeholder='message' onChange={(e) => setMessage(e.target.value)} />
     <Button type="submit" colorScheme={"purple"} >Send</Button>
     </HStack>
     </form>
     </VStack>
     </Container>
      ): (
      <VStack h={"100vh"} justifyContent="center" >
      <Button colorScheme={"pink"} onClick={loginHandler}>Sign in with google</Button>
    </VStack>

      
    )} 
      </Box>
  );
}

export default App;
