import sendEmail from '../mailer/sendEmail';

const onBlogUpdated = async (event) => {
    // event = { authorEmail, title, blogId, event: 'blog.updated' }
    await sendEmail(
        event.authorEmail,
    `✏️ Your blog "${event.title}" was updated`,
    `
      <h2>Blog Updated</h2>
      <p>Your changes to <strong>${event.title}</strong> are now live.</p>
      <a href="http://localhost:3000/blogs/${event.blogId}">View updated post →</a>
    `
  );

};

export default onBlogUpdated;
