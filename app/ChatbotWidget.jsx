import React, { useState, useRef, useEffect } from "react";
import { FaMicrophone, FaTimes } from "react-icons/fa";
import { FiSend } from "react-icons/fi";

const ChatWidget = ({ initialHeight = "90vh", initialWidth = "90vw", assistantImage = "https://plus.unsplash.com/premium_photo-1681943259296-4c64c027cd55?q=80&w=784&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", welcomeMessage = "I'm ready to help you shop the looks you love", quickPrompts = ["Where are loafers from?", "Can you help me find your go-to basics?", "Where can I buy the outfit from your last reel?"] }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [showWelcome, setShowWelcome] = useState(true);
  const [showPrompts, setShowPrompts] = useState(true);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmationImage, setConfirmationImage] = useState("");
  const [showProfileImage, setShowProfileImage] = useState(true);
  const [isWidgetVisible, setIsWidgetVisible] = useState(true);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, showConfirmation]);

  const handleSendMessage = () => {
    if (input.trim()) {
      const newMessage = { text: input, sender: "user" };
      setMessages([...messages, newMessage]);
      setInput("");
      setShowWelcome(false);
      setShowPrompts(false);
      setShowProfileImage(false);

      setTimeout(() => {
        setShowConfirmation(true);
        setConfirmationImage("https://via.placeholder.com/180x320");
        setMessages((prev) => [
          ...prev,
          {
            text: "Sure! Just to confirm, is this the reel you're asking about?",
            sender: "assistant",
            image: "https://via.placeholder.com/180x320",
          },
        ]);
      }, 500);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const handleConfirmation = (choice) => {
    setShowConfirmation(false);
    if (choice === "yes") {
      setMessages((prev) => [
        ...prev,
        {
          text: "Great! How can I assist you with this reel? 😊",
          sender: "assistant",
        },
      ]);
    } else {
      setMessages((prev) => [
        ...prev,
        {
          text: "No problem! Let me show you other options...",
          sender: "assistant",
        },
      ]);
    }
  };

  return (
    <>
      {/* {!isWidgetVisible && (
        <div className="fixed bottom-4 right-4 z-50 md:bottom-6 md:right-6">
          <button onClick={() => setIsWidgetVisible(true)} className="w-24 h-24 rounded-full overflow-hidden shadow-lg border-2 border-white bg-gray-100 hover:shadow-xl transition-all duration-200 focus:outline-none md:w-20 md:h-20" aria-label="Open chat widget">
            <img src={assistantImage} alt="Assistant" className="w-full h-full object-cover" />
          </button>
        </div>
      )} */}

      
        <div className="fixed bottom-4 right-4 z-40 w-[90vw] max-w-[400px] h-[80vh] max-h-[600px] md:max-w-[450px] md:max-h-[700px] lg:max-w-[500px] lg:max-h-[800px]">
          <div className="relative bg-white rounded-xl shadow-lg border border-gray-200 h-full flex flex-col">
            {/* <button onClick={() => setIsWidgetVisible(false)} className="absolute -top-4 -right-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 active:bg-gray-300 transition-colors duration-200 focus:outline-none" aria-label="Close chat widget">
              <FaTimes className="text-gray-600 h-4 w-4 hover:text-gray-800 active:text-gray-900 transition-colors duration-150 md:h-5 md:w-5" />
            </button> */}

            {showProfileImage && (
              <div className="relative w-full h-52 p-4 mt-1 md:h-64">
                <div className="w-44 h-44 mx-auto border-2 border-white shadow-md overflow-hidden bg-gray-100 rounded-full ">
                  <img src={assistantImage} alt="Assistant" className="w-54 h-54 object-cover rounded-full" />
                </div>
              </div>
            )}

            {showWelcome && <p className="text-xs text-gray-600 px-3 font-medium text-center mx-auto mb-4 md:text-sm md:mb-5">{welcomeMessage}</p>}

            {(messages.length > 0 || showConfirmation) && (
              <div className="flex-grow overflow-y-auto px-2 no-scrollbar min-h-[150px]  rounded-lg  mb-2">
                {messages.map((message, index) => (
                  <div key={index} className={`flex items-start mb-3  ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                    {message.sender === "assistant" && (
                      <div className="w-8 h-8 rounded-full overflow-hidden  md:w-10 md:h-10">
                        <img src={assistantImage} alt="Assistant" className="w-full h-full object-cover" />
                      </div>
                    )}
                    <div className={`max-w-[75%] rounded-lg p-3 ${message.sender === "user" ? "bg-blue-100 text-gray-900 rounded-tr-none" : "bg-gray-800 text-white rounded-tl-none"} shadow-md relative flex flex-col items-start transition-all duration-200`}>
                      <p className="text-sm font-medium leading-relaxed md:text-base">{message.text}</p>
                      {message.image && (
                        <div className="chat-image-container mt-3 w-20 h-32 md:w-24 md:h-40">
                          <img src={message.image} alt="Chat Image" className="chat-image" />
                        </div>
                      )}
                      <div className={`absolute top-0 ${message.sender === "user" ? "-right-2 w-0 h-0 border-t-[10px] border-t-transparent border-l-[10px] border-l-blue-100 border-b-[10px] border-b-transparent" : "-left-2 w-0 h-0 border-t-[10px] border-t-transparent border-r-[10px] border-r-gray-800 border-b-[10px] border-b-transparent"}`} />
                    </div>
                  </div>
                ))}

                {showConfirmation && (
                  <div className="flex justify-start items-start mb-3 ">
                    <div className="w-8 h-8 rounded-full overflow-hidden mx-2 md:w-10 md:h-10">
                      <img src={assistantImage} alt="Assistant" className="w-full h-full object-cover" />
                    </div>
                    <div className="max-w-[75%] bg-gray-100 text-gray-900 rounded-lg p-3 rounded-tl-none shadow-md relative flex flex-col items-start">
                      <p className="text-sm font-medium leading-relaxed md:text-base">Sure! Just to confirm, is this the reel you're asking about?</p>
                      <div className="chat-image-container mt-3 w-20 h-32 md:w-24 md:h-40">
                        <img src={confirmationImage} alt="Confirmation Reel" className="chat-image" />
                      </div>
                      <div className="flex flex-col gap-2 mt-3 w-full">
                        <button onClick={() => handleConfirmation("yes")} className="bg-white text-black py-1.5  rounded-full hover:bg-gray-200 text-sm font-semibold transition-colors duration-200 md:text-base md:px-5">
                          Yes, that's the one
                        </button>
                        <button onClick={() => handleConfirmation("no")} className="bg-white text-black py-1.5 rounded-full hover:bg-gray-200 text-sm font-semibold transition-colors duration-200 md:text-base md:px-5">
                          No, show me others
                        </button>
                      </div>
                      <div className="absolute top-0 -left-2 w-0 h-0 border-t-[10px] border-t-transparent border-r-[10px] border-r-gray-100 border-b-[10px] border-b-transparent" />
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>
            )}

            {showPrompts && (
              <div className="space-y-2 mb-4 px-3 md:mb-6">
                {quickPrompts.map((prompt, index) => (
                  <button
                    key={index}
                    className="w-full text-xs font-medium bg-gray-200 hover:bg-gray-100 text-gray-800 py-2 px-3 rounded-lg transition-all duration-200 hover:shadow-sm border border-gray-200 hover:border-gray-300 active:bg-gray-200 md:text-sm md:px-4"
                    onClick={() => {
                      setInput(prompt);
                      setTimeout(handleSendMessage, 100);
                    }}
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            )}

            <div className="mt-auto p-3">
              <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-2 py-2 bg-white shadow-sm hover:shadow-md hover:border-gray-300 transition-all duration-200 focus-within:border-black">
                <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={handleKeyPress} placeholder="Ask me anything..." className="flex-grow text-xs text-gray-900 placeholder-gray-400 placeholder:font-medium bg-transparent outline-none focus:placeholder-gray-300 transition-colors duration-150 md:text-sm" />
                <div className="flex items-center gap-1">
                  <button className="p-1 rounded-full hover:bg-gray-100 active:bg-gray-200 transition-colors duration-200 focus:outline-none" aria-label="Voice input">
                    <FaMicrophone className="text-black h-3 w-3 hover:text-gray-700 active:text-gray-800 transition-colors duration-150 md:h-4 md:w-4" />
                  </button>
                  <button onClick={handleSendMessage} className="p-1 rounded-full bg-black text-white hover:bg-gray-800 active:bg-gray-900 transition-colors duration-200 focus:outline-none" aria-label="Send message">
                    <FiSend className="text-white h-3 w-3 md:h-4 md:w-4" />
                  </button>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-2 text-center font-medium">Type your question or tap the microphone</p>
            </div>
          </div>

          <style jsx global>{`
            .no-scrollbar {
              -ms-overflow-style: none;
              scrollbar-width: none;
              overflow: -moz-scrollbars-none;
            }
            .no-scrollbar::-webkit-scrollbar {
              width: 0 !important;
              height: 0 !important;
              display: none;
            }
            .chat-image-container {
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              width: 100%;
              max-width: 120px;
              max-height: 200px;
              margin-top: 0.5rem;
              aspect-ratio: 9 / 16;
              overflow: hidden;
              background-color: #f9fafb;
              border-radius: 0.75rem;
              border: 2px solid #e5e7eb;
              box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            }
            .chat-image {
              width: 100%;
              height: 100%;
              max-width: 120px;
              max-height: 200px;
              object-fit: contain;
              object-position: center;
              border-radius: 0.75rem;
            }
            @media (max-width: 640px) {
              .chat-image-container {
                max-width: 100px;
                max-height: 160px;
              }
              .chat-image {
                max-width: 100px;
                max-height: 160px;
              }
            }
          `}</style>
        </div>
    
    </>
  );
};

export default ChatWidget;