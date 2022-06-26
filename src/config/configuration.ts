export default () => ({
  DATABASE_URI: process.env.DATABASE_URI,
  USER_SECRET_KEY: process.env.USER_SECRET_KEY,
  PORT: process.env.PORT || 4000,
});
