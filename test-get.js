async function test() {
  const res = await fetch('http://localhost:5173/api/clients');
  console.log('Status:', res.status);
  const text = await res.text();
  console.log('Response:', text);
}

test();
