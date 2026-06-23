import app, { connectDB } from '../server/server.js';

export default async function (req, res) {
  await connectDB();
  return app(req, res);
}
