import { useState, useEffect } from 'react'
import '../styles/ChatPage.css'
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { ChatContainer, MessageList, Message, MessageInput, TypingIndicator, ConversationHeader, Avatar, MessageSeparator } from '@chatscope/chat-ui-kit-react';



function ChaTimeChat() {


  const [isTyping, setIsTyping] = useState(false);

  const [messages, setMessages] = useState([{
    message: `Hello! I'm a store representative from Cha Time! How can I help you today?`,
    sentTime: "just now",
    sender: "Cha Time",
    direction: "incoming"
  }]);

  const handleSend = async (message) => {
    const newUserMessage = {
      message: message,
      sender: "user",
      direction: "outgoing"
    }

    let newMessages = [...messages, newUserMessage]
    setMessages(newMessages);

    let replyMessage = {
        message: "",
        sender: "Cha Time",
        direction: "incoming"
    }

    setIsTyping(true);

    if ((newUserMessage.message.toLowerCase() == "when do you open during weekdays?<br>") || (newUserMessage.message.toLowerCase() == "when do you open during weekdays?"))
    {
        replyMessage.message = "Our store is open from 7am to 11pm on Mondays to Fridays."
    }
    else if ((newUserMessage.message.toLowerCase() == "where are you located?<br>") || (newUserMessage.message.toLowerCase() == "where are you located?"))
    {
        replyMessage.message = "Our address is 1447 Water St Unit 6, Peterborough, ON K9J 6X5."
    }
    else if (newUserMessage.message.toLowerCase() == "how can i order online?<br>" || (newUserMessage.message.toLowerCase() == "how can i order online?"))
    {
        replyMessage.message = "You can find our store on DoorDash or UberEats."
    }
    else 
    {
        console.log(newUserMessage.message);
        replyMessage.message = "Apologies, please type your question again."
    }
    
    const timeoutId = setTimeout(() => {
        // Code to execute after 2 seconds
        setIsTyping(false)
        newMessages = [...messages, newUserMessage, replyMessage]
    
        //update message state
        setMessages(newMessages);
      }, 3000); // Delay in milliseconds (2 seconds)
  
      // Clean up the timeout to prevent memory leaks
    return () => clearTimeout(timeoutId);

  }

  

  return (
    <>
      <ChatContainer>
        <ConversationHeader>
          <Avatar
            name="Cha Time"
            src="https://shopsquareone.com/wp-content/uploads/2021/09/ded478c109b673e1dd6c17a4eaffe9c5d3d085a9.png"
          />
          <ConversationHeader.Content info="Active now" userName="Cha Time"/>
            </ConversationHeader>
              <MessageList scrollBehavior="smooth" typingIndicator={isTyping ? <TypingIndicator content="Cha Time Representative is typing" /> : null}>
              <MessageSeparator content="New Conversation"/>
                {messages.map((message, i) => {
                  if(message.sender == "Cha Time")
                  {
                    return <Message key={i} model={message}> <Avatar
                      name="Cha Time"
                      src="https://shopsquareone.com/wp-content/uploads/2021/09/ded478c109b673e1dd6c17a4eaffe9c5d3d085a9.png"
                      /> </Message>
                  }
                    return <Message key={i} model={message} />
                  })}
              </MessageList>
              <MessageInput placeholder="Type message in here" onSend={handleSend}/>
        </ChatContainer>
    </>
  )
}

export default ChaTimeChat
