import './globals.css';

export const metadata = {
  title: 'Jaha Naeem Gitonga',
  description:
    'Jaha Naeem Gitonga of GTNG, the tech lead, software | DevOps engineer to build your next app or website.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />

        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css"
        />
        <link
          rel="shortcut icon"
          href="https://d2j3yisnywcb30.cloudfront.net/pix/favicon.ico"
        />
      </head>
      <body className={`body`}>
        {children}

        <script src="https://use.fontawesome.com/804fb94b8b.js" async />
        <script
          type="text/javascript"
          src="https://d2j3yisnywcb30.cloudfront.net/particles.js"
          async
        />
      </body>
    </html>
  );
}
