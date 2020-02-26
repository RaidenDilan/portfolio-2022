PIXI.utils.skipHello();

var BreakPoints = BreakPoints || {};

BreakPoints = {
  MajorBreakPoints: {
    A: 0,
    B: 1,
    C: 2,
    D: 3
  },
  currentMajorBreakPoint: () => {
    return window.innerWidth <= 580 ?
      BreakPoints.MajorBreakPoints.A :
      window.innerWidth <= 768 ?
        BreakPoints.MajorBreakPoints.B :
        window.innerWidth <= 1280 ?
          BreakPoints.MajorBreakPoints.C :
          BreakPoints.MajorBreakPoints.D;
  }
};

var UserAgent = UserAgent || {};

UserAgent = {
  internetExplorer: !1,
  edge: !1,
  iOS: !1,
  android: !1,
  string: '',
  init: () => {
    UserAgent.string = window.navigator.userAgent;
    var a = UserAgent.string;

    UserAgent.iOS = a.match(/iPhone|iPad|iPod/i);
    UserAgent.iOS || (
      UserAgent.android = a.match(/Android/i),
      UserAgent.android || (
        UserAgent.edge = a.indexOf('Edge/') > 0,
        UserAgent.edge || (
          UserAgent.internetExplorer = a.indexOf('Trident/') > 0 || a.indexOf('MSIE ') > 0
        )
      )
    );
  },
  isMobile: () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }
};

var Theme = Theme || {};

Theme = {
  showLightButtonStyle: () => {
    Menu.button.classList.add('light');
    Menu.social.classList.add('light');
    Menu.logo.classList.add('light');
    // Site.about.classList.add('light');
    // Site.contact.classList.add('light');
    // Site.about.style.display   = 'none';
    // Site.contact.style.display = 'none';
    TweenMax.set(Site.about, { display: 'none' });
    TweenMax.set(Site.contact, { display: 'none' });
  },
  showDarkButtonStyle: () => {
    Menu.button.classList.remove('light');
    Menu.social.classList.remove('light');
    Menu.logo.classList.remove('light');
    // Site.about.classList.remove('light');
    // Site.contact.classList.remove('light');
    // Site.about.style.display   = 'block';
    // Site.contact.style.display = 'block';
    TweenMax.set(Site.about, { display: 'block' });
    TweenMax.set(Site.contact, { display: 'block' });
  }
};

var AboutRAFs = AboutRAFs || {};

AboutRAFs = {
  theRafAbout: void 0,
  init: () => {
    AboutRAFs.theRafAbout = requestAnimationFrame(AboutRAFs.init);
    AboutRAFs.updateRotation();
    AboutRAFs.updateScaleX();
  },
  updateRotation: () => {
    if (Site.scrolling !== null) {
      TweenMax.to('#inner_svg', 1, { rotation: Math.ceil(-Site.scrolling.vars.current / 4), ease: Linear.easeNone });
      TweenMax.to('#inner_svg img', 1, { rotation: Math.ceil(Site.scrolling.vars.current / 4), ease: Linear.easeNone });

      Math.abs((Site.scrolling.vars.current - Site.deltaScroll) / 200 + 1) < 2.2 ?
        Site.intensity = Math.abs((Site.scrolling.vars.current - Site.deltaScroll) / 200 + 1) :
        Site.intensity = 2.2;

      Site.deltaScroll = Site.scrolling.vars.current;
    }
    else {
      TweenMax.to('#inner_svg', 1, { rotation: -window.pageYOffset / 4, ease: Linear.easeNone });
      TweenMax.to('#inner_svg img', 1, { rotation: window.pageYOffset / 4, ease: Linear.easeNone });

      Math.abs((window.pageYOffset - Site.deltaScroll) / 200 + 1) < 2.2 ?
        Site.intensity = Math.abs((window.pageYOffset - Site.deltaScroll) / 200 + 1) :
        Site.intensity = 2.2;

      Site.deltaScroll = window.pageYOffset;
    }
  },
  updateScaleX: () => {
    if (!UserAgent.iOS) {
      TweenMax.to('.scaleA', 1.4, {
        scaleX: Site.intensity,
        ease: Power2.easeOut,
        onUpdate: () => console.log('onUpdate :: cancelAnimationFrame(AboutRAFs.theRafAbout) --->'),
        onComplete: () => console.log('onComplete :: cancelAnimationFrame(AboutRAFs.theRafAbout) --->')
      });
    }
  },
  skills: () => {
    /* DOM Elements */
    // const button = document.querySelector('.js-button');
    const circle = document.querySelector('.js-circle');
    const skills = document.querySelectorAll('.js-circle');
    const text = document.querySelector('.js-text');

    /* Circle radius, diameter and offset function */
    const radius = circle.getAttribute('r');
    const diameter = Math.round(Math.PI * radius * 2);

    const getOffset = (val = 0) => {
      Math.round((100 - val) / 100 * diameter);
    };

    /* Generate random number and set offset and percentage || get circle stroke-dashoffset value */
    const run = (element) => {
      // const val = Math.floor(Math.random() * 100);
      const val = element.getAttribute('stroke-dashoffset');

      // element.style.setProperty('--strokeDashOffset', val);
      // const val = Math.floor(circle.getAttribute('stroke-dashoffset'));
      circle.style.strokeDashoffset = getOffset(val);
      // text.textContent = `${val}%`;
    };

    /* Event listeners */
    // button.addEventListener('click', run);

    skills.forEach((element) => setTimeout(run(element), 10));
  }
};

var Throttle = Throttle || {};

Throttle = {
  throttleEvents: (listener, delay) => {
    /*
    * Generates an event listener wrapper function
    * that will only run the main listener
    * if there has been a given delay (in ms)
    * since the last time the event was triggered.
    */
    var timeout;

    return function(event) {
      if (timeout) cancelAnimationFrame(timeout);
      timeout = requestAnimationFrame(listener, delay, event);
    };
  },
  actThenThrottleEvents: (listener, delay) => {
    /*
    * Generates an event listener wrapper function
    * that will prevent the main listener from running
    * if it has previously run within the given delay (in ms).
    */
    var timeout;

    return function(event) {
      if (!timeout) { // no timer running
        listener(event); // run the function
        timeout = requestAnimationFrame(() => timeout = null, delay); // start a timer that turns itself off when it's done
      }
      // else, do nothing (we're in a throttling stage)
    };
  }
};

var MenuPixi = MenuPixi || {};

MenuPixi = {
  rafPixiMenu: void 0,
  init: () => {
    MenuPixi.rafPixiMenu = requestAnimationFrame(MenuPixi.init);
    Site.rendererMenu.render(Site.stageMenu);
    Site.displacementSprite3.x += 2;
    MenuPixi.calculateMousePosition();
    MenuPixi.updateNavLinksPos();
    if (window.innerWidth > 767) MenuPixi.updatePixiDisplacement();
    Site.deltaMenu = Site.theDeltaMenu;
  },
  calculateMousePosition: () => {
    Math.abs((Site.theDeltaMenu - Site.deltaMenu) / 200 + 1) < 1.8 ?
      Site.intensity = Math.abs((Site.theDeltaMenu - Site.deltaMenu) / 200 + 1) :
      Site.intensity = 1.8;
  },
  updateNavLinksPos: () => {
    if (!UserAgent.iOS) {
      Site.cursorPercentage = Math.round(Site.currentMousePos.y * 100 / window.innerHeight * 100) / 100;
      Site.theDeltaMenu = Site.currentMousePos.y;
      let expression = -1 * (Site.menuHeight - window.innerHeight) / window.innerHeight * Site.currentMousePos.y;
      TweenMax.to('#the_menu', 1.4, { y: expression + 'px', scaleY: Site.intensity, ease: Power2.easeOut });
    }
    else {
      Site.cursorPercentage = window.pageYOffset * 100 / (Site.menuHeight - window.innerHeight);
      Site.theDeltaMenu = window.pageYOffset;
      TweenMax.to('#the_menu', 1.4, { scaleY: Site.intensity, ease: Power2.easeOut });
    }
  },
  updatePixiDisplacement: () => {
    if (Site.cursorPercentage > Site.heightMargin && Site.cursorPercentage < (100 - Site.heightMargin)) document.querySelectorAll('#the_menu li').forEach(Site.checkMenu);
    Site.displace.intensity = Site.displacementFilter3.scale.x;
    TweenMax.to(Site.displace, 0.3, {
      intensity: 4 * (Site.theDeltaMenu - Site.deltaMenu),
      onUpdate: () => {
        Site.displacementFilter3.scale.x = Site.displace.intensity;
      },
      ease: Linear.easeNone
    });
  }
};

var Menu = Menu || {};

Menu = {
  isOpen: !1,
  button: null,
  arrowHidingTimeout: void 0,
  init: () => {
    Menu.button = document.querySelector('.projects');
    Menu.logo = document.querySelector('.projects');
    Menu.navMenu = document.getElementById('menu');
    Menu.social = document.getElementById('social');
    // Menu.button.classList.toggle('opened');
    Menu.button.isArrow = !1;
    cancelAnimationFrame(MenuPixi.rafPixiMenu); // Fixes issue where when click on nav menu links when it is opened, pixi repple efffect doesn't intitiate due to bollean property set on INIT();
  },
  open: () => {
    Menu.isOpen = !0; // true
    Menu.button.classList.remove('closing');

    Drag.cursorMain.classList.remove('vertical_scroll');
    Drag.cursorJunior.classList.remove('vertical_scroll');

    if (Site.scrolling !== null) Site.scrolling.off();
    else Site.scrollMenuOpen = window.pageYOffset;

    document.querySelectorAll('.front.point3, .front .point3').forEach((obj) => obj.classList.add('black'));
    document.getElementById('menu').style.display = 'block';

    // TweenMax.to('.feature1', 0.2, { scaleY: 0, delay: 0.2, ease: Power2.easeIn });

    TweenMax.to('#main', 0.2, {
      opacity: 0,
      display: 'none',
      ease: Power2.easeIn,
      onComplete: () => {
        if (UserAgent.iOS) {
          window.scrollTo(Site.scrollMenuOpen, 0);
          document.getElementById('main').classList.add('black');
          Site.body.classList.add('temp');
        }
      }
    });

    TweenMax.to('#menu', 0.2, { opacity: 1, delay: 0.2, ease: Power2.easeOut });

    Site.menuHeight = document.getElementById('the_menu').clientHeight;
    Site.margins = window.innerHeight / 2 - 70;
    Site.heightMargin = Math.round((100 - (Site.menuHeight - 2 * Site.margins) * 100 / Site.menuHeight) / 2 * 100) / 100;
    Site.menuEntrance = document.getElementById('the_menu').querySelectorAll('li').length;
    Site.entranceHeight = Math.round((100 - 2 * Site.heightMargin) / Site.menuEntrance * 100) / 100;

    Site.stageMenu.addChild(Site.displacementSprite3);

    /* image_menu0 returned by PixiJS */
    // eslint-disable-next-line camelcase
    var imageSprite = image_menu0;

    Site.stageMenu.addChild(imageSprite);
    imageSprite.alpha = 1;

    cancelAnimationFrame(Site.rafPixiHome);
    cancelAnimationFrame(Site.rafPixiSingle);
    cancelAnimationFrame(AboutRAFs.theRafAbout);

    MenuPixi.init();
  },
  close: () => {
    Menu.isOpen = !1; // Means : false
    Menu.button.classList.add('closing');

    setTimeout(() => Menu.button.classList.remove('closing'), 1250); // delay is unusally long

    if (Site.scrolling !== null) Site.scrolling.on();
    if (Site.body.classList.contains('home')) document.querySelectorAll('.front.point3, .front .point3').forEach((obj) => obj.classList.remove('black'));

    TweenMax.to('#menu', 0.2, {
      opacity: 0,
      ease: Power2.easeIn,
      onComplete: () => {
        document.getElementById('menu').style.display = 'none';

        if (UserAgent.iOS) {
          document.getElementById('main').classList.remove('black');
          Site.body.classList.remove('temp');
          window.scrollTo(Site.scrollMenuOpen, 0); // --- OR --- equivalent of => window.scrollTo({ top: Site.scrollMenuOpen, left: 0});
        }
      }
    });

    TweenMax.to('#main', 0.2, { opacity: 1, display: 'block', delay: 0.2, ease: Power2.easeOut });
    // TweenMax.to('.feature1', 0.2, { scaleY: 1, delay: 0.2, ease: Power2.easeIn });

    Site.stageMenu.removeChildren();
    cancelAnimationFrame(MenuPixi.rafPixiMenu); // do not remove

    if (document.querySelector('body').classList.contains('home')) Site.homePixi();
    else if (document.querySelector('body').classList.contains('single')) Site.singlePixi();
    // if (Site.body.classList.contains('home')) Site.homePixi();
    // else if (Site.body.classList.contains('single')) Site.singlePixi();

    if (Site.body.classList.contains('about')) AboutRAFs.init();
  },
  showArrow: () => {
    Menu.button.isArrow || (Menu.button.isArrow = !0);
    Menu.button.classList.remove('arrow-transition-out');
    Menu.button.classList.add('arrow-transition-in');

    if (Menu.arrowHidingTimeout) {
      clearTimeout(Menu.arrowHidingTimeout);
      Menu.arrowHidingTimeout = null;
    }
  },
  hideArrow: () => {
    Menu.button.isArrow && (Menu.button.isArrow = !1);

    if (Menu.button.classList.contains('arrow-transition-in')) {
      Menu.button.classList.remove('arrow-transition-in');
      Menu.button.classList.add('arrow-transition-out');

      Menu.arrowHidingTimeout = setTimeout(() => {
        Menu.button.classList.remove('arrow-transition-out');
        Menu.arrowHidingTimeout = void 0;
      }, 500);
    }
  },
  // REFACTOR METHODS BELLOW...
  arrowUpdateHandler: () => {
    // return Site.scrolling && Site.scrolling.vars.target >= 10 ? Menu.showArrow() : Menu.hideArrow();
    return Site.scrolling && Site.scrolling.vars.target >= 10 ?
      Menu.showArrow() :
      Site.scrolling.vars.target <= 10 ?
        Menu.hideArrow() :
        false;
  },
  showHideArrow: () => {
    if (!Menu.button.classList.contains('opened')) {
      if (!UserAgent.iOS) {
        if (Site.body.classList.contains('single')) {
          Menu.arrowUpdateHandler();
          Site.footerInView();
        }
        else if (Site.body.classList.contains('about')) Menu.arrowUpdateHandler();
      }
      else {
        if (Site.body.classList.contains('single')) {
          window.pageYOffset >= 10 ?
            Menu.showArrow() :
            window.pageYOffset <= 10 ?
              Menu.hideArrow() :
              console.log('showHideArrow => default action required'); // --- OR --- return Menu.hideArrow() as final block statement

          window.innerHeight + Math.round(window.pageYOffset) >= (document.body.offsetHeight - 34) ?
            Theme.showLightButtonStyle() :
            Theme.showDarkButtonStyle();
        }
        else if (Site.body.classList.contains('about')) window.pageYOffset >= 10 ? Menu.showArrow() : Menu.hideArrow();
      }
    }
  }
};

