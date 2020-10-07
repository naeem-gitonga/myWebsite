console.log('%cHi Everyone!', 'color: lime; font-size: 50px')
console.log('%cHey if you\'re reading this you should hire me to build your next website, web or mobile app. I am an awesome engineer! So instead of snooping around in the console, call me! You can reach me at 404.670.0059. Leave a message or text if I don\'t answer. --Naeem', 'color: lime; font-size: 30px');

const footer = `GTNG ${moment().format("YYYY")}`;

const reduxStackItem = `
    <div class="project-stack-item">
        <svg class='redux logo' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
        <g fill="#764ABC">
            <path d="M65.6 65.4c2.9-.3 5.1-2.8 5-5.8-.1-3-2.6-5.4-5.6-5.4h-.2c-3.1.1-5.5 2.7-5.4 5.8.1 1.5.7 2.8 1.6 3.7-3.4 6.7-8.6 11.6-16.4 15.7-5.3 2.8-10.8 3.8-16.3 3.1-4.5-.6-8-2.6-10.2-5.9-3.2-4.9-3.5-10.2-.8-15.5 1.9-3.8 4.9-6.6 6.8-8-.4-1.3-1-3.5-1.3-5.1-14.5 10.5-13 24.7-8.6 31.4 3.3 5 10 8.1 17.4 8.1 2 0 4-.2 6-.7 12.8-2.5 22.5-10.1 28-21.4z"/>
            <path d="M83.2 53c-7.6-8.9-18.8-13.8-31.6-13.8H50c-.9-1.8-2.8-3-4.9-3h-.2c-3.1.1-5.5 2.7-5.4 5.8.1 3 2.6 5.4 5.6 5.4h.2c2.2-.1 4.1-1.5 4.9-3.4H52c7.6 0 14.8 2.2 21.3 6.5 5 3.3 8.6 7.6 10.6 12.8 1.7 4.2 1.6 8.3-.2 11.8-2.8 5.3-7.5 8.2-13.7 8.2-4 0-7.8-1.2-9.8-2.1-1.1 1-3.1 2.6-4.5 3.6 4.3 2 8.7 3.1 12.9 3.1 9.6 0 16.7-5.3 19.4-10.6 2.9-5.8 2.7-15.8-4.8-24.3z"/>
            <path d="M32.4 67.1c.1 3 2.6 5.4 5.6 5.4h.2c3.1-.1 5.5-2.7 5.4-5.8-.1-3-2.6-5.4-5.6-5.4h-.2c-.2 0-.5 0-.7.1-4.1-6.8-5.8-14.2-5.2-22.2.4-6 2.4-11.2 5.9-15.5 2.9-3.7 8.5-5.5 12.3-5.6 10.6-.2 15.1 13 15.4 18.3 1.3.3 3.5 1 5 1.5-1.2-16.2-11.2-24.6-20.8-24.6-9 0-17.3 6.5-20.6 16.1-4.6 12.8-1.6 25.1 4 34.8-.5.7-.8 1.8-.7 2.9z"/>
        </g>
        </svg>
        <p class='name text'>Redux</p>
    </div>
`;

const nodeStackItem = `
    <div class="project-stack-item"> 
        <img class="node logo" src="https://jahanaeemgitongawebsite.s3.amazonaws.com/pix/nodelogo.png">
        <p class='name text'>Node.js</p>
    </div>
`;

const reactStackItem = `
    <div class="project-stack-item">
		<img class="react logo" src="https://jahanaeemgitongawebsite.s3.amazonaws.com/pix/react.png">
		<p class='name text'>React.js</p >
    </div>
`;

const expressStackItem = `
    <div class="project-stack-item"> 
		<img class="express logo" src="https://jahanaeemgitongawebsite.s3.amazonaws.com/pix/expressjslogo.png">
		<p class='name text'>Express.js</p>
    </div>
`;

const mongoStackItem = `
    <div class="project-stack-item"> 
		<img class="mongo logo" src="https://jahanaeemgitongawebsite.s3.amazonaws.com/pix/Mongo2.png" alt='MongoDB Logo'>
		<p class='name text'>MongoDB</p>
    </div>
`;

const jsStackItem = `
    <div class="project-stack">
		<img class="react logo" src="https://jahanaeemgitongawebsite.s3.amazonaws.com/pix/javascript.png">
		<p class='name text'>Javascript</p>
    </div>
`;

const angular = `
    <div class="project-stack-item">
		<img class="react logo" src="https://jahanaeemgitongawebsite.s3.amazonaws.com/pix/angular.png"> 
		<p class='name text'>AngularJS</p>
    </div>
`;
const docker = `
    <div class="project-stack-item">
		<img class="react logo" src="https://jahanaeemgitongawebsite.s3.amazonaws.com/pix/docker.png">
		<p class='name text'>Docker</p>
    </div>
`;

const golangStackItem = `
    <div class="project-stack-item">
		<img class="react logo" src="https://jahanaeemgitongawebsite.s3.amazonaws.com/pix/go-logo.png">
		<p class='name text'>Go</p>
    </div>
`;

const awsLambdaStackItem = `
    <div class="project-stack-item">
		<img class="react logo" src="https://jahanaeemgitongawebsite.s3.amazonaws.com/pix/aws-sam.png">
		<p class='name text'>AWS SAM</p>
    </div>
`;
const projectStack = `${mongoStackItem}${expressStackItem}${reduxStackItem}${reactStackItem}${nodeStackItem}`;

const projectArr = [
  {
    title: "Polls 'R' Us",
    projectImg: "https://jahanaeemgitongawebsite.s3.amazonaws.com/pix/pollsRUs.png",
    projectDes:
      "MVP for an app that allows you to collect the world's opinion.",
    projectStack: `${projectStack}`,
    projectLink: "https://vast-hamlet-89391.herokuapp.com",
    gitHubLink: "https://github.com/PROB8/naeem-polling",
  },
  {
    title: "What's my Horoscope?",
    projectImg: "https://jahanaeemgitongawebsite.s3.amazonaws.com/pix/myHoroscope.png",
    projectDes: "MVP for app gives simple horoscope/motivational quote.",
    projectStack: `${projectStack}`,
    projectLink: "https://findmyhoroscope.herokuapp.com",
    gitHubLink: "https://github.com/PROB8/find-my-horoscope",
  },
  {
    title: "Learningo!",
    projectImg: "https://jahanaeemgitongawebsite.s3.amazonaws.com/pix/loginPage.png",
    projectDes:
      "MVP for app that allows users to learn the topic of their choosing.",
    projectStack: `${projectStack}`,
    projectLink: "https://learningo.herokuapp.com",
    gitHubLink: "https://github.com/PROB8/learningo",
  },
  {
    title: "Gabrielle Zalina presents Texture Masters",
    projectImg: "https://jahanaeemgitongawebsite.s3.amazonaws.com/pix/gzalina.png",
    projectDes: "Custom single-page website.",
    projectStack: `${nodeStackItem}${reduxStackItem}${reactStackItem}`,
    projectLink: "https://gabriellezalina.herokuapp.com",
    gitHubLink: "javascript:void(0)",
  },
  {
    title: "Connex",
    projectImg: "https://jahanaeemgitongawebsite.s3.amazonaws.com/pix/connex.png",
    projectDes:
      "Software product in Beta mode for Transportation Industry (BOLs).",
    projectStack: `${projectStack}`,
    projectLink: "http://www.connexapp.com",
    gitHubLink: "javascript:void(0)",
  },
  {
    title: "Traxion",
    projectImg: "https://jahanaeemgitongawebsite.s3.amazonaws.com/pix/traxion.png",
    projectDes:
      "My code helped this app acheive over 1000% growth, in paying customers, in less than two years.",
    projectStack: `${mongoStackItem}${expressStackItem}${angular}${nodeStackItem}${docker}`,
    projectLink: "https://traxion.io",
    gitHubLink: "javascript:void(0)",
  },
  {
    title: "GTNG",
    projectImg: "https://jahanaeemgitongawebsite.s3.amazonaws.com/pix/gtng.png",
    projectDes: "Custom website.",
    projectStack: `${reactStackItem}${nodeStackItem}${expressStackItem}`,
    projectLink: "http://www.gtng.tech",
    gitHubLink: "javascript:void(0)",
  },
  {
    title: "American Airlines Horror",
    projectImg: "https://jahanaeemgitongawebsite.s3.amazonaws.com/pix/aahs.png",
    projectDes: "Custom web app. Go and vent your frustrations today.",
    projectStack: `${reactStackItem}${golangStackItem}${awsLambdaStackItem}${mongoStackItem}`,
    projectLink: "http://www.americanairlineshorroor.com",
    gitHubLink: "javascript:void(0)",
  },
];

