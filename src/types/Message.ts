
export interface Message {
  id: string;
  text: string;
  sender: string;
  timestamp: Date;
  isOwn: boolean;
  reactions?: string[];
}

export interface Contact {
  id: string;
  name: string;
  avatar: string;
  isOnline: boolean;
  lastSeen?: Date;
  unreadCount?: number;
}

export interface ChatRoom {
  id: string;
  name: string;
  participants: Contact[];
  lastMessage?: Message;
  isGroup: boolean;
}
