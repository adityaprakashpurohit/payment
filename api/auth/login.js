import { list } from '@vercel/blob';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email, password } = req.body;

    if (email === 'admin@aditya.com' && password === 'admin') {
      return res.status(200).json({ role: 'admin', message: 'Logged in as Admin' });
    }

    // Fetch clients from Blob
    let clients = [];
    try {
      const { blobs } = await list({ prefix: 'clients.json' });
      if (blobs.length > 0) {
        const fetchRes = await fetch(blobs[0].url);
        clients = await fetchRes.json();
      }
    } catch (e) {
      console.error('Failed to list or fetch blob:', e);
    }
    
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
