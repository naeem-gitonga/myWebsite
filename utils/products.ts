import consultation from '../components/pictures/consultation.png';
export const products = [
  {
    id: 1,
    title: 'Program Your Life: Lessons of a Software Engineer (paperback)',
    emailTemplateHtml:
      '<p style="color: black">Please allow 7-10 business to receive your order of Program Your Life. Once your order has shipped, you will receive an email containing the tracking number.</p>',
    description:
      "<p>Program Your Life is about how Naeem systematically changed the course of his life over three years starting in 2016. He takes the reader on a journey from the time that he was the sole owner-operator of a small trucking company based out of East Point, GA and transformed into a thriving Software Engineer.</p><p>He uses the mobile Software Development Lifecycle to help tell his story because that development lifecycle bears a striking resemblance to that which all humans take to develop their own lives. In it, he details his hardships, situations that he faced which were racially charged and how he felt during those situations as well as tactics that he used to overcome and rise above those situations.</p><p>He is the “first trucker turned software engineer” and throughout this book wants the reader to know that they too can and should engineer their life and purposes. Because if they don't, they will undoubtedly be programmed by someone else.</p>",
    imageUrl: 'pylcover',
    isbn: '978-1-7334424-0-4',
    price: 25,
    productUrl: '/item?item_id=1',
    promotion: 0,
    s3Url: '',
    emailTemplate: '01',
    publishedOn: 'July 15, 2019',
    show: true,
    calendlyLink: false,
    previewLink:
      'https://jahanaeemgitongawebsite.s3.amazonaws.com/program_your_life_preview.pdf',
    imageUrlItemView:
      'https://jahanaeemgitongawebsite.s3.amazonaws.com/pix/pyl-front-cover.jpg',
  },
  {
    id: 3,
    title: 'Program Your Life: Lessons of a Software Engineer (PDF)',
    description:
      "<p>Program Your Life is about how Naeem systematically changed the course of his life over three years starting in 2016. He takes the reader on a journey from the time that he was the sole owner-operator of a small trucking company based out of East Point, GA and transformed into a thriving Software Engineer.</p><p>He uses the mobile Software Development Lifecycle to help tell his story because that development lifecycle bears a striking resemblance to that which all humans take to develop their own lives. In it, he details his hardships, situations that he faced which were racially charged and how he felt during those situations as well as tactics that he used to overcome and rise above those situations.</p><p>He is the first “trucker turned software engineer” and throughout this book wants the reader to know that they too can and should engineer their life and purposes. Because if they don't, they will undoubtedly be programmed by someone else.</p>",
    s3Url:
      'https://program-your-life.s3.amazonaws.com/program_your_life_revised.pdf',
    emailTemplateHtml: `<p style="color: black">Please click the link below to download your copy of Program Your Life. It is time sensitive. You have <strong style="color: red">3 DAYS</strong> from the time of purchase to download the eBook before this link is invalidated.</p><a href="'03'">Download Program Your Life (PDF)</a>`,
    imageUrl: 'pylcover',
    productUrl: '/item?item_id=3',
    price: 4.99,
    promotion: 0,
    isbn: '978-1-7334424-1-1',
    emailTemplate: '03',
    publishedOn: 'July 15, 2019',
    show: true,
    calendlyLink: false,
    previewLink:
      'https://jahanaeemgitongawebsite.s3.amazonaws.com/program_your_life_preview.pdf',
    imageUrlItemView:
      'https://jahanaeemgitongawebsite.s3.amazonaws.com/pix/pyl-front-cover.jpg',
  },
  {
    id: 2,
    title: 'Rapid Back-End (PDF)',
    emailTemplateHtml: `<p style="color: black">Please click the link below to download your copy of Rapid Back-End. It is time sensitive. You have <strong style="color: red">3 DAYS</strong> from the time of purchase to download the eBook before this link is invalidated.</p><a href="'02'">Download Rapid Back-End eBook</a>`,
    description:
      '<p>Rapid Back-End was designed with software engineers in mind. It is a tool that when deployed will give you the power and flexibility needed for a modern API solution. The core technologies of Rapid Back-end are: TypeScript, JWTs, AWS CDK, Serverless, Serverless Offline, API Gateway, Lambda, Jest, and MongoDB. If you are requiring use of a SQL type datastore then you can easily change your deployment to use either flavor of SQL that you desire.</p><p>Going serverless can lead to many functions and an increased surface area making a growing system more difficult to maintain. Functions as Microservices (FaMS) with Rapid Back-End are the best option. Enjoy built-in auth, easy routing, and modular components.</p>',
    s3Url: 'https://rapidbackend.s3.amazonaws.com/rapid-back-end-ebook.pdf',
    imageUrl: 'rapidbackend',
    productUrl: '/item?item_id=2',
    price: 14.99,
    isbn: '978-1-7334424-2-8',
    promotion: 5.99,
    emailTemplate: '02',
    publishedOn: 'August 10, 2023',
    show: true,
    calendlyLink: false,
    previewLink:
      'https://jahanaeemgitongawebsite.s3.amazonaws.com/rapid-back-end-intro-ch-1.pdf',
    imageUrlItemView:
      'https://jahanaeemgitongawebsite.s3.amazonaws.com/pix/rbe-cover.jpg',
  },
  {
    id: 4,
    title: '1-Hour Consultation',
    imageUrl: 'consult',
    productUrl: '/item?item_id=4',
    price: 100,
    promotion: 0,
    description: `<p>If you would like to speak to Naeem about anything related to the content found on this web app, you may do so by booking an hour of time with him.</p><p>He is available for code review, architecture, business and management consultation, get to know Naeem, even life advice.</p><p>This is a one hour, one-on-one session. Upon payment you will receive an email with details on how to book your session.</p>`,
    s3Url: '',
    emailTemplate: '04',
    emailTemplateHtml: `<p style="color: black">You decided to put some time on my calendar! Please book your time <a href="'04'">here</a>.</p>`,
    publishedOn: '',
    isbn: '',
    show: process.env.NEXT_PUBLIC_SHOW_CONSULT as unknown as boolean,
    calendlyLink: true,
    previewLink: '',
    imageUrlItemView: consultation,
  },
];
