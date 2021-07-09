import 'react-chat-elements/dist/main.css';
import { MessageBox , ChatItem , MessageList, Navbar, ChatList, Input, Button  } from 'react-chat-elements'
import { BiArrowBack} from "react-icons/bi"
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

 function Chat() {
    const [state, setstate] = useState({list: [], text:''});
    const {id_doctor, id_patient} = useParams();
    var id_sender, id_receiver;
    if(localStorage.getItem('id_user') == id_doctor){
        id_sender = id_doctor;
        id_receiver = id_patient;
    }
    else{
        id_sender = id_patient;
        id_receiver = id_doctor;
    }

    // const socket = io();
    const id = localStorage.getItem('id_user'); 
    const type = localStorage.getItem('type');

    useEffect(() => {
        getNewMessages();
    }, [])

    const handleChange = (e)=>{
        setstate({...state, text:e.target.value})

    }
    const handleSend = ()=>{
       if(state.text) {
           document.querySelector('.input-chat textarea').value = '';
           const text = state.text;
            axios.post('/api/messages', {
                id_sender,
                id_receiver,
                text
            })
            .then(res => res.data)
            .then(data => {
                if(data.done) getNewMessages();
            }) 
       }
    }

    const getNewMessages = () => {
        axios.get(`/api/messages/${id_doctor}/${id_patient}`, {
            params: { id: state.list.length? state.list[state.list.length-1].id_message: 0 }
        })
        .then(res => res.data)
        .then(data => {
            if(data.messages) setstate({...state, list: [...state.list, ...data.messages]});
        })
    }

    setInterval(() => {
        getNewMessages();
    }, 10000);

    return (
        <div>
            <Navbar 
                type ='light'
                left ={ < BiArrowBack size='30' color = '#e63946' />}
            
            />
            {
                state.list.map(msg => 
                    <MessageList
                        className='message-list'
                        lockable={true}
                        toBottomHeight={'100%'}
                        dataSource={[
                            {
                                position: msg.id_sender == id_sender? 'right': 'left',
                                type: 'text',
                                text: msg.text,
                                date: new Date()
                            }]
                            }
                    />
                )
            }
            
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
                }
            />

        </div>
    )}


 export default  Chat 