import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';

interface Chat {
  id: number;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: number;
  type: 'personal' | 'group' | 'channel';
  online?: boolean;
}

interface Message {
  id: number;
  text: string;
  time: string;
  isMine: boolean;
  sender?: string;
}

const mockChats: Chat[] = [
  { id: 1, name: 'Анна Волкова', avatar: '', lastMessage: 'Отлично! Встретимся завтра', time: '14:32', unread: 2, type: 'personal', online: true },
  { id: 2, name: 'Проект "Космос"', avatar: '', lastMessage: 'Миша: Презентация готова', time: '13:15', unread: 5, type: 'group' },
  { id: 3, name: 'Дизайн новости', avatar: '', lastMessage: 'Новый урок по Figma уже доступен!', time: '12:40', unread: 0, type: 'channel' },
  { id: 4, name: 'Макс Соколов', avatar: '', lastMessage: 'Когда созвон?', time: '11:20', unread: 1, type: 'personal', online: true },
  { id: 5, name: 'Команда разработки', avatar: '', lastMessage: 'Света: Пушим на прод', time: '10:05', unread: 0, type: 'group' },
  { id: 6, name: 'Tech News Daily', avatar: '', lastMessage: 'Apple представила новый MacBook Pro', time: 'вчера', unread: 0, type: 'channel' },
];

const mockMessages: Message[] = [
  { id: 1, text: 'Привет! Как дела с проектом?', time: '14:20', isMine: false },
  { id: 2, text: 'Все отлично! Финальная версия почти готова', time: '14:25', isMine: true },
  { id: 3, text: 'Супер! Можешь показать что получилось?', time: '14:28', isMine: false },
  { id: 4, text: 'Конечно, сейчас скину скриншоты', time: '14:30', isMine: true },
  { id: 5, text: 'Отлично! Встретимся завтра', time: '14:32', isMine: false },
];

