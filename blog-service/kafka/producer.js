import { Kafka } from 'kafkajs';

const kafka = new Kafka({
  clientId: 'blog-service',
  brokers: [process.env.KAFKA_BROKER || 'localhost:9092'],
});

const producer = kafka.producer();

const connectProducer = async () => {
  await producer.connect();
  console.log('[Blog] Kafka producer connected');
};

const publishEvent = async (topic, message) => {
  await producer.send({
    topic,
    messages: [{ value: JSON.stringify(message) }],
  });
};

export default { connectProducer, publishEvent };