var Drag = Drag || {};

Drag = {
  isDown: false,
  threshold: 100,
  isDrag: !0,
  isScroll: !0,
  init: () => {
    Drag.cursorMain = document.getElementsByClassName('cursor_main')[0];
    Drag.cursorJunior = document.getElementsByClassName('cursor_junior')[0];
  },
  start: (event) => {
    /* homePixi mouse/touch : drag events */
    Drag.isDown = true;
    event.preventDefault();
    event = event || window.event;

    Site.startPosition = event.pageX;
    // Site.body.classList.add('dragging');
    if (event.type === 'touchstart') Site.posX1 = event.touches[0].clientX;
    else {
      Site.posX1 = event.clientX;
      document.onmouseup = Drag.end;
      document.onmousemove = Drag.move;
    }
  },
  move: (event) => {
    if (!Drag.isDown) return;
    event.preventDefault();
    event = event || window.event;

    if (event.type === 'touchmove') {
      Site.posX2 = Site.posX1 - event.touches[0].clientX;
      Site.posX1 = event.touches[0].clientX;
    }
    else {
      Site.posX2 = Site.posX1 - event.clientX;
      Site.posX1 = event.clientX;
    }
  },
  end: (event) => {
    Drag.isDown = false;

    event.preventDefault();
    event = event || window.event;

    Site.finishPosition = event.pageX;
    // Site.body.classList.remove('dragging');

    (Site.finishPosition - Site.startPosition < -Drag.threshold) && Site.blockedAction === !1 ?
      Site.nextSlide() :
      (Site.finishPosition - Site.startPosition > Drag.threshold) && Site.blockedAction === !1 ?
        Site.prevSlide() :
        false;

    document.onmouseup = null;
    document.onmousemove = null;
  },
  // REFACTOR METHODS BELLOW...
  toggleVisible: () => {
    // Drag.cursorMain.style.display   = 'block';
    // Drag.cursorJunior.style.display = 'block';

    Drag.cursorMain.classList.add('visible');
    Drag.cursorJunior.classList.add('visible');

    // TweenMax.set(Drag.cursorMain, { display: 'none', });
    // TweenMax.set(Drag.cursorJunior, { display: 'none', });
  },
  toggleHidden: () => {
    // Drag.cursorMain.style.display   = 'none';
    // Drag.cursorJunior.style.display = 'none';

    Drag.cursorMain.classList.remove('visible');
    Drag.cursorJunior.classList.remove('visible');

    // window.removeEventListener('mousemove', Throttle.actThenThrottleEvents(Site.handlerMouseMove, 500));

    // TweenMax.set(Drag.cursorMain, { display: 'none', });
    // TweenMax.set(Drag.cursorJunior, { display: 'none', });
  },
  show: () => {
    Drag.isDrag = !0;
    Drag.isScroll = !1;

    Drag.cursorMain.classList.remove('vertical_scroll');
    Drag.cursorJunior.classList.remove('vertical_scroll');

    Drag.cursorMain.classList.add('mainDrag');
    Drag.cursorJunior.classList.add('j_Drag');

    /* Mouse/drag events */
    /* Add these events to document element */
    window.onmousedown = Drag.start;
    window.onmousedown = Drag.move;
    window.onmousedown = Drag.end;

    /* drag event */
    window.addEventListener('mousedown', Throttle.actThenThrottleEvents(Drag.start, 500)); // touchStart
    window.addEventListener('mousemove', Throttle.actThenThrottleEvents(Drag.move, 500)); // touchMove
    window.addEventListener('mouseup', Throttle.actThenThrottleEvents(Drag.end, 500)); // touchEnd
  },
  hide: () => {
    Drag.isScroll = !0;
    Drag.isDrag = !1;

    Drag.cursorMain.classList.remove('mainDrag');
    Drag.cursorJunior.classList.remove('j_Drag');

    Drag.cursorMain.classList.add('vertical_scroll');
    Drag.cursorJunior.classList.add('vertical_scroll');
  }
};

var Site = Site || {};

/* TO DO: DEBUG PAGINATION UPDATE ON CLICK EVENTS WHERE LETTER DOESN'T ANIMATE || SLIDE BACKWARDS */

