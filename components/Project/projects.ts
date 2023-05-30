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
  | 'arithmetik'
  | 'jngwebsite';

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
    title: 'This web app*',
    projectImg: 'https://d2j3yisnywcb30.cloudfront.net/pix/jng-website.png',
    projectDes:
      'I just ported this website over to React. Originally it was written in 2018, using vanilla JS, some jQuery, and HTML. I decided to bring it into the now and add some new features.',
    projectStack: 'jngwebsite',
    gitHubLink: 'https://github.com/JNaeemGitonga/myWebsite',
  },
  {
    title: 'Pluralsight**',
    projectImg: 'https://d2j3yisnywcb30.cloudfront.net/pix/pluralsight.png',
    projectDes:
      "Enterprise Learning application, I've led teams, and initiatives on migrations and new features.",
    projectStack: 'pluralsight',
    projectLink: 'https://www.pluralsight.com',
  },
  {
    title: 'AcloudGuru**',
    projectImg: 'https://d2j3yisnywcb30.cloudfront.net/pix/acloudguru.png',
    projectDes:
      'Learning application, here I honed my skills with Serverless event driven architecture.',
    projectStack: 'acloudguru',
    projectLink: 'https://www.pluralsight.com',
  },
  {
    title: 'Vestiaire Collective**',
    projectImg: 'https://d2j3yisnywcb30.cloudfront.net/pix/vc.png',
    projectDes:
      'Peer to peer fashion e-commerce, web application. I led efforts to rebuild the listing flow. I was principally writing React',
    projectStack: 'vc',
    projectLink: 'https://www.vestiairecollective.com',
  },
  {
    title: 'Honeywell Forge, HCE**',
    projectImg: 'https://d2j3yisnywcb30.cloudfront.net/pix/hce.png',
    projectDes:
      'Enterprise aviation monitoring and tracking used to monitor aircraft and aircraft fleets.',
    projectStack: 'honeywell',
    projectLink: 'https://www.honeywellforge.ai/us/en/industries/aerospace',
  },
  {
    title: 'Cricket Wireless**',
    projectImg: 'https://d2j3yisnywcb30.cloudfront.net/pix/cricket.png',
    projectDes:
      'Telecommunications e-commerce web application. I worked on the shopping cart team, mostly writing vanilla JavaScript.',
    projectStack: 'cricket',
    projectLink: 'https://www.cricketwireless.com.com',
  },
  {
    title: 'American Airlines Horror*',
    projectImg: 'https://d2j3yisnywcb30.cloudfront.net/pix/aahs.png',
    projectDes: 'Custom web app. Go and vent your frustrations today.',
    projectStack: 'aah',
    gitHubLink: 'https://github.com/JNaeemGitonga/first-golang-app',
  },

  {
    title: 'Gabrielle Zalina*',
    projectImg: 'https://d2j3yisnywcb30.cloudfront.net/pix/gzalina.png',
    projectDes: 'Custom single-page website.',
    projectStack: 'gab',
    gitHubLink: 'https://github.com/JNaeemGitonga/zalina-test',
  },
  {
    title: 'Connex*',
    projectImg: 'https://d2j3yisnywcb30.cloudfront.net/pix/connex.png',
    projectDes:
      'Software product in Beta mode for Transportation Industry (BOLs).',
    projectStack: 'connex',
    projectLink: 'http://www.connexapp.com',
    gitHubLink: 'https://bitbucket.org/naeemgitonga/connex-back/src/master/',
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
    gitHubLink: 'https://github.com/JNaeemGitonga/gtng',
  },
  {
    title: 'Arithmetik*',
    projectImg: 'https://d2j3yisnywcb30.cloudfront.net/pix/arithmetik.png',
    projectDes: 'Enterprise Learning application',
    projectStack: 'arithmetik',
    projectLink: 'https://www.npmjs.com/package/arithmetik',
    gitHubLink: 'https://github.com/JNaeemGitonga/arithmetik',
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
    gitHubLink: 'https://github.com/JNaeemGitonga/naeem-polling',
  },
];
