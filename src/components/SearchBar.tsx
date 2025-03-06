import React, { useState, useRef } from 'react';
import { Paperclip, Mic, ArrowUp } from 'lucide-react';
import { uploadFile } from '../services/api';

interface SearchBarProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

export function SearchBar({ onSendMessage, disabled }: SearchBarProps) {
  const [message, setMessage] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (msg: string) => {
    if (!msg.trim()) return;
    onSendMessage(msg);
    setMessage('');
  };

  const handleFileUpload = async (file: File) => {
    if (!file) return;

    try {
      await uploadFile(file).then((response) => {
        handleSubmit(response.data.url)
      });
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };


  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const audioChunks = useRef<Blob[]>([]);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder.current = new MediaRecorder(stream);

    mediaRecorder.current.ondataavailable = (event) => {
      audioChunks.current.push(event.data);
    };

    mediaRecorder.current.onstop = () => {
      const audioBlob = new Blob(audioChunks.current, { type: "audio/wav" });      
      const audioFile = new File([audioBlob], "recording.wav", { type: "audio/wav" });
      handleFileUpload(audioFile);
      audioChunks.current = [];
    };

    mediaRecorder.current.start();
    setIsRecording(true);
  };

  const stopRecording = () => {
    mediaRecorder.current?.stop();
    setIsRecording(false);

    mediaRecorder.current?.stream.getTracks().forEach((track) => track.stop());
  };

  return (
    <div className="w-full max-w-3xl bg-gray-800 text-white px-6 py-4 rounded-[24px]">
      <div className="relative">
        <input
          className="w-full bg-[transparent] text-white outline-none placeholder-gray-400"
          placeholder="Какую задачу вы хотите решить?"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSubmit(message)}
          disabled={disabled}
        />
      </div>
      <div className="flex items-center justify-between mt-4">
        <input
          type="file"
          ref={fileInputRef}
          onChange={(e) => {
            const file = e.target.files?.[0];
            if(!file) return;
            handleFileUpload(file)
          }}
          className="hidden"
          disabled={disabled}
        />
        <button
          className="py-[8px] px-[12px] rounded-[9999px] border-[#FFFFFF17] border border-solid flex items-center gap-[5px]"
          onClick={() => fileInputRef.current?.click()}
          disabled={disabled}
        >
          <Paperclip size={18} />
          <span className='text-[14px] font-medium '>Загрузить документ</span>
        </button>

        <div className="flex items-center gap-[5px]">
          <button
           onMouseDown={startRecording}  
           onMouseUp={stopRecording}     
           onTouchStart={startRecording} 
           onTouchEnd={stopRecording}   
          className="p-2 hover:bg-gray-700 rounded-lg" disabled={disabled}>
            <Mic size={20} className={` ${isRecording? 'text-white' :'text-gray-400'}`} />
          </button>
          <button
            className="p-2 bg-gray-700 rounded-[9999px]"
            onClick={() => handleSubmit(message)}
            disabled={disabled}
          >
            <ArrowUp size={20} className={`text-gray-400 ${disabled ? 'opacity-50' : ''}`} />
          </button>
        </div>
      </div>
    </div>
  );
}