Site.setup = function setup() {
  /* DOMContentLoaded */
  this.directoryUri = './';
  this.scrolling = null;
  this.preload = new createjs.LoadQueue(true);
  this.newPageContent = void 0;
  // linkInProgress
  this.rafPixiHome = void 0;
  this.rafPixiMenu = void 0;
  this.rafPixiSingle = void 0;
  this.rafLoading = void 0;
  this.mousePos = {};
  this.formerDelta = 0;
  this.displacementSprite = void 0;
  this.displacementSprite2 = void 0;
  this.stage = void 0;
  this.displacementFilter = void 0;
  this.displacementFilter2 = void 0;
  this.renderer = void 0;
  this.links = void 0;
  this.hovers = void 0;
  this.bottomLink = !1;
  this.ladderScale = void 0;
  // this.deltaMenu = void 0;
  // this.deltaScroll = void 0;
  this.scrollMenuOpen = void 0;
  this.rendererMenu = void 0;
  this.displacementFilter3 = void 0;
  this.displacementSprite3 = void 0;
  this.stageMenu = void 0;
  this.currentMousePos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  this.loader = void 0;
  this.listenCursor = !1;
  this.speed = 0;
  this.totalSlides = void 0;
  this.currentSlide = 0;
  this.lethargy = new Lethargy();
  this.blockedAction = !0;
  this.attributes = {};
  this.attributes2 = {};
  this.attributes3 = {};
  this.deltaMenu = void 0;
  this.deltaScroll = void 0;
  this.intensity = void 0;
  this.menuHeight = void 0;
  this.margins = void 0;
  this.expression = void 0;
  this.heightMargin = void 0;
  this.cursorPercentage = void 0;
  this.menuEntrance = void 0;
  this.entranceHeight = void 0;

  /** init() */

  this.supportsWheel = !1;
  this.random = void 0;
  this.multiplier = void 0;
  this.imageNumber = void 0;
  this.tempImageNumber = -1;
  this.delayx = void 0;
  this.passOnce = false;
  this.formerHeight = 0;
  this.displace = {};
  this.displace2 = {};
  this.lindex = void 0;
  this.playOnce = !1;

  /* More variables */
  this.xDown = null;
  this.yDown = null;
  this.gamma = void 0;
  this.deltaGamma = void 0;
  this.clickEvent = ('ontouchstart' in window ? 'touchend' : 'click');
  // this.addedLast = 0;
  // this.friction = 1 / 30;

  /* RAFs loading screen */
  Site.onRafLoading = function onRafLoading() {
    Site.rafLoading = requestAnimationFrame(Site.onRafLoading);

    if (Site.exitOk === !0 && Site.ajaxOk === !0) {
      cancelAnimationFrame(Site.rafPixiHome);
      cancelAnimationFrame(Site.rafPixiSingle);
      cancelAnimationFrame(AboutRAFs.theRafAbout); // TESTING <---|

      if (Site.body.classList.contains('single') || Site.body.classList.contains('home')) {
        Site.stage.destroy();
        Site.renderer.destroy();
      }

      Site.onUpdatePage(Site.newPageContent);
      cancelAnimationFrame(Site.rafLoading);
    }
  };

  // ----------------------------- PRELOAD PART ----------------------------- //
  // Site.preload.on('progress', Site.handleOverallProgress);
  // Site.preload.on('complete', Site.handleComplete);
  //
  // Site.handleOverallProgress = function handleOverallProgress(event) {
  //   console.log('handleOverallProgress', 1 - event.progress);
  // };
  // Site.handleComplete = function handleComplete(event) {
  //   console.log('handleComplete', event.complete);
  // };

  /* called each time a page is launched */
  Site.init = function init() {
    UserAgent.init();
    Drag.init();
    Menu.init();

    /* anchor click events */
    Site.onClickHandler = function onClickHandler(event) {
      if (!event.target.classList.contains('external')) {
        event.preventDefault();

        if (Site.linkInProgress === !1) {
          Site.linkInProgress = !0;
          var href = this.getAttribute('href');

          if (event.target.classList.contains('bottom_link')) {
            Site.bottomLink = !0;
            event.target.classList.add('changing');
          }

          history.pushState({}, '', href);
          Site.onLoadPage(href);
          Site.onRafLoading();

          !1; /* ---OR --- return false; */
        }

        !1; /* ---OR --- return false; */
      }
    };

    this.exitOk = !1;
    this.ajaxOk = !1;
    this.linkInProgress = !1;
    this.deltaMenu = 0;
    this.deltaScroll = 0;
    this.speed = 0;

    this.body = document.querySelector('body');
    this.vsSection = document.querySelector('.vs-section');
    this.vsDivs = document.querySelectorAll('.vs-div');
    this.innerH2 = document.getElementsByClassName('inner_h2');
    this.homeCanvas = document.getElementsByClassName('inner_h2')[0];
    this.mouseOverLinks = document.querySelectorAll('.link');
    // this.social = document.getElementById('social');
    this.about = document.getElementById('about');
    this.contact = document.getElementById('contact');
    this.links = document.querySelectorAll('a'); // when clicking on a anchor link with class of '.link'

    TweenMax.set('#main, #the_menu, #pixi_menu', { opacity: 1 });
    TweenMax.set('#main', { display: 'block', clearProps: 'y' });
    // TweenMax.to('.feature1', 0.2, { scaleY: 1, ease: Power2.easeIn });
    // Site.onResizeHandler();

    // Resets header menu elements back to their defaults states/classes.
    Menu.navMenu.style.display = 'none';

    /* Update and Animate projMenu from arrow/Close(X) */
    if (Menu.button.classList.contains('arrow-transition-in')) Menu.hideArrow();
    // if (Menu.button.classList.contains('arrow-transition-in')) Menu.hideArrow();

    /* close Nav Menu when anchor click events */
    Menu.button.classList.remove('opened');
    // Menu.button.classList.remove('opened');

    /* Reset lightButtonStyles */
    Menu.button.classList.remove('light');
    // Menu.button.classList.remove('light');

    Menu.social.classList.remove('light');
    Menu.logo.classList.remove('light');
    Drag.cursorMain.classList.remove('menu_opened');

    Site.about.style.display = 'block';
    Site.contact.style.display = 'block';

    // if (!Menu.button.classList.contains('.point3.black')) {
    //   // Menu.button.childNodes.forEach((obj) => obj.style.removeProperty('--button-color'));
    //   Menu.button.style.setProperty('--button-color', 'blue');
    // } else {
    //   // Menu.button.childNodes.forEach((obj) => obj.style.setProperty('--button-color'));
    //   Menu.button.style.setProperty('--button-color', 'red');
    // }

    // Site.about.classList.remove('light');
    // Site.contact.classList.remove('light');

    /* classList of undefined when going from state to another => BUG!!! */
    if (Site.body.classList.contains('is-loading')) setTimeout(() => document.querySelector('.is-loading').classList.remove('is-loading'), 1000, false);

    // when click on link
    // Site.links = document.querySelectorAll('a');

    /* removes event listeners from elements with 'link' class before adding click events to each element */
    Site.links.forEach((link) => link.removeEventListener('click', Site.onClickHandler, false));
    Site.links.forEach((link) => link.addEventListener('click', Site.onClickHandler, false));

    // Site.preloadImages();
    // Menu.button.onclick = (event) => {
    //   event.preventDefault();
    //   Menu.button.isArrow ? Site.smoothScroll.scrollToY(0, !0) : Site.isOpen ? Site.close() : Site.open();
    //
    //   // if (Menu.button.isArrow) Site.smoothScroll.scrollToY(0, !0);
    //   // else if (Site.isOpen) Site.close();
    //   // else Site.open();
    // };
    // let root = document.documentElement;
    // root.addEventListener("mousemove", e => {
    //   root.style.setProperty('--mouse-x', e.clientX + "px");
    //   root.style.setProperty('--mouse-y', e.clientY + "px");
    // });

    if (!UserAgent.iOS) {
      /* adds  mouse events to each element with the class of link_hover and animate the cursor accordingly */
      Site.mouseOverLinks.forEach((obj) => document.addEventListener('mouseover', Throttle.actThenThrottleEvents(Site.handleMouseOver, 500)));
      Site.mouseOverLinks.forEach((obj) => document.addEventListener('mouseout', Throttle.actThenThrottleEvents(Site.handleMouseOut, 500)));

      if (Site.body.classList.contains('home')) Drag.show();
      else Drag.hide();
    }

    Site.animations();
  };
  /* when get() completed */
  Site.onAjaxLoad = function onAjaxLoad(html) {
    Site.newPageContent = html;
    Site.ajaxOk = !0;
  };
  /* animations input */
  Site.animations = function animations() {
    if (window.innerWidth < 768) document.querySelectorAll('#the_menu li').forEach((obj) => obj.classList.remove('active'));

    // IF STATEMENT CONDITION IS "ALMOST" ITENDITICAL TO THE ABOVE IF STATEMENT
    if (UserAgent.iOS) {
      window.scrollTo(Site.scrollMenuOpen, 0);
      document.getElementById('main').classList.remove('black');
    }

    /* Page transitions/animations when navigating between states */
    if (Site.body.classList.contains('home')) {
      document.querySelectorAll('.point3').forEach((obj) => obj.classList.remove('black'));

      Site.hovers = document.querySelectorAll('.change_project');

      Site.hovers.forEach((hover) => hover.addEventListener('mouseenter', Site.onHover, false));
      Site.hovers.forEach((hover) => hover.addEventListener('mouseleave', Site.offHover, false));

      Site.currentSlide = 0;
      Site.totalSlides = 0;
      Site.renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight, { transparent: !0 });

      document.getElementById('inner_canvas').appendChild(Site.renderer.view);

      Site.renderer.view.width = window.innerWidth;
      Site.renderer.view.height = window.innerHeight;

      Site.stage = new PIXI.Container();
      Site.loader = new PIXI.Loader();
      // Site.ticker = new PIXI.Ticker();

      document.querySelectorAll('#images div').forEach(Site.setDimensions);

      /* displacement 1 */
      Site.displacementSprite = PIXI.Sprite.from(Site.directoryUri + 'images/gradient4.png');
      Site.displacementSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.CLAMP; // options: REPEAT, MIRRORED_REPEAT, CLAMP
      Site.displacementFilter = new PIXI.filters.DisplacementFilter(Site.displacementSprite);

      /* displacement 2 */
      Site.displacementSprite2 = PIXI.Sprite.from(Site.directoryUri + 'images/gradient_large.png');
      Site.displacementSprite2.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;
      Site.displacementFilter2 = new PIXI.filters.DisplacementFilter(Site.displacementSprite2);

      /* settings displacement1 - intensity */
      Site.displacementFilter.scale.x = 50;
      Site.displacementFilter.scale.y = 0;

      /* center for slider */
      Site.displacementSprite.pivot.x = 256;
      Site.displacementSprite.pivot.y = 256;

      /* ladder x/y */
      Site.displacementSprite.scale.x = 0.2;

      /* settings displacement2 - intensity */
      Site.displacementFilter2.scale.x = 0;
      Site.displacementFilter2.scale.y = 0;

      /* ladder x/y */
      Site.displacementSprite2.scale.x = 0.8;
      // displacementSprite2.anchor.x = 1;

      Site.stage.addChild(Site.displacementSprite);

      Site.stage.filters = [Site.displacementFilter, Site.displacementFilter2];

      Site.loader.load((loader, resources) => {
        Site.blockedAction = false;
        if (!Menu.button.classList.contains('opened')) Site.homePixi();
        Site.nextSlide();

        // DISABLE elements with class of update_link (<a>) in home pixi slider

        // if (Site.currentSlide === 0) {
        //   document.querySelectorAll('.update_link').forEach((obj) => {
        //     obj
        //       .setAttribute('href', document.querySelectorAll('#images div')[Site.currentSlide]
        //       .getAttribute('data-params'));
        //   });
        // }

        document.getElementById('progress').style.display = 'none';
      });
    }
    else if (Site.body.classList.contains('about')) {
      document.getElementById('progress').style.display = 'none';
      document.querySelectorAll('.point3').forEach((obj) => obj.classList.add('black'));

      // document.getElementById('shutter1').classList.add('open');
      // document.querySelector('.intro').classList.add('open');

      TweenMax.to('.background_intro', 1.4, { scale: 1, ease: Power4.easeOut });
      Site.animateRandomElements('.random');
      TweenMax.staggerFromTo(Site.random, 1, { x: '-24px' }, { x: '0px', opacity: 1, delay: 0.6, ease: Power2.easeOut }, 0.1);

      if (!UserAgent.iOS) {
        if (Site.scrolling !== null) Site.scrolling.destroy();

        Site.scrolling = null;

        Site.scrolling = new Smooth({
          preload: !0,
          native: !1,
          section: Site.vsSection,
          divs: Site.vsDivs,
          vs: { mouseMultiplier: 0.4 }
        });

        Site.scrolling.init();
      }

      // TweenMax.to('#main', 0.4, { backgroundColor: '#EFEFEF', ease: Power2.easeInOut });
      TweenMax.to('#inner_svg', 1, { opacity: 1, ease: Power2.easeIn });
      TweenMax.fromTo('#inner_svg', 2, { rotation: 140 }, { rotation: 0, ease: Power2.easeOut });
      TweenMax.fromTo('#inner_svg img', 2, { rotation: -140 }, {
        rotation: 0,
        ease: Power2.easeOut,
        onComplete: () => {
          // Site.aboutRafs();
          AboutRAFs.init();
          // AboutRAFs.theRafAbout = requestAnimationFrame(Site.aboutRafs);
          // window.addEventListener('scroll', Throttle.actThenThrottleEvents(Site.aboutRafs()), 1000);
          // if (AboutRAFs.theRafAbout !== null) Site.aboutRafs();
          // else {}
        }
      });

      // Site.aboutSkills();
    }
    else if (Site.body.classList.contains('single')) {
      if (window.innerWidth < 768) {
        document.querySelectorAll('#the_menu li').forEach((obj) => {
          if (Site.body.classList.contains(obj.getAttribute('data-id'))) obj.classList.add('active');
        });
      }

      document.querySelectorAll('.point3').forEach((obj) => obj.classList.add('black'));

      if (!UserAgent.iOS) {
        Drag.cursorMain.classList.add('vertical_scroll');
        Drag.cursorJunior.classList.add('vertical_scroll');

        document.getElementById('to_next_project').addEventListener('mouseover', Site.onHoverNext, false);
        document.getElementById('to_next_project').addEventListener('mouseout', Site.offHoverNext, false);

        if (Site.scrolling !== null) Site.scrolling.destroy();
        Site.scrolling = null;

        Site.scrolling = new Smooth({
          preload: !0,
          native: !1,
          section: Site.vsSection,
          divs: Site.vsDivs,
          vs: { mouseMultiplier: 0.4 }
        });

        Site.scrolling.init();
      }
      else {
        document.getElementById('to_next_project').innerHTML = document.getElementById('to_next_project').getAttribute('data-next');
        TweenMax.set('#inner_project_name', { x: (document.getElementById('project_name').clientWidth + 10) / 2 + 'px' });
        TweenMax.set('#project_name .stag', { opacity: 1 });
      }

      if (window.innerWidth > 767) {
        height = 0.57 * window.innerWidth + 20;
        Site.renderer = PIXI.autoDetectRenderer(window.innerWidth, (0.57 * window.innerWidth + 20), { transparent: !0 });
        Site.renderer.view.width = window.innerWidth;
        // Site.renderer.view.height = window.innerHeight;
      }
      else {
        height = window.innerWidth + 20;
        Site.renderer = PIXI.autoDetectRenderer(window.innerWidth, (window.innerWidth + 20), { transparent: !0 });
        Site.renderer.view.width = window.innerWidth;
        // Site.renderer.view.height = window.innerHeight;
      }

      document.getElementById('cover').appendChild(Site.renderer.view);

      Site.stage = new PIXI.Container();
      Site.loader = new PIXI.Loader();
      // Site.ticker = new PIXI.Ticker();

      // document.querySelectorAll('#images div').forEach(Site.setDimensions);
      var image = new PIXI.Sprite(PIXI.Texture.from(document.getElementById('cover').getAttribute('data-img')));

      // DISABLED - Because PixiJS doesn't like duplicate resources saved into TextureCache. Therefore, we access our assets with Site.loader.resources
      // Site.loader.add('image', document.getElementById('cover').getAttribute('data-img'));

      var img = new Image();

      img.src = document.getElementById('cover').getAttribute('data-img');
      img.onload = function() {

        var width = this.width;
        var height = this.height;
        var imageRatio = width / height;
        var windowRatio = window.innerWidth / window.innerHeight;

        // +10 and - 5 values to avoid white edges
        if (windowRatio >= imageRatio) {
          image.width = window.innerWidth + 10;
          image.height = height * (window.innerWidth + 10) / width;
          image.x = -5;
          image.y = window.innerHeight / 2 - image.height / 2;
        }
        else {
          image.height = height;
          image.width = (width * window.innerHeight / height) + 10;
          // image.x      = (window.innerWidth / 2 - image.width / 2) - 5;
          image.y = height / 6 - image.height / 2; // ADDED BY ME
        }
      };

      // /* center the sprite's anchor point */
      // image.anchor = 0.5;
      // /* move the sprite to the center of the screen */
      // image.x = Site.renderer.width / 2;
      // image.y = Site.renderer.height / 2;

      /* displacement 2 */
      Site.displacementSprite2 = PIXI.Sprite.from(`${Site.directoryUri}images/gradient_large.png`);
      Site.displacementSprite2.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;
      Site.displacementFilter2 = new PIXI.filters.DisplacementFilter(Site.displacementSprite2);

      // /* settings displacement2 - intensity */
      Site.displacementFilter2.scale.x = 0; // 150
      Site.displacementFilter2.scale.y = 0;

      /* ladder x/y */
      Site.displacementSprite2.scale.x = 0.8; // 0.8

      Site.stage.addChild(Site.displacementSprite2);
      Site.stage.addChild(image);


      // Site.stage.hitArea = Site.renderer.screen;
      // Site.stage.interactive = true;

      // Site.stage.on('mousemove', function(event) {
      //   const x = event.data.global.x;
      //   const y = event.data.global.y;
      //   image.rotation = Math.atan2(y - image.y, x - image.x);
      // });

      // // Listen for animate update
      // Site.ticker.add(function(delta) {
      //   // just for fun, let's rotate mr rabbit a little
      //   // delta is 1 if running at 100% performance
      //   // creates frame-independent tranformation
      //   image.x += Math.cos(image.rotation) * delta;
      //   image.y += Math.sin(image.rotation) * delta;

      // });

      Site.stage.filters = [Site.displacementFilter2];

      Site.loader.load((loader, resources) => {
        Site.blockedAction = false;

        if (!Menu.button.classList.contains('opened')) Site.singlePixi();

        Site.animateRandomElements('.random');

        TweenMax.staggerFromTo(Site.random, 1, { x: '-24px' }, { x: '0px', opacity: 1, ease: Power2.easeOut }, 0.1);
        TweenMax.to('#cover', 1, { opacity: 1, delay: 0.4, ease: Power2.easeOut });

        Site.speed = 4;
        document.getElementById('progress').style.display = 'none';

        // REPLACE: the_imgs with a new class that iss more specific
        Site.ladderScale = (document.getElementById('the_imgs').clientHeight + (0.28 * window.innerHeight)) / document.getElementById('the_imgs').clientHeight;
        Site.ladderScale = parseFloat(Math.round(Site.ladderScale * 100) / 100).toFixed(2);


      });
    }
    else if (Site.body.classList.contains('notFound')) {
      document.getElementById('progress').style.display = 'none';
    }
    else if (Site.body.classList.contains('internalServerError')) {
      document.getElementById('progress').style.display = 'none';
    }

    // TweenMax.to('body', 1, { opacity: 1, onComplete: () => {
    //   scroll.init();
    //   scroll.Site.onResizeHandler();
    // }});
    //
    // if ($('event')[0]) {}
  };
  /* animations output outputs */
  Site.onLoadPage = function onLoadPage(href) {
    document.getElementById('progress').style.display = 'block';
    if (Site.scrolling !== null) Site.scrolling.off();
    Site.sendHttpRequest(href);

    if (Menu.button.classList.contains('opened')) {
      cancelAnimationFrame(Site.rafPixiMenu);
      cancelAnimationFrame(AboutRAFs.theRafAbout); // TESTING <---|
      /* reset projMenu when changing states/clicking on anchor elements */
      Menu.button.classList.add('closing');
      setTimeout(() => Menu.button.classList.remove('closing'), 1250); // delay is unusally long

      TweenMax.to('#the_menu, #pixi_menu', 0.4, {
        opacity: 0,
        ease: Power2.easeInOut,
        onComplete: () => {
          Site.stageMenu.removeChildren();
          Site.exitOk = true;
          TweenMax.set('#main', { clearProps: 'backgroundColor' });
        }
      });
    }
    else if (Site.body.classList.contains('home')) {
      // Site.speed = 4;
      Site.listenCursor = !1;
      Site.blockedAction = !0;

      // Site.stage.removeChild(displacementSprite);
      // Site.stage.addChild(Site.displacementSprite2);

      Site.animateRandomElements('.random');
      TweenMax.staggerTo(Site.random, 0.4, { x: '24px', opacity: 0, ease: Power2.easeIn }, 0.1);

      // TweenMax.to(attributes2, 0.9, {
      //   intensity: 150,
      //   x: 10,
      //   ease: Power2.easeIn,
      //   onUpdate: () => {
      //     Site.displacementFilter2.scale.x = attributes2.intensity;
      //     speed = attributes2.x;
      //   },
      //   onComplete: () => {}
      // });

      TweenMax.to('#main', 1, { opacity: 0, delay: 0.4, ease: Power2.easeInOut, onComplete: () => Site.exitOk = true });
      Site.hovers = document.querySelectorAll('.change_project');

      Site.hovers.forEach((hover) => {
        hover.removeEventListener('mouseenter', Site.onHover);
        hover.removeEventListener('mouseleave', Site.offHover);
      });
    }
    else if (Site.body.classList.contains('single')) {
      document.getElementById('to_next_project').removeEventListener('mouseover', Site.onHoverNext);
      document.getElementById('to_next_project').removeEventListener('mouseout', Site.offHoverNext);

      if (Site.bottomLink) {
        var diff;

        if (Site.scrolling !== null) {
          diff = document.getElementById('main').clientHeight - (Site.scrolling.vars.current + window.innerHeight);

          TweenMax.to('#main', 1.2, { y: -(diff + window.innerHeight), ease: Power2.easeInOut });

          TweenMax.to('#next_proj > div', 1.2, {
            y: diff + window.innerHeight - (document.getElementById('top_half').clientHeight / 2),
            ease: Power2.easeInOut,
            onComplete: () => {
              TweenMax.to('#next_proj > div', 0.4, {
                opacity: 0,
                ease: Power2.easeInOut,
                onComplete: () => {
                  Site.exitOk = true;
                }
              });
            } });
        }
        else {
          diff = document.getElementById('main').clientHeight - (window.pageYOffset + window.innerHeight);

          TweenMax.to('#next_proj, .inner_img', 1.2, { y: -(diff + window.innerHeight), ease: Power2.easeInOut });

          TweenMax.to('#next_proj > div', 1.2, {
            y: diff + window.innerHeight - (document.getElementById('top_half').clientHeight / 2),
            ease: Power2.easeInOut,
            onComplete: () => {
              TweenMax.to('#next_proj > div', 0.4, {
                opacity: 0,
                ease: Power2.easeInOut,
                onComplete: () => {
                  // TweenMax.set('#main', { clearProps: 'y' });
                  Site.exitOk = true;
                  window.scrollTo(Site.scrollMenuOpen, 0);
                }
              });
            }
          });
        }
      }
      else {
        TweenMax.to('#main', 0.4, {
          opacity: 0,
          ease: Power2.easeInOut,
          onComplete: () => {
            Site.exitOk = true;
          }
        });
      }
    }
    else if (Site.body.classList.contains('about')) {
      TweenMax.to('#main', 0.4, {
        opacity: 0,
        clearProps: 'backgroundColor',
        ease: Power2.easeInOut,
        onComplete: () => {
          Site.exitOk = true;
        }
      });
    }
    else Site.exitOk = true;
  };
  /* updating the data of the page */
  Site.onUpdatePage = function onUpdatePage(html) {
    var parser = new DOMParser();
    var doc = parser.parseFromString(html, 'text/html');
    var classList = doc.querySelectorAll('body')[0].getAttribute('class');

    /* main title of the page */
    document.title = doc.querySelector('title').innerHTML;

    /* main class of body */
    var res = classList.replace('is-loading', '');

    document.querySelectorAll('body')[0].setAttribute('class', res);

    if (!UserAgent.iOS) document.querySelectorAll('body')[0].classList.add('desktop');
    else document.querySelectorAll('body')[0].classList.add('mobile');

    /* main content #main */
    document.getElementById('main').innerHTML = doc.getElementById('main').innerHTML;

    /* launches the new page */
    Site.init();
  };

  /* State Change Events */
  Site.onPopStateHandler = function onPopStateHandler(event) {
    if (event.state !== null) {
      Site.onLoadPage(location.href);
      Site.onRafLoading();
    }
  };
  Site.onUnloadHandler = function onUnloadHandler(event) {
    window.scrollTo(Site.scrollMenuOpen, 0); // scroll back to top when reloading page
    // if (Site.scrolling) {
    //   Site.scrolling.scrollTo(0, 0);
    // }
  };

  /* Add these events to window element */
  window.onpopstate = Site.onPopStateHandler;
  window.onunload = Site.onUnloadHandler;

  history.pushState({}, '', location);
  Site.init();

  if (!UserAgent.iOS) document.querySelectorAll('body')[0].classList.add('desktop');
  else {
    document.querySelectorAll('body')[0].classList.add('mobile');
    Site.about.style.top = Math.abs(window.innerHeight / 2) - 25 + 'px';
    Site.contact.style.top = Math.abs(window.innerHeight / 2) - 25 + 'px';
  }

  /* pixi menu statement */
  Site.rendererMenu = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight, { transparent: !0 });
  // Site.rendererMenu = PIXI.autoDetectRenderer(0.24 * window.innerWidth, window.innerHeight - 0.074 * window.innerWidth, { transparent: !0 });

  if (document.getElementById('pixi_menu')) document.getElementById('pixi_menu').appendChild(Site.rendererMenu.view);

  /* RENDER STATE TO FULL SCREEN WIDTH + HEIGHT */
  Site.rendererMenu.view.width = window.innerWidth;
  Site.rendererMenu.view.height = window.innerHeight;

  Site.stageMenu = new PIXI.Container();

  document.querySelectorAll('#the_menu li a').forEach(Site.setMenuDimensions);

  /* displacement 2 */
  Site.displacementSprite3 = PIXI.Sprite.from(Site.directoryUri + 'images/gradient_large.png');
  Site.displacementSprite3.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;
  Site.displacementFilter3 = new PIXI.filters.DisplacementFilter(Site.displacementSprite3);

  Site.stageMenu.filters = [Site.displacementFilter3];

  /* settings displacement2 - intensity */
  Site.displacementFilter3.scale.x = 0;
  Site.displacementFilter3.scale.y = 0;
  /* ladder x/y */
  Site.displacementSprite3.scale.x = 0.4;

  // ------------------------ END OF DOCUMENT READY ------------------------- //

  // window.onbeforeunload = (event) => {
  //   window.scrollTo(Site.scrollMenuOpen, 0);  // scroll back to top when reloading page
  // };
  // window.onloadstart = (event) => {
  //   window.scrollTo(Site.scrollMenuOpen, 0);  // scroll back to top when reloading page
  // };
  // window.addEventListener('load', () => {
  //   window.scrollTo(Site.scrollMenuOpen, 0);  // scroll back to top when reloading page
  // });
  // window.document.onload = function(e) {};
  // window.onload = function(e) {};
  // window.tdiff = [];
  // fred = function(a, b) {
  //   return a - b;
  // };

  // if (!UserAgent.iOS) {
  // if (window.innerWidth >= 1024) {

  if (!UserAgent.iOS) {
    window.addEventListener('mousemove', Throttle.actThenThrottleEvents(Site.handlerMouseMove, 500), !1);
    /* adds  mouse events to each element with the class of link_hover and animate the cursor accordingly */
    Site.mouseOverLinks.forEach((obj) => document.addEventListener('mouseover', Throttle.actThenThrottleEvents(Site.handleMouseOver, 500)));
    Site.mouseOverLinks.forEach((obj) => document.addEventListener('mouseout', Throttle.actThenThrottleEvents(Site.handleMouseOut, 500)));

    Site.body.classList.contains('home') ? Drag.show() : Drag.hide();
  }
  else Drag.toggleHidden();

  /* Mouse events */
  /* Add these events to document element */
  window.onmousedown = Site.mousePositionHandler;
  window.onmousedown = Site.projectChangedHandler;
  window.onmousedown = Site.scrollEventHandler;
  window.onmousedown = Site.touchStartHandler;
  window.onmousedown = Site.touchMoveHandler;
  window.onmousedown = Site.showHideArrow;
  // /* State Change Events */
  // /* Add these events to window element */
  // window.onpopstate = Site.onPopStateHandler;
  // window.onunload = Site.onUnloadHandler;

  /* management button - prev / next browser */
  window.addEventListener('onpopstate', Site.onPopStateHandler);
  window.addEventListener('onunload', Site.onUnloadHandler);
  window.addEventListener('resize', Throttle.actThenThrottleEvents(Site.onResizeHandler, 500));
  window.addEventListener('keydown', Throttle.actThenThrottleEvents(Site.onKeydownHandler, 500));
  // window.addEventListener('scroll', Site.showHideArrow, false); // shows/hides menu arrow when scrolling on mobile devices
  /* device giroscope event */
  if (window.DeviceOrientationEvent) {
    window.addEventListener('deviceorientation', Throttle.actThenThrottleEvents(Site.circleHandler, 500), !1);
  }

  // window.addEventListener('scroll', () => Site.aboutRafs());
  // window.addEventListener('scroll', Throttle.actThenThrottleEvents(Site.aboutRafs), 1000);

  /* scroll event */
  document.addEventListener('wheel', Throttle.actThenThrottleEvents(Site.scrollEventHandler, 500));
  document.addEventListener('mousewheel', Throttle.actThenThrottleEvents(Site.scrollEventHandler, 500));
  document.addEventListener('DOMMouseScroll', Throttle.actThenThrottleEvents(Site.scrollEventHandler, 500));
  /* swipe event */
  document.addEventListener('touchstart', Throttle.actThenThrottleEvents(Site.touchStartHandler, 500), !1);
  document.addEventListener('touchmove', Throttle.actThenThrottleEvents(Site.touchMoveHandler, 500), !1);
  /* Show Hide Menu Arrow events */
  document.addEventListener('wheel', Throttle.actThenThrottleEvents(Menu.showHideArrow, 500));
  document.addEventListener('mousewheel', Throttle.actThenThrottleEvents(Menu.showHideArrow, 500));
  document.addEventListener('DOMMouseScroll', Throttle.actThenThrottleEvents(Menu.showHideArrow, 500));
  document.addEventListener('touchmove', Throttle.actThenThrottleEvents(Menu.showHideArrow, 500)); // shows/hides menu arrow when scrolling on mobile devices
  /* Add the event listeners for each event. */
  document.addEventListener('mousemove', Throttle.actThenThrottleEvents(Site.mousePositionHandler, 500));
  document.addEventListener(Site.clickEvent, Site.projectChangedHandler);
  // document.addEventListener('click', Site.projectChangedHandler, false);
  // document.addEventListener('touchend', Site.projectChangedHandler, false);
};