const myWork = `<section class="work animated" id="work" style="display:'none'">
            <h1 class="my-work">myWork</h1>
            <p class='disclaimer'>*unless otherwise noted--I built it all</p>
			<div class='append-toME'>
            <section class="project">
				<div class='image-container'>
					<img class="project-image" src="https://jahanaeemgitongawebsite.s3.amazonaws.com/pix/npmSC.png"
						alt="npm screenshot"> 
					<div class='overlay'>
						<h2 class='title text'>Arithmetik</h2>
							<p class="project-description text">
									NPM package for front and back-end.
							</p>
						<div class="project-stack">
								${jsStackItem}	
						</div>
						<div class="project-links">
							<ul>
								<li class="project-link project-link-live">
									<a class='pro-link text' href="https://www.npmjs.com/package/arithmetik">npm Page</a>
								</li>
								<li class="project-link project-link-github">
									<a class='pro-link text' href="https://github.com/PROB8/npm-gitonga">Source code</a>
								</li>
							</ul>
						</div>
					</div>
				</div>
            </section>
			</div>
    </section>
`;

const contactMe = `
	<section class="contact  animated" id="contact">
		<div class="contact-form"> 
			<h2 class='contact-me'>contactMe</h2>   
			<form style="text-align:center;" class="form-style-4" action="https://formspree.io/blackb8r@gmail.com"
				method="POST">
				<label for="contact-form-name">Your Name</label>
				<input style="text-align:center;" type="text" name="name" id="contact-form-name" placeholder="Grace Hopper" required>
				<label for="contact-form-email">Your Email Address</label>
				<input style="text-align:center;" type="email" name="_replyto" id="contact-form-email" placeholder="grace@example.com" required>
				<label for="contact-form-message">Message</label>
				<textarea name="message" id="contact-form-message" required></textarea>
				<input  type="submit" value="Send message">
			</form> 
		</div>    
	</section>
`;

const aboutMe = `
            <img id="standard" class="headshot" src="https://jahanaeemgitongawebsite.s3.amazonaws.com/pix/standardPic.jpeg"
            alt="JNG" href='#'>
        <h2 class='about-me'>aboutMe</h2>
        <p class="about" >  
                        Peace, I'm Jaha Naeem Gitonga, most call me Naeem. I'm a software engineer/full-stack
                        web developer. I am the founder
                        of <a href='http://www.gtng.tech' class='link'>GTNG™</a> where I build web and mobile apps, and websites per contract. Example: this one is built 
                        using Javascript and the jQuery library. I mentor students in full-time coding boot camps across the nation, 
                        where I teach the Javascript MERN stack, MySQL and a few other cool technologies. 
                        Outside of coding, I do more art. Yeah that's right--programming a computer, building apps and
                        websites is an art. 
                    </p>
                    <p class="about"> 
                        Another cool thing I am working on is learning how to use Blockchain technology. 
                        Since I am super familiar with Javascript the Ethereum Blockchain and Solidity are 
                        extremely interesting to me.
                    </p>
                    <p class="about">
                        Here you will see some samples of my work. If you hover over the screencaptures
                         you'll see info about the app. Click on <span class='link'>Live Demo</span> and you'll be able 
                         to play around with some stuff.
                        <span class='aviso'>Notice:</span> Some of those apps are demos and are hosted on Heroku which offers developers 
                        some <em>free</em> tools to show their work. So if it seems like it's taking a little long to load up, 
                        bear in mind that the server is starting and getting its ducks in a row so that you 
                        can experience the app.
                    </p>
                    <p class="about">Please, if you would like to work with me or just to stopped by look around,
                        click on the <span class='link'>contactMe</span> link above and drop me
                        a line or two. I will be sure to follow up. Enjoy and thanks for dropping by!
                    </p>
			`;

const donate = `
	<section class="donate-section animated" id="donate">
		<div class="donate-container" data-address="1M1zacMt7ewtcKhibhLsVBEwG99KYMuLZN">
			<h1 class='donate'>Donate Me Bitcoin</h1>
			<p class='about-donate'>I love the idea of peer to peer exchange.
			Below is the address to my Bitcoin Wallet. Give freely!
			<div class="btcQRCode">
				<img class='qRCode'src="https://jahanaeemgitongawebsite.s3.amazonaws.com/pix/1M1zacMt7ewtcKhibhLsVBEwG99KYMuLZN.png"/>
			</div>
			<p class='about-donate'>1M1zacMt7ewtcKhibhLsVBEwG99KYMuLZN</p>
		</div>
	</section>
`;

const vectoredPic = `
                <img id='vectored' class='headshot animated flip' src='https://jahanaeemgitongawebsite.s3.amazonaws.com/pix/vectored.me.png'>
`;

const standardPic = `
                <img id='standard' class='headshot animated flip' src='https://jahanaeemgitongawebsite.s3.amazonaws.com/pix/standardPic.jpeg'>
`;

let showProjects = () => {
  projectArr.forEach((project, index) => {
    let work = `<section class="project">
		
			<div class='image-container'>
				 <img class="project-image" src=${project.projectImg}
				alt='app screenshot ${index}'> 
				<div class='overlay'>
					<h2 class='title text'>${project.title}</h2>
					<p class="project-description text">
						${project.projectDes}
					</p>
						<div class="project-stack">
							${project.projectStack}
						</div> 
					<div class="project-links">
						<ul>
							<li class='project-link project-link-live'>
								<a class='pro-link text' href=${project.projectLink} target='_blank'>Live demo</a>
							</li>
							<li class='project-link project-link-github'>
								<a class='pro-link text'  href=${project.gitHubLink} target='_blank'>Source code</a>
							</li>
						</ul>
					</div>
				</div>
			</div>
			<div class='border-bottom'><div>
		</section>`;
    $(".append-toME").prepend(work);
  });
};

$(document).ready(function () {
  $(".footer").append(footer);
  $("#aboutMe-link").click(() => {
    $(".work-and-stuff").empty().append(aboutMe);
    $("html").addClass("doc");
  });

  $("#work-link").click(() => {
    $(".work-and-stuff").empty().append(myWork);
    showProjects();
    $("html").removeClass("doc");
  });

  $("#contact-link").click(() => {
    $(".work-and-stuff").empty().append(contactMe);
    $("html").addClass("doc");
  });

  $("#donate-link").click(() => {
    $(".work-and-stuff").empty().append(donate);
    $("html").addClass("doc");
  });
});

//THE CODE BELOW IS EVENT DELEGATION, NECESSARY SOMETIME FOR DYNAMICALLY CHANGING
//THE CONTENTS OF DOM ELEMENTS
document.getElementById("main-div").addEventListener("click", function (e) {
  if (e.target && e.target.matches("#standard")) {
    this.removeChild(standard);

    this.insertAdjacentHTML("afterbegin", vectoredPic);
  }

  if (e.target && e.target.matches("#vectored")) {
    this.removeChild(vectored);
    this.insertAdjacentHTML("afterbegin", standardPic);
  }
  if (e.target && e.target.matches("#standardImg")) {
    this.removeChild(standardImg);
    this.insertAdjacentHTML("afterbegin", vectoredPic);
    console.log("hit");
  }

  if (e.target && e.target.matches("#vectored")) {
    this.removeChild(vectored);
    this.insertAdjacentHTML("afterbegin", standardPic);
  }
});

