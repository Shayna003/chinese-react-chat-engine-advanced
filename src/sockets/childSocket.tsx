import React, { useEffect, useState } from 'react';

import { Props } from './props';

import { WebSocket } from 'nextjs-websocket';

let socketRef: WebSocket = undefined;
let pingIntervalId: NodeJS.Timer;
let timeIntervalId: NodeJS.Timer;

const pingInterval = 4000;
const minLag = 15 * 1000;

export const ChildSocket: React.FC<Props> = (props: Props) => {
  const { sessionToken } = props;

  const [now, setNow] = useState(Date.now());
  const [shouldPongBy, setShouldPongBy] = useState(Date.now() + minLag);

  useEffect(() => {
    if (now > shouldPongBy) {
      props.onRefresh && props.onRefresh();
      setShouldPongBy(Date.now() + minLag);
    }
  }, [now, shouldPongBy]);

  useEffect(() => {
    return () => {
      clearInterval(pingIntervalId);
      clearInterval(timeIntervalId);
    };
  }, []);

  const onConnect = () => {
    pingIntervalId = setInterval(() => {
      try {
        socketRef.sendMessage(JSON.stringify('ping'));
      } catch (e) {
        console.log('Ping error', e);
      }
    }, pingInterval);
    timeIntervalId = setInterval(() => setNow(Date.now()), 1000);

    props.onConnect && props.onConnect();
  };

  const onMessage = (event: string) => {
    const eventJSON = JSON.parse(event);

    if (eventJSON.action === 'pong') {
      console.log('pong');
      setShouldPongBy(Date.now() + minLag);
    } else if (eventJSON.action === 'new_chat') {
      props.onNewChat && props.onNewChat(eventJSON.data);
    } else if (
      eventJSON.action === 'edit_chat' ||
      eventJSON.action === 'add_person' ||
      eventJSON.action === 'remove_person'
    ) {
      props.onEditChat && props.onEditChat(eventJSON.data);
    } else if (eventJSON.action === 'delete_chat') {
      props.onDeleteChat && props.onDeleteChat(eventJSON.data);
    } else if (eventJSON.action === 'new_message') {
      const { id, message } = eventJSON.data;
      props.onNewMessage && props.onNewMessage(id, message);
    } else if (eventJSON.action === 'edit_message') {
      const { id, message } = eventJSON.data;
      props.onEditMessage && props.onEditMessage(id, message);
    } else if (eventJSON.action === 'delete_message') {
      const { id, message } = eventJSON.data;
      props.onDeleteMessage && props.onDeleteMessage(id, message);
    } else if (eventJSON.action === 'is_typing') {
      const { id, person } = eventJSON.data;
      props.onIsTyping && props.onIsTyping(id, person);
    }
  };

  if (!sessionToken) return <div />;

  return (
    <WebSocket
      url={`ws://127.0.0.1:8000/person_v4/?session_token=${sessionToken}`}
      reconnect={true}
      reconnectIntervalInMilliSeconds={3000}
      childRef={(ref: WebSocket) => (socketRef = ref)}
      onOpen={onConnect}
      onError={props.onError}
      onMessage={onMessage}
      onClose={() => {
        props.onClose && props.onClose();
        props.onRefresh && props.onRefresh();
      }}
    />
  );
};