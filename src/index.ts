import app from './server';

app.listen(process.env.HTTP_WEB_PORT, () => {
  console.log(`Server is running on port ${process.env.HTTP_WEB_PORT}`);
});