var pJS = function (tag_id, params) {
  var canvas_el = document.querySelector(
    "#" + tag_id + " > .particles-js-canvas-el"
  );

  /* particles.js variables with default values */
  this.pJS = {
    canvas: {
      el: canvas_el,
      w: canvas_el.offsetWidth,
      h: canvas_el.offsetHeight,
    },
    particles: {
      number: {
        value: 400,
        density: {
          enable: true,
          value_area: 800,
        },
      },
      color: {
        value: "#fff",
      },
      shape: {
        type: "circle",
        stroke: {
          width: 0,
          color: "#ff0000",
        },
        polygon: {
          nb_sides: 5,
        },
        image: {
          src: "",
          width: 100,
          height: 100,
        },
      },
      opacity: {
        value: 1,
        random: false,
        anim: {
          enable: false,
          speed: 2,
          opacity_min: 0,
          sync: false,
        },
      },
      size: {
        value: 20,
        random: false,
        anim: {
          enable: false,
          speed: 20,
          size_min: 0,
          sync: false,
        },
      },
      line_linked: {
        enable: true,
        distance: 100,
        color: "#fff",
        opacity: 1,
        width: 1,
      },
      move: {
        enable: true,
        speed: 2,
        direction: "none",
        random: false,
        straight: false,
        out_mode: "out",
        bounce: false,
        attract: {
          enable: false,
          rotateX: 3000,
          rotateY: 3000,
        },
      },
      array: [],
    },
    interactivity: {
      detect_on: "canvas",
      events: {
        onhover: {
          enable: true,
          mode: "grab",
        },
        onclick: {
          enable: true,
          mode: "push",
        },
        resize: true,
      },
      modes: {
        grab: {
          distance: 100,
          line_linked: {
            opacity: 1,
          },
        },
        bubble: {
          distance: 200,
          size: 80,
          duration: 0.4,
        },
        repulse: {
          distance: 200,
          duration: 0.4,
        },
        push: {
          particles_nb: 4,
        },
        remove: {
          particles_nb: 2,
        },
      },
      mouse: {},
    },
    retina_detect: false,
    fn: {
      interact: {},
      modes: {},
      vendors: {},
    },
    tmp: {},
  };

  var pJS = this.pJS;

  /* params settings */
  if (params) {
    Object.deepExtend(pJS, params);
  }

  pJS.tmp.obj = {
    size_value: pJS.particles.size.value,
    size_anim_speed: pJS.particles.size.anim.speed,
    move_speed: pJS.particles.move.speed,
    line_linked_distance: pJS.particles.line_linked.distance,
    line_linked_width: pJS.particles.line_linked.width,
    mode_grab_distance: pJS.interactivity.modes.grab.distance,
    mode_bubble_distance: pJS.interactivity.modes.bubble.distance,
    mode_bubble_size: pJS.interactivity.modes.bubble.size,
    mode_repulse_distance: pJS.interactivity.modes.repulse.distance,
  };

  pJS.fn.retinaInit = function () {
    if (pJS.retina_detect && window.devicePixelRatio > 1) {
      pJS.canvas.pxratio = window.devicePixelRatio;
      pJS.tmp.retina = true;
    } else {
      pJS.canvas.pxratio = 1;
      pJS.tmp.retina = false;
    }

    pJS.canvas.w = pJS.canvas.el.offsetWidth * pJS.canvas.pxratio;
    pJS.canvas.h = pJS.canvas.el.offsetHeight * pJS.canvas.pxratio;

    pJS.particles.size.value = pJS.tmp.obj.size_value * pJS.canvas.pxratio;
    pJS.particles.size.anim.speed =
      pJS.tmp.obj.size_anim_speed * pJS.canvas.pxratio;
    pJS.particles.move.speed = pJS.tmp.obj.move_speed * pJS.canvas.pxratio;
    pJS.particles.line_linked.distance =
      pJS.tmp.obj.line_linked_distance * pJS.canvas.pxratio;
    pJS.interactivity.modes.grab.distance =
      pJS.tmp.obj.mode_grab_distance * pJS.canvas.pxratio;
    pJS.interactivity.modes.bubble.distance =
      pJS.tmp.obj.mode_bubble_distance * pJS.canvas.pxratio;
    pJS.particles.line_linked.width =
      pJS.tmp.obj.line_linked_width * pJS.canvas.pxratio;
    pJS.interactivity.modes.bubble.size =
      pJS.tmp.obj.mode_bubble_size * pJS.canvas.pxratio;
    pJS.interactivity.modes.repulse.distance =
      pJS.tmp.obj.mode_repulse_distance * pJS.canvas.pxratio;
  };

  /* ---------- pJS functions - canvas ------------ */

  pJS.fn.canvasInit = function () {
    pJS.canvas.ctx = pJS.canvas.el.getContext("2d");
  };

  pJS.fn.canvasSize = function () {
    pJS.canvas.el.width = pJS.canvas.w;
    pJS.canvas.el.height = pJS.canvas.h;

    if (pJS && pJS.interactivity.events.resize) {
      window.addEventListener("resize", function () {
        pJS.canvas.w = pJS.canvas.el.offsetWidth;
        pJS.canvas.h = pJS.canvas.el.offsetHeight;

        /* resize canvas */
        if (pJS.tmp.retina) {
          pJS.canvas.w *= pJS.canvas.pxratio;
          pJS.canvas.h *= pJS.canvas.pxratio;
        }

        pJS.canvas.el.width = pJS.canvas.w;
        pJS.canvas.el.height = pJS.canvas.h;

        /* repaint canvas on anim disabled */
        if (!pJS.particles.move.enable) {
          pJS.fn.particlesEmpty();
          pJS.fn.particlesCreate();
          pJS.fn.particlesDraw();
          pJS.fn.vendors.densityAutoParticles();
        }

        /* density particles enabled */
        pJS.fn.vendors.densityAutoParticles();
      });
    }
  };

  pJS.fn.canvasPaint = function () {
    pJS.canvas.ctx.fillRect(0, 0, pJS.canvas.w, pJS.canvas.h);
  };

  pJS.fn.canvasClear = function () {
    pJS.canvas.ctx.clearRect(0, 0, pJS.canvas.w, pJS.canvas.h);
  };

  /* --------- pJS functions - particles ----------- */

  pJS.fn.particle = function (color, opacity, position) {
    /* size */
    this.radius =
      (pJS.particles.size.random ? Math.random() : 1) *
      pJS.particles.size.value;
    if (pJS.particles.size.anim.enable) {
      this.size_status = false;
      this.vs = pJS.particles.size.anim.speed / 100;
      if (!pJS.particles.size.anim.sync) {
        this.vs = this.vs * Math.random();
      }
    }

    /* position */
    this.x = position ? position.x : Math.random() * pJS.canvas.w;
    this.y = position ? position.y : Math.random() * pJS.canvas.h;

    /* check position  - into the canvas */
    if (this.x > pJS.canvas.w - this.radius * 2) this.x = this.x - this.radius;
    else if (this.x < this.radius * 2) this.x = this.x + this.radius;
    if (this.y > pJS.canvas.h - this.radius * 2) this.y = this.y - this.radius;
    else if (this.y < this.radius * 2) this.y = this.y + this.radius;

    /* check position - avoid overlap */
    if (pJS.particles.move.bounce) {
      pJS.fn.vendors.checkOverlap(this, position);
    }

    /* color */
    this.color = {};
    if (typeof color.value == "object") {
      if (color.value instanceof Array) {
        var color_selected =
          color.value[
            Math.floor(Math.random() * pJS.particles.color.value.length)
          ];
        this.color.rgb = hexToRgb(color_selected);
      } else {
        if (
          color.value.r != undefined &&
          color.value.g != undefined &&
          color.value.b != undefined
        ) {
          this.color.rgb = {
            r: color.value.r,
            g: color.value.g,
            b: color.value.b,
          };
        }
        if (
          color.value.h != undefined &&
          color.value.s != undefined &&
          color.value.l != undefined
        ) {
          this.color.hsl = {
            h: color.value.h,
            s: color.value.s,
            l: color.value.l,
          };
        }
      }
    } else if (color.value == "random") {
      this.color.rgb = {
        r: Math.floor(Math.random() * (255 - 0 + 1)) + 0,
        g: Math.floor(Math.random() * (255 - 0 + 1)) + 0,
        b: Math.floor(Math.random() * (255 - 0 + 1)) + 0,
      };
    } else if (typeof color.value == "string") {
      this.color = color;
      this.color.rgb = hexToRgb(this.color.value);
    }

    /* opacity */
    this.opacity =
      (pJS.particles.opacity.random ? Math.random() : 1) *
      pJS.particles.opacity.value;
    if (pJS.particles.opacity.anim.enable) {
      this.opacity_status = false;
      this.vo = pJS.particles.opacity.anim.speed / 100;
      if (!pJS.particles.opacity.anim.sync) {
        this.vo = this.vo * Math.random();
      }
    }

    /* animation - velocity for speed */
    var velbase = {};
    switch (pJS.particles.move.direction) {
      case "top":
        velbase = { x: 0, y: -1 };
        break;
      case "top-right":
        velbase = { x: 0.5, y: -0.5 };
        break;
      case "right":
        velbase = { x: 1, y: -0 };
        break;
      case "bottom-right":
        velbase = { x: 0.5, y: 0.5 };
        break;
      case "bottom":
        velbase = { x: 0, y: 1 };
        break;
      case "bottom-left":
        velbase = { x: -0.5, y: 1 };
        break;
      case "left":
        velbase = { x: -1, y: 0 };
        break;
      case "top-left":
        velbase = { x: -0.5, y: -0.5 };
        break;
      default:
        velbase = { x: 0, y: 0 };
        break;
    }

    if (pJS.particles.move.straight) {
      this.vx = velbase.x;
      this.vy = velbase.y;
      if (pJS.particles.move.random) {
        this.vx = this.vx * Math.random();
        this.vy = this.vy * Math.random();
      }
    } else {
      this.vx = velbase.x + Math.random() - 0.5;
      this.vy = velbase.y + Math.random() - 0.5;
    }

    // var theta = 2.0 * Math.PI * Math.random();
    // this.vx = Math.cos(theta);
    // this.vy = Math.sin(theta);

    this.vx_i = this.vx;
    this.vy_i = this.vy;

    /* if shape is image */

    var shape_type = pJS.particles.shape.type;
    if (typeof shape_type == "object") {
      if (shape_type instanceof Array) {
        var shape_selected =
          shape_type[Math.floor(Math.random() * shape_type.length)];
        this.shape = shape_selected;
      }
    } else {
      this.shape = shape_type;
    }

    if (this.shape == "image") {
      var sh = pJS.particles.shape;
      this.img = {
        src: sh.image.src,
        ratio: sh.image.width / sh.image.height,
      };
      if (!this.img.ratio) this.img.ratio = 1;
      if (pJS.tmp.img_type == "svg" && pJS.tmp.source_svg != undefined) {
        pJS.fn.vendors.createSvgImg(this);
        if (pJS.tmp.pushing) {
          this.img.loaded = false;
        }
      }
    }
  };

  pJS.fn.particle.prototype.draw = function () {
    var p = this;

    if (p.radius_bubble != undefined) {
      var radius = p.radius_bubble;
    } else {
      var radius = p.radius;
    }

    if (p.opacity_bubble != undefined) {
      var opacity = p.opacity_bubble;
    } else {
      var opacity = p.opacity;
    }

    if (p.color.rgb) {
      var color_value =
        "rgba(" +
        p.color.rgb.r +
        "," +
        p.color.rgb.g +
        "," +
        p.color.rgb.b +
        "," +
        opacity +
        ")";
    } else {
      var color_value =
        "hsla(" +
        p.color.hsl.h +
        "," +
        p.color.hsl.s +
        "%," +
        p.color.hsl.l +
        "%," +
        opacity +
        ")";
    }

    pJS.canvas.ctx.fillStyle = color_value;
    pJS.canvas.ctx.beginPath();

    switch (p.shape) {
      case "circle":
        pJS.canvas.ctx.arc(p.x, p.y, radius, 0, Math.PI * 2, false);
        break;

      case "edge":
        pJS.canvas.ctx.rect(p.x - radius, p.y - radius, radius * 2, radius * 2);
        break;

      case "triangle":
        pJS.fn.vendors.drawShape(
          pJS.canvas.ctx,
          p.x - radius,
          p.y + radius / 1.66,
          radius * 2,
          3,
          2
        );
        break;

      case "polygon":
        pJS.fn.vendors.drawShape(
          pJS.canvas.ctx,
          p.x - radius / (pJS.particles.shape.polygon.nb_sides / 3.5), // startX
          p.y - radius / (2.66 / 3.5), // startY
          (radius * 2.66) / (pJS.particles.shape.polygon.nb_sides / 3), // sideLength
          pJS.particles.shape.polygon.nb_sides, // sideCountNumerator
          1 // sideCountDenominator
        );
        break;

      case "star":
        pJS.fn.vendors.drawShape(
          pJS.canvas.ctx,
          p.x - (radius * 2) / (pJS.particles.shape.polygon.nb_sides / 4), // startX
          p.y - radius / ((2 * 2.66) / 3.5), // startY
          (radius * 2 * 2.66) / (pJS.particles.shape.polygon.nb_sides / 3), // sideLength
          pJS.particles.shape.polygon.nb_sides, // sideCountNumerator
          2 // sideCountDenominator
        );
        break;

      case "image":
        function draw() {
          pJS.canvas.ctx.drawImage(
            img_obj,
            p.x - radius,
            p.y - radius,
            radius * 2,
            (radius * 2) / p.img.ratio
          );
        }

        if (pJS.tmp.img_type == "svg") {
          var img_obj = p.img.obj;
        } else {
          var img_obj = pJS.tmp.img_obj;
        }

        if (img_obj) {
          draw();
        }

        break;
    }

    pJS.canvas.ctx.closePath();

    if (pJS.particles.shape.stroke.width > 0) {
      pJS.canvas.ctx.strokeStyle = pJS.particles.shape.stroke.color;
      pJS.canvas.ctx.lineWidth = pJS.particles.shape.stroke.width;
      pJS.canvas.ctx.stroke();
    }

    pJS.canvas.ctx.fill();
  };

  pJS.fn.particlesCreate = function () {
    for (var i = 0; i < pJS.particles.number.value; i++) {
      pJS.particles.array.push(
        new pJS.fn.particle(pJS.particles.color, pJS.particles.opacity.value)
      );
    }
  };

  pJS.fn.particlesUpdate = function () {
    for (var i = 0; i < pJS.particles.array.length; i++) {
      /* the particle */
      var p = pJS.particles.array[i];

      // var d = ( dx = pJS.interactivity.mouse.click_pos_x - p.x ) * dx + ( dy = pJS.interactivity.mouse.click_pos_y - p.y ) * dy;
      // var f = -BANG_SIZE / d;
      // if ( d < BANG_SIZE ) {
      //     var t = Math.atan2( dy, dx );
      //     p.vx = f * Math.cos(t);
      //     p.vy = f * Math.sin(t);
      // }

      /* move the particle */
      if (pJS.particles.move.enable) {
        var ms = pJS.particles.move.speed / 2;
        p.x += p.vx * ms;
        p.y += p.vy * ms;
      }

      /* change opacity status */
      if (pJS.particles.opacity.anim.enable) {
        if (p.opacity_status == true) {
          if (p.opacity >= pJS.particles.opacity.value)
            p.opacity_status = false;
          p.opacity += p.vo;
        } else {
          if (p.opacity <= pJS.particles.opacity.anim.opacity_min)
            p.opacity_status = true;
          p.opacity -= p.vo;
        }
        if (p.opacity < 0) p.opacity = 0;
      }

      /* change size */
      if (pJS.particles.size.anim.enable) {
        if (p.size_status == true) {
          if (p.radius >= pJS.particles.size.value) p.size_status = false;
          p.radius += p.vs;
        } else {
          if (p.radius <= pJS.particles.size.anim.size_min)
            p.size_status = true;
          p.radius -= p.vs;
        }
        if (p.radius < 0) p.radius = 0;
      }

      /* change particle position if it is out of canvas */
      if (pJS.particles.move.out_mode == "bounce") {
        var new_pos = {
          x_left: p.radius,
          x_right: pJS.canvas.w,
          y_top: p.radius,
          y_bottom: pJS.canvas.h,
        };
      } else {
        var new_pos = {
          x_left: -p.radius,
          x_right: pJS.canvas.w + p.radius,
          y_top: -p.radius,
          y_bottom: pJS.canvas.h + p.radius,
        };
      }

      if (p.x - p.radius > pJS.canvas.w) {
        p.x = new_pos.x_left;
        p.y = Math.random() * pJS.canvas.h;
      } else if (p.x + p.radius < 0) {
        p.x = new_pos.x_right;
        p.y = Math.random() * pJS.canvas.h;
      }
      if (p.y - p.radius > pJS.canvas.h) {
        p.y = new_pos.y_top;
        p.x = Math.random() * pJS.canvas.w;
      } else if (p.y + p.radius < 0) {
        p.y = new_pos.y_bottom;
        p.x = Math.random() * pJS.canvas.w;
      }

      /* out of canvas modes */
      switch (pJS.particles.move.out_mode) {
        case "bounce":
          if (p.x + p.radius > pJS.canvas.w) p.vx = -p.vx;
          else if (p.x - p.radius < 0) p.vx = -p.vx;
          if (p.y + p.radius > pJS.canvas.h) p.vy = -p.vy;
          else if (p.y - p.radius < 0) p.vy = -p.vy;
          break;
      }

      /* events */
      if (isInArray("grab", pJS.interactivity.events.onhover.mode)) {
        pJS.fn.modes.grabParticle(p);
      }

      if (
        isInArray("bubble", pJS.interactivity.events.onhover.mode) ||
        isInArray("bubble", pJS.interactivity.events.onclick.mode)
      ) {
        pJS.fn.modes.bubbleParticle(p);
      }

      if (
        isInArray("repulse", pJS.interactivity.events.onhover.mode) ||
        isInArray("repulse", pJS.interactivity.events.onclick.mode)
      ) {
        pJS.fn.modes.repulseParticle(p);
      }

      /* interaction auto between particles */
      if (
        pJS.particles.line_linked.enable ||
        pJS.particles.move.attract.enable
      ) {
        for (var j = i + 1; j < pJS.particles.array.length; j++) {
          var p2 = pJS.particles.array[j];

          /* link particles */
          if (pJS.particles.line_linked.enable) {
            pJS.fn.interact.linkParticles(p, p2);
          }

          /* attract particles */
          if (pJS.particles.move.attract.enable) {
            pJS.fn.interact.attractParticles(p, p2);
          }

          /* bounce particles */
          if (pJS.particles.move.bounce) {
            pJS.fn.interact.bounceParticles(p, p2);
          }
        }
      }
    }
  };

  pJS.fn.particlesDraw = function () {
    /* clear canvas */
    pJS.canvas.ctx.clearRect(0, 0, pJS.canvas.w, pJS.canvas.h);

    /* update each particles param */
    pJS.fn.particlesUpdate();

    /* draw each particle */
    for (var i = 0; i < pJS.particles.array.length; i++) {
      var p = pJS.particles.array[i];
      p.draw();
    }
  };

  pJS.fn.particlesEmpty = function () {
    pJS.particles.array = [];
  };

  pJS.fn.particlesRefresh = function () {
    /* init all */
    cancelRequestAnimFrame(pJS.fn.checkAnimFrame);
    cancelRequestAnimFrame(pJS.fn.drawAnimFrame);
    pJS.tmp.source_svg = undefined;
    pJS.tmp.img_obj = undefined;
    pJS.tmp.count_svg = 0;
    pJS.fn.particlesEmpty();
    pJS.fn.canvasClear();

    /* restart */
    pJS.fn.vendors.start();
  };

  /* ---------- pJS functions - particles interaction ------------ */

  pJS.fn.interact.linkParticles = function (p1, p2) {
    var dx = p1.x - p2.x,
      dy = p1.y - p2.y,
      dist = Math.sqrt(dx * dx + dy * dy);

    /* draw a line between p1 and p2 if the distance between them is under the config distance */
    if (dist <= pJS.particles.line_linked.distance) {
      var opacity_line =
        pJS.particles.line_linked.opacity -
        dist /
          (1 / pJS.particles.line_linked.opacity) /
          pJS.particles.line_linked.distance;

      if (opacity_line > 0) {
        /* style */
        var color_line = pJS.particles.line_linked.color_rgb_line;
        pJS.canvas.ctx.strokeStyle =
          "rgba(" +
          color_line.r +
          "," +
          color_line.g +
          "," +
          color_line.b +
          "," +
          opacity_line +
          ")";
        pJS.canvas.ctx.lineWidth = pJS.particles.line_linked.width;
        //pJS.canvas.ctx.lineCap = 'round'; /* performance issue */

        /* path */
        pJS.canvas.ctx.beginPath();
        pJS.canvas.ctx.moveTo(p1.x, p1.y);
        pJS.canvas.ctx.lineTo(p2.x, p2.y);
        pJS.canvas.ctx.stroke();
        pJS.canvas.ctx.closePath();
      }
    }
  };

  pJS.fn.interact.attractParticles = function (p1, p2) {
    /* condensed particles */
    var dx = p1.x - p2.x,
      dy = p1.y - p2.y,
      dist = Math.sqrt(dx * dx + dy * dy);

    if (dist <= pJS.particles.line_linked.distance) {
      var ax = dx / (pJS.particles.move.attract.rotateX * 1000),
        ay = dy / (pJS.particles.move.attract.rotateY * 1000);

      p1.vx -= ax;
      p1.vy -= ay;

      p2.vx += ax;
      p2.vy += ay;
    }
  };

  pJS.fn.interact.bounceParticles = function (p1, p2) {
    var dx = p1.x - p2.x,
      dy = p1.y - p2.y,
      dist = Math.sqrt(dx * dx + dy * dy),
      dist_p = p1.radius + p2.radius;

    if (dist <= dist_p) {
      p1.vx = -p1.vx;
      p1.vy = -p1.vy;

      p2.vx = -p2.vx;
      p2.vy = -p2.vy;
    }
  };

  /* ---------- pJS functions - modes events ------------ */

  pJS.fn.modes.pushParticles = function (nb, pos) {
    pJS.tmp.pushing = true;

    for (var i = 0; i < nb; i++) {
      pJS.particles.array.push(
        new pJS.fn.particle(pJS.particles.color, pJS.particles.opacity.value, {
          x: pos ? pos.pos_x : Math.random() * pJS.canvas.w,
          y: pos ? pos.pos_y : Math.random() * pJS.canvas.h,
        })
      );
      if (i == nb - 1) {
        if (!pJS.particles.move.enable) {
          pJS.fn.particlesDraw();
        }
        pJS.tmp.pushing = false;
      }
    }
  };

  pJS.fn.modes.removeParticles = function (nb) {
    pJS.particles.array.splice(0, nb);
    if (!pJS.particles.move.enable) {
      pJS.fn.particlesDraw();
    }
  };

  pJS.fn.modes.bubbleParticle = function (p) {
    /* on hover event */
    if (
      pJS.interactivity.events.onhover.enable &&
      isInArray("bubble", pJS.interactivity.events.onhover.mode)
    ) {
      var dx_mouse = p.x - pJS.interactivity.mouse.pos_x,
        dy_mouse = p.y - pJS.interactivity.mouse.pos_y,
        dist_mouse = Math.sqrt(dx_mouse * dx_mouse + dy_mouse * dy_mouse),
        ratio = 1 - dist_mouse / pJS.interactivity.modes.bubble.distance;

      function init() {
        p.opacity_bubble = p.opacity;
        p.radius_bubble = p.radius;
      }

      /* mousemove - check ratio */
      if (dist_mouse <= pJS.interactivity.modes.bubble.distance) {
        if (ratio >= 0 && pJS.interactivity.status == "mousemove") {
          /* size */
          if (pJS.interactivity.modes.bubble.size != pJS.particles.size.value) {
            if (
              pJS.interactivity.modes.bubble.size > pJS.particles.size.value
            ) {
              var size = p.radius + pJS.interactivity.modes.bubble.size * ratio;
              if (size >= 0) {
                p.radius_bubble = size;
              }
            } else {
              var dif = p.radius - pJS.interactivity.modes.bubble.size,
                size = p.radius - dif * ratio;
              if (size > 0) {
                p.radius_bubble = size;
              } else {
                p.radius_bubble = 0;
              }
            }
          }

          /* opacity */
          if (
            pJS.interactivity.modes.bubble.opacity !=
            pJS.particles.opacity.value
          ) {
            if (
              pJS.interactivity.modes.bubble.opacity >
              pJS.particles.opacity.value
            ) {
              var opacity = pJS.interactivity.modes.bubble.opacity * ratio;
              if (
                opacity > p.opacity &&
                opacity <= pJS.interactivity.modes.bubble.opacity
              ) {
                p.opacity_bubble = opacity;
              }
            } else {
              var opacity =
                p.opacity -
                (pJS.particles.opacity.value -
                  pJS.interactivity.modes.bubble.opacity) *
                  ratio;
              if (
                opacity < p.opacity &&
                opacity >= pJS.interactivity.modes.bubble.opacity
              ) {
                p.opacity_bubble = opacity;
              }
            }
          }
        }
      } else {
        init();
      }

      /* mouseleave */
      if (pJS.interactivity.status == "mouseleave") {
        init();
      }
    } else if (
      pJS.interactivity.events.onclick.enable &&
      isInArray("bubble", pJS.interactivity.events.onclick.mode)
    ) {
      /* on click event */
      if (pJS.tmp.bubble_clicking) {
        var dx_mouse = p.x - pJS.interactivity.mouse.click_pos_x,
          dy_mouse = p.y - pJS.interactivity.mouse.click_pos_y,
          dist_mouse = Math.sqrt(dx_mouse * dx_mouse + dy_mouse * dy_mouse),
          time_spent =
            (new Date().getTime() - pJS.interactivity.mouse.click_time) / 1000;

        if (time_spent > pJS.interactivity.modes.bubble.duration) {
          pJS.tmp.bubble_duration_end = true;
        }

        if (time_spent > pJS.interactivity.modes.bubble.duration * 2) {
          pJS.tmp.bubble_clicking = false;
          pJS.tmp.bubble_duration_end = false;
        }
      }

      function process(bubble_param, particles_param, p_obj_bubble, p_obj, id) {
        if (bubble_param != particles_param) {
          if (!pJS.tmp.bubble_duration_end) {
            if (dist_mouse <= pJS.interactivity.modes.bubble.distance) {
              if (p_obj_bubble != undefined) var obj = p_obj_bubble;
              else var obj = p_obj;
              if (obj != bubble_param) {
                var value =
                  p_obj -
                  (time_spent * (p_obj - bubble_param)) /
                    pJS.interactivity.modes.bubble.duration;
                if (id == "size") p.radius_bubble = value;
                if (id == "opacity") p.opacity_bubble = value;
              }
            } else {
              if (id == "size") p.radius_bubble = undefined;
              if (id == "opacity") p.opacity_bubble = undefined;
            }
          } else {
            if (p_obj_bubble != undefined) {
              var value_tmp =
                  p_obj -
                  (time_spent * (p_obj - bubble_param)) /
                    pJS.interactivity.modes.bubble.duration,
                dif = bubble_param - value_tmp;
              value = bubble_param + dif;
              if (id == "size") p.radius_bubble = value;
              if (id == "opacity") p.opacity_bubble = value;
            }
          }
        }
      }

      if (pJS.tmp.bubble_clicking) {
        /* size */
        process(
          pJS.interactivity.modes.bubble.size,
          pJS.particles.size.value,
          p.radius_bubble,
          p.radius,
          "size"
        );
        /* opacity */
        process(
          pJS.interactivity.modes.bubble.opacity,
          pJS.particles.opacity.value,
          p.opacity_bubble,
          p.opacity,
          "opacity"
        );
      }
    }
  };

  pJS.fn.modes.repulseParticle = function (p) {
    if (
      pJS.interactivity.events.onhover.enable &&
      isInArray("repulse", pJS.interactivity.events.onhover.mode) &&
      pJS.interactivity.status == "mousemove"
    ) {
      var dx_mouse = p.x - pJS.interactivity.mouse.pos_x,
        dy_mouse = p.y - pJS.interactivity.mouse.pos_y,
        dist_mouse = Math.sqrt(dx_mouse * dx_mouse + dy_mouse * dy_mouse);

      var normVec = { x: dx_mouse / dist_mouse, y: dy_mouse / dist_mouse },
        repulseRadius = pJS.interactivity.modes.repulse.distance,
        velocity = 100,
        repulseFactor = clamp(
          (1 / repulseRadius) *
            (-1 * Math.pow(dist_mouse / repulseRadius, 2) + 1) *
            repulseRadius *
            velocity,
          0,
          50
        );

      var pos = {
        x: p.x + normVec.x * repulseFactor,
        y: p.y + normVec.y * repulseFactor,
      };

      if (pJS.particles.move.out_mode == "bounce") {
        if (pos.x - p.radius > 0 && pos.x + p.radius < pJS.canvas.w)
          p.x = pos.x;
        if (pos.y - p.radius > 0 && pos.y + p.radius < pJS.canvas.h)
          p.y = pos.y;
      } else {
        p.x = pos.x;
        p.y = pos.y;
      }
    } else if (
      pJS.interactivity.events.onclick.enable &&
      isInArray("repulse", pJS.interactivity.events.onclick.mode)
    ) {
      if (!pJS.tmp.repulse_finish) {
        pJS.tmp.repulse_count++;
        if (pJS.tmp.repulse_count == pJS.particles.array.length) {
          pJS.tmp.repulse_finish = true;
        }
      }

      if (pJS.tmp.repulse_clicking) {
        var repulseRadius = Math.pow(
          pJS.interactivity.modes.repulse.distance / 6,
          3
        );

        var dx = pJS.interactivity.mouse.click_pos_x - p.x,
          dy = pJS.interactivity.mouse.click_pos_y - p.y,
          d = dx * dx + dy * dy;

        var force = (-repulseRadius / d) * 1;

        function process() {
          var f = Math.atan2(dy, dx);
          p.vx = force * Math.cos(f);
          p.vy = force * Math.sin(f);

          if (pJS.particles.move.out_mode == "bounce") {
            var pos = {
              x: p.x + p.vx,
              y: p.y + p.vy,
            };
            if (pos.x + p.radius > pJS.canvas.w) p.vx = -p.vx;
            else if (pos.x - p.radius < 0) p.vx = -p.vx;
            if (pos.y + p.radius > pJS.canvas.h) p.vy = -p.vy;
            else if (pos.y - p.radius < 0) p.vy = -p.vy;
          }
        }

        // default
        if (d <= repulseRadius) {
          process();
        }

        // bang - slow motion mode
        // if(!pJS.tmp.repulse_finish){
        //   if(d <= repulseRadius){
        //     process();
        //   }
        // }else{
        //   process();
        // }
      } else {
        if (pJS.tmp.repulse_clicking == false) {
          p.vx = p.vx_i;
          p.vy = p.vy_i;
        }
      }
    }
  };

  pJS.fn.modes.grabParticle = function (p) {
    if (
      pJS.interactivity.events.onhover.enable &&
      pJS.interactivity.status == "mousemove"
    ) {
      var dx_mouse = p.x - pJS.interactivity.mouse.pos_x,
        dy_mouse = p.y - pJS.interactivity.mouse.pos_y,
        dist_mouse = Math.sqrt(dx_mouse * dx_mouse + dy_mouse * dy_mouse);

      /* draw a line between the cursor and the particle if the distance between them is under the config distance */
      if (dist_mouse <= pJS.interactivity.modes.grab.distance) {
        var opacity_line =
          pJS.interactivity.modes.grab.line_linked.opacity -
          dist_mouse /
            (1 / pJS.interactivity.modes.grab.line_linked.opacity) /
            pJS.interactivity.modes.grab.distance;

        if (opacity_line > 0) {
          /* style */
          var color_line = pJS.particles.line_linked.color_rgb_line;
          pJS.canvas.ctx.strokeStyle =
            "rgba(" +
            color_line.r +
            "," +
            color_line.g +
            "," +
            color_line.b +
            "," +
            opacity_line +
            ")";
          pJS.canvas.ctx.lineWidth = pJS.particles.line_linked.width;
          //pJS.canvas.ctx.lineCap = 'round'; /* performance issue */

          /* path */
          pJS.canvas.ctx.beginPath();
          pJS.canvas.ctx.moveTo(p.x, p.y);
          pJS.canvas.ctx.lineTo(
            pJS.interactivity.mouse.pos_x,
            pJS.interactivity.mouse.pos_y
          );
          pJS.canvas.ctx.stroke();
          pJS.canvas.ctx.closePath();
        }
      }
    }
  };

  /* ---------- pJS functions - vendors ------------ */

  pJS.fn.vendors.eventsListeners = function () {
    /* events target element */
    if (pJS.interactivity.detect_on == "window") {
      pJS.interactivity.el = window;
    } else {
      pJS.interactivity.el = pJS.canvas.el;
    }

    /* detect mouse pos - on hover / click event */
    if (
      pJS.interactivity.events.onhover.enable ||
      pJS.interactivity.events.onclick.enable
    ) {
      /* el on mousemove */
      pJS.interactivity.el.addEventListener("mousemove", function (e) {
        if (pJS.interactivity.el == window) {
          var pos_x = e.clientX,
            pos_y = e.clientY;
        } else {
          var pos_x = e.offsetX || e.clientX,
            pos_y = e.offsetY || e.clientY;
        }

        pJS.interactivity.mouse.pos_x = pos_x;
        pJS.interactivity.mouse.pos_y = pos_y;

        if (pJS.tmp.retina) {
          pJS.interactivity.mouse.pos_x *= pJS.canvas.pxratio;
          pJS.interactivity.mouse.pos_y *= pJS.canvas.pxratio;
        }

        pJS.interactivity.status = "mousemove";
      });

      /* el on onmouseleave */
      pJS.interactivity.el.addEventListener("mouseleave", function (e) {
        pJS.interactivity.mouse.pos_x = null;
        pJS.interactivity.mouse.pos_y = null;
        pJS.interactivity.status = "mouseleave";
      });
    }

    /* on click event */
    if (pJS.interactivity.events.onclick.enable) {
      pJS.interactivity.el.addEventListener("click", function () {
        pJS.interactivity.mouse.click_pos_x = pJS.interactivity.mouse.pos_x;
        pJS.interactivity.mouse.click_pos_y = pJS.interactivity.mouse.pos_y;
        pJS.interactivity.mouse.click_time = new Date().getTime();

        if (pJS.interactivity.events.onclick.enable) {
          switch (pJS.interactivity.events.onclick.mode) {
            case "push":
              if (pJS.particles.move.enable) {
                pJS.fn.modes.pushParticles(
                  pJS.interactivity.modes.push.particles_nb,
                  pJS.interactivity.mouse
                );
              } else {
                if (pJS.interactivity.modes.push.particles_nb == 1) {
                  pJS.fn.modes.pushParticles(
                    pJS.interactivity.modes.push.particles_nb,
                    pJS.interactivity.mouse
                  );
                } else if (pJS.interactivity.modes.push.particles_nb > 1) {
                  pJS.fn.modes.pushParticles(
                    pJS.interactivity.modes.push.particles_nb
                  );
                }
              }
              break;

            case "remove":
              pJS.fn.modes.removeParticles(
                pJS.interactivity.modes.remove.particles_nb
              );
              break;

            case "bubble":
              pJS.tmp.bubble_clicking = true;
              break;

            case "repulse":
              pJS.tmp.repulse_clicking = true;
              pJS.tmp.repulse_count = 0;
              pJS.tmp.repulse_finish = false;
              setTimeout(function () {
                pJS.tmp.repulse_clicking = false;
              }, pJS.interactivity.modes.repulse.duration * 1000);
              break;
          }
        }
      });
    }
  };

  pJS.fn.vendors.densityAutoParticles = function () {
    if (pJS.particles.number.density.enable) {
      /* calc area */
      var area = (pJS.canvas.el.width * pJS.canvas.el.height) / 1000;
      if (pJS.tmp.retina) {
        area = area / (pJS.canvas.pxratio * 2);
      }

      /* calc number of particles based on density area */
      var nb_particles =
        (area * pJS.particles.number.value) /
        pJS.particles.number.density.value_area;

      /* add or remove X particles */
      var missing_particles = pJS.particles.array.length - nb_particles;
      if (missing_particles < 0)
        pJS.fn.modes.pushParticles(Math.abs(missing_particles));
      else pJS.fn.modes.removeParticles(missing_particles);
    }
  };

  pJS.fn.vendors.checkOverlap = function (p1, position) {
    for (var i = 0; i < pJS.particles.array.length; i++) {
      var p2 = pJS.particles.array[i];

      var dx = p1.x - p2.x,
        dy = p1.y - p2.y,
        dist = Math.sqrt(dx * dx + dy * dy);

      if (dist <= p1.radius + p2.radius) {
        p1.x = position ? position.x : Math.random() * pJS.canvas.w;
        p1.y = position ? position.y : Math.random() * pJS.canvas.h;
        pJS.fn.vendors.checkOverlap(p1);
      }
    }
  };

  pJS.fn.vendors.createSvgImg = function (p) {
    /* set color to svg element */
    var svgXml = pJS.tmp.source_svg,
      rgbHex = /#([0-9A-F]{3,6})/gi,
      coloredSvgXml = svgXml.replace(rgbHex, function (m, r, g, b) {
        if (p.color.rgb) {
          var color_value =
            "rgba(" +
            p.color.rgb.r +
            "," +
            p.color.rgb.g +
            "," +
            p.color.rgb.b +
            "," +
            p.opacity +
            ")";
        } else {
          var color_value =
            "hsla(" +
            p.color.hsl.h +
            "," +
            p.color.hsl.s +
            "%," +
            p.color.hsl.l +
            "%," +
            p.opacity +
            ")";
        }
        return color_value;
      });

    /* prepare to create img with colored svg */
    var svg = new Blob([coloredSvgXml], {
        type: "image/svg+xml;charset=utf-8",
      }),
      DOMURL = window.URL || window.webkitURL || window,
      url = DOMURL.createObjectURL(svg);

    /* create particle img obj */
    var img = new Image();
    img.addEventListener("load", function () {
      p.img.obj = img;
      p.img.loaded = true;
      DOMURL.revokeObjectURL(url);
      pJS.tmp.count_svg++;
    });
    img.src = url;
  };

  pJS.fn.vendors.destroypJS = function () {
    cancelAnimationFrame(pJS.fn.drawAnimFrame);
    canvas_el.remove();
    pJSDom = null;
  };

  pJS.fn.vendors.drawShape = function (
    c,
    startX,
    startY,
    sideLength,
    sideCountNumerator,
    sideCountDenominator
  ) {
    // By Programming Thomas - https://programmingthomas.wordpress.com/2013/04/03/n-sided-shapes/
    var sideCount = sideCountNumerator * sideCountDenominator;
    var decimalSides = sideCountNumerator / sideCountDenominator;
    var interiorAngleDegrees = (180 * (decimalSides - 2)) / decimalSides;
    var interiorAngle = Math.PI - (Math.PI * interiorAngleDegrees) / 180; // convert to radians
    c.save();
    c.beginPath();
    c.translate(startX, startY);
    c.moveTo(0, 0);
    for (var i = 0; i < sideCount; i++) {
      c.lineTo(sideLength, 0);
      c.translate(sideLength, 0);
      c.rotate(interiorAngle);
    }
    //c.stroke();
    c.fill();
    c.restore();
  };

  pJS.fn.vendors.exportImg = function () {
    window.open(pJS.canvas.el.toDataURL("image/png"), "_blank");
  };

  pJS.fn.vendors.loadImg = function (type) {
    pJS.tmp.img_error = undefined;

    if (pJS.particles.shape.image.src != "") {
      if (type == "svg") {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", pJS.particles.shape.image.src);
        xhr.onreadystatechange = function (data) {
          if (xhr.readyState == 4) {
            if (xhr.status == 200) {
              pJS.tmp.source_svg = data.currentTarget.response;
              pJS.fn.vendors.checkBeforeDraw();
            } else {
              console.log("Error pJS - Image not found");
              pJS.tmp.img_error = true;
            }
          }
        };
        xhr.send();
      } else {
        var img = new Image();
        img.addEventListener("load", function () {
          pJS.tmp.img_obj = img;
          pJS.fn.vendors.checkBeforeDraw();
        });
        img.src = pJS.particles.shape.image.src;
      }
    } else {
      console.log("Error pJS - No image.src");
      pJS.tmp.img_error = true;
    }
  };

  pJS.fn.vendors.draw = function () {
    if (pJS.particles.shape.type == "image") {
      if (pJS.tmp.img_type == "svg") {
        if (pJS.tmp.count_svg >= pJS.particles.number.value) {
          pJS.fn.particlesDraw();
          if (!pJS.particles.move.enable)
            cancelRequestAnimFrame(pJS.fn.drawAnimFrame);
          else pJS.fn.drawAnimFrame = requestAnimFrame(pJS.fn.vendors.draw);
        } else {
          //console.log('still loading...');
          if (!pJS.tmp.img_error)
            pJS.fn.drawAnimFrame = requestAnimFrame(pJS.fn.vendors.draw);
        }
      } else {
        if (pJS.tmp.img_obj != undefined) {
          pJS.fn.particlesDraw();
          if (!pJS.particles.move.enable)
            cancelRequestAnimFrame(pJS.fn.drawAnimFrame);
          else pJS.fn.drawAnimFrame = requestAnimFrame(pJS.fn.vendors.draw);
        } else {
          if (!pJS.tmp.img_error)
            pJS.fn.drawAnimFrame = requestAnimFrame(pJS.fn.vendors.draw);
        }
      }
    } else {
      pJS.fn.particlesDraw();
      if (!pJS.particles.move.enable)
        cancelRequestAnimFrame(pJS.fn.drawAnimFrame);
      else pJS.fn.drawAnimFrame = requestAnimFrame(pJS.fn.vendors.draw);
    }
  };

  pJS.fn.vendors.checkBeforeDraw = function () {
    // if shape is image
    if (pJS.particles.shape.type == "image") {
      if (pJS.tmp.img_type == "svg" && pJS.tmp.source_svg == undefined) {
        pJS.tmp.checkAnimFrame = requestAnimFrame(check);
      } else {
        //console.log('images loaded! cancel check');
        cancelRequestAnimFrame(pJS.tmp.checkAnimFrame);
        if (!pJS.tmp.img_error) {
          pJS.fn.vendors.init();
          pJS.fn.vendors.draw();
        }
      }
    } else {
      pJS.fn.vendors.init();
      pJS.fn.vendors.draw();
    }
  };

  pJS.fn.vendors.init = function () {
    /* init canvas + particles */
    pJS.fn.retinaInit();
    pJS.fn.canvasInit();
    pJS.fn.canvasSize();
    pJS.fn.canvasPaint();
    pJS.fn.particlesCreate();
    pJS.fn.vendors.densityAutoParticles();

    /* particles.line_linked - convert hex colors to rgb */
    pJS.particles.line_linked.color_rgb_line = hexToRgb(
      pJS.particles.line_linked.color
    );
  };

  pJS.fn.vendors.start = function () {
    if (isInArray("image", pJS.particles.shape.type)) {
      pJS.tmp.img_type = pJS.particles.shape.image.src.substr(
        pJS.particles.shape.image.src.length - 3
      );
      pJS.fn.vendors.loadImg(pJS.tmp.img_type);
    } else {
      pJS.fn.vendors.checkBeforeDraw();
    }
  };

  /* ---------- pJS - start ------------ */

  pJS.fn.vendors.eventsListeners();

  pJS.fn.vendors.start();
};

