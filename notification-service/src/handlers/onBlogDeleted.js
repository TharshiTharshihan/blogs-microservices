import sendEmail from '../mailer/sendEmail';

const onBlogDeleted = async (event) => {
      await sendEmail(
    event.authorEmail,
    `🗑️ Your blog has been deleted`,
    `
      <h2>Blog Deleted</h2>
      <p>Your blog post (ID: <code>${event.blogId}</code>) has been permanently deleted.</p>
      <p>You can always create a new one from your dashboard.</p>
    `
  );
};

export default onBlogDeleted;