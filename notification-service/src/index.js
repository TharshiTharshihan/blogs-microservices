import dotenv from 'dotenv';
import { startConsumer } from './kafka/consumer.js';

dotenv.config();

const start = async () => {
  console.log('[Notification] Service starting...');
  await startConsumer();
  console.log('[Notification] Listening for events...');
};

start().catch((err) => {
  console.error('[Notification] Fatal error:', err);
  process.exit(1);
});