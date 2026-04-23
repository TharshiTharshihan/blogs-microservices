import { Kafka } from 'kafkajs';

const kafka = new Kafka({
  clientId: 'auth-service',       // identifies this service in Kafka logs
  brokers: [process.env.KAFKA_BROKER || 'localhost:9092'],
});

const producer = kafka.producer();

const connectProducer = async () => {
  await producer.connect();
  console.log('[Auth] Kafka producer connected');
};

// Generic publish function — any controller can call this
const publishEvent = async (topic, message) => {
  await producer.send({
    topic,
    messages: [{ value: JSON.stringify(message) }],
  });
};

export default { connectProducer, publishEvent };