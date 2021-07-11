import React, { useEffect, useState } from 'react';
import { addMessage, getMessages, onMessageAdded } from './graphql/queries';
import MessageInput from './MessageInput';
import MessageList from './MessageList';

const Chat = ({ user }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    let subscription = null;
    const fetchMessages = async () => {
      const messages = await getMessages();
      setMessages(messages);
      subscription = onMessageAdded((message) => {
        setMessages(messages.concat(message));
      });
    };
    fetchMessages();

    return () => {
      if (subscription) {
        subscription = null;
      }
    };
  }, []);

  const handleSend = async (text) => {
    await addMessage(text);
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
