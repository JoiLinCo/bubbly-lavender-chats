
import React, { useState } from 'react';
import { Message } from '@/types/Message';
import { formatTime } from '@/utils/dateUtils';
import { Smile } from 'lucide-react';

interface MessageBubbleProps {
  message: Message;
  onAddReaction: (messageId: string, emoji: string) => void;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message, onAddReaction }) => {
  const [showReactions, setShowReactions] = useState(false);
  
  const emojis = ['😀', '😍', '👍', '❤️', '😂', '😮', '😢', '😡'];

  const handleEmojiClick = (emoji: string) => {
    onAddReaction(message.id, emoji);
    setShowReactions(false);
  };

  return (
    <div className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'} mb-4 group animate-slide-up`}>
      <div className="relative max-w-xs lg:max-w-md">
        <div
          className={`message-bubble ${
            message.isOwn 
              ? 'message-sent shadow-lg' 
              : 'message-received shadow-md'
          } transition-all duration-200 hover:shadow-lg`}
        >
          <p className="text-sm leading-relaxed">{message.text}</p>
          <div className="flex items-center justify-between mt-1">
            <span className={`text-xs ${message.isOwn ? 'text-white/80' : 'text-gray-500'}`}>
              {formatTime(message.timestamp)}
            </span>
            
            <button
              onClick={() => setShowReactions(!showReactions)}
              className={`opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-1 rounded-full hover:bg-white/20 ${
                message.isOwn ? 'text-white/80 hover:text-white' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Smile className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Reactions */}
        {message.reactions && message.reactions.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-1">
            {message.reactions.map((reaction, index) => (
              <span
                key={index}
                className="text-xs bg-white/90 backdrop-blur-sm border border-lavender-200 rounded-full px-2 py-1 shadow-sm animate-bounce-gentle"
              >
                {reaction}
              </span>
            ))}
          </div>
        )}

        {/* Emoji Picker */}
        {showReactions && (
          <div className="absolute top-full mt-2 bg-white/95 backdrop-blur-sm border border-lavender-200 rounded-xl p-2 shadow-lg z-10 animate-slide-up">
            <div className="flex gap-1">
              {emojis.map((emoji) => (
                <button
                  key={emoji}
                  onClick={() => handleEmojiClick(emoji)}
                  className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-lavender-100 transition-colors duration-200 text-lg"
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageBubble;
