
import React from 'react';
import { Contact } from '@/types/Message';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, Users } from 'lucide-react';

interface ContactListProps {
  contacts: Contact[];
  selectedContact?: Contact;
  onContactSelect: (contact: Contact) => void;
}

const ContactList: React.FC<ContactListProps> = ({ contacts, selectedContact, onContactSelect }) => {
  return (
    <div className="h-full bg-white/70 backdrop-blur-sm border-r border-lavender-200">
      <div className="p-4 border-b border-lavender-200 bg-gradient-to-r from-lavender-100 to-purple-100">
        <h2 className="text-lg font-semibold text-purple-800 flex items-center gap-2">
          <MessageCircle className="w-5 h-5" />
          Chats
        </h2>
      </div>
      
      <div className="overflow-y-auto">
        {contacts.map((contact) => (
          <div
            key={contact.id}
            onClick={() => onContactSelect(contact)}
            className={`p-4 border-b border-lavender-100 cursor-pointer transition-all duration-200 hover:bg-lavender-50 ${
              selectedContact?.id === contact.id ? 'bg-lavender-100 border-l-4 border-l-lavender-500' : ''
            }`}
          >
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
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {contact.name}
                  </p>
                  {contact.unreadCount && contact.unreadCount > 0 && (
                    <Badge className="bg-lavender-500 text-white text-xs px-2 py-1 rounded-full animate-bounce-gentle">
                      {contact.unreadCount}
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-gray-500">
                  {contact.isOnline ? 'Online' : 'Last seen recently'}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactList;
