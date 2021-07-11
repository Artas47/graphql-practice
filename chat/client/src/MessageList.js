import React, { useRef, useEffect } from 'react';

const MessageList = ({ user, messages }) => {
  const boxRef = useRef();

  useEffect(() => {
    if (boxRef?.current) {
      boxRef.current.scrollTo(0, boxRef.scrollHeight);
    }
  }, [boxRef]);

  const renderMessage = (message) => {
    let tag = 'tag';
    if (message.from === user) {
      tag += ' is-primary';
    }
    return (
      <tr key={message.id}>
        <td>
          <span className={tag}>{message.from}</span>
        </td>
        <td style={{ paddingLeft: '0.75em' }}>{message.text}</td>
      </tr>
    );
  };

  return (
    <div
      ref={boxRef}
      className="box"
      style={{ height: '50vh', overflowY: 'scroll' }}
    >
      <table>
        <tbody>{messages.map(renderMessage)}</tbody>
      </table>
    </div>
  );
};

export default MessageList;
