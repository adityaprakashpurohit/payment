import { list, put } from '@vercel/blob';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const { email } = req.query;
      let payments = [];
      const { blobs } = await list({ prefix: 'payments.json' });
      if (blobs.length > 0) {
        const fetchRes = await fetch(blobs[0].url, {
          headers: { Authorization: `Bearer ${process.env.BLOB_READ_WRITE_TOKEN}` }
        });
        payments = await fetchRes.json();
      }
      
      if (email) {
        payments = payments.filter(p => p.clientEmail === email);
      }
      
      return res.status(200).json(payments);
    } catch (error) {
      console.error('Fetch payments error:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  if (req.method === 'POST') {
    try {
      const paymentData = req.body;
      
      let payments = [];
      const { blobs } = await list({ prefix: 'payments.json' });
      if (blobs.length > 0) {
        const fetchRes = await fetch(blobs[0].url, {
          headers: { Authorization: `Bearer ${process.env.BLOB_READ_WRITE_TOKEN}` }
        });
        payments = await fetchRes.json();
      }
      
      const newPayment = {
        ...paymentData,
        id: paymentData.invoiceNumber || `INV-${Math.floor(1000 + Math.random() * 9000)}`,
        status: paymentData.status || 'Pending',
        date: new Date().toISOString().split('T')[0]
      };
      
      payments.push(newPayment);
      
      await put('payments.json', JSON.stringify(payments), {
        access: 'private',
        addRandomSuffix: false,
      });
      
      return res.status(201).json(newPayment);
    } catch (error) {
      console.error('Save payment error:', error);
      return res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
