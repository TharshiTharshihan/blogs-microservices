import sendEmail from '../mailer/sendEmail';

const onBlogCreated = async (event) => {
  // event = { authorEmail, title, blogId, event: 'blog.created' }
  await sendEmail(
    event.authorEmail,
    `✅ Your blog "${event.title}" is live!`,
    `
      <h2>Blog Published</h2>
      <p>Your post <strong>${event.title}</strong> is now live and visible to everyone.</p>
      <a href="http://localhost:3000/blogs/${event.blogId}">View your post →</a>
    `
  );
};

export default onBlogCreated;