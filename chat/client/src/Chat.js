import React, { useEffect, useState } from 'react';
import { addMessage, getMessages } from './graphql/queries';
import MessageInput from './MessageInput';
import MessageList from './MessageList';

const Chat = ({ user }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      const messages = await getMessages();
      setMessages(messages);
    };
    fetchMessages();
  }, []);

  const handleSend = async (text) => {
    const message = await addMessage(text);
    setMessages(messages.concat(message));
  };

  return (
    <section className="section">
      <div className="container">
        <h1 className="title">Chatting as {user}</h1>
        <MessageList user={user} messages={messages} />
        <MessageInput onSend={handleSend} />
      </div>
    </section>
  );
};

export default Chat;