Site.sendHttpRequest = function sendHttpRequest(url) {
  const xhr = new XMLHttpRequest();
  const method = 'GET';

  // progress on transfers from the server to the client (downloads)
  function updateProgress(oEvent) {
    console.log('oEvent', oEvent);
    if (oEvent.lengthComputable) var percentComplete = oEvent.loaded / oEvent.total * 100;
    else {
      // Unable to compute progress information since the total size is unknown
    }
  }
  function transferComplete(event) {
    console.log('The transfer is complete.');
  }
  function transferFailed(event) {
    console.log('An error occurred while transferring the file.');
  }
  function transferCanceled(event) {
    console.log('The transfer has been canceled by the user.');
  }

  // xhr.onload = (event) => console.log('event => onload =>', event);
  // xhr.onprogress = (event) => console.log('event => onprogress =>', event);
  // xhr.onerror = (event) => console.log('event => onerror =>', event);

  // xhr.upload.onprogress = (event) => {
  //   updateProgress();
  // };

  // xhr.upload.onload = (event) => {
  //   transferComplete();
  // };

  // xhr.upload.onerror = (event) => {
  //   transferFailed();
  // };

  // xhr.upload.onabort = (event) => {
  //   transferCanceled();
  // };

  // Create and send a GET request
  // The first argument is the post type (GET, POST, PUT, DELETE, etc.)
  // The second argument is the endpoint URL
  xhr.open(method, url, !0); // => !0 --> true

  // Setup our listener to process completed requests
  // xhr.onload = () => {
  //   // Process our return data
  //   if (xhr.status >= 200 && xhr.status < 300) Site.onAjaxLoad(xhr.responseText);
  //   else console.log('The request failed!'); // What do when the request fails
  // };

  /*
   * xhr.onreadystatechange = callback
   * callback is the function to be executed when the readyState changes.
   */
  xhr.onreadystatechange = (event) => {
    if (xhr.readyState === xhr.DONE && xhr.status === 200) Site.onAjaxLoad(xhr.responseText);
    else if (xhr.status === 400) console.log('There was an error 400');
    // else console.log('something else other than 200 or 400 was returned');
  };

  xhr.send();
};

