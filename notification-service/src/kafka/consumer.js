import { Kafka } from 'kafkajs';
import TOPICS from './topics';

// Import all event handlers
const onUserRegistered = require('../handlers/onUserRegistered');
const onBlogCreated    = require('../handlers/onBlogCreated');
const onBlogUpdated    = require('../handlers/onBlogUpdated');
const onBlogDeleted    = require('../handlers/onBlogDeleted');

const kafka = new Kafka({
  clientId: 'notification-service',
  brokers: [process.env.KAFKA_BROKER || 'localhost:9092'],
});

const consumer = kafka.consumer({
  groupId: 'notification-group',  // Kafka tracks this group's offset
                                   // so no event is processed twice
});

const startConsumer = async () => {
  await consumer.connect();
  console.log('[Notification] Kafka consumer connected');

  // Subscribe to every topic this service cares about
  await consumer.subscribe({ topic: TOPICS.USER_REGISTERED, fromBeginning: false });
  await consumer.subscribe({ topic: TOPICS.BLOG_CREATED,    fromBeginning: false });
  await consumer.subscribe({ topic: TOPICS.BLOG_UPDATED,    fromBeginning: false });
  await consumer.subscribe({ topic: TOPICS.BLOG_DELETED,    fromBeginning: false });

  await consumer.run({
    eachMessage: async ({ topic, message }) => {
      // Parse the raw Kafka message buffer into a JS object
      const event = JSON.parse(message.value.toString());
      console.log(`[Notification] Received event on "${topic}":`, event.event);

      // Route to the correct handler based on topic
      switch (topic) {
        case TOPICS.USER_REGISTERED: await onUserRegistered(event); break;
        case TOPICS.BLOG_CREATED:    await onBlogCreated(event);    break;
        case TOPICS.BLOG_UPDATED:    await onBlogUpdated(event);    break;
        case TOPICS.BLOG_DELETED:    await onBlogDeleted(event);    break;
        default:
          console.warn(`[Notification] No handler for topic: ${topic}`);
      }
    },
  });
};

export  { startConsumer };