const products = require('../utils/products')['products'];
// * reference:      https://www.sitemaps.org/protocol.html https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
function generateSiteMap() {
  const articleEntries = [
    'default-parameters',
    'do-i-need-a-cka',
    'explain-servers-to-5-year-old',
    'i-am',
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
        <loc>https://jahanaeemgitonga.com/articles/${file}</loc>
      </url>
    `;
  });
  const productsEntries = products.map(
    (p) => `
    <url>
      <loc>https://jahanaeemgitonga.com${p.productUrl}</loc>
    </url>
    `
  );
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <url>
       <loc>https://jahanaeemgitonga.com</loc>
       <priority>1.0</priority>
       <lastmod>2024-04-01</lastmod>
     </url>
     <url>
       <loc>https://jahanaeemgitonga.com/about</loc>
       <priority>0.9</priority>
       <lastmod>2024-04-06</lastmod>
       <changefreq>monthly</changefreq>
     </url>
     <url>
       <loc>https://jahanaeemgitonga.com/work</loc>
       <lastmod>2024-04-06</lastmod>
       <changefreq>yearly</changefreq>
     </url>
     <url>
       <loc>https://jahanaeemgitonga.com/articles</loc>
       <lastmod>2024-04-06</lastmod>
       <changefreq>weekly</changefreq>
     </url>
     <url>
       <loc>https://jahanaeemgitonga.com/shop</loc>
       <changefreq>yearly</changefreq>
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

export async function getServerSideProps({ res }) {
  const sitemap = generateSiteMap();

  res.setHeader('Content-Type', 'text/xml');
  // we send the XML to the browser
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default SiteMap;
