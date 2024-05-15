import { useState, useEffect } from 'react'
import '../styles/ChatPage.css'
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer, Search, Sidebar, ConversationList, Conversation, Avatar } from '@chatscope/chat-ui-kit-react';
import ChatPage from './ChatPage';

function ChatsList() {
    const [shops, setShops] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [selectedShop, setSelectedShop] = useState({});

    const getBobaShops = () => {
        // Use fetch API to get data from database
        // Set retrieved data to setShops
        // For testing purposes: I'll create a sample array
        let data_arr = [{
            name: "Bobo Tea",
            logo: "https://svgnation.com/wp-content/uploads/2022/05/boba-tea-svg-free.jpg",
            slogan: "Some slogan 1"
        }, {
            name: "Cha Time",
            logo: "https://shopsquareone.com/wp-content/uploads/2021/09/ded478c109b673e1dd6c17a4eaffe9c5d3d085a9.png",
            slogan: "Some slogan 2"
        }, {
            name: "Milk Tea",
            logo: "https://assets.epicurious.com/photos/5953ca064919e41593325d97/1:1/w_2560%2Cc_limit/bubble_tea_recipe_062817.jpg",
            slogan: "Some slogan 3"
        }];

        setShops(data_arr);
        setSelectedShop({
            name: data_arr[0].name,
            logo: data_arr[0].logo,
            slogan: data_arr[0].slogan
        });
    }

    const handleInput = (event) => {
        setSearchInput(event.target.value);
    }

    useEffect(() => {
        if(searchInput !== "")
        {
            const newShops = shops.filter((shop) => searchInput.toLowerCase() == shop.name.toLowerCase());
            if (newShops.length > 0)
            {
                setShops(newShops);
            }
        }
        else
        {
            // set Shops to default data
            getBobaShops();
        }
    }, [searchInput])

    // When page is loaded, retrieve list of boba shops that the user swiped right on
    useEffect(() => {
        getBobaShops();
    }, [])

    function handleClick(event) {
        const selectedName =  event.currentTarget.children[1].children[0].textContent;
        let result;
        shops.map(shop => {
            if(shop.name.toLowerCase() == selectedName.toLowerCase())
            {
                result = {
                    name: shop.name,
                    logo: shop.logo,
                    slogan: shop.slogan
                }
            }
        });
        setSelectedShop(result);
        
    }

    return(
        <div className="main-container">
            <MainContainer responsive>
                <Sidebar position="left" value={searchInput} onChange={handleInput}>
                    <Search placeholder="Search..." />
                    <ConversationList>
                        {shops.map((shop, i) => {
                            return <Conversation 
                            info={shop.slogan}
                            name={shop.name}
                            key={i}
                            onClick={(event) => handleClick(event)}
                          >
                            <Avatar
                              name={shop.name}
                              src={shop.logo}
                              status="available"
                            />
                          </Conversation>
                        })}
                    </ConversationList>
                </Sidebar>
                <ChatPage shop_name={selectedShop.name} shop_logo={selectedShop.logo}/>
            </MainContainer>
        </div>
    )
}

export default ChatsList