Site.projectChangedHandler = function projectChangedHandler(event) {
  if (event.target.classList.contains('change_project')) Site.changePagination(event.target);
  else if (event.target.classList.contains('arrow-transition-in')) {
    Site.scrollBackUp(event.target);

    /* display about and contact fixed links after clicking scrollBackUp() */
    TweenMax.set(Site.about, { display: 'block' });
    TweenMax.set(Site.contact, { display: 'block' });
  }
  else if (event.target.classList.contains('to_next') && Site.blockedAction === false) Site.nextSlide();
  else if (event.target.classList.contains('to_prev') && Site.blockedAction === false) Site.prevSlide();
  else if (event.target.classList.contains('projects')) {
    event.preventDefault();
    // Menu.button.isArrow ? Site.smoothScroll.scrollToY(0, !0) : Menu.isOpen ? Menu.close() : Menu.open();

    if (Menu.button.isArrow) {
      // Site.smoothScroll.scrollToY(0, !0);
      if (Site.scrolling !== null) Site.scrolling.scrollTo(0); // Site.scrolling.scrollTo(0, !0);
      else Site.scrollToTop(Site.vsSection, 1000, 'easeOutQuad'); // Site.scrollToTop(Math.abs(Site.vsSection), 1000, 'easeOutQuad');
    }

    document.querySelectorAll('.projects').forEach((obj) => obj.classList.toggle('opened')); // Takes a second argument => true || false |\ Condition
    // document.querySelector('.projects').classList.toggle('opened');
    // Menu.button.classList.toggle('opened');

    // if (!Menu.button.classList.contains('opened')) {
    //   Menu.button.classList.add('closing');
    //   setTimeout(() => Menu.button.classList.remove('closing'), 1250); // delay is unusally long
    // }

    Menu.button.classList.contains('opened') ? Menu.open() : Menu.close();
  }
};

Site.onKeydownHandler = function onKeydownHandler(event) {
  if (event.key === 'Escape' || event.keyCode === 27) {
    if (Menu.button.classList.contains('opened')) {
      Menu.init();
      Menu.close();
    }
  }
};


Site.setDimensions = function setDimensions(item, index) {
  Site.totalSlides++;

  window['image' + index] = new PIXI.Sprite(PIXI.Texture.from(item.getAttribute('data-url')));
  window['image' + index].alpha = 0;

  // Chainable `pre` to add a middleware that runs for each resource, *before* loading that resource.
  // This is useful to implement custom caching modules (using filesystem, indexeddb, memory, etc).
  // Site.loader.pre(cachingMiddleware);
  // Site.loader.add('image' + index, item.getAttribute('data-url'));

  var img = new Image(); // equivalent to document.createElement('img')

  img.src = item.getAttribute('data-url');
  img.onload = function() {

    var width = this.width;
    var height = this.height;
    var imageRatio = width / height;
    // var windowRatio = window.innerWidth / window.innerHeight;

    // +10 and - 5 values to avoid white edges
    if (window.innerWidth / window.innerHeight >= imageRatio) {
      window['image' + index].width = window.innerWidth + 10;
      window['image' + index].height = height * (window.innerWidth + 10) / width;
      window['image' + index].x = -5;
      window['image' + index].y = window.innerHeight / 2 - window['image' + index].height / 2;
    }
    else {
      window['image' + index].height = window.innerHeight;
      window['image' + index].width = (width * window.innerHeight / height) + 10;
      window['image' + index].x = (window.innerWidth / 2 - window['image' + index].width / 2) - 5;
    }
  };
};

Site.setMenuDimensions = function setMenuDimensions(item, index) {
  // Site.totalSlides++;
  var frameWidth = 0.24 * window.innerWidth;
  var frameHeight = window.innerHeight - 0.074 * window.innerWidth; // ---> 705.28px

  window['image_menu' + index] = new PIXI.Sprite(PIXI.Texture.from(item.getAttribute('data-img')));
  window['image_menu' + index].alpha = 0;

  var img = new Image();

  img.src = item.getAttribute('data-img');
  img.onload = function() {
    var width = this.width;
    var height = this.height;
    var imageRatio = width / height;
    var windowRatio = frameWidth / frameHeight;

    // +10 and - 5 values to avoid white edges
    if (windowRatio >= imageRatio) {
      window['image_menu' + index].width = frameWidth + 10;
      window['image_menu' + index].height = height * (frameWidth + 10) / width;
      window['image_menu' + index].x = -5;
      window['image_menu' + index].y = frameHeight / 2 - window['image_menu' + index].height / 2;
    }
    else {
      window['image_menu' + index].width = width;
      window['image_menu' + index].height = height;
      window['image_menu' + index].x = (frameWidth / 2 - window['image_menu' + index].width / 2) + 49; // -757.4
      // window['image_menu' + index].x      = (frameHeight / 2 - window['image_menu' + index].width / 2) - 150; // -757.36
    }
    // // ORIGINAL
    // // +10 and - 5 values to avoid white edges
    // if (windowRatio >= imageRatio) {
    //   window['image_menu' + index].width  = frameWidth + 10;
    //   window['image_menu' + index].height = height * (frameWidth + 10) / width;
    //   window['image_menu' + index].x      = - 5;
    //   window['image_menu' + index].y      = frameHeight / 2 - window['image_menu' + index].height / 2;
    // } else {
    //   window['image_menu' + index].height = frameHeight;
    //   window['image_menu' + index].width  = (width * frameHeight / height) + 10;
    //   window['image_menu' + index].x      = (frameWidth / 2 - window['image_menu' + index].width / 2) - 5;
    // }
  };

};


Site.scrollBackUp = function scrollBackUp(target) {
  // Site.scrollingBackUpBtn = requestAnimationFrame(Site.scrollBackUp);
  // if (!UserAgent.iOS && Math.round(Site.scrolling.vars.bounding / 7)) {
  if (!UserAgent.iOS) {
    if (Math.round(Site.scrolling.vars.bounding / 7)) {
      if (Site.scrolling !== null) {
        Site.scrolling.scrollTo(0);
        var delay = Math.round(Site.scrolling.vars.current / 7);

        setTimeout(() => Menu.hideArrow(), delay);

        document.querySelectorAll('.light').forEach((obj) => obj.classList.remove('light'));
        document.querySelectorAll('.point3').forEach((obj) => obj.classList.add('black'));
      }
    }
  }
  else {
    Site.scrollToTop(Site.vsSection, 1000, 'easeOutQuad');
    // Site.scrollToTop(Math.abs(Site.vsSection), 1000, 'easeOutQuad');

    // setTimeout(() => window.scrollTo({ top: Site.scrollMenuOpen, left: 0, behavior: 'smooth' }), 1);
    // Menu.button.addEventListener('click', () => Site.scrollToTop(Site.vsSection, 300, 'easeOutQuad', () => console.log(`Just finished scrolling to ${window.pageYOffset}px`)));
    // Site.scrollToTop(Site.vsSection, 1000, 'easeOutQuad', () => console.log(`Just finished scrolling to ${window.pageYOffset}px`));
    // Menu.button.addEventListener('click', () => scrollToTop(50000));

    // window.scrollTo({ top: Site.scrollMenuOpen, left: 0, behavior: 'smooth' });

    var mobDelay = Math.round(window.pageYOffset / 7);

    setTimeout(() => Menu.hideArrow(), mobDelay);

    document.querySelectorAll('.light').forEach((obj) => obj.classList.remove('light'));
    document.querySelectorAll('.point3').forEach((obj) => obj.classList.add('black'));
  }
};

