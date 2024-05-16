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

const generateMessage = async (req_prompt) => {

  const documents = [
    { 
      "question": "What is BobaLover?", 
      "answer": "BobaLover is a platform created by the members of a passionate team, that aims to curate an experience for people trying out boba for the first-time and for professional boba-lovers alike." 
    },
    { 
      "question": "What is our aim?", 
      "answer": "We wish to see a world where people invested in the boba experience have a place to start their journey. A place for them to belong." 
    },
    { 
      "question": "What are our capabilities?", 
      "answer": "Our app keeps track of the boba stores that you've liked, and allows you to communicate with them! This creates a personalised experience for the viewer." 
    },
    { 
      "question": "What is our future?", 
      "answer": "We plan to extend this app and branch into an environment where boba-lovers can interact with each other and plan boba-dates together! Furthermore, we plan to use an algorithm to sort and display boba locations based on your previous choices, helping you find more stores and flavours based on your previous choices." 
    },
  ];
  const prediction = await cohere.chat({
    message: `${req_prompt}`,
    preamble: `You are a chatbot for an app called 'BobaLover'! Your aim is to help the customer understand what our company's aims are. Assist the customer by providing a concise reponse. Keep it to under 30 words unless referring to documentation.`,
    documents: documents
    // model: "",
    // connectors:[{"id": "web-search"}],
      // length: 10,
      // maxTokens: 50,
  });

  console.log("Received prediction", prediction);
  console.log(prediction.text)
  return(prediction.text)
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
    message: `Hello! I'm a certified Boba-Lover! How can I help you today?`,
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

    let newMessages = [...messages, newMessage]

    //update message state
    setMessages(newMessages);
    setIsTyping(true);
    
    const CohereMsg = await processMessageToChatbot(message);
    
    newMessages = [...newMessages, CohereMsg];
    setMessages(newMessages);
    setIsTyping(false);
  }
  
  async function processMessageToChatbot(chatMessage) {
    const newReturnedMsg = {
      message: await generateMessage(chatMessage),
      sender: shop_name,
      direction: "incoming"
    }
    return(newReturnedMsg);
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
