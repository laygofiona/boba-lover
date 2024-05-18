import { useState, useEffect } from 'react'
import '../styles/ChatPage.css'
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer, Search, Sidebar, ConversationList, Conversation, Avatar } from '@chatscope/chat-ui-kit-react';
import ChaTimeChat from './ChaTimeChat'
import BoboTeaChat from './BoboTeaChat'
import ChatbotChat from './ChatbotChat';

function ChatsList() {
    const [chats, setChats] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [selectedChat, setSelectedChat] = useState({});



    const getChats = () => {
        // Use fetch API to get data from database
        // Set retrieved data to setShops
        // For testing purposes: I'll create a sample array
        let shops = [{
            name: "Bobo Tea",
            logo: "https://svgnation.com/wp-content/uploads/2022/05/boba-tea-svg-free.jpg",
            slogan: "Sip happiness, one bubble at a time.",
            chatComponent: <BoboTeaChat key="Bobo Tea" />
        }, {
            name: "Cha Time",
            logo: "https://shopsquareone.com/wp-content/uploads/2021/09/ded478c109b673e1dd6c17a4eaffe9c5d3d085a9.png",
            slogan: "Pearls of joy, in every sip.",
            chatComponent: <ChaTimeChat key="Cha Time" />
        }, 
        ];

        // add chatbot to data_arr
        shops.unshift({
            name: "Boba Lover Bot",
            logo: "https://cdn-icons-png.flaticon.com/512/4645/4645924.png",
            slogan: "Your own boba-loving bot.",
            chatComponent: <ChatbotChat key="Chatbot" />
        })

        setChats(shops);

        // By default set the selected chat to the boba bot
        setSelectedChat({
            name: shops[0].name,
            logo: shops[0].logo,
            slogan: shops[0].slogan
        });
    }

    const handleInput = (event) => {
        setSearchInput(event.target.value);
    }

    useEffect(() => {
        if(searchInput !== "")
        {
            const newChats = chats.filter((chat) => searchInput.toLowerCase() == chat.name.toLowerCase());
            if (newChats.length > 0)
            {
                setChats(newChats);
            }
        }
        else
        {
            // set chats to default data
            getChats();
        }
    }, [searchInput])

    // Ideally When page is loaded, retrieve list of boba shops including chats that the user swiped right on
    useEffect(() => {
        getChats();
    }, [])

    function handleClick(event) {
        const selectedName =  event.currentTarget.children[1].children[0].textContent;
        let result;
        chats.map(chat => {
            if(chat.name.toLowerCase() == selectedName.toLowerCase())
            {
                result = {
                    name: chat.name,
                    logo: chat.logo,
                    slogan: chat.slogan
                }
            }
        });
        setSelectedChat(result);
        
    }


    return(
        <div className="main-container">
            <MainContainer responsive>
                <Sidebar position="left" value={searchInput} onChange={handleInput}>
                    <Search placeholder="Search..." />
                    <ConversationList>
                        {chats.map((chat, i) => {
                            return <Conversation 
                            info={chat.slogan}
                            name={chat.name}
                            key={i}
                            onClick={(event) => handleClick(event)}
                          >
                            <Avatar
                              name={chat.name}
                              src={chat.logo}
                              status="available"
                            />
                          </Conversation>
                        })}
                    </ConversationList>
                </Sidebar>
                {
                    chats.map((chat) => {
                        if(selectedChat.name.toLowerCase() == chat.name.toLowerCase())
                        {
                            return chat.chatComponent;
                        }
                    })
                }
            </MainContainer>
        </div>
    )
}

export default ChatsList