/* anchor mouse events */
Site.handleMouseOver = function handleMouseOver(event) {
  event = event || window.event;
  event.preventDefault();

  if (event.target.classList.contains('link_hover')) {
    if (Site.body.classList.contains('home')) {
      Drag.cursorMain.classList.remove('mainDrag');
      Drag.cursorJunior.classList.remove('j_Drag');
      Drag.cursorMain.classList.add('cursor_main-small');
    }
    else {
      Drag.cursorMain.classList.remove('vertical_scroll');
      Drag.cursorJunior.classList.remove('vertical_scroll');
      Drag.cursorMain.classList.add('cursor_main-small');
    }
  }
  else return false;
};

Site.handleMouseOut = function handleMouseOut(event) {
  event = event || window.event;
  event.preventDefault();

  if (event.target.classList.contains('link_hover')) {
    if (Site.body.classList.contains('home')) {
      Drag.cursorMain.classList.add('mainDrag');
      Drag.cursorJunior.classList.add('j_Drag');
      Drag.cursorMain.classList.remove('cursor_main-small');
      Drag.cursorMain.classList.remove('menu_opened');

      if (Menu.button.classList.contains('opened')) {
        Drag.cursorMain.classList.remove('mainDrag');
        Drag.cursorJunior.classList.remove('j_Drag');
        Drag.cursorMain.classList.add('menu_opened');
      }
    }
    else {
      if (Site.scrolling.vars.target <= Math.round(Site.scrolling.vars.bounding - 500)) {
        Drag.cursorMain.classList.add('vertical_scroll');
        Drag.cursorJunior.classList.add('vertical_scroll');
        Drag.cursorMain.classList.remove('cursor_main-small');
        Drag.cursorMain.classList.remove('menu_opened');
      }
      if (Menu.button.classList.contains('opened')) {
        Drag.cursorMain.classList.remove('vertical_scroll');
        Drag.cursorJunior.classList.remove('vertical_scroll');
        Drag.cursorMain.classList.add('menu_opened');
      }

      Drag.cursorMain.classList.remove('cursor_main-small');
    }
  }
  else Site.mouseOverLinks.forEach((obj) => document.removeEventListener('mousemove', Site.handleMouseOver, false));

  return false;
};

Site.handlerMouseMove = function handlerMouseMove(event) {
  event = event || window.event;
  event.preventDefault();

  let pad = 26;
  let pad2 = 5;

  if (!Drag.cursorMain.classList.contains('visible')) Drag.toggleVisible();
  else if (Drag.cursorMain.classList.contains('visible')) {
    TweenMax.to(Drag.cursorMain, 0.1, { transform: 'translate( ' + (event.clientX - pad) + 'px , ' + (event.clientY - pad) + 'px )', ease: 'none' }); // Drag.cursorMain.style.transform = 'translate( ' + (event.clientX - pad) + 'px , ' + (event.clientY - pad) + 'px )';
    TweenMax.to(Drag.cursorJunior, 0.1, { transform: 'translate( ' + (event.clientX - pad2) + 'px , ' + (event.clientY - pad2) + 'px )', ease: 'none' }); // Drag.cursorJunior.style.transform = 'translate( ' + (event.clientX - pad2) + 'px , ' + (event.clientY - pad2) + 'px )';
  }
  else return false;
};

Site.circleHandler = function circleHandler(event) {
  window.orientation === 0 ?
    Site.gamma = event.gamma :
    window.orientation === 180 ?
      Site.gamma = -event.gamma :
      window.orientation === -90 ?
        Site.gamma = -event.beta :
        window.orientation === 90 &&
        (Site.gamma = event.beta); // last conditionale block || else statement
};

Site.touchStartHandler = function touchStartHandler(event) {
  Site.xDown = event.touches[0].clientX;
  Site.yDown = event.touches[0].clientY;
};

Site.touchMoveHandler = function touchMoveHandler(event) {
  if (!Site.xDown || !Site.yDown) return;

  var xUp = event.touches[0].clientX;
  var yUp = event.touches[0].clientY;

  var xDiff = Site.xDown - xUp;
  var yDiff = Site.yDown - yUp;

  if (Math.abs(xDiff) > Math.abs(yDiff)) { /* most significant */
    if (Site.body.classList.contains('home') && Site.blockedAction === !1) xDiff > 0 ? Site.nextSlide() : Site.prevSlide();
  }
  else {
    if (Site.body.classList.contains('home') && Site.blockedAction === !1) yDiff > 0 ? Site.nextSlide() : Site.prevSlide();
  }

  /* reset values */
  Site.xDown = null;
  Site.yDown = null;
};


Site.onHover = function onHover(event) {
  event.target.classList.add('feature');
  document.querySelector('.change_project.current').classList.add('temp');
};

Site.offHover = function offHover(event) {
  event.target.classList.remove('feature');
  document.querySelector('.change_project.current').classList.remove('temp');
};


Site.scrollEventHandler = function scrollEventHandler(event) {
  if (event.type === 'wheel') Site.supportsWheel = !0;
  else if (Site.supportsWheel) return;

  var delta = (event.deltaY || -event.wheelDelta || event.detail) || 1;

  if (Site.lethargy.check(event) !== false && Site.blockedAction === !1 && !Menu.button.classList.contains('opened') && Site.body.classList.contains('home')) {
    if (delta > 0) Site.nextSlide();
    else if (delta < 0) Site.prevSlide();
  }
};

Site.onResizeHandler = function onResizeHandler() {
  if (!UserAgent.iOS && Site.scrolling !== null) Site.scrolling.resize();
  else {
    Site.about.style.top = (window.innerHeight / 2) - 50 + 'px';
    Site.contact.style.top = (window.innerHeight / 2) - 50 + 'px';
  }
};

Site.nextSlide = function nextSlide() {
  Site.speed = 4;

  Site.commonTransition();
  Site.updatePagination('next');

  window['image' + Site.currentSlide].alpha = 0;
  Site.stage.addChild(window['image' + Site.currentSlide]);

  // image1.alpha = 1;
  var timeline = new TimelineMax();

  timeline.to(Site.attributes2, 0.9, {
    intensity: 150,
    x: 20,
    ease: Power2.easeIn,
    onUpdate: () => {
      Site.displacementFilter2.scale.x = Site.attributes2.intensity;
      Site.speed = Site.attributes2.x;
      // Site.displacementSprite2.scale.x = Site.attributes2.width;
    },
    onComplete: () => {
      timeline.reverse();

      setTimeout(() => {
        if (!UserAgent.iOS) {
          Site.stage.removeChild(Site.displacementSprite2);
          Site.stage.addChild(Site.displacementSprite);
        }

        Site.listenCursor = !0;

        Site.currentSlide === 0 ?
          Site.stage.removeChild(window['image' + (Site.totalSlides - 1)]) :
          Site.stage.removeChild(window['image' + (Site.currentSlide - 1)]);

        Site.currentSlide < (Site.totalSlides - 1) ?
          Site.currentSlide++ :
          Site.currentSlide = 0;

        Site.displacementSprite.x = Site.currentMousePos.x;
        Site.blockedAction = !1;
      }, 800);
    }
  });

  TweenMax.to(Site.attributes3, 0.6, {
    opacity: 1,
    delay: 0.6,
    ease: Linear.easeNone,
    onUpdate: () => {
      window['image' + Site.currentSlide].alpha = Site.attributes3.opacity;
    }
  });
};

Site.prevSlide = function prevSlide() {
  Site.speed = -4;

  Site.commonTransition();
  Site.updatePagination('prev');

  if (Site.currentSlide === 0) {
    window['image' + (Site.totalSlides - 2)].alpha = 0;
    Site.stage.addChild(window['image' + (Site.totalSlides - 2)]);
  }
  else if (Site.currentSlide === 1) {
    window['image' + (Site.totalSlides - 1)].alpha = 0;
    Site.stage.addChild(window['image' + (Site.totalSlides - 1)]);
  }
  else {
    window['image' + (Site.currentSlide - 2)].alpha = 0;
    Site.stage.addChild(window['image' + (Site.currentSlide - 2)]);
  }

  // image1.alpha = 1;
  var timeline = new TimelineMax();

  // Site.attributes2.anchor = 0;

  timeline.to(Site.attributes2, 0.9, {
    intensity: 150,
    x: -20,
    // width: 0.8,
    // anchor: 1,
    ease: Power2.easeIn,
    onUpdate: () => {
      Site.displacementFilter2.scale.x = Site.attributes2.intensity;
      Site.speed = Site.attributes2.x;
      // Site.displacementSprite2.scale.x = Site.attributes2.width;
      // Site.displacementSprite2.anchor.x = Site.attributes2.anchor;
    },
    onComplete: () => {
      timeline.reverse();
      // Site.attributes2.intensity = 150;
      // Site.attributes2.x = -20;
      // timeline.to(Site.attributes2, 0.9, {
      //     intensity: 0,
      //     x: 0,
      //     ease: Power1.easeOut,
      //     onUpdate: () => {
      //         Site.displacementFilter2.scale.x = Site.attributes2.intensity;
      //         speed = Site.attributes2.x;
      //     }
      // });
      setTimeout(() => {
        if (!UserAgent.iOS) {
          Site.stage.removeChild(Site.displacementSprite2);
          Site.stage.addChild(Site.displacementSprite);
        }

        Site.listenCursor = !0;

        Site.currentSlide === 0 ?
          Site.stage.removeChild(window['image' + (Site.totalSlides - 1)]) :
          Site.stage.removeChild(window['image' + (Site.currentSlide - 1)]);

        Site.currentSlide > 0 ? Site.currentSlide-- : Site.currentSlide = Site.totalSlides - 1;

        Site.displacementSprite.x = Site.currentMousePos.x;
        Site.blockedAction = !1;
      }, 800);
    }
  });

  TweenMax.to(Site.attributes3, 0.6, {
    opacity: 1,
    delay: 0.6,
    ease: Linear.easeNone,
    onUpdate: () => {
      if (Site.currentSlide === 0) window['image' + (Site.totalSlides - 2)].alpha = Site.attributes3.opacity;
      else if (Site.currentSlide === 1) window['image' + (Site.totalSlides - 1)].alpha = Site.attributes3.opacity;
      else window['image' + (Site.currentSlide - 2)].alpha = Site.attributes3.opacity;
    }
  });
};


Site.commonTransition = function commonTransition() {
  Site.listenCursor = !1;
  Site.blockedAction = !0;

  Site.stage.removeChild(Site.displacementSprite);
  Site.stage.addChild(Site.displacementSprite2);

  Site.attributes.intensity = Site.displacementFilter.scale.x;

  TweenMax.to(Site.attributes, 0.3, {
    intensity: 0,
    ease: Power2.easeOut,
    onUpdate: () => {
      Site.displacementFilter.scale.x = Site.attributes.intensity;
    }
  });

  Site.displacementSprite2.x = 0;
  Site.attributes2.intensity = Site.displacementFilter2.scale.x;
  Site.attributes2.x = Site.speed;
  Site.attributes2.width = Site.displacementSprite2.scale.x;
  Site.attributes3.opacity = 0;
};


Site.footerInView = function footerInView() {
  // if (Site.scrolling.vars.target <= window.innerHeight) {
  //   TweenMax.set(Site.about, { display: 'block' });
  //   TweenMax.set(Site.contact, { display: 'block' });
  // }

  if (Site.scrolling.vars.target >= Math.round(Site.scrolling.vars.bounding - 34)) {
    Drag.cursorMain.classList.remove('vertical_scroll', 'black');
    Drag.cursorJunior.classList.remove('vertical_scroll', 'black');
    Theme.showLightButtonStyle();
  }
  else {
    Drag.cursorMain.classList.add('vertical_scroll', 'black');
    Drag.cursorJunior.classList.add('vertical_scroll', 'black');
    Theme.showDarkButtonStyle();
  }
};


