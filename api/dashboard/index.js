import { list } from '@vercel/blob';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      let clients = [];
      const clientBlobs = await list({ prefix: 'clients.json' });
      if (clientBlobs.blobs.length > 0) {
        const fetchRes = await fetch(clientBlobs.blobs[0].url);
        clients = await fetchRes.json();
      }

      let payments = [];
      const paymentBlobs = await list({ prefix: 'payments.json' });
      if (paymentBlobs.blobs.length > 0) {
        const fetchRes = await fetch(paymentBlobs.blobs[0].url);
        payments = await fetchRes.json();
      }

      const totalClients = clients.length;
      const pendingPayments = payments.filter(p => p.status === 'Pending').length;
      const paidPayments = payments.filter(p => p.status === 'Paid').length;
      const revenue = payments.filter(p => p.status === 'Paid').reduce((acc, curr) => acc + (parseFloat(curr.amount) || 0), 0);

      // We mix some mock chart data with the real revenue for demonstration
      const revenueChart = [
        { name: "Jan", total: 1200 },
        { name: "Feb", total: 2100 },
        { name: "Mar", total: 800 },
        { name: "Apr", total: 1600 },
        { name: "May", total: 900 },
        { name: "Jun", total: 1700 },
        { name: "Jul", total: 2500 },
        { name: "Aug", total: 3100 },
        { name: "Sep", total: 2800 },
        { name: "Oct", total: revenue > 3500 ? revenue : 3500 }
      ];

      const paymentStatusChart = [
        { name: "Pending", value: pendingPayments, color: "#F59E0B" },
        { name: "Paid", value: paidPayments, color: "#22C55E" },
        { name: "Overdue", value: payments.filter(p => p.status === 'Overdue').length, color: "#EF4444" }
      ];

      return res.status(200).json({
        totalClients,
        pendingPayments,
        paidPayments,
        revenue,
        paymentsThisMonth: payments.length,
        revenueChart,
        paymentStatusChart
      });
    } catch (error) {
      console.error('Dashboard stats error:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