export default function Index() {
  const [selectedChat, setSelectedChat] = useState<Chat>(mockChats[0]);
  const [message, setMessage] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'personal' | 'groups' | 'channels'>('all');

  const filteredChats = mockChats.filter(chat => {
    if (activeTab === 'all') return true;
    if (activeTab === 'personal') return chat.type === 'personal';
    if (activeTab === 'groups') return chat.type === 'group';
    if (activeTab === 'channels') return chat.type === 'channel';
    return true;
  });

  const getChatIcon = (type: string) => {
    if (type === 'group') return 'Users';
    if (type === 'channel') return 'Radio';
    return 'User';
  };

  return (
    <div className="h-screen flex bg-background dark">
      <div className="w-20 bg-sidebar border-r border-border flex flex-col items-center py-6 gap-6">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center glow-effect-strong cursor-pointer hover:scale-110 transition-transform">
          <Icon name="MessageCircle" size={24} className="text-white" />
        </div>
        
        <div className="flex-1 flex flex-col gap-4">
          <button 
            onClick={() => setActiveTab('all')}
            className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
              activeTab === 'all' 
                ? 'bg-primary/20 text-primary glow-effect' 
                : 'text-muted-foreground hover:bg-muted hover:text-foreground'
            }`}
          >
            <Icon name="Home" size={24} />
          </button>
          
          <button 
            onClick={() => setActiveTab('personal')}
            className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
              activeTab === 'personal' 
                ? 'bg-primary/20 text-primary glow-effect' 
                : 'text-muted-foreground hover:bg-muted hover:text-foreground'
            }`}
          >
            <Icon name="User" size={24} />
          </button>
          
          <button 
            onClick={() => setActiveTab('groups')}
            className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
              activeTab === 'groups' 
                ? 'bg-primary/20 text-primary glow-effect' 
                : 'text-muted-foreground hover:bg-muted hover:text-foreground'
            }`}
          >
            <Icon name="Users" size={24} />
          </button>
          
          <button 
            onClick={() => setActiveTab('channels')}
            className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
              activeTab === 'channels' 
                ? 'bg-primary/20 text-primary glow-effect' 
                : 'text-muted-foreground hover:bg-muted hover:text-foreground'
            }`}
          >
            <Icon name="Radio" size={24} />
          </button>
        </div>
        
        <div className="flex flex-col gap-4">
          <button className="w-12 h-12 rounded-xl flex items-center justify-center text-muted-foreground hover:bg-muted hover:text-foreground transition-all">
            <Icon name="Settings" size={24} />
          </button>
          
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent to-primary cursor-pointer hover:scale-110 transition-transform overflow-hidden">
            <Avatar className="w-full h-full">
              <AvatarFallback className="bg-transparent text-white font-semibold">Я</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>

      <div className="w-96 bg-card border-r border-border flex flex-col">
        <div className="p-6 border-b border-border">
          <h1 className="text-2xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Сообщения
          </h1>
          <div className="relative">
            <Icon name="Search" size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input 
              placeholder="Поиск чатов..." 
              className="pl-10 bg-muted/50 border-border/50 focus:border-primary transition-all rounded-2xl"
            />
          </div>
        </div>

        <ScrollArea className="flex-1">
          <div className="p-3">
            {filteredChats.map((chat) => (
              <div
                key={chat.id}
                onClick={() => setSelectedChat(chat)}
                className={`p-4 rounded-2xl cursor-pointer transition-all mb-2 hover:bg-muted/50 ${
                  selectedChat.id === chat.id 
                    ? 'bg-primary/10 border border-primary/30 glow-effect' 
                    : 'hover:scale-[1.02]'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="relative">
                    <Avatar className="w-12 h-12 border-2 border-primary/20">
                      <AvatarImage src={chat.avatar} />
                      <AvatarFallback className="bg-gradient-to-br from-primary/20 to-accent/20 text-primary font-semibold">
                        {chat.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    {chat.online && (
                      <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-500 rounded-full border-2 border-card animate-pulse-glow" />
                    )}
                    <Icon 
                      name={getChatIcon(chat.type)} 
                      size={14} 
                      className="absolute -top-1 -right-1 bg-card rounded-full p-0.5 text-primary"
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-foreground truncate">{chat.name}</h3>
                      <span className="text-xs text-muted-foreground ml-2">{chat.time}</span>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">{chat.lastMessage}</p>
                  </div>
                  
                  {chat.unread > 0 && (
                    <Badge className="bg-primary text-primary-foreground rounded-full min-w-[24px] h-6 flex items-center justify-center px-2 glow-effect">
                      {chat.unread}
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      <div className="flex-1 flex flex-col">
        <div className="h-20 border-b border-border bg-card/50 backdrop-blur-xl px-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="w-12 h-12 border-2 border-primary/30">
              <AvatarFallback className="bg-gradient-to-br from-primary/20 to-accent/20 text-primary font-semibold">
                {selectedChat.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="font-bold text-foreground">{selectedChat.name}</h2>
              <p className="text-sm text-muted-foreground">
                {selectedChat.online ? 'в сети' : 'был(а) недавно'}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="rounded-xl hover:bg-muted hover:scale-110 transition-all">
              <Icon name="Phone" size={20} />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-xl hover:bg-muted hover:scale-110 transition-all">
              <Icon name="Video" size={20} />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-xl hover:bg-muted hover:scale-110 transition-all">
              <Icon name="MoreVertical" size={20} />
            </Button>
          </div>
        </div>

        <ScrollArea className="flex-1 p-6">
          <div className="space-y-4 max-w-4xl mx-auto">
            {mockMessages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.isMine ? 'justify-end' : 'justify-start'} animate-fade-in`}
              >
                <div
                  className={`max-w-md px-6 py-3 ${
                    msg.isMine
                      ? 'bg-gradient-to-br from-primary to-primary/80 text-white message-bubble-organic-reverse glow-effect'
                      : 'bg-muted text-foreground message-bubble-organic'
                  } transition-all hover:scale-[1.02]`}
                >
                  <p className="text-sm leading-relaxed">{msg.text}</p>
                  <p className={`text-xs mt-2 ${msg.isMine ? 'text-white/70' : 'text-muted-foreground'}`}>
                    {msg.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        <div className="p-6 border-t border-border bg-card/50 backdrop-blur-xl">
          <div className="flex items-center gap-3 max-w-4xl mx-auto">
            <Button variant="ghost" size="icon" className="rounded-xl hover:bg-muted shrink-0">
              <Icon name="Paperclip" size={20} />
            </Button>
            
            <div className="flex-1 relative">
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Написать сообщение..."
                className="pr-12 bg-muted/50 border-border/50 focus:border-primary transition-all rounded-2xl h-12"
              />
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute right-1 top-1/2 -translate-y-1/2 rounded-xl hover:bg-background"
              >
                <Icon name="Smile" size={20} />
              </Button>
            </div>
            
            <Button 
              size="icon" 
              className="rounded-2xl bg-gradient-to-br from-primary to-accent hover:scale-110 transition-all glow-effect-strong h-12 w-12 shrink-0"
            >
              <Icon name="Send" size={20} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