Site.homePixi = function homePixi() {
  Site.rafPixiHome = requestAnimationFrame(Site.homePixi);
  Site.renderer.render(Site.stage);

  if (Site.listenCursor) {
    // window['image' + (Site.currentSlide - 1)].x = 100
    Site.mousePos.x = Site.displacementSprite.x;
    // Site.mousePos.y = displacementSprite.y;
    Site.mousePos.intensity = Site.displacementFilter.scale.x;
    Site.mousePos.width = Site.displacementSprite.scale.x;

    if (Site.currentSlide !== Site.tempImageNumber) {
      Site.tempImageNumber = Site.currentSlide;
      Site.currentSlide === 0 ? Site.imageNumber = Site.totalSlides - 1 : Site.imageNumber = Site.currentSlide - 1;
      // Site.currentMousePos.x = 0;
      Site.delayx = window['image' + Site.imageNumber].x;
    }

    Site.mousePos.correction = 0;

    TweenMax.to(Site.mousePos, 0.3, {
      x: Site.currentMousePos.x,
      // y: Site.currentMousePos.y,
      intensity: 10 * (Site.currentMousePos.x - Site.formerDelta),
      width: Math.abs((Site.currentMousePos.x - Site.formerDelta) / 80 - 0.2),
      correction: (Site.currentMousePos.x - Site.formerDelta) / 40,
      onUpdate: () => {
        Site.displacementSprite.x = Site.mousePos.x;
        // SitedisplacementSprite.y        = Site.mousePos.y;
        Site.displacementFilter.scale.x = Site.mousePos.intensity;
        Site.displacementSprite.scale.x = Site.mousePos.width;

        window['image' + Site.imageNumber].x = Site.delayx + Site.mousePos.correction;
      },
      ease: Linear.easeNone
    });

    if (UserAgent.iOS) {
      Site.mousePos.penche = Site.displacementFilter2.scale.x; // penche :: definition => looks

      TweenMax.to(Site.mousePos, 0.3, {
        penche: 20 * Site.gamma - Site.deltaGamma,
        // penche: (Site.gamma * 20 - Site.deltaGamma), // penche = 'looks' in english
        onUpdate: () => {
          Site.displacementFilter2.scale.x = Site.mousePos.penche;
        },
        ease: Linear.easeNone
      });

      // document.getElementById('title_h2').innerHTML = gamma;
    }
    else Site.displacementSprite2.x += 10;
  }
  else Site.displacementSprite2.x += Site.speed;

  Site.formerDelta = Site.currentMousePos.x;
  Site.deltaGamma = Site.gamma * 20;
};

Site.singlePixi = function singlePixi() {
  // var vsSection = document.querySelector('.vs-section');

  if (!UserAgent.iOS) {
    if (Site.vsSection.clientHeight !== Site.formerHeight) {
      Site.scrolling.resize();
      Site.formerHeight = Site.vsSection.clientHeight;
    }
  }

  Site.rafPixiSingle = requestAnimationFrame(Site.singlePixi);

  // Site.ladderScale = parseFloat(Math.round((document.getElementById('the_imgs').clientHeight + (0.56 * window.innerHeight)) / document.getElementById('the_imgs').clientHeight * 100) / 100).toFixed(2);
  // Site.ladderScale = (document.getElementById('the_imgs').clientHeight + (0.56 * window.innerHeight)) / document.getElementById('the_imgs').clientHeight;
  // Site.ladderScale = parseFloat(Math.round(Site.ladderScale * 100) / 100).toFixed(2);

  Site.renderer.render(Site.stage);
  Site.displacementSprite2.x += Site.speed;

  if (Site.scrolling !== null) {
    if (Site.scrolling.vars.target !== 0 && Site.passOnce === false) {
      Site.passOnce = true;
      Site.increaseDisplacementIntensity();
    }
    else if (Site.scrolling.vars.target === 0 && Site.passOnce === true) {
      Site.passOnce = false;
      Site.decreaseDisplacementIntensity();
    }
  }
  else {
    if (window.pageYOffset !== 0 && Site.passOnce === false) {
      Site.passOnce = true;
      Site.increaseDisplacementIntensity();
    }
    else if (window.pageYOffset === 0 && Site.passOnce === true) {
      Site.passOnce = false;
      Site.decreaseDisplacementIntensity();
    }
  }

  // TweenMax.to('#the_imgs', 1.4, { scaleY: Site.intensity, ease: Power2.easeOut });
  // if (Site.scrolling !== null) Site.deltaScroll = Site.scrolling.vars.current;
  // else {}
};


Site.checkMenu = function checkMenu(item, index) {
  if (
    Site.cursorPercentage > (Site.heightMargin + (index * Site.entranceHeight)) &&
    Site.cursorPercentage < (Site.heightMargin + ((index + 1) * Site.entranceHeight)) &&
    !item.classList.contains('active')
  ) {
    document.querySelector('#the_menu .active').classList.remove('active');
    item.classList.add('active');
    document.getElementById('pixi_menu').setAttribute('href', item.querySelector('a').getAttribute('href'));

    /* add new image */
    Site.stageMenu.addChild(window['image_menu' + index]);
    Site.displace2.alpha = 0;
    // Site.stageMenu.removeChild(Site.displacementSprite3);

    TweenMax.to(Site.displace2, 0.2, {
      alpha: 1,
      onUpdate: () => {
        window['image_menu' + index].alpha = Site.displace2.alpha;
      },
      onComplete: () => {
      //   // to do : management suppression former child
      //   // Site.stageMenu.removeChildren(2);
      //   // addedLast = index;
      },
      ease: Linear.easeNone
    });
  }

};

/*----------------------------------------------------------------------------*/
/*                             Home Pagination                                */
/*----------------------------------------------------------------------------*/

Site.changePagination = function changePagination(element) {
  if (element.classList.contains('current')) return;

  Site.lindex = Array.from(document.getElementById('num_letter').children).indexOf(element);
  const currentIndex = Array.from(document.getElementById('num_letter').children).indexOf(document.querySelector('#num_letter .current'));

  Site.speed = 4;

  Site.commonTransition();

  window['image' + Site.lindex].alpha = 0;
  Site.stage.addChild(window['image' + Site.lindex]);

  var timeline = new TimelineMax();

  timeline.to(Site.attributes2, 0.9, {
    intensity: 150,
    x: 20,
    ease: Power2.easeIn,
    onUpdate: () => {
      Site.displacementFilter2.scale.x = Site.attributes2.intensity;
      Site.speed = Site.attributes2.x;
    },
    onComplete: () => {
      timeline.reverse();

      setTimeout(() => {
        Site.stage.removeChild(Site.displacementSprite2);
        Site.stage.addChild(Site.displacementSprite);
        Site.listenCursor = !0;
        Site.stage.removeChild(window['image' + (currentIndex)]);
        Site.lindex >= Site.totalSlides - 1 ? Site.currentSlide = 0 : Site.currentSlide = Site.lindex + 1;
        Site.displacementSprite.x = Site.currentMousePos.x;
        Site.blockedAction = !1;
      }, 800);
    }
  });

  TweenMax.to(Site.attributes3, 0.6, {
    opacity: 1,
    delay: 0.6,
    ease: Linear.easeNone,
    onUpdate: () => {
      window['image' + Site.lindex].alpha = Site.attributes3.opacity;
    }
  });

  TweenMax.to('#white_circle', 0.9, {
    strokeDashoffset: 1900 * (1 - 1 / Site.totalSlides - (Site.lindex * 1 / Site.totalSlides)),
    ease: Power4.easeInOut
  });
  Site.animateRandomElements('.random');
  TweenMax.staggerTo(Site.random, 0.4, { x: '24px', opacity: 0, ease: Power2.easeIn }, 0.1, Site.clickablePagination);
};

Site.updatePagination = function updatePagination(direction) {
  if (direction === 'next') {
    Site.multiplier = 1;
    TweenMax.to('#white_circle', 0.9, { strokeDashoffset: 1900 * (1 - 1 / Site.totalSlides - (Site.currentSlide * 1 / Site.totalSlides)), ease: Power4.easeInOut });
  }
  else {
    Site.multiplier = -1;
    if (Site.currentSlide === 1) TweenMax.to('#white_circle', 0.9, { strokeDashoffset: 0, ease: Power4.easeInOut });
    else if (Site.currentSlide === 0) TweenMax.to('#white_circle', 0.9, { strokeDashoffset: 1900 / Site.totalSlides, ease: Power4.easeInOut });
    else TweenMax.to('#white_circle', 0.9, { strokeDashoffset: 1900 - (Site.currentSlide - 1) * 1900 / Site.totalSlides, ease: Power4.easeInOut });
  }

  Site.animateRandomElements('.random');
  TweenMax.staggerTo(Site.random, 0.4, { x: Site.multiplier * 24 + 'px', opacity: 0, ease: Power2.easeIn }, 0.1, Site.scrollablePagination);
};

Site.scrollablePagination = function scrollablePagination() {
  document.querySelectorAll('.random.first').forEach((obj) => obj.classList.remove('first'));

  // Added to prevent classList of null.
  if (document.querySelector('#num_letter .current')) document.querySelector('#num_letter .current').classList.add('after');

  if (Site.multiplier === 1) {
    // Added to prevent classList of null.
    if (document.querySelector('#num_letter .current')) {
      if (document.querySelector('#num_letter .current').nextElementSibling !== null) {
        document.querySelector('#num_letter .current').nextElementSibling.classList.add('before');
        let next = document.querySelector('#num_letter .current').nextElementSibling;

        TweenMax.to('.current .letter', 0.4, { x: '100%', clearProps: 'x', ease: Power4.easeInOut });
        TweenMax.to(document.querySelector('#num_letter .current').nextElementSibling.querySelector('div'), 0.4, {
          x: '0%',
          clearProps: 'x',
          ease: Power4.easeInOut,
          onComplete: () => {
            document.querySelector('#num_letter .current').classList.remove('current', 'after');
            next.classList.add('current');
            next.classList.remove('before');
          }
        });
      }
      else {
        let first = document.querySelector('#num_letter div');

        first.classList.add('before');

        TweenMax.to('.current .letter', 0.4, { x: '100%', clearProps: 'x', ease: Power4.easeInOut });
        TweenMax.to(first.querySelector('div'), 0.4, {
          x: '0%',
          clearProps: 'x',
          ease: Power4.easeInOut,
          onComplete: () => {
            if (document.querySelectorAll('.change_project')[Site.totalSlides - 1].classList.contains('first')) document.querySelectorAll('.change_project')[Site.totalSlides - 1].classList.remove('first');
            document.querySelector('#num_letter .current').classList.remove('current', 'after');
            first.classList.add('current');
            first.classList.remove('before');
          }
        });
      }

      document.getElementById('num_project').innerHTML = Site.currentSlide + 1;
      document.getElementById('title_h2').innerHTML = document.querySelectorAll('#images div')[Site.currentSlide].getAttribute('data-title');
      document.getElementById('type').innerHTML = document.querySelectorAll('#images div')[Site.currentSlide].getAttribute('data-cap');
      document.getElementById('year').innerHTML = document.querySelectorAll('#images div')[Site.currentSlide].getAttribute('data-year');

      // if(UserAgent.iOS) {
      //   if (document.querySelectorAll('#title_h2 span').length <= 2) document.getElementById('title_h2').style.fontSize = '14vw';
      //   else document.getElementById('title_h2').style.fontSize = '11vw';
      // }

      document.querySelectorAll('.update_link').forEach((obj) => obj.setAttribute('href', document.querySelectorAll('#images div')[Site.currentSlide].getAttribute('data-params')));
    }
  }
  else if (document.querySelector('#num_letter .current')) {
    if (document.querySelector('#num_letter .current').previousElementSibling !== null) {
      document.querySelector('#num_letter .current').previousElementSibling.classList.add('before');
      let prev = document.querySelector('#num_letter .current').previousElementSibling;

      TweenMax.to('.current .letter', 0.4, { x: '-100%', clearProps: 'x', ease: Power4.easeInOut });
      TweenMax.fromTo(document.querySelector('#num_letter .current').previousElementSibling.querySelector('div'), 0.4, {
        x: '100%'
      }, {
        x: '0%',
        clearProps: 'x',
        ease: Power4.easeInOut,
        onComplete: () => {
          document.querySelector('#num_letter .current').classList.remove('current', 'after');
          prev.classList.add('current');
          prev.classList.remove('before');
        }
      });
    }
    else {
      let last = document.querySelectorAll('#num_letter > div')[Site.totalSlides - 1];

      last.classList.add('before');

      TweenMax.to('.current .letter', 0.4, { x: '-100%', clearProps: 'x', ease: Power4.easeInOut });
      TweenMax.fromTo(last.querySelector('div'), 0.4, {
        x: '100%'
      }, {
        x: '0%',
        clearProps: 'x',
        ease: Power4.easeInOut,
        onComplete: () => {
          document.querySelector('#num_letter .current').classList.remove('current', 'after');
          last.classList.add('current');
          last.classList.remove('before');
        }
      });
    }

    if (Site.currentSlide === 1) {
      document.getElementById('num_project').innerHTML = Site.totalSlides;
      document.getElementById('title_h2').innerHTML = document.querySelectorAll('#images div')[Site.totalSlides - 1].getAttribute('data-title');
      document.getElementById('type').innerHTML = document.querySelectorAll('#images div')[Site.totalSlides - 1].getAttribute('data-cap');
      document.getElementById('year').innerHTML = document.querySelectorAll('#images div')[Site.totalSlides - 1].getAttribute('data-year');
      document.querySelectorAll('.update_link').forEach((x) => x.setAttribute('href', document.querySelectorAll('#images div')[Site.totalSlides - 1].getAttribute('data-params')));
    }
    else if (Site.currentSlide === 0) {
      document.getElementById('num_project').innerHTML = Site.totalSlides - 1;
      document.getElementById('title_h2').innerHTML = document.querySelectorAll('#images div')[Site.totalSlides - 2].getAttribute('data-title');
      document.getElementById('type').innerHTML = document.querySelectorAll('#images div')[Site.totalSlides - 2].getAttribute('data-cap');
      document.getElementById('year').innerHTML = document.querySelectorAll('#images div')[Site.totalSlides - 2].getAttribute('data-year');
      document.querySelectorAll('.update_link').forEach((x) => x.setAttribute('href', document.querySelectorAll('#images div')[Site.totalSlides - 2].getAttribute('data-params')));
    }
    else {
      document.getElementById('num_project').innerHTML = Site.currentSlide - 1;
      document.getElementById('title_h2').innerHTML = document.querySelectorAll('#images div')[Site.currentSlide - 2].getAttribute('data-title');
      document.getElementById('type').innerHTML = document.querySelectorAll('#images div')[Site.currentSlide - 2].getAttribute('data-cap');
      document.getElementById('year').innerHTML = document.querySelectorAll('#images div')[Site.currentSlide - 2].getAttribute('data-year');
      document.querySelectorAll('.update_link').forEach((x) => x.setAttribute('href', document.querySelectorAll('#images div')[Site.currentSlide - 2].getAttribute('data-params')));
    }
  }

  document.querySelectorAll('#title_h2 span').forEach(Site.addRandomClass);
  Site.animateRandomElements('.random');
  TweenMax.staggerFromTo(Site.random, 1, { x: -Site.multiplier * 24 + 'px', opacity: 0 }, { x: '0px', opacity: 1, ease: Power2.easeOut }, 0.1);
};