/* ---------- global functions - vendors ------------ */

Object.deepExtend = function (destination, source) {
  for (var property in source) {
    if (
      source[property] &&
      source[property].constructor &&
      source[property].constructor === Object
    ) {
      destination[property] = destination[property] || {};
      arguments.callee(destination[property], source[property]);
    } else {
      destination[property] = source[property];
    }
  }
  return destination;
};

window.requestAnimFrame = (function () {
  return (
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function (callback) {
      window.setTimeout(callback, 1000 / 60);
    }
  );
})();

window.cancelRequestAnimFrame = (function () {
  return (
    window.cancelAnimationFrame ||
    window.webkitCancelRequestAnimationFrame ||
    window.mozCancelRequestAnimationFrame ||
    window.oCancelRequestAnimationFrame ||
    window.msCancelRequestAnimationFrame ||
    clearTimeout
  );
})();

function hexToRgb(hex) {
  // By Tim Down - http://stackoverflow.com/a/5624139/3493650
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function (m, r, g, b) {
    return r + r + g + g + b + b;
  });
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

function clamp(number, min, max) {
  return Math.min(Math.max(number, min), max);
}

function isInArray(value, array) {
  return array.indexOf(value) > -1;
}

/* ---------- particles.js functions - start ------------ */

window.pJSDom = [];

