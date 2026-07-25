import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const clients = (await kv.get('clients')) || [];
      return res.status(200).json(clients);
    } catch (error) {
      console.error('Fetch clients error:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  if (req.method === 'POST') {
    try {
      const { email, password, fullName, company, phone } = req.body;
      const clients = (await kv.get('clients')) || [];
      
      const newClient = { email, password, fullName, company, phone, id: Date.now() };
      clients.push(newClient);
      
      await kv.set('clients', clients);
      
      return res.status(201).json(newClient);
    } catch (error) {
      console.error('Save client error:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
