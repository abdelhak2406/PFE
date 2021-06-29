import 'react-chat-elements/dist/main.css';
import { MessageBox , ChatItem ,  MessageList,ChatList, Input, Button  } from 'react-chat-elements'

 function Chat() {
 return (
  <div>
      <Input
    placeholder="Type here..."
    multiline={true}
    rightButtons={
        <Button
            color='white'
            backgroundColor='black'
            text='Send'/>
    }/>

  </div>
     )
 }

 export default  Chat 