async function test() {
  const res = await fetch('http://localhost:5173/api/clients', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ fullName: "Test User", email: "test@example.com", company: "Test Co" })
  });
  
  console.log('Status:', res.status);
  const text = await res.text();
  console.log('Response:', text);
}

test();
