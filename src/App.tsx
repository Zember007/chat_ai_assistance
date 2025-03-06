import { useState } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { SearchBar } from './components/SearchBar';
import { CategoryButtons } from './components/CategoryButtons';
import { SolutionButton } from './components/SolutionButton';
import { ChatMessage } from './components/ChatMessage';
import { Message } from './types/message';
import { getReply, sendMessage } from './services/api';
import './styles.css';

export default function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);

  const handleSendMessage = async (content: string) => {
    const userMessage: Message = {
      id: crypto.randomUUID(),
      content,
      role: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setShowSuggestions(false);

    const newId = crypto.randomUUID()
    const assistantMessage: Message = {
      id: newId,
      content: '',
      role: 'assistant',
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, assistantMessage]);

    const getReplyFunction = (id: string) => {

      getReply(id).then((response) => {
        if (response.chatgpt_reply) {
          const assistantMessage: Message = {
            id: newId,
            content: response.chatgpt_reply,
            role: 'assistant',
            timestamp: new Date(),
          };
          setMessages(prev => [...prev.filter(item => item.id !== newId), assistantMessage]);

          setIsLoading(false);
        } else {
          setTimeout(() => getReplyFunction(id), 1000);
        }
      })
    }

    try {
      const id = crypto.randomUUID()
      await sendMessage(content, id).then(() => {
        getReplyFunction(id)
      })

    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        id: crypto.randomUUID(),
        content: 'Sorry, there was an error processing your request.',
        role: 'assistant',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      <Sidebar />
      <div className="flex flex-col flex-grow">
        <Header />
        <main className="flex-grow flex flex-col items-center justify-center p-10 space-y-8">
          {showSuggestions ? (
            <>
              <div className="text-center space-y-2">
                <h1 className="text-4xl font-medium">
                  Добро пожаловать в Dimpulse AI
                </h1>
                <p className="text-xl text-gray-400">
                  Чем мы можем вам помочь?
                </p>
              </div>
              <SearchBar onSendMessage={handleSendMessage} />
              <CategoryButtons action={handleSendMessage} />
              <div className="text-center space-y-4 ">
                <p className="text-gray-400">или</p>
                <p className="text-lg max-w-xl">
                  Получите оптимальное решение под ваш индивидуальный запрос, исходя из вашей цели.
                </p>
                <SolutionButton />
              </div>
              <p className="text-sm text-gray-500 mt-8">
                By messaging AI, you agree to our <a href="#" className="underline">Terms</a> and <a href="#" className="underline">Privacy Policy</a>.
              </p>
            </>
          ) : (
            <div className="flex flex-col w-full max-w-4xl mx-auto h-full">
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message, index) => (
                  <ChatMessage key={message.id} message={message} isLoading={isLoading && index === messages.length - 1} />
                ))}
              </div>
              <div className="border-t p-4">
                <SearchBar onSendMessage={handleSendMessage} disabled={isLoading} />
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}