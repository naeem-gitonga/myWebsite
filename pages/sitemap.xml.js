const products = require('../utils/products')['products'];
// * reference:      https://www.sitemaps.org/protocol.html https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
function generateSiteMap(prefix) {
  const articleEntries = [
    'shutdown-sync',
    'regulated-compute',
    'tiger-experience',
    'image-server-ai',
    'default-parameters',
    'do-i-need-a-cka',
    'explain-servers-to-5-year-old',
    'gitlab-to-github-mirrors',
    'i-am',
    'dont-pay-for-tokens',
    'js-new-sexy',
    'rapidbackend',
    'react-context-api',
    'sam-lambda-mongodb',
    'read-write-send-xml',
    'microservices-part-1',
    'microservices-part-2',
  ].map((file) => {
    return `
      <url>
        <loc>https://${prefix}naeemgitonga.com/articles/${file}</loc>
      </url>
    `;
  });
  const productsEntries = products.map(
    (p) => `
    <url>
      <loc>https://${prefix}naeemgitonga.com${p.productUrl}</loc>
    </url>
    `
  );
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <url>
       <loc>https://${prefix}naeemgitonga.com</loc>
       <priority>1.0</priority>
       <lastmod>2024-04-01</lastmod>
     </url>
     <url>
       <loc>https://${prefix}naeemgitonga.com/about</loc>
       <priority>0.9</priority>
       <lastmod>2024-04-06</lastmod>
       <changefreq>monthly</changefreq>
     </url>
     <url>
       <loc>https://${prefix}naeemgitonga.com/work</loc>
       <lastmod>2024-04-06</lastmod>
       <changefreq>yearly</changefreq>
     </url>
     <url>
       <loc>https://${prefix}naeemgitonga.com/articles</loc>
       <lastmod>2024-04-06</lastmod>
       <changefreq>weekly</changefreq>
     </url>
     <url>
       <loc>https://${prefix}naeemgitonga.com/shop</loc>
       <changefreq>yearly</changefreq>
     </url>
     <url>
       <loc>https://${prefix}naeemgitonga.com/demo/speech-avatar</loc>
       <changefreq>monthly</changefreq>
     </url>
      ${articleEntries.join('')}
      ${productsEntries.join('')}
   </urlset>
 `;
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
  console.log('working');
}

export async function getServerSideProps({ res, req }) {
  const referrer = req.rawHeaders[req.rawHeaders.indexOf('Referer') + 1];
  let sitemap;
  if (referrer.includes('jaha')) {
    sitemap = generateSiteMap('jaha');
  }
  sitemap = generateSiteMap('');

  res.setHeader('Content-Type', 'text/xml');
  // we send the XML to the browser
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default SiteMap;
