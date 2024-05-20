import { useState, useEffect } from 'react'
import '../styles/ChatPage.css'
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator, ConversationHeader, Avatar, MessageSeparator } from '@chatscope/chat-ui-kit-react';
import { CohereClient } from 'cohere-ai';

const cohere = new CohereClient({
  // your API key goes below
  // for reference:
  // token: "YOUR_APIKEY_HERE"
  token: "sXWvHEF98DYGy8cznsl5SxTHttG8Wy6iTNby6Egg",
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
  return (prediction.text)
};

function ChatbotChat() {


  const [isTyping, setIsTyping] = useState(false);

  const [messages, setMessages] = useState([{
    message: `Hello! I'm a certified Boba-Lover! How can I help you today?`,
    sentTime: "just now",
    sender: "Boba Lover",
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


    newMessages = [...messages, newMessage, CohereMsg];
    setMessages(newMessages);
    setIsTyping(false);
  }

  async function processMessageToChatbot(chatMessage) {
    const newReturnedMsg = {
      message: await generateMessage(chatMessage),
      sender: "Boba Lover",
      direction: "incoming"
    }
    return (newReturnedMsg);
  }


  return (
    <>
      <ChatContainer>
        <ConversationHeader>
          <Avatar
            name="Boba Lover"
            src="https://cdn-icons-png.flaticon.com/512/4645/4645924.png"
          />
          <ConversationHeader.Content info="Active now" userName={"Boba Lover"} />
        </ConversationHeader>
        <MessageList scrollBehavior="smooth" typingIndicator={isTyping ? <TypingIndicator content="BoBa Lover bot is typing" /> : null}>
          <MessageSeparator content="New Conversation" />
          {messages.map((message, i) => {
            if (message.sender == "Boba Lover") {
              return <Message key={i} model={message}> <Avatar
                name="Boba Lover"
                src="https://cdn-icons-png.flaticon.com/512/4645/4645924.png"
              /> </Message>
            }
            return <Message key={i} model={message} />
          })}
        </MessageList>
        <MessageInput placeholder="Type message in here" onSend={handleSend} />
      </ChatContainer>
    </>
  )
}

export default ChatbotChat
