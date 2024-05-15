import { useState, useEffect } from 'react'
import '../styles/ChatPage.css'
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator, ConversationHeader, Avatar, MessageSeparator } from '@chatscope/chat-ui-kit-react';
import { CohereClient } from 'cohere-ai';

const cohere = new CohereClient({
  // your API key goes below
  // for reference:
  // token: "YOUR_APIKEY_HERE"
  token: import.meta.env.VITE_Cohere_APIKEY,
});

const generateMessage = async (shop_name, req_prompt) => {
  const prediction = await cohere.generate({
      model: "",
      prompt: `${req_prompt}`,
      preamble: `You are a boba shop named ${shop_name}, you have already asked the user if they need help with anything. Assist them.`,
      length: 15,
      maxTokens: 20,
  });
  
  console.log("Received prediction", prediction);
  console.log(prediction.generations[0].text)

};

function ChatPage({shop_name, shop_logo}) {

  // Hardcoded values used for testing

  const API_KEY = "12345";
  let currentDate= new Date();

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1; 
  const day = currentDate.getDate();

  // Format the date
  const formattedDate = `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;


  const [isTyping, setIsTyping] = useState(false);

  const [messages, setMessages] = useState([{
    message: `Hello! How can I help you?`,
    sentTime: "just now",
    sender: shop_name,
    direction: "incoming"
  }]);

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
    await generateMessage(shop_name, message);
    await processMessageToChatbot(newMessages);

  }

  async function processMessageToChatbot(chatMessages) {

  }


  return (
    <>
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
    </>
  )
}

export default ChatPage
