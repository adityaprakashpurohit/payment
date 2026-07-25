import { list, put } from '@vercel/blob';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      let clients = [];
      const { blobs } = await list({ prefix: 'clients.json' });
      if (blobs.length > 0) {
        const fetchRes = await fetch(blobs[0].url);
        clients = await fetchRes.json();
      }
      return res.status(200).json(clients);
    } catch (error) {
      console.error('Fetch clients error:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  if (req.method === 'POST') {
    try {
      const { email, password, fullName, company, phone } = req.body;
      
      let clients = [];
      const { blobs } = await list({ prefix: 'clients.json' });
      if (blobs.length > 0) {
        const fetchRes = await fetch(blobs[0].url);
        clients = await fetchRes.json();
      }
      
      const newClient = { email, password, fullName, company, phone, id: Date.now() };
      clients.push(newClient);
      
      await put('clients.json', JSON.stringify(clients), {
        access: 'public',
        addRandomSuffix: false,
      });
      
      return res.status(201).json(newClient);
    } catch (error) {
      console.error('Save client error:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
