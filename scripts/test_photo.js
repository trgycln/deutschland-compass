async function test() {
  const url = 'https://maps.app.goo.gl/SxcBcaSovyxAuW1b6';
  try {
    const res = await fetch(url, {
      redirect: 'follow',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept-Language': 'de-DE,de;q=0.9,en;q=0.8'
      }
    });
    const html = await res.text();
    const ogMatch = html.match(/content="([^"]+)"\s+property="og:image"/) || html.match(/property="og:image"\s+content="([^"]+)"/);
    console.log('og:image:', ogMatch ? ogMatch[1] : 'null');
    const lhMatch = html.match(/https:\/\/lh[0-9]\.googleusercontent\.com\/p\/[a-zA-Z0-9_\-]+/);
    console.log('lhMatch:', lhMatch ? lhMatch[0] : 'null');
  } catch (e) {
    console.error('Error:', e);
  }
}
test();
