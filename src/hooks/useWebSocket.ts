
import { useState, useEffect, useCallback } from 'react';
import { Message } from '@/types/Message';

// Simulating WebSocket functionality with setTimeout for demo purposes
export const useWebSocket = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  // Simulate connection
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsConnected(true);
      console.log('WebSocket connected (simulated)');
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Simulate incoming messages
  useEffect(() => {
    if (!isConnected) return;

    const simulateIncomingMessage = () => {
      const incomingMessages = [
        "Hey! How's it going? 😊",
        "Did you see the latest update?",
        "Let's meet up later! ☕",
        "That's awesome! 🎉",
        "Working on some cool stuff today",
        "Can't wait for the weekend! 🌟"
      ];

      const randomMessage = incomingMessages[Math.floor(Math.random() * incomingMessages.length)];
      
      const newMessage: Message = {
        id: Date.now().toString(),
        text: randomMessage,
        sender: 'Alex Johnson',
        timestamp: new Date(),
        isOwn: false,
        reactions: []
      };

      // Show typing indicator first
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        setMessages(prev => [...prev, newMessage]);
      }, 2000);
    };

    // Simulate random incoming messages
    const interval = setInterval(() => {
      if (Math.random() > 0.7) { // 30% chance every 8 seconds
        simulateIncomingMessage();
      }
    }, 8000);

    return () => clearInterval(interval);
  }, [isConnected]);

  const sendMessage = useCallback((text: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'You',
      timestamp: new Date(),
      isOwn: true,
      reactions: []
    };

    setMessages(prev => [...prev, newMessage]);
    console.log('Message sent (simulated):', text);
  }, []);

  const addReaction = useCallback((messageId: string, emoji: string) => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId 
        ? { ...msg, reactions: [...(msg.reactions || []), emoji] }
        : msg
    ));
  }, []);

  return {
    messages,
    isConnected,
    isTyping,
    sendMessage,
    addReaction
  };
};
