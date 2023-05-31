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
    gitHubLink:
      '/interstitial?url=https://github.com/JNaeemGitonga/myWebsite&where=Github',
  },
  {
    title: 'Pluralsight**',
    projectImg: 'https://d2j3yisnywcb30.cloudfront.net/pix/pluralsight.png',
    projectDes:
      "Enterprise Learning application, I've led teams, and initiatives on migrations and new features.",
    projectStack: 'pluralsight',
    projectLink:
      '/interstitial?url=https://www.pluralsight.com&where=Pluralsight',
  },
  {
    title: 'AcloudGuru**',
    projectImg: 'https://d2j3yisnywcb30.cloudfront.net/pix/acloudguru.png',
    projectDes:
      'Learning application, here I honed my skills with Serverless event driven architecture.',
    projectStack: 'acloudguru',
    projectLink:
      '/interstitial?url=https://www.acloudguru.com&where=Pluralsight',
  },
  {
    title: 'Vestiaire Collective**',
    projectImg: 'https://d2j3yisnywcb30.cloudfront.net/pix/vc.png',
    projectDes:
      'Peer to peer fashion e-commerce, web application. I led efforts to rebuild the listing flow. I was principally writing React',
    projectStack: 'vc',
    projectLink:
      '/interstitial?url=https://www.vestiairecollective.com&where=Vestiaire Collective',
  },
  {
    title: 'Honeywell Forge, HCE**',
    projectImg: 'https://d2j3yisnywcb30.cloudfront.net/pix/hce.png',
    projectDes:
      'Enterprise aviation monitoring and tracking used to monitor aircraft and aircraft fleets.',
    projectStack: 'honeywell',
    projectLink:
      '/interstitial?url=https://www.honeywellforge.ai/us/en/industries/aerospace&where=Honeywell HCE',
  },
  {
    title: 'Cricket Wireless**',
    projectImg: 'https://d2j3yisnywcb30.cloudfront.net/pix/cricket.png',
    projectDes:
      'Telecommunications e-commerce web application. I worked on the shopping cart team, mostly writing vanilla JavaScript.',
    projectStack: 'cricket',
    projectLink:
      '/interstitial?url=https://www.cricketwireless.com&where=Cricket Wireless',
  },
  {
    title: 'American Airlines Horror*',
    projectImg: 'https://d2j3yisnywcb30.cloudfront.net/pix/aahs.png',
    projectDes: 'Custom web app. Go and vent your frustrations today.',
    projectStack: 'aah',
    gitHubLink:
      '/interstitial?url=https://github.com/JNaeemGitonga/first-golang-app&where=Github',
  },

  {
    title: 'Gabrielle Zalina*',
    projectImg: 'https://d2j3yisnywcb30.cloudfront.net/pix/gzalina.png',
    projectDes: 'Custom single-page website.',
    projectStack: 'gab',
    gitHubLink:
      '/interstitial?url=https://github.com/JNaeemGitonga/zalina-test&where=Github',
  },
  {
    title: 'Connex*',
    projectImg: 'https://d2j3yisnywcb30.cloudfront.net/pix/connex.png',
    projectDes:
      'Software product in Beta mode for Transportation Industry (BOLs).',
    projectStack: 'connex',
    projectLink: 'http://www.connexapp.com',
    gitHubLink:
      '/interstitial?url=https://bitbucket.org/naeemgitonga/connex-back/src/master/&where=Bitbucket',
  },
  {
    title: 'Ninety.io**',
    projectImg: 'https://d2j3yisnywcb30.cloudfront.net/pix/traxion.png',
    projectDes:
      'My code helped this app acheive over 1000% growth, in paying customers, in less than two years.',
    projectStack: 'ninety',
    projectLink: '/interstitial?url=https://ninety.io&where=Ninety.io',
  },
  {
    title: 'GTNG*',
    projectImg: 'https://d2j3yisnywcb30.cloudfront.net/pix/gtng.png',
    projectDes: 'Custom website.',
    projectStack: 'gtng',
    projectLink: 'http://www.gtng.tech',
    gitHubLink:
      '/interstitial?url=https://github.com/JNaeemGitonga/gtng&where=Github',
  },
  {
    title: 'Arithmetik*',
    projectImg: 'https://d2j3yisnywcb30.cloudfront.net/pix/arithmetik.png',
    projectDes: 'Enterprise Learning application',
    projectStack: 'arithmetik',
    projectLink:
      '/interstitial?url=https://www.npmjs.com/package/arithmetik&where=NPM',
    gitHubLink:
      '/interstitial?url=https://github.com/JNaeemGitonga/arithmetik&where=Github',
  },
  {
    title: 'Learningo!*',
    projectImg: 'https://d2j3yisnywcb30.cloudfront.net/pix/loginPage.png',
    projectDes:
      'MVP for app that allows users to learn the topic of their choosing.',
    projectStack: 'learningo',
    gitHubLink:
      '/interstitial?url=https://github.com/PROB8/learningo&where=Github',
  },
  {
    title: "What's my Horoscope?*",
    projectImg: 'https://d2j3yisnywcb30.cloudfront.net/pix/myHoroscope.png',
    projectDes: 'MVP for app gives simple horoscope/motivational quote.',
    projectStack: 'horoscope',
    gitHubLink:
      '/interstitial?url=https://github.com/PROB8/find-my-horoscope&where=Github',
  },
  {
    title: "Polls 'R' Us*",
    projectImg: 'https://d2j3yisnywcb30.cloudfront.net/pix/pollsRUs.png',
    projectDes:
      "MVP for an app that allows you to collect the world's opinion.",
    projectStack: 'polls',
    gitHubLink:
      '/interstitial?url=https://github.com/JNaeemGitonga/naeem-polling&where=Github',
  },
];