Site.clickablePagination = function clickablePagination() {
  document.querySelector('#num_letter .current').classList.add('after');
  TweenMax.to('.current .letter', 0.4, { x: '100%', clearProps: 'x', ease: Power4.easeInOut });
  document.querySelectorAll('#num_letter > div')[Site.lindex].classList.add('before');

  TweenMax.to(document.querySelectorAll('#num_letter > div')[Site.lindex].querySelector('div'), 0.4, {
    x: '0%',
    clearProps: 'x',
    ease: Power4.easeInOut,
    onComplete: () => {
      document.querySelector('#num_letter .current').classList.remove('current', 'after');
      document.querySelectorAll('#num_letter > div')[Site.lindex].classList.add('current');
      document.querySelectorAll('#num_letter > div')[Site.lindex].classList.remove('before');
    }
  });

  // if (document.querySelector('#num_letter .current').nextElementSibling !== null) {
  //     document.querySelector('#num_letter .current').nextElementSibling.classList.add('before');
  //     var next = document.querySelector('#num_letter .current').nextElementSibling;
  //     TweenMax.to('.current .letter', 0.4, {x: '100%', clearProps: 'x', ease: Power4.easeInOut});
  //     TweenMax.to(document.querySelector('#num_letter .current').nextElementSibling.querySelector('div'), 0.4, {x: '0%', clearProps: 'x', ease: Power4.easeInOut, onComplete: () => {
  //         document.querySelector('#num_letter .current').classList.remove('current','after');
  //         next.classList.add('current');
  //         next.classList.remove('before');
  //     }});
  // } else {
  //     var first = document.querySelector('#num_letter div');
  //     first.classList.add('before');

  //     TweenMax.to('.current .letter', 0.4, {x: '100%', clearProps: 'x', ease: Power4.easeInOut});
  //     TweenMax.to(first.querySelector('div'), 0.4, {x: '0%', clearProps: 'x', ease: Power4.easeInOut, onComplete: () => {
  //         document.querySelector('#num_letter .current').classList.remove('current','after');
  //         first.classList.add('current');
  //         first.classList.remove('before');
  //     }});
  // }

  document.getElementById('num_project').innerHTML = Site.lindex + 1;
  document.getElementById('title_h2').innerHTML = document.querySelectorAll('#images div')[Site.lindex].getAttribute('data-title');
  document.getElementById('type').innerHTML = document.querySelectorAll('#images div')[Site.lindex].getAttribute('data-cap');
  document.getElementById('year').innerHTML = document.querySelectorAll('#images div')[Site.lindex].getAttribute('data-year');

  /* NodeList.prototype.forEach = NodeList.prototype.forEach || Array.prototype.forEach; */
  document.querySelectorAll('.update_link').forEach((obj) => obj.setAttribute('href', document.querySelectorAll('#images div')[Site.lindex].getAttribute('data-params')));
  document.querySelectorAll('#title_h2 span').forEach(Site.addRandomClass);

  Site.animateRandomElements('.random');
  TweenMax.staggerFromTo(Site.random, 1, { x: '-24px', opacity: 0 }, { x: '0px', opacity: 1, ease: Power2.easeOut }, 0.1);
};

/*----------------------------------------------------------------------------*/
/*            Pixi on mousemove/touchmove displacement intensity              */
/*----------------------------------------------------------------------------*/

Site.increaseDisplacementIntensity = function increaseDisplacementIntensity() {
  Site.speed = 2;
  var options = { intensity: 0, x: 4 };

  TweenMax.to(options, 0.9, {
    intensity: 150,
    x: 6,
    ease: Power2.easeIn,
    onUpdate: () => {
      Site.displacementFilter2.scale.x = options.intensity;
      Site.speed = options.x;
    }
  });
};

Site.decreaseDisplacementIntensity = function decreaseDisplacementIntensity() {
  Site.speed = 3;
  var options = { intensity: 150, x: 6 };

  TweenMax.to(options, 0.9, {
    intensity: 0,
    x: 2,
    ease: Power2.easeOut,
    onUpdate: () => {
      Site.displacementFilter2.scale.x = options.intensity;
      Site.speed = options.x;
    }
  });
};

/*----------------------------------------------------------------------------*/
/*                           Next Project Button                              */
/*----------------------------------------------------------------------------*/

Site.onHoverNext = function onHoverNext(event) {
  if (Site.playOnce === !1) {
    Site.playOnce = !0;
    Site.animateRandomElements('#to_next_project span');
    TweenMax.staggerTo(Site.random, 0.4, { opacity: 0, ease: Power2.easeIn }, 0.05, Site.animateNextBtn);
    TweenMax.to('#inner_project_name', 0.4, { x: (document.getElementById('project_name').clientWidth + 10) / 2 + 'px', delay: 0.4, ease: Power2.easeOut });
    TweenMax.staggerTo('.stag', 0.4, { opacity: 1, delay: 0.4, ease: Power2.easeOut }, -0.02);
  }
};

Site.offHoverNext = function offHoverNext(event) {
  if (Site.playOnce === !0) {
    Site.playOnce = !1;
    Site.animateRandomElements('#to_next_project span');
    TweenMax.staggerTo(Site.random, 0.4, { opacity: 0, ease: Power2.easeIn }, 0.05, Site.animateNextInnerBtn);
  }
};

Site.animateNextBtn = function animateNextBtn() {
  document.getElementById('to_next_project').innerHTML = document.getElementById('to_next_project').getAttribute('data-next');
  TweenMax.set('#to_next_project span', { opacity: 0 });
  Site.animateRandomElements('#to_next_project span');
  TweenMax.staggerTo(Site.random, 0.4, { opacity: 1, ease: Power2.easeOut }, 0.05);
};

Site.animateNextInnerBtn = function animateNextInnerBtn() {
  document.getElementById('to_next_project').innerHTML = '<span>N</span><span>e</span><span>x</span><span>t</span>';
  TweenMax.set('#to_next_project span', { opacity: 0 });
  Site.animateRandomElements('#to_next_project span');
  TweenMax.staggerTo(Site.random, 0.4, { opacity: 1, ease: Power2.easeOut }, 0.05);
  TweenMax.to('#inner_project_name', 0.4, { x: '0px', ease: Power2.easeOut });
  TweenMax.staggerTo('.stag', 0.4, { opacity: 0, ease: Power2.easeOut }, 0.02);
};


/*----------------------------------------------------------------------------*/
/*                           HELP FUNCTIONS - START                           */
/*----------------------------------------------------------------------------*/

Site.animateRandomElements = function animateRandomElements(element) {
  Site.random = [];
  document.querySelectorAll(element).forEach((obj) => Site.random.push(obj));
  Site.random.sort(() => 0.5 - Math.random());
};

Site.addRandomClass = function addRandomClass(item, index) {
  item.classList.add('random');
};

Site.mousePositionHandler = function mousePositionHandler(event) {
  Site.currentMousePos.x = event.pageX;
  Site.currentMousePos.y = event.pageY;
};

Site.scrollToTop = function scrollToTop(destination, duration, easing, callback) {
  const easings = {
    linear(t) {
      return t;
    },
    easeInQuad(t) {
      return t * t;
    },
    easeOutQuad(t) {
      return t * (2 - t);
    },
    easeInOutQuad(t) {
      return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    },
    easeInCubic(t) {
      return t * t * t;
    },
    easeOutCubic(t) {
      return (--t) * t * t + 1;
    },
    easeInOutCubic(t) {
      return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    },
    easeInQuart(t) {
      return t * t * t * t;
    },
    easeOutQuart(t) {
      return 1 - (--t) * t * t * t;
    },
    easeInOutQuart(t) {
      return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t;
    },
    easeInQuint(t) {
      return t * t * t * t * t;
    },
    easeOutQuint(t) {
      return 1 + (--t) * t * t * t * t;
    },
    easeInOutQuint(t) {
      return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t;
    }
  };

  const start = window.pageYOffset;
  const startTime = 'now' in window.performance ? performance.now() : new Date().getTime();

  const documentHeight = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight);
  const windowHeight = window.innerHeight || document.documentElement.clientHeight || document.getElementsByTagName('body')[0].clientHeight;
  const destinationOffset = typeof destination === 'number' ? destination : destination.offsetTop;
  const destinationOffsetToScroll = Math.round(documentHeight - destinationOffset < windowHeight ? documentHeight - windowHeight : destinationOffset);

  if ('requestAnimationFrame' in window === false) {
    window.scroll(0, destinationOffsetToScroll);
    if (callback) callback();
    return;
  }

  function scroll() {
    const now = 'now' in window.performance ? performance.now() : new Date().getTime();
    const time = Math.min(1, ((now - startTime) / duration));
    const timeFunction = easings[easing](time);

    window.scroll(0, Math.ceil((timeFunction * (destinationOffsetToScroll - start)) + start));

    if (window.pageYOffset === destinationOffsetToScroll) {
      if (callback) callback();
      return;
    }

    requestAnimationFrame(scroll);
  }

  scroll();
};

/* --- INITIATE APP --- */
document.addEventListener('DOMContentLoaded', () => Site.setup());
