
import React, { useState, useEffect } from 'react';
import { Contact, Message } from '@/types/Message';
import ContactList from '@/components/ContactList';
import ChatArea from '@/components/ChatArea';
import { useWebSocket } from '@/hooks/useWebSocket';
import { Wifi, WifiOff } from 'lucide-react';

const Index = () => {
  const { messages, isConnected, isTyping, sendMessage, addReaction } = useWebSocket();
  const [selectedContact, setSelectedContact] = useState<Contact | undefined>();

  // Mock contacts data
  const [contacts] = useState<Contact[]>([
    {
      id: '1',
      name: 'Alex Johnson',
      avatar: '/placeholder.svg',
      isOnline: true,
      unreadCount: 3
    },
    {
      id: '2',
      name: 'Sarah Wilson',
      avatar: '/placeholder.svg',
      isOnline: false,
      unreadCount: 0
    },
    {
      id: '3',
      name: 'Design Team',
      avatar: '/placeholder.svg',
      isOnline: true,
      unreadCount: 7
    },
    {
      id: '4',
      name: 'Mike Chen',
      avatar: '/placeholder.svg',
      isOnline: true,
      unreadCount: 0
    },
    {
      id: '5',
      name: 'Dev Squad',
      avatar: '/placeholder.svg',
      isOnline: false,
      unreadCount: 12
    }
  ]);

  // Auto-select first contact on load
  useEffect(() => {
    if (contacts.length > 0 && !selectedContact) {
      setSelectedContact(contacts[0]);
    }
  }, [contacts, selectedContact]);

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-lavender-500 to-purple-600 text-white p-4 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="text-2xl">💬</div>
            <div>
              <h1 className="text-xl font-bold">Lavender Chat</h1>
              <p className="text-sm opacity-90">Stay connected, stay happy</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            {isConnected ? (
              <div className="flex items-center space-x-2 text-green-200">
                <Wifi className="w-4 h-4" />
                <span className="text-sm">Connected</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2 text-red-200">
                <WifiOff className="w-4 h-4" />
                <span className="text-sm">Connecting...</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Chat Interface */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <div className="w-80 flex-shrink-0 hidden md:block">
          <ContactList
            contacts={contacts}
            selectedContact={selectedContact}
            onContactSelect={setSelectedContact}
          />
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {selectedContact ? (
            <ChatArea
              contact={selectedContact}
              messages={messages}
              isTyping={isTyping}
              onSendMessage={sendMessage}
              onAddReaction={addReaction}
            />
          ) : (
            <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-lavender-50 to-purple-100">
              <div className="text-center p-8">
                <div className="text-6xl mb-4 animate-bounce-gentle">✨</div>
                <h2 className="text-2xl font-bold text-gray-700 mb-2">Welcome to Lavender Chat!</h2>
                <p className="text-gray-500 max-w-md">
                  Select a contact from the sidebar to start chatting. 
                  Experience real-time messaging with a beautiful lavender touch!
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Contact List Toggle */}
      <div className="md:hidden fixed bottom-4 right-4 z-50">
        <button className="bg-gradient-to-r from-lavender-500 to-purple-500 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110">
          💬
        </button>
      </div>
    </div>
  );
};

export default Index;
