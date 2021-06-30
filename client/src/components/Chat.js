import 'react-chat-elements/dist/main.css';
import { MessageBox , ChatItem , MessageList, Navbar, ChatList, Input, Button  } from 'react-chat-elements'
import { BiArrowBack} from "react-icons/bi"
import { io } from "socket.io-client";
import { useState, useEffect } from 'react';
 function Chat() {
    const [state, setstate] = useState({text:''});
    const id = localStorage.getItem('id_user'); 
    const type = localStorage.getItem('type');


    const handleChange = (e)=>{
        setstate({...state, text:e.target.value})

    }
    const handleSend = ()=>{
        const socket = io();
        socket.emit('message', {
            text:state.text,
            id_sender:id,
            id_receiver: 1
        })
    }

 return (
    <div>
        <Navbar 
            type ='light'
            left ={ < BiArrowBack size='30' color = '#e63946' />}
        
        />
        <MessageList
            className='message-list'
            lockable={true}
            toBottomHeight={'100%'}
            dataSource={[
                {
                    position: 'right',
                    type: 'text',
                    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
                    date: new Date(),
                    avatar:'../assets/avatar.jpg'
                }]
                }
        />
          <MessageList
            className='message-list'
            lockable={true}
            toBottomHeight={'100%'}
            dataSource={[
                {
                    position: 'left',
                    type: 'text',
                    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
                    date: new Date()
                }]
                }
        />
        <Input 
            className = 'input-chat'
            placeholder="Type here..."
            multiline={true}
            onChange = {handleChange}
            rightButtons={
            <Button
                onClick = {handleSend}
                color='white'
                backgroundColor='black'
                text='Send'/>
            }/>

    </div>
        )}


 export default  Chat 