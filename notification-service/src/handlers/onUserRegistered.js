import sendEmail from '../mailer/sendEmail';

const onUserRegistered = async (event) => {
  // event = { userId, email, name, event: 'user.registered' }
  await sendEmail(
    event.email,
    'Welcome to BlogApp! 👋',
    `
      <h2>Hi ${event.name},</h2>
      <p>Your account is ready. Start writing your first blog post!</p>
      <a href="http://localhost:3000/create">Write your first blog →</a>
    `
  );
};

export default onUserRegistered;