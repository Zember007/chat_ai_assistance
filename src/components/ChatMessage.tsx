import { FileText } from 'lucide-react';
import { Message } from '../types/message';

interface ChatMessageProps {
    message: Message;
    isLoading?: boolean;
}

export function ChatMessage({ message, isLoading }: ChatMessageProps) {

    const pattern = /^(https?:\/\/[^\s$.?#].[^\s]*)$/i;
    const Url = pattern.test(message.content);

    const getFileExtension = (url: string) => {
        const parts = url.split('.');
        return parts[parts.length - 1].toLowerCase();
    };

    const fileExtension = Url ? getFileExtension(message.content) : null;
    const isAudio = fileExtension ? ['mp3', 'wav', 'ogg'].includes(fileExtension) : null;

    return (
        <div className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[500px] p-4 rounded-lg ${message.role !== 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-900'}`}>
                {Url ?
                    (
                        <>
                            {isAudio ?
                                <audio controls>
                                    <source src={message.content} type={`audio/${fileExtension}`} />
                                    Your browser does not support the audio element.
                                </audio>

                                :
                                <a
                                    href={message.content}
                                    download={`recording.${fileExtension}`}
                                    target='_blank'
                                    className='relative'
                                >
                                    <FileText size={50} />
                                    <div
                                        className={`absolute bottom-[14px] left-[50%] translate-x-[50%] p-[2px] text-[14px] font-medium ${message.role !== 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-900'}`}>
                                        {fileExtension}
                                    </div>
                                </a>
                            }
                        </>
                    ) :
                    <p className='break-all whitespace-pre-wrap'>{message.content}</p>}
                {isLoading && <div className='loader'></div>}
                {!isLoading &&<span className={`text-xs ${message.role !== 'user' ? 'text-[#FFF]' : ''}`}>{message.timestamp.toLocaleTimeString()}</span>}
            </div>
        </div>
    );
}
