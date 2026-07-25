import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email, password } = req.body;

    if (email === 'admin@aditya.com' && password === 'admin') {
      return res.status(200).json({ role: 'admin', message: 'Logged in as Admin' });
    }

    // Fetch clients from KV
    const clients = (await kv.get('clients')) || [];
    const validClient = clients.find((c) => c.email === email && c.password === password);

    if (validClient) {
      return res.status(200).json({ role: 'client', message: 'Logged in as Client' });
    }

    return res.status(401).json({ error: 'Invalid credentials' });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
