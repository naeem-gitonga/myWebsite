export type ProjectName =
  | 'polls'
  | 'horoscope'
  | 'learningo'
  | 'gab'
  | 'connex'
  | 'ninety'
  | 'gtng'
  | 'aah'
  | 'pluralsight'
  | 'honeywell'
  | 'vc'
  | 'acloudguru'
  | 'cricket'
  | 'arithmetik';

export type Project = {
  projectImg: string;
  title: string;
  projectDes: string;
  projectStack: ProjectName;
  projectLink?: string;
  gitHubLink?: string;
};

export const projects: Project[] = [
  {
    title: 'Pluralsight**',
    projectImg: 'https://d2j3yisnywcb30.cloudfront.net/pix/pluralsight.png',
    projectDes: 'Enterprise Learning application',
    projectStack: 'pluralsight',
    projectLink: 'https://www.pluralsight.com',
  },
  {
    title: 'AcloudGuru**',
    projectImg: 'https://d2j3yisnywcb30.cloudfront.net/pix/acloudguru.png',
    projectDes: 'Learning application',
    projectStack: 'acloudguru',
    projectLink: 'https://www.pluralsight.com',
  },
  {
    title: 'Vestiaire Collective**',
    projectImg: 'https://d2j3yisnywcb30.cloudfront.net/pix/vc.png',
    projectDes:
      'Peer to peer Fashion e-commerce, web application. I led efforts to rebuild the listing flow.',
    projectStack: 'vc',
    projectLink: 'https://www.vestiairecollective.com',
  },
  {
    title: 'Honeywell Forge, HCE**',
    projectImg: 'https://d2j3yisnywcb30.cloudfront.net/pix/hce.png',
    projectDes: 'Enterprise aviation monitoring and tracking',
    projectStack: 'honeywell',
    projectLink: 'https://www.honeywellforge.ai/us/en/industries/aerospace',
  },
  {
    title: 'Cricket Wireless**',
    projectImg: 'https://d2j3yisnywcb30.cloudfront.net/pix/cricket.png',
    projectDes: 'Telecommunications e-commerce web application',
    projectStack: 'cricket',
    projectLink: 'https://www.cricketwireless.com.com',
  },
  {
    title: 'American Airlines Horror*',
    projectImg: 'https://d2j3yisnywcb30.cloudfront.net/pix/aahs.png',
    projectDes: 'Custom web app. Go and vent your frustrations today.',
    projectStack: 'aah',
    projectLink: 'http://www.americanairlineshorroor.com',
    gitHubLink: 'javascript:void(0)',
  },

  {
    title: 'Gabrielle Zalina*',
    projectImg: 'https://d2j3yisnywcb30.cloudfront.net/pix/gzalina.png',
    projectDes: 'Custom single-page website.',
    projectStack: 'gab',
    gitHubLink: 'javascript:void(0)',
  },
  {
    title: 'Connex*',
    projectImg: 'https://d2j3yisnywcb30.cloudfront.net/pix/connex.png',
    projectDes:
      'Software product in Beta mode for Transportation Industry (BOLs).',
    projectStack: 'connex',
    projectLink: 'http://www.connexapp.com',
    gitHubLink: 'javascript:void(0)',
  },
  {
    title: 'Ninety.io**',
    projectImg: 'https://d2j3yisnywcb30.cloudfront.net/pix/traxion.png',
    projectDes:
      'My code helped this app acheive over 1000% growth, in paying customers, in less than two years.',
    projectStack: 'ninety',
    projectLink: 'https://ninety.io',
  },
  {
    title: 'GTNG*',
    projectImg: 'https://d2j3yisnywcb30.cloudfront.net/pix/gtng.png',
    projectDes: 'Custom website.',
    projectStack: 'gtng',
    projectLink: 'http://www.gtng.tech',
    gitHubLink: 'javascript:void(0)',
  },
  {
    title: 'Arithmetik*',
    projectImg: 'https://d2j3yisnywcb30.cloudfront.net/pix/arithmetik.png',
    projectDes: 'Enterprise Learning application',
    projectStack: 'arithmetik',
    projectLink: 'https://www.npmjs.com/package/arithmetik',
    gitHubLink: 'javascript:void(0)',
  },
  {
    title: 'Learningo!*',
    projectImg: 'https://d2j3yisnywcb30.cloudfront.net/pix/loginPage.png',
    projectDes:
      'MVP for app that allows users to learn the topic of their choosing.',
    projectStack: 'learningo',
    gitHubLink: 'https://github.com/PROB8/learningo',
  },
  {
    title: "What's my Horoscope?*",
    projectImg: 'https://d2j3yisnywcb30.cloudfront.net/pix/myHoroscope.png',
    projectDes: 'MVP for app gives simple horoscope/motivational quote.',
    projectStack: 'horoscope',
    gitHubLink: 'https://github.com/PROB8/find-my-horoscope',
  },
  {
    title: "Polls 'R' Us*",
    projectImg: 'https://d2j3yisnywcb30.cloudfront.net/pix/pollsRUs.png',
    projectDes:
      "MVP for an app that allows you to collect the world's opinion.",
    projectStack: 'polls',
    gitHubLink: 'https://github.com/PROB8/naeem-polling',
  },
];
