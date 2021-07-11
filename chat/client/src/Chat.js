import React, { useState } from 'react';
import {
  messagesQuery,
  addMessageMutation,
  messageAddedSubscription,
} from './graphql/queries';
import MessageInput from './MessageInput';
import MessageList from './MessageList';
import { useQuery, useMutation, useSubscription } from '@apollo/client';

const Chat = ({ user }) => {
  const [messages, setMessages] = useState([]);
  useQuery(messagesQuery, {
    onCompleted: ({ messages }) => setMessages(messages),
  });
  useSubscription(messageAddedSubscription, {
    onSubscriptionData: ({
      subscriptionData: {
        data: { messageAdded },
      },
    }) => {
      setMessages((prev) => [...prev, messageAdded]);
    },
  });
  const [addMessage] = useMutation(addMessageMutation);

  const handleSend = async (text) => {
    await addMessage({ variables: { input: { text } } });
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
