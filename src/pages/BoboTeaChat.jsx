import { useState, useEffect } from 'react'
import '../styles/ChatPage.css'
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { ChatContainer, MessageList, Message, MessageInput, TypingIndicator, ConversationHeader, Avatar, MessageSeparator } from '@chatscope/chat-ui-kit-react';



function BoboTeaChat() {


  const [isTyping, setIsTyping] = useState(false);

  const [messages, setMessages] = useState([{
    message: `Hello! I'm a store representative from Bobo Tea! How can I help you today?`,
    sentTime: "just now",
    sender: "Bobo Tea",
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
        sender: "Bobo Tea",
        direction: "incoming"
    }

    setIsTyping(true);

    if ((newUserMessage.message.toLowerCase() == "what is your free delivery policy?<br>") || (newUserMessage.message.toLowerCase() == "what is your free delivery policy?"))
    {
        replyMessage.message = "You can get FREE DELIVERY if you order 30 or more drinks!"
    }
    else if ((newUserMessage.message.toLowerCase() == "where are you located?<br>") || (newUserMessage.message.toLowerCase() == "where are you located?"))
    {
        replyMessage.message = "Our address is 154 Charlotte St, Peterborough, ON K9J 2T8. "
    }
    else if (newUserMessage.message.toLowerCase() == "how can i order online?<br>" || (newUserMessage.message.toLowerCase() == "how can i order online?"))
    {
        replyMessage.message = "You can find our store at this website: order.mrsdigi.com."
    }
    else 
    {
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
            name="Bobo Tea"
            src="https://svgnation.com/wp-content/uploads/2022/05/boba-tea-svg-free.jpg"
          />
          <ConversationHeader.Content info="Active now" userName="Bobo Tea"/>
            </ConversationHeader>
              <MessageList scrollBehavior="smooth" typingIndicator={isTyping ? <TypingIndicator content="Bobo Tea Representative is typing" /> : null}>
              <MessageSeparator content="New Conversation"/>
                {messages.map((message, i) => {
                  if(message.sender == "Bobo Tea")
                  {
                    return <Message key={i} model={message}> <Avatar
                      name="Bobo Tea"
                      src="https://svgnation.com/wp-content/uploads/2022/05/boba-tea-svg-free.jpg"
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

export default BoboTeaChat
