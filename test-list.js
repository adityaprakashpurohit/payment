import { list } from '@vercel/blob';

async function test() {
  process.env.BLOB_READ_WRITE_TOKEN = "vercel_blob_rw_Gbh7IMWDb5jPo7Q7_SLPqpLtqPUUmE33XnqX74xbRZjOha1";
  const { blobs } = await list({ prefix: 'clients.json' });
  console.log('Blob found');
  const fetchRes = await fetch(blobs[0].url, {
    headers: { Authorization: `Bearer ${process.env.BLOB_READ_WRITE_TOKEN}` }
  });
  console.log('Fetch status:', fetchRes.status);
  console.log('Fetch text:', await fetchRes.text());
}

test();
