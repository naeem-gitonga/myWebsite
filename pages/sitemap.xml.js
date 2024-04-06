const EXTERNAL_DATA_URL = 'https://jahanaeemgitonga.com/articles';

function generateSiteMap(posts) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <url>
       <loc>https://jahanaeemgitonga.com</loc>
       <priority>1</priority>
       <lastmod>2024-04-01</lastmod>
     </url>
     <url>
       <loc>https://jahanaeemgitonga.com/articles/i-am</loc>
     </url>
     <url>
       <loc>https://jahanaeemgitonga.com/articles/default-parameters</loc>
     </url>
     <url>
       <loc>https://jahanaeemgitonga.com/articles/do-i-need-a-cka</loc>
     </url>
     <url>
       <loc>https://jahanaeemgitonga.com/articles/explain-servers-to-5-year-old</loc>
     </url>
     <url>
       <loc>https://jahanaeemgitonga.com/articles/js-new-sexy</loc>
     </url>
     <url>
       <loc>https://jahanaeemgitonga.com/articles/rapidbackend</loc>
     </url>
     <url>
       <loc>https://jahanaeemgitonga.com/articles/react-context-api</loc>
     </url>
     <url>
       <loc>https://jahanaeemgitonga.com/articles/sam-lambda-mongodb</loc>
     </url>
     <url>
       <loc>https://jahanaeemgitonga.com/shop</loc>
     </url>
     <url>
       <loc>https://jahanaeemgitonga.com/about</loc>
       <priority>0.9</priority>
       <lastmod>2024-04-06</lastmod>
     </url>
     <url>
       <loc>https://jahanaeemgitonga.com/item?item_id=1</loc>
     </url>
     <url>
       <loc>https://jahanaeemgitonga.com/item?item_id=2</loc>
     </url>
     <url>
       <loc>https://jahanaeemgitonga.com/item?item_id=3</loc>
     </url>
     <url>
       <loc>https://jahanaeemgitonga.com/item?item_id=4</loc>
     </url>
     <url>
       <loc>https://jahanaeemgitonga.com/item?item_id=4</loc>
     </url>
     <url>
       <loc>https://jahanaeemgitonga.com/work</loc>
       <lastmod>2024-04-06</lastmod>
     </url>
   </urlset>
 `;
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
  console.log('working')
}

export async function getServerSideProps({ res }) {
  // We make an API call to gather the URLs for our site
  const request = await fetch(EXTERNAL_DATA_URL);
  const posts = await request.json();

  // We generate the XML sitemap with the posts data
  const sitemap = generateSiteMap(posts);

  res.setHeader('Content-Type', 'text/xml');
  // we send the XML to the browser
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default SiteMap;