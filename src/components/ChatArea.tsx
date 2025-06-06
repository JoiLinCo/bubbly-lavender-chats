
import React, { useState, useRef, useEffect } from 'react';
import { Contact, Message } from '@/types/Message';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';
import { Send, Phone, Video, MoreVertical } from 'lucide-react';

interface ChatAreaProps {
  contact: Contact;
  messages: Message[];
  isTyping: boolean;
  onSendMessage: (text: string) => void;
  onAddReaction: (messageId: string, emoji: string) => void;
}

const ChatArea: React.FC<ChatAreaProps> = ({ 
  contact, 
  messages, 
  isTyping, 
  onSendMessage, 
  onAddReaction 
}) => {
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      onSendMessage(newMessage);
      setNewMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e);
    }
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-white/80 to-lavender-50/80 backdrop-blur-sm">
      {/* Chat Header */}
      <div className="flex items-center justify-between p-4 border-b border-lavender-200 bg-white/70 backdrop-blur-sm">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Avatar className="w-10 h-10">
              <AvatarImage src={contact.avatar} />
              <AvatarFallback className="bg-gradient-to-br from-lavender-300 to-purple-300 text-white font-medium">
                {contact.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            {contact.isOnline && (
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 border-2 border-white rounded-full animate-pulse-soft"></div>
            )}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{contact.name}</h3>
            <p className="text-sm text-gray-500">
              {contact.isOnline ? 'Online' : 'Last seen recently'}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" className="text-lavender-600 hover:bg-lavender-100">
            <Phone className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" className="text-lavender-600 hover:bg-lavender-100">
            <Video className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" className="text-lavender-600 hover:bg-lavender-100">
            <MoreVertical className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <div className="text-6xl mb-4">💬</div>
            <p className="text-lg font-medium">Start a conversation!</p>
            <p className="text-sm">Send a message to get the chat going</p>
          </div>
        ) : (
          <>
            {messages.map((message) => (
              <MessageBubble
                key={message.id}
                message={message}
                onAddReaction={onAddReaction}
              />
            ))}
            {isTyping && <TypingIndicator />}
          </>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <form onSubmit={handleSendMessage} className="p-4 border-t border-lavender-200 bg-white/70 backdrop-blur-sm">
        <div className="flex items-center space-x-2">
          <div className="flex-1 relative">
            <Input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
              className="w-full rounded-full border-lavender-300 focus:ring-lavender-500 focus:border-lavender-500 pr-12 bg-white/90 backdrop-blur-sm"
            />
          </div>
          <Button
            type="submit"
            disabled={!newMessage.trim()}
            className="rounded-full bg-gradient-to-r from-lavender-500 to-purple-500 hover:from-lavender-600 hover:to-purple-600 text-white p-3 transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ChatArea;
