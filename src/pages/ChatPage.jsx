import { useState } from 'react'
import '../styles/ChatPage.css'
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator, ConversationHeader, Avatar, MessageSeparator } from '@chatscope/chat-ui-kit-react';

function ChatPage() {

  // Hardcoded values used for testing

  const API_KEY = "12345";
  const shop_name = "Bobo tea";
  const shop_logo = "https://svgnation.com/wp-content/uploads/2022/05/boba-tea-svg-free.jpg";
  let currentDate= new Date();

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1; 
  const day = currentDate.getDate();

  // Format the date
  const formattedDate = `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;


  const [isTyping, setIsTyping] = useState(false);

  const [messages, setMessages] = useState([
    {
      message: `Hello, I am ${shop_name}! How can I help you?`,
      sentTime: "just now",
      sender: shop_name,
      direction: "incoming"
    }
  ])

  const handleSend = async (message) => {
    const newMessage = {
      message: message,
      sender: "user",
      direction: "outgoing"
    }

    const newMessages = [...messages, newMessage]


    //update message state
    setMessages(newMessages);
    setIsTyping(true);

    await processMessageToChatbot(newMessages);

  }

  async function processMessageToChatbot(chatMessages) {

  }


  return (
    <div className="chat-container">
        <div className="chat">
          <MainContainer className="main-container">
              <ChatContainer>
                <ConversationHeader>
                  <Avatar
                    name={shop_name}
                    src={shop_logo}
                  />
                  <ConversationHeader.Content info="Active now" userName={shop_name}/>
                </ConversationHeader>
                <MessageList scrollBehavior="smooth" typingIndicator={isTyping ? <TypingIndicator content="BoBo tea is typing" /> : null}>
                  <MessageSeparator content={formattedDate}/>
                  {messages.map((message, i) => {
                    if(message.sender == shop_name)
                    {
                      return <Message key={i} model={message}> <Avatar
                      name={shop_name}
                      src={shop_logo}
                    /> </Message>
                    }
                    return <Message key={i} model={message} />
                  })}
                </MessageList>
              <MessageInput placeholder="Type message in here" onSend={handleSend}/>
              </ChatContainer>
          </MainContainer>
        </div>
    </div>
  )
}

export default ChatPage
