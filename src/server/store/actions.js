import * as Types from './types';

export function clientConnected({ client }) {
  if (!client) throw new Error('Argument Expected: client');
  return {
    type: Types.CLIENT_CONNECTED,
    client
  };
}

export function clientDisconnected({ client }) {
  if (!client) throw new Error('Argument Expected: client');
  return {
    type: Types.CLIENT_DISCONNECTED,
    client
  };
}

export function topicOpened({ topic }) {
  if (!topic) throw new Error('Argument Expected: topic');
  return {
    type: Types.TOPIC_OPEN,
    topic
  };
}

export function topicClosed({ topic }) {
  if (!topic) throw new Error('Argument Expected: topic');
  return {
    type: Types.TOPIC_CLOSE,
    topic
  };
}

export function topicSubscribed({ client, topic }) {
  if (!topic) throw new Error('Argument Expected: topic');
  if (!client) throw new Error('Argument Expected: client');
  return {
    type: Types.TOPIC_SUBSCRIBE,
    client,
    topic
  };
}

export function topicUnsubscribed({ client, topic }) {
  if (!topic) throw new Error('Argument Expected: topic');
  if (!client) throw new Error('Argument Expected: client');
  return {
    type: Types.TOPIC_UNSUBSCRIBE,
    client,
    topic
  };
}