window.particlesJS = function (tag_id, params) {
  //console.log(params);

  /* no string id? so it's object params, and set the id with default id */
  if (typeof tag_id != "string") {
    params = tag_id;
    tag_id = "particles-js";
  }

  /* no id? set the id to default id */
  if (!tag_id) {
    tag_id = "particles-js";
  }

  /* pJS elements */
  var pJS_tag = document.getElementById(tag_id),
    pJS_canvas_class = "particles-js-canvas-el",
    exist_canvas = pJS_tag.getElementsByClassName(pJS_canvas_class);

  /* remove canvas if exists into the pJS target tag */
  if (exist_canvas.length) {
    while (exist_canvas.length > 0) {
      pJS_tag.removeChild(exist_canvas[0]);
    }
  }

  /* create canvas element */
  var canvas_el = document.createElement("canvas");
  canvas_el.className = pJS_canvas_class;

  /* set size canvas */
  canvas_el.style.width = "100%";
  canvas_el.style.height = "100%";

  /* append canvas */
  var canvas = document.getElementById(tag_id).appendChild(canvas_el);

  /* launch particle.js */
  if (canvas != null) {
    pJSDom.push(new pJS(tag_id, params));
  }
};

window.particlesJS.load = function (tag_id, path_config_json, callback) {
  /* load json config */
  var xhr = new XMLHttpRequest();
  xhr.open("GET", path_config_json);
  xhr.onreadystatechange = function (data) {
    if (xhr.readyState == 4) {
      if (xhr.status == 200) {
        var params = JSON.parse(data.currentTarget.response);
        window.particlesJS(tag_id, params);
        if (callback) callback();
      } else {
        console.log("Error pJS - XMLHttpRequest status: " + xhr.status);
        console.log("Error pJS - File config not found");
      }
    }
  };
  xhr.send();
};
