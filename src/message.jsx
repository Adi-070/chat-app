import React from 'react';
import {HStack,Text,Avatar} from '@chakra-ui/react'

const Message = ({text,uri,user="other"}) => {

    return (
        <HStack bg={"pink.50"} paddingX={user==="me"?"4":"2"} borderRadius={"2xl"} paddingY={2} alignSelf={user==="me"?"flex-end":"flex-start"}>
        {
             user==="other" && <Avatar src={uri}/>
        }
        <Text> {text} </Text>
        {
       user==="me" && <Avatar src={uri}/>
        }
        </HStack>

    )
}

export default Message;