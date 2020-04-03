/*
 * NOTES:
 * !0 ---> true
 * !1 ---> false
 */

PIXI.utils.skipHello();

var UserAgent = UserAgent || {};

UserAgent = {
  internetExplorer: !1,
  edge: !1,
  iOS: !1,
  android: !1,
  string: '',
  init: () => {
    UserAgent.string = window.navigator.userAgent;
    let a = UserAgent.string;

    UserAgent.iOS = a.match(/iPhone|iPad|iPod/i);

    UserAgent.iOS || (
      UserAgent.android = a.match(/Android/i),
      UserAgent.android || (
        UserAgent.edge = a.indexOf('Edge/') > 0,
        UserAgent.edge || (
          UserAgent.internetExplorer = (
            a.indexOf('Trident/') > 0
            || a.indexOf('MSIE ') > 0
            || a.indexOf('Chrome') > 0
            || a.indexOf('Safari') > 0
            || a.indexOf('Firefox') > 0
            || a.indexOf('Opera') > 0
            || a.indexOf('OPR') > 0
          )
        )
      )
    );
  }
};

var AboutRAFs = AboutRAFs || {};

AboutRAFs = {
  rafScaleAbout: null,
  init: () => {
    AboutRAFs.rafScaleAbout = requestAnimationFrame(AboutRAFs.init);
    AboutRAFs.updateRotation();
    AboutRAFs.updateScaleX();
  },
  updateRotation: () => {
    if (Site.scrolling !== null) {
      TweenMax.to('#inner_svg', 1, { rotation: Math.ceil(-Site.scrolling.vars.current / 4), ease: Linear.easeNone });
      TweenMax.to('#inner_svg img', 1, { rotation: Math.ceil(Site.scrolling.vars.current / 4), ease: Linear.easeNone });

      Math.abs((Site.scrolling.vars.current - Site.deltaScroll) / 200 + 1) < 2.2
        ? Site.intensity = Math.abs((Site.scrolling.vars.current - Site.deltaScroll) / 200 + 1)
        : Site.intensity = 2.2;

      Site.deltaScroll = Site.scrolling.vars.current;
    }
    else {
      TweenMax.to('#inner_svg', 1, { rotation: -window.pageYOffset / 4, ease: Linear.easeNone });
      TweenMax.to('#inner_svg img', 1, { rotation: window.pageYOffset / 4, ease: Linear.easeNone });

      Math.abs((window.pageYOffset - Site.deltaScroll) / 200 + 1) < 2.2
        ? Site.intensity = Math.abs((window.pageYOffset - Site.deltaScroll) / 200 + 1)
        : Site.intensity = 2.2;

      Site.deltaScroll = window.pageYOffset;
    }
  },
  updateScaleX: () => {
    // TEST CODE BELLOW
    !UserAgent.iOS && TweenMax.to('.scaleA', 1.4, { scaleX: Site.intensity, ease: Power2.easeOut });
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
    let timeout;

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
    let timeout;

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
  rafPixiMenu: null,
  init: () => {
    MenuPixi.rafPixiMenu = requestAnimationFrame(MenuPixi.init);
    Site.rendererMenu.render(Site.stageMenu);
    Site.displacementSprite3.x += 2;
    MenuPixi.calculateMousePosition();
    MenuPixi.updateNavLinksPos();
    window.innerWidth > 767 && MenuPixi.updatePixiDisplacement();
    Site.deltaMenu = Site.theDeltaMenu;
  },
  calculateMousePosition: () => {
    Math.abs((Site.theDeltaMenu - Site.deltaMenu) / 200 + 1) < 1.8 ? Site.intensity = Math.abs((Site.theDeltaMenu - Site.deltaMenu) / 200 + 1) : Site.intensity = 1.8;
  },
  updateNavLinksPos: () => {
    // TEST CODE BELLOW
    if (!UserAgent.iOS) {
      Site.cursorPercentage = Math.round(Site.currentMousePos.y * 100 / window.innerHeight * 100) / 100;
      Site.theDeltaMenu = Site.currentMousePos.y;
      let expression = -1 * (Site.menuHeight - window.innerHeight) / window.innerHeight * Site.currentMousePos.y;
      TweenMax.to('#nav__menu__links', 1.4, { y: expression + 'px', scaleY: Site.intensity, ease: Power2.easeOut });
    }
    else {
      Site.cursorPercentage = window.pageYOffset * 100 / (Site.menuHeight - window.innerHeight);
      Site.theDeltaMenu = window.pageYOffset;
      TweenMax.to('#nav__menu__links', 1.4, { scaleY: Site.intensity, ease: Power2.easeOut });
    }
  },
  updatePixiDisplacement: () => {
    // TEST CODE BELLOW
    Site.cursorPercentage > Site.heightMargin && Site.cursorPercentage < (100 - Site.heightMargin) && Site.pixiMenuLinks.forEach(Site.checkMenu);
    Site.displace.intensity = Site.displacementFilter3.scale.x;
    TweenMax.to(Site.displace, 0.3, {
      intensity: 4 * (Site.theDeltaMenu - Site.deltaMenu),
      ease: Linear.easeNone,
      onUpdate: () => {
        Site.displacementFilter3.scale.x = Site.displace.intensity;
      }
    });
  }
};

var Menu = Menu || {};

Menu = {
  isOpen: !1,
  button: null,
  arrowHidingTimeout: null,
  menuClosingTimeout: null,
  init: () => {
    Menu.logo = document.querySelector('.logo');
    Menu.button = document.querySelector('.projects');
    Menu.social = document.getElementById('social');
    Menu.navMenu = document.getElementById('nav__menu');
    Menu.navHeader = document.getElementById('nav__header');

    Menu.button.isArrow = !1;
    Menu.button.isOpen = !1;

    MenuPixi.rafPixiMenu && cancelAnimationFrame(MenuPixi.rafPixiMenu); // Fixes issue where when click on nav menu links when it is opened, pixi repple efffect doesn't intitiate due to bollean property set on INIT();
  },
  open: () => {
    Menu.button.classList.remove('closing');
    Menu.button.classList.add('opened');

    Drag.cursorMain.classList.remove('vertical_scroll');
    Drag.cursorJunior.classList.remove('vertical_scroll');

    Site.scrolling !== null ? Site.scrolling.off() : Site.scrollMenuOpen = window.pageYOffset;

    document.querySelectorAll('.front.point3, .front .point3').forEach((obj) => obj.classList.add('black'));
    Menu.navMenu.style.display = 'block';

    // TweenMax.to('.feature1', 0.2, { scaleY: 0, delay: 0.2, ease: Power2.easeIn });

    TweenMax.to('#main__content', 0.2, {
      opacity: 0,
      display: 'none',
      ease: Power2.easeIn,
      onComplete: () => {
        UserAgent.iOS && (
          window.scrollTo(0, 0),
          // window.scrollTo(Site.scrollMenuOpen, 0),
          Site.main.classList.add('black'),
          Site.body.classList.add('temp')
        );
      }
    });

    TweenMax.to('#nav__menu', 0.2, { opacity: 1, delay: 0.2, ease: Power2.easeOut });

    Site.menuHeight = document.getElementById('nav__menu__links').clientHeight;
    Site.margins = window.innerHeight / 2 - 70;
    Site.heightMargin = Math.round((100 - (Site.menuHeight - 2 * Site.margins) * 100 / Site.menuHeight) / 2 * 100) / 100;
    Site.menuEntrance = document.getElementById('nav__menu__links').querySelectorAll('li').length;
    Site.entranceHeight = Math.round((100 - 2 * Site.heightMargin) / Site.menuEntrance * 100) / 100;

    Site.stageMenu.addChild(Site.displacementSprite3);

    /* menu_image0 returned by PixiJS */
    // eslint-disable-next-line camelcase
    let imageSprite = menu_image0;

    Site.stageMenu.addChild(imageSprite);
    imageSprite.alpha = 1;

    Site.rafPixiHome && cancelAnimationFrame(Site.rafPixiHome);
    Site.rafPixiSingle && cancelAnimationFrame(Site.rafPixiSingle);
    AboutRAFs.rafScaleAbout && cancelAnimationFrame(AboutRAFs.rafScaleAbout);

    Menu.button.isOpen = !0;

    MenuPixi.init();
  },
  close: () => {
    Menu.button.classList.remove('opened');
    Menu.button.classList.add('closing');

    Menu.menuClosingTimeout && clearTimeout(Menu.menuClosingTimeout);

    Menu.menuClosingTimeout = setTimeout(() => {
      Menu.button.classList.remove('closing');
      clearTimeout(Menu.menuClosingTimeout);
      Menu.menuClosingTimeout = null;
    }, 1250); // delay is unusally long

    if (Site.scrolling !== null) Site.scrolling.on();
    else if (Site.body.classList.contains('home')) document.querySelectorAll('.front.point3, .front .point3').forEach((obj) => obj.classList.remove('black'));

    TweenMax.to('#nav__menu', 0.2, {
      opacity: 0,
      ease: Power2.easeIn,
      onComplete: () => {
        Menu.navMenu.style.display = 'none';
        UserAgent.iOS && (window.scrollTo(0, 0), Site.main.classList.remove('black'), Site.body.classList.remove('temp'));
      }
    });

    TweenMax.to('#main__content', 0.2, { opacity: 1, display: 'block', delay: 0.2, ease: Power2.easeOut });
    // TweenMax.to('.feature1', 0.2, { scaleY: 1, delay: 0.2, ease: Power2.easeIn });

    Site.stageMenu.removeChildren();
    MenuPixi.rafPixiMenu && cancelAnimationFrame(MenuPixi.rafPixiMenu); // do not remove

    // TEST CODE BELLOW
    document.querySelector('body').classList.contains('home')
      ? Site.homePixi()
      : document.querySelector('body').classList.contains('single')
        ? Site.singlePixi()
        : null;

    Site.body.classList.contains('about') && AboutRAFs.init();
    Menu.button.isOpen = !1; // false
  },
  showArrow: () => {
    Menu.arrowHidingTimeout && (clearTimeout(Menu.arrowHidingTimeout), Menu.arrowHidingTimeout = null);
    Menu.button.isArrow === !1 && (Menu.button.isArrow = !0);

    Menu.button.classList.remove('arrow-transition-out');
    Menu.button.classList.add('arrow-transition-in');
  },
  hideArrow: () => {
    // Menu.button.isArrow === !0 && (Menu.button.isArrow = !1);
    if (Menu.button.classList.contains('arrow-transition-in')) {
      Menu.arrowHidingTimeout && (clearTimeout(Menu.arrowHidingTimeout), Menu.arrowHidingTimeout = null);

      Menu.button.classList.remove('arrow-transition-in');
      Menu.button.classList.add('arrow-transition-out');

      Menu.arrowHidingTimeout = setTimeout(() => {
        Menu.button.classList.remove('arrow-transition-out');
        clearTimeout(Menu.arrowHidingTimeout);
        Menu.arrowHidingTimeout = null;
        Menu.button.isArrow === !0 && (Menu.button.isArrow = !1);
      }, 500);
    }
  },
  arrowUpdateHandler: () => {
    return Site.scrolling && Site.scrolling.vars.target >= 10
      ? Menu.showArrow()
      : Site.scrolling.vars.target <= 10
        ? Menu.hideArrow()
        : false;
  },
  showHideArrow: () => {
    // TEST CODE BELLOW
    if (!Menu.button.isOpen) {
      if (!UserAgent.iOS) {
        Site.body.classList.contains('single')
          ? (Menu.arrowUpdateHandler(), Site.footerInView())
          : Site.body.classList.contains('about')
            ? Menu.arrowUpdateHandler()
            : null;
      }
      else {
        if (Site.body.classList.contains('single')) {
          window.pageYOffset >= 10
            ? Menu.showArrow()
            : window.pageYOffset <= 10
              ? Menu.hideArrow()
              : console.log('showHideArrow => default action required'); // --- OR --- return Menu.hideArrow() as final block statement // : null;

          window.innerHeight + Math.round(window.pageYOffset) >= (document.body.offsetHeight - 34) ? Theme.lightStyle() : Theme.darkStyle();
        }
        else if (Site.body.classList.contains('about')) window.pageYOffset >= 10 ? Menu.showArrow() : Menu.hideArrow();
      }
    }
  },
  lightFooter: () => {
    Menu.button.classList.add('light');
    Menu.social.classList.add('light');
    Menu.logo.classList.add('light');
    // Site.about.classList.add('light');
    // Site.contact.classList.add('light');
  },
  darkFooter: () => {
    Menu.button.classList.remove('light');
    Menu.social.classList.remove('light');
    Menu.logo.classList.remove('light');
    // Site.about.classList.remove('light');
    // Site.contact.classList.remove('light');
  },
  hideNavMenu: () => {
    TweenMax.set('#nav__header', { opacity: 0 }); // Menu.navHeader.style.display = 'none';
  },
  showNavMenu: () => {
    TweenMax.set('#nav__header', { opacity: 1 }); // Menu.navHeader.style.display = 'block';
  }
};

var Drag = Drag || {};

Drag = {
  isDown: !1,
  threshold: 100,
  isDrag: !0,
  isScroll: !0,
  init: () => {
    Drag.cursorMain = document.getElementsByClassName('cursor_main')[0];
    Drag.cursorJunior = document.getElementsByClassName('cursor_junior')[0];

    Drag.isDrag = !1;
    Drag.isScroll = !1;

    Site.body.classList.contains('home') && (
      document.addEventListener('mousedown', Throttle.actThenThrottleEvents(Drag.start, 500), !1),
      document.addEventListener('mousemove', Throttle.actThenThrottleEvents(Drag.move, 500), !1),
      document.addEventListener('mouseup', Throttle.actThenThrottleEvents(Drag.end, 500), !1),

      document.onmousedown = Drag.start,
      document.onmousemove = Drag.move,
      document.onmouseup = Drag.end
    );
  },
  start: (event) => {
    event = event || window.event;
    event.preventDefault() || false;

    Drag.isDown = !0;
    Site.startPosition = event.pageX;
    Site.body.classList.add('dragging'); // IS THIS NECESSARY?

    event.type === 'ontouchstart'
      ? Site.posX1 = event.touches[0].clientX
      : (
        Site.posX1 = event.clientX,
        document.onmouseup = Drag.end,
        document.onmousemove = Drag.move
      );
  },
  move: (event) => {
    event = event || window.event;
    event.preventDefault() || false;

    if (!Drag.isDown) return;

    event.type === 'ontouchmove'
      ? (
        Site.posX2 = Site.posX1 - event.touches[0].clientX,
        Site.posX1 = event.touches[0].clientX
      ) : (
        Site.posX2 = Site.posX1 - event.clientX,
        Site.posX1 = event.clientX
      );
  },
  end: (event) => {
    event = event || window.event;
    event.preventDefault() || false;

    Drag.isDown = !1;
    Site.finishPosition = event.pageX;
    Site.body.classList.remove('dragging'); // Used during DEVELOPMENT

    (Site.finishPosition - Site.startPosition < -Drag.threshold) && Site.blockedAction === !1
      ? Site.nextSlide()
      : (Site.finishPosition - Site.startPosition > Drag.threshold) && Site.blockedAction === !1
        ? Site.prevSlide()
        : false;

    document.onmouseup = null;
    document.onmousemove = null;
  },
  toggleVisible: () => {
    Drag.cursorMain.classList.add('visible');
    Drag.cursorJunior.classList.add('visible');
  },
  toggleHidden: () => {
    Drag.cursorMain.classList.remove('visible');
    Drag.cursorJunior.classList.remove('visible');
  },
  show: () => {
    Drag.isDrag = !0;
    Drag.isScroll = !1;

    Drag.cursorMain.classList.remove('vertical_scroll');
    Drag.cursorJunior.classList.remove('vertical_scroll');
    Drag.cursorMain.classList.add('mainDrag');
    Drag.cursorJunior.classList.add('j_Drag');
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

var LazyLoad = LazyLoad || {};

LazyLoad = {
  init: () => {
    LazyLoad.images = [].concat(LazyLoad.toConsumableArray(document.querySelectorAll('.lazy-image')));
    LazyLoad.interactSettings = { root: document.querySelector('.inner_img'), rootMargin: '0px 0px 200px 0px' };
    LazyLoad.observer = new IntersectionObserver(LazyLoad.onIntersection, LazyLoad.interactSettings);
    LazyLoad.images.forEach((image) => LazyLoad.observer.observe(image));
  },
  toConsumableArray: (arr) => {
    if (Array.isArray(arr)) {
      let arr2 = Array(arr.length);
      for (let i = 0; i < arr.length; i++) {
        arr2[i] = arr[i];
      }
      return arr2;
    }
    return Array.from(arr);
  },
  onIntersection: (imageEntites) => {
    imageEntites.forEach((image) => {
      if (image.isIntersecting) {
        LazyLoad.observer.unobserve(image.target);
        image.target.src = image.target.dataset.src;
        image.target.onload = () => image.target.classList.add('loaded');
      }
    });
  }
};

var SunMoon = SunMoon || {};

SunMoon = {
  DEFAULT_ZENITH: 90.8333, /** Default zenith */
  DEGREES_PER_HOUR: 360 / 24, /** Degrees per hour */
  MSEC_IN_HOUR: 60 * 60 * 1000, /** Msec in hour */
  lat: null,
  lng: null,
  options: {
    enableHighAccuracy: false // enableHighAccuracy = should the device take extra time or power to return a really accurate result, or should it give you the quick (but less accurate) answer?
    // timeout: 0, // timeout = how long does the device have, in milliseconds to return a result?
    // maximumAge: 0 // maximumAge = maximum age for a possible previously-cached position. 0 = must return the current position, not a prior cached position
  },
  init: () => {
    /**
      * @param - {name} - {String} - 'geolocation'
      * @param - {res} - permissionStatus
     **/
    // navigator.permissions
    //   .query({ name: 'geolocation' })
    //   .then((res) => {
    //     if (res.state === 'granted') {
    //       SunMoon.permissionGranted = res.state;
    //       // console.log('res.state - granted --+->', res.state);
    //       // SunMoon.geoIsAllowed();
    //     }
    //     else if (res.state === 'denied') {
    //       SunMoon.permissionGranted = res.state;
    //       // console.log('res.state - denied --+->', res.state);
    //     }
    //     else {
    //       SunMoon.permissionGranted = res.state;
    //       // console.log('res.state = prompt --+->', res.state);
    //       // SunMoon.geoIsAllowed();
    //     }
    //
    //     res.onchange = ((event) => {
    //       if (event.type === 'change') {
    //         const newState = event.target.state;
    //         if (newState === 'granted') {
    //           SunMoon.permissionGranted = newState;
    //           // console.log('We will be together forever! --+->>', newState);
    //           // SunMoon.geoIsAllowed();
    //         }
    //         else if (newState === 'denied') {
    //           SunMoon.permissionGranted = newState;
    //           // console.log('why did you decide to block us? --+->>', newState);
    //         }
    //         else {
    //           SunMoon.permissionGranted = newState;
    //           // console.log('Thanks for reverting things back to normal --+->>', newState);
    //           // SunMoon.geoIsAllowed();
    //         }
    //       }
    //     });
    //   });

    // 'geolocation' in navigator && (SunMoon.permissionGranted === 'prompt' && SunMoon.geoIsAllowed());
    'geolocation' in navigator && (
      // SunMoon.requestLocation(),
      SunMoon.sunset = SunMoon.getSunset(SunMoon.lat, SunMoon.lng), /** Sunset tonight at the Triggertrap office for today */
      SunMoon.sunrise = SunMoon.getSunrise(SunMoon.lat, SunMoon.lng) /** Sunrise at London on Spring day 2020 */
    );
  },
  requestLocation: () => {
    navigator.geolocation.getCurrentPosition(SunMoon.onSuccess, SunMoon.onError, SunMoon.options); // call getCurrentPosition()
    // navigator.geolocation.watchPosition(SunMoon.onSuccess, SunMoon.onError, SunMoon.options); // call getCurrentPosition()
  },
  onSuccess: (position) => {
    /** Combined with geolocation. Sunset tonight at your location. */
    SunMoon.lat = position.coords.latitude;
    SunMoon.lng = position.coords.longitude;
  },
  onError: (position) => {
    console.log('Geolocation error', error);
  },
  getDayOfYear: (date) => {
    /**
    * Get day of year
    * @param {Date} date
    * @returns {Number}
    */
    return Math.ceil((date.getTime() - new Date(date.getFullYear(), 0, 1).getTime()) / 8.64e7);
  },
  sinDeg: (deg) => {
    /**
    * Get sin of value in deg
    * @param {Number} deg
    * @returns {Number}
    */
    return Math.sin(deg * 2.0 * Math.PI / 360.0);
  },
  acosDeg: (x) => {
    /**
    * Get acos of value in deg
    * @param {Number} x
    * @returns {Number}
    */
    return Math.acos(x) * 360.0 / (2 * Math.PI);
  },
  asinDeg: (x) => {
    /**
    * Get asin of value in deg
    * @param {Number} x
    * @returns {Number}
    */
    return Math.asin(x) * 360.0 / (2 * Math.PI);
  },
  tanDeg: (deg) => {
    /**
    * Get tan of value in deg
    * @param {Number} deg
    * @returns {Number}
    */
    return Math.tan(deg * 2.0 * Math.PI / 360.0);
  },
  cosDeg: (deg) => {
    /**
    * Get cos of value in deg
    * @param {Number} deg
    * @returns {Number}
    */
    return Math.cos(deg * 2.0 * Math.PI / 360.0);
  },
  mod: (a, b) => {
    /**
    * Get ramainder
    * @param {Number} a
    * @param {Number} b
    * @returns {Number}
    */
    const result = a % b;
    return result < 0 ? result + b : result;
  },
  calculate: (latitude, longitude, isSunrise, zenith, date) => {
    /**
    * Calculate Date for either sunrise or sunset
    * @param {Number} latitude
    * @param {Number} longitude
    * @param {boolean} isSunrise
    * @param {Number} zenith
    * @param {Date} date
    * @returns {Date}
    */

    const dayOfYear = SunMoon.getDayOfYear(date);
    const hoursFromMeridian = longitude / SunMoon.DEGREES_PER_HOUR;
    const approxTimeOfEventInDays = isSunrise ? dayOfYear + ((6 - hoursFromMeridian) / 24) : dayOfYear + ((18.0 - hoursFromMeridian) / 24);

    const sunMeanAnomaly = (0.9856 * approxTimeOfEventInDays) - 3.289;
    const sunTrueLongitude = SunMoon.mod(sunMeanAnomaly + (1.916 * SunMoon.sinDeg(sunMeanAnomaly)) + (0.020 * SunMoon.sinDeg(2 * sunMeanAnomaly)) + 282.634, 360);
    const ascension = 0.91764 * SunMoon.tanDeg(sunTrueLongitude);

    let rightAscension;
    rightAscension = 360 / (2 * Math.PI) * Math.atan(ascension);
    rightAscension = SunMoon.mod(rightAscension, 360);

    const lQuadrant = Math.floor(sunTrueLongitude / 90) * 90;
    const raQuadrant = Math.floor(rightAscension / 90) * 90;
    rightAscension = rightAscension + (lQuadrant - raQuadrant);
    rightAscension /= SunMoon.DEGREES_PER_HOUR;

    const sinDec = 0.39782 * SunMoon.sinDeg(sunTrueLongitude);
    const cosDec = SunMoon.cosDeg(SunMoon.asinDeg(sinDec));
    const cosLocalHourAngle = ((SunMoon.cosDeg(zenith)) - (sinDec * (SunMoon.sinDeg(latitude)))) / (cosDec * (SunMoon.cosDeg(latitude)));
    const localHourAngle = isSunrise ? 360 - SunMoon.acosDeg(cosLocalHourAngle) : SunMoon.acosDeg(cosLocalHourAngle);
    const localHour = localHourAngle / SunMoon.DEGREES_PER_HOUR;
    const localMeanTime = localHour + rightAscension - (0.06571 * approxTimeOfEventInDays) - 6.622;
    const time = SunMoon.mod(localMeanTime - (longitude / SunMoon.DEGREES_PER_HOUR), 24);
    const utcMidnight = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());

    // Created date will be set to local (system) time zone.
    return new Date(utcMidnight + (time * SunMoon.MSEC_IN_HOUR));
  },
  getSunrise: (latitude, longitude, date = new Date()) => {
    /**
    * Calculate Sunrise time for given longitude, latitude, zenith and date
    * @param {Number} latitude
    * @param {Number} longitude
    * @param {Date} [date]
    * @returns {Date}
    */
    return SunMoon.calculate(latitude, longitude, true, SunMoon.DEFAULT_ZENITH, date);
  },
  getSunset: (latitude, longitude, date = new Date()) => {
    /**
    * Calculate Sunset time for given longitude, latitude, zenith and date
    * @param {Number} latitude
    * @param {Number} longitude
    * @param {Date} [date]
    * @returns {Date}
    */
    return SunMoon.calculate(latitude, longitude, false, SunMoon.DEFAULT_ZENITH, date);
  }
};

var Preload = Preload || {};

Preload = {
  /** @NOTE - USAGE
    * <p class="preload-counter"></p>
    *
    * <div id="state"></div>
    * <div id="progressId">...</div>
    * <div id="progressbar">
    *   <div class="bar"></div>
    * </div>
   **/
  init: () => {
    // Preload.$state = document.querySelector('#state');
    // Preload.$progress = document.querySelector('#progressId');
    // Preload.$progressbar = document.querySelector('#progressbar .bar');
    // Preload.allImages = document.querySelectorAll("[data-img^='../images']");

    // console.log('Preload.allImages', Preload.allImages);

    /*------------------------------------------------------------------------*/
    /*                             PRELOAD ASSETS                             */
    /*------------------------------------------------------------------------*/
    // Site.preload.on('fileload', Site.handlePreloadFileLoad);
    // Site.preload.on('progress', Site.handlePreloadProgress);
    // Site.preload.on('fileprogress', Site.handlePreloadProgress);
    // Site.preload.on('complete', Site.handleFileProgress);
    // Site.preload.on('error', Site.handleFileError);

    // Site.preload.on('complete', Preload.onComplete);
    // Site.preload.on('error', Preload.onError);
    // Site.preload.on('fileload', Preload.onFileLoad);
    // Site.preload.on('fileprogress', Preload.onFileProgress);
    // Site.preload.on('progress', Preload.onProgress);
    // Site.preload.setMaxConnections(5);

    // Push each item into our manifest
    // Preload.manifest = [
    //   'image0.jpg',
    //   'image1.jpg',
    //   'image2.jpg',
    //   'image3.jpg',
    //   'Autumn.png',
    //   'BlueBird.png',
    //   'Nepal.jpg',
    //   'Texas.jpg'
    // ];

    // Site.preload.loadFile();

    // Site.preload.loadManifest(Preload.allImages);
    // Site.preload.loadManifest([{
    //   id: '1',
    //   src: 'http://upload.wikimedia.org/wikipedia/commons/a/a2/Polycyclic_Aromatic_Hydrocarbons_In_Space.jpg'
    // }, {
    //   id: '2',
    //   src: 'http://upload.wikimedia.org/wikipedia/commons/c/cb/WA_-_Dry_Falls_-_Huge_Channel_v1.png'
    // }]);

    // If there is an open preload queue, close it.
    // Site.preload != null && Site.preload.close();

    // console.log('Site.preload', Site.preload);
  },
  stop: () => {
    Site.preload != null && Site.preload.close();
  },
  loadAll: () => {
    while (Preload.manifest.length > 0) loadAnother();
  },
  loadAnother: () => {
    // Get the next Preload.manifest item, and load it
    let item = Preload.manifest.shift();
    Site.preload.loadFile(item);

    // If we have no more items, disable the UI.
    if (Preload.manifest.length === 0) {
      $('#loadAnotherBtn').attr('disabled', 'disabled');
      $('#loadAllBtn').attr('disabled', 'disabled');
      $('#reloadBtn').css('display', 'inline');
    }

    // Create a new loader display item
    let div = $('#template').clone();
    div.attr('id', ''); // Wipe out the ID
    div.addClass('box');
    $('#container').append(div);
    map[item] = div; // Store a reference to each item by its src
  },
  loadItem: (url) => {
    // Add the event listener and handler
    Site.preload.on('fileload', (event) => {
      let type = event.item.type;

      if (type === createjs.LoadQueue.IMAGE) {
        // make a CreateJS Bitmap object from the result
        let imgItem = event.result;
        image = new createjs.Bitmap(imgItem.src);
        stage.addChild(image);
        stage.update();
      }
    }, null, true, options);

    let item = new createjs.LoadItem().set({ src: url, crossOrigin: 'Anonymous' }); // create a LoadItem and set the crossOrigin property
    Site.preload.loadFile(item); // load it
  },
  onComplete: (event) => {
    console.log('Complete', event);
    Preload.$state.innerHTML = Preload.$state.innerHTML + '[All loaded]';
    Preload.$progressbar.classList.add('complete');
  },
  onError: (event) => {
    console.log('Error', event);
    Preload.$state.innerHTML = Preload.$state.innerHTML + '[' + event.item + ' errored] ';
    // Preload.$state.innerHTML = Preload.$state.innerHTML + '[' + event.item.id + ' errored] ';
  },
  onFileLoad: (event) => {
    console.log('File loaded', event);
    Preload.$state.innerHTML = Preload.$state.innerHTML + '[' + event.item + ' loaded] ';
    // Preload.$state.innerHTML = Preload.$state.innerHTML + '[' + event.item.id + ' loaded] ';
  },
  onFileProgress: (event) => {
    console.log('File progress', event);
  },
  onProgress: (event) => {
    let progress = Math.round(event.loaded * 100);
    console.log('General progress', Math.round(event.loaded) * 100, event);
    Preload.$progress.innerHTML = progress + '%';
    Preload.$progressbar.style.widht = progress + '%';
  },
  /*--------------------------------------------------------------------------*/
  /*                               PRELOAD JS                                 */
  /*--------------------------------------------------------------------------*/
  // File complete handler
  handlePreloadFileLoad: (event) => {
    console.log('[ handlePreloadFileLoad ] -+-> event -+->', event);

    let div = map[event.item.id];
    div.classList.add('complete');

    // Get a reference to the loaded image (<img/>)
    let img = event.result;

    // Resize it to fit inside the item
    let r = img.width / img.height;
    let ir = w / h;

    if (r > ir) {
      img.width = w;
      img.height = w / r;
    }
    else {
      img.height = h;
      img.width = h;
    }
    div.append(img); // Add it to the DOM
  },
  // File progress handler
  handleFileProgress: (event) => {
    let div = map[event.item.id]; // Lookup the related item
    div.children('DIV').width(event.progress * div.width()); // Set the width the progress.
  },
  // Overall progress handler
  handleOverallProgress: (event) => {
    $('#mainProgress > .progress').width(preload.progress * $('#mainProgress').width());
  },
  // An error happened on a file
  handleFileError: (event) => {
    let div = map[event.item.id];
    div.classList.add('error');
  },
  // File progress handler
  handlePreloadProgress: (event) => {
    let propgress = Site.preload.progress * 100;
    document.querySelector('.preload-counter').textContent = ' ' + Math.round(propgress) + '%';
    // return console.log('[ handlePreloadProgress ]', 1 - event.progress);
  },
  // File complete handler
  handlePreloadComplete: (event) => {
    // return console.log('[ handlePreloadComplete ]', event.complete);
  }
};

var Site = Site || {};

Site = {
  directoryUri: './',
  lethargy: new Lethargy(),
  preload: new createjs.LoadQueue(true),
  // preload: new createjs.LoadQueue(false),
  // preload: new createjs.LoadQueue(true, '..src/images/'), // Create a preloader. There is no manifest added to it up-front, we will add items on-demand.
  // preload: new createjs.LoadQueue(true, null, true),
  stage: {},
  displace: {},
  mousePos: {},
  displace2: {},
  attributes: {},
  attributes2: {},
  attributes3: {},
  historyState: {
    darkTheme: null,
    isTouched: null,
    toggleStatus: null
  },
  currentMousePos: {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2
  },
  blockedAction: !0,
  passOnce: !1,
  playOnce: !1,
  bottomLink: !1,
  listenCursor: !1,
  supportsWheel: !1,
  supportsTouch: !1,
  tempImageNumber: -1,
  speed: 0,
  formerDelta: 0,
  formerHeight: 0,
  currentSlide: 0,
  links: null,
  xDown: null,
  yDown: null,
  gamma: null,
  hovers: null,
  loader: null,
  delayx: null,
  random: null,
  lindex: null,
  margins: null,
  renderer: null,
  scrolling: null,
  stageMenu: null,
  deltaMenu: null,
  intensity: null,
  rafLoading: null,
  menuHeight: null,
  expression: null,
  multiplier: null,
  deltaGamma: null,
  ladderScale: null,
  totalSlides: null,
  deltaScroll: null,
  imageNumber: null,
  rafPixiHome: null,
  rafPixiMenu: null,
  rendererMenu: null,
  heightMargin: null,
  menuEntrance: null,
  rafPixiSingle: null,
  newPageContent: null,
  entranceHeight: null,
  scrollMenuOpen: null,
  cursorPercentage: null,
  nextSlideTimeout: null,
  prevSlideTimeout: null,
  displacementSprite: null,
  displacementFilter: null,
  displacementSprite2: null,
  displacementSprite3: null,
  displacementFilter2: null,
  displacementFilter3: null,
  // clickEvent: ('ontouchstart' in document ? 'touchend' : 'click'),
  clickEvent: ('ontouchstart' in window ? 'touchend' : 'click'),
  // touchEvent: ('ontouchstart' in window ? 'touchmove' : 'touchend'),
  // mouseEvent: ('onmousedown' in window ? 'mousemove' : 'mouseup'),
  // mouseOverEvent: ('onmouseover' in window ? 'mousemove' : 'mouseout'),
  // mouseEnterEvent: ('onmouseenter' in window ? 'mousemove' : 'mouseleave'),
  setup: () => {
    /** @NOTE -> DISABLED AS IT'S NOT NECESSARY TO USE IN THIS APP */
    // Preload.init();

    Site.onRafLoading = function onRafLoading() {
      Site.rafLoading = requestAnimationFrame(Site.onRafLoading);
      // TEST CODE BELLOW
      if (Site.exitOk === !0 && Site.ajaxOk === !0) {
        Site.rafPixiHome && cancelAnimationFrame(Site.rafPixiHome);
        Site.rafPixiSingle && cancelAnimationFrame(Site.rafPixiSingle);
        Site.rafScaleAbout && cancelAnimationFrame(AboutRAFs.rafScaleAbout);
        Site.body.classList.contains('single') || Site.body.classList.contains('home') && (Site.stage.destroy(), Site.renderer.destroy());
        Site.onUpdatePage(Site.newPageContent);
        Site.rafLoading && cancelAnimationFrame(Site.rafLoading);
      }
    };
    Site.init = function init() {
      this.exitOk = !1;
      this.ajaxOk = !1;
      this.deltaMenu = 0;
      this.deltaScroll = 0;
      this.linkInProgress = !1;

      this.body = document.querySelector('body');
      this.loading = document.querySelector('.is-loading');
      this.vsSection = document.querySelector('.vs-section');

      this.innerH2 = document.getElementsByClassName('inner_h2');
      this.homeCanvas = document.getElementsByClassName('inner_h2')[0];

      this.about = document.getElementById('about');
      this.contact = document.getElementById('contact');
      this.main = document.getElementById('main__content');
      this.pixiMenuCover = document.getElementById('pixi_menu');
      this.themeBtn = document.getElementById('change-theme-btn');
      this.toNextProject = document.getElementById('to_next_project');
      this.toNextProject && (this.toNextProjectLetter = this.toNextProject.querySelectorAll('span'));

      this.links = document.querySelectorAll('a');
      this.vsDivs = document.querySelectorAll('.vs-div');
      this.mouseOverLinks = document.querySelectorAll('.link');
      this.pixiMenuLinks = document.querySelectorAll('#nav__menu__links li');
      this.pixiMenuAnchors = document.querySelectorAll('#nav__menu__links li a');
      this.innerProjectName = document.getElementById('inner_project_name');

      UserAgent.init();

      // TEST CODE BELLOW
      Site.themeBtn && (!Site.body.classList.contains('home')) && (Theme.init(), Theme.button.classList.remove('light'));
      if (Site.themeBtn) Site.body.classList.contains('home') ? Site.themeBtn.style.display = 'none' : Site.themeBtn.style.display = 'block';

      Drag.init();
      Menu.init();
      LazyLoad.init();

      TweenMax.set('#main__content, #nav__menu__links, #pixi_menu', { opacity: 1 });
      TweenMax.set('#main__content', { display: 'block', clearProps: 'y' });
      // TweenMax.to('.feature1', 0.2, { scaleY: 1, ease: Power2.easeIn });

      /** @NOTE -> Resets header menu elements back to their defaults states/classes. */
      Menu.navMenu.style.display = 'none';
      /** @NOTE -> Update and Animate projMenu from arrow/Close(X) */
      Menu.button.classList.contains('arrow-transition-in') && Menu.hideArrow();
      /** @NOTE -> close Nav Menu when anchor click events */
      Menu.button.classList.remove('opened');
      /** @NOTE -> Reset lightButtonStyles */
      Menu.darkFooter();

      // if (Site.themeBtn) Theme.button.classList.remove('light');
      Drag.cursorMain.classList.remove('menu_opened');
      Site.about.style.display = 'block';
      Site.contact.style.display = 'block';

      /** @NOTE -> classList of undefined when going from state to another => BUG!!! */
      Site.body.classList.contains('is-loading') && (
        // TEST CODE BELLOW
        Site.loadingTimeout = setTimeout(() => {
          Site.loading.classList.remove('is-loading'),
          clearTimeout(Site.loadingTimeout),
          Site.loadingTimeout = null;
        }, 1000, !1)
      );

      /** @NOTE -> removes event listeners from elements with 'link' class before adding click events to each element */
      Site.links.forEach((obj) => {
        obj.removeEventListener(Site.clickEvent, Site.onClickHandler);
        obj.onclick = null;
        obj.ontouchstart = null;
      });

      Site.links.forEach((obj) => {
        obj.addEventListener(Site.clickEvent, Site.onClickHandler, !1);
        obj.onclick = Site.onClickHandler;
        obj.ontouchstart = Site.onClickHandler;
      });

      if (!UserAgent.iOS) {
        Site.body.classList.add('desktop');

        document.addEventListener('mousemove', Throttle.actThenThrottleEvents(Site.mouseMoveHandler, 500), !1);
        document.onmousemove = Site.mouseMoveHandler;

        /** @NOTE -> adds  mouse events to each element with the class of link_hover and animate the cursor accordingly */
        Site.mouseOverLinks.forEach((obj) => {
          obj.addEventListener('mouseover', Throttle.actThenThrottleEvents(Site.mouseOverHandler, 500), !1);
          obj.addEventListener('mouseout', Throttle.actThenThrottleEvents(Site.mouseOutHandler, 500), !1);

          obj.onmouseover = Site.mouseOverHandler;
          obj.onmouseout = Site.mouseOutHandler;
        });

        Site.body.classList.contains('home') ? Drag.show() : Drag.hide();
      }
      else Site.body.classList.add('mobile');

      Site.animations();
    };
    Site.onAjaxLoad = function onAjaxLoad(html) {
      Site.newPageContent = html;
      Site.ajaxOk = !0;
    };
    Site.animations = function animations() {
      window.innerWidth < 768 && Site.pixiMenuLinks.forEach((obj) => obj.classList.remove('active'));

      // IF STATEMENT CONDITION DOES THE SAME EXPRESSION AS THE ABOVE IF STATEMENT
      UserAgent.iOS && (window.scrollTo(0, 0), Site.main.classList.remove('black'));

      /* Page transitions/animations when navigating between states */
      if (Site.body.classList.contains('home')) {
        document.querySelectorAll('.point3').forEach((obj) => obj.classList.remove('black'));

        Site.hovers = document.querySelectorAll('.main__pagination');

        Site.hovers.forEach((obj) => obj.addEventListener('mouseenter', Site.onHover, !1));
        Site.hovers.forEach((obj) => obj.addEventListener('mouseleave', Site.offHover, !1));

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

        /** @NOTE -> displacement 1 */
        Site.displacementSprite = PIXI.Sprite.from(Site.directoryUri + 'images/gradient4.png');
        Site.displacementSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.CLAMP; // options: REPEAT, MIRRORED_REPEAT, CLAMP
        Site.displacementFilter = new PIXI.filters.DisplacementFilter(Site.displacementSprite);

        /** @NOTE -> displacement 2 */
        Site.displacementSprite2 = PIXI.Sprite.from(Site.directoryUri + 'images/gradient_large.png');
        Site.displacementSprite2.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;
        Site.displacementFilter2 = new PIXI.filters.DisplacementFilter(Site.displacementSprite2);

        /** @NOTE -> settings displacement1 - intensity */
        Site.displacementFilter.scale.x = 50;
        Site.displacementFilter.scale.y = 0;

        /** @NOTE -> center for slider */
        Site.displacementSprite.pivot.x = 256;
        Site.displacementSprite.pivot.y = 256;

        /** @NOTE -> ladder x/y */
        Site.displacementSprite.scale.x = 0.2;

        /** @NOTE -> settings displacement2 - intensity */
        Site.displacementFilter2.scale.x = 0;
        Site.displacementFilter2.scale.y = 0;

        /** @NOTE -> ladder x/y */
        Site.displacementSprite2.scale.x = 0.8;
        // displacementSprite2.anchor.x = 1;

        Site.stage.addChild(Site.displacementSprite);

        Site.stage.filters = [Site.displacementFilter, Site.displacementFilter2];

        Site.loader.load((loader, resources) => {
          Site.blockedAction = !1;
          !Menu.button.isOpen && Site.homePixi();
          Site.nextSlide();
          document.getElementById('progress').style.display = 'none';
        });
      }
      else if (Site.body.classList.contains('about')) {
        document.getElementById('progress').style.display = 'none';
        document.querySelectorAll('.point3').forEach((obj) => obj.classList.add('black'));

        TweenMax.to('.background_intro', 1.4, { scale: 1, ease: Power4.easeOut });
        Site.animateRandomElements('.random');
        TweenMax.staggerFromTo(Site.random, 1, { x: '-24px' }, { x: '0px', opacity: 1, delay: 0.6, ease: Power2.easeOut }, 0.1);

        !UserAgent.iOS && Site.createVirtualScroll();

        TweenMax.to('#inner_svg', 1, { opacity: 1, ease: Power2.easeIn });
        TweenMax.fromTo('#inner_svg', 2, { rotation: 140 }, { rotation: 0, ease: Power2.easeOut });
        TweenMax.fromTo('#inner_svg img', 2, { rotation: -140 }, { rotation: 0, ease: Power2.easeOut, onComplete: () => AboutRAFs.init() });
      }
      else if (Site.body.classList.contains('single')) {
        if (window.innerWidth < 768) Site.pixiMenuLinks.forEach((obj) => Site.body.classList.contains(obj.getAttribute('data-id')) && obj.classList.add('active'));

        document.querySelectorAll('.point3').forEach((obj) => obj.classList.add('black'));

        if (!UserAgent.iOS) {
          Drag.cursorMain.classList.add('vertical_scroll');
          Drag.cursorJunior.classList.add('vertical_scroll');

          Site.toNextProject.addEventListener('mouseover', Site.onHoverNext, !1);
          Site.toNextProject.addEventListener('mouseout', Site.offHoverNext, !1);

          Site.toNextProject.onmouseover = Site.onHoverNext;
          Site.toNextProject.onmouseout = Site.offHoverNext;

          Site.createVirtualScroll();
        }
        else {
          Site.toNextProject.innerHTML = Site.toNextProject.getAttribute('data-next');
          TweenMax.set(Site.innerProjectName, { x: (document.getElementById('project_name').clientWidth + 10) / 2 + 'px' });
          TweenMax.set('#project_name .stag', { opacity: 1 });
        }

        if (window.innerWidth > 767) {
          let height = 0.57 * window.innerWidth + 20;
          Site.renderer = PIXI.autoDetectRenderer(window.innerWidth, (0.57 * window.innerWidth + 20), { transparent: !0 });
          Site.renderer.view.width = window.innerWidth;
        }
        else {
          let height = window.innerWidth + 20;
          Site.renderer = PIXI.autoDetectRenderer(window.innerWidth, (window.innerWidth + 20), { transparent: !0 });
          Site.renderer.view.width = window.innerWidth;
        }

        document.getElementById('cover').appendChild(Site.renderer.view);

        Site.stage = new PIXI.Container();
        Site.loader = new PIXI.Loader();
        // Site.ticker = new PIXI.Ticker();

        // document.querySelectorAll('#images div').forEach(Site.setDimensions);
        let image = new PIXI.Sprite(PIXI.Texture.from(document.getElementById('cover').getAttribute('data-img')));

        // DISABLED - Because PixiJS doesn't like duplicate resources saved into TextureCache. Therefore, we access our assets with Site.loader.resources
        // Site.loader.add('image', document.getElementById('cover').getAttribute('data-img'));

        const img = new Image();
        img.src = document.getElementById('cover').getAttribute('data-img');

        img.onload = function() {
          let width = this.width;
          let height = this.height;
          let imageRatio = width / height;
          let windowRatio = window.innerWidth / window.innerHeight;

          // +10 and -5 values to avoid white edges
          if (windowRatio >= imageRatio) {
            image.width = window.innerWidth;
            image.height = Math.round((height * window.innerWidth) / width);
            image.x = -5;
            image.y = Math.round((window.innerHeight / 2) - (image.height - (image.height / 3)));
          }
          else {
            image.width = width;
            image.height = Math.round((width * window.innerHeight) / width);
            image.x = Math.round((window.innerWidth / 15) - (image.width - (image.width / 3)));
            image.y = Math.round((window.innerHeight / 10) - (image.height / 2));
          }
        };

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

        Site.stage.filters = [Site.displacementFilter2];

        Site.loader.load((loader, resources) => {
          Site.blockedAction = !1;

          if (!Menu.button.isOpen) Site.singlePixi();

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
      else if (Site.body.classList.contains('notFound')) document.getElementById('progress').style.display = 'none';
      else if (Site.body.classList.contains('internalServerError')) document.getElementById('progress').style.display = 'none';
    };
    Site.onLoadPage = function onLoadPage(href) {
      document.getElementById('progress').style.display = 'block';

      Site.scrolling !== null && Site.scrolling.off();

      Site.sendHttpRequest(href);

      if (Menu.button.isOpen) {
        Site.rafPixiMenu && cancelAnimationFrame(Site.rafPixiMenu);
        Site.rafPixiMenu && cancelAnimationFrame(AboutRAFs.rafScaleAbout);

        /** @NOTE -> reset projMenu when changing states/clicking on anchor elements */
        Menu.button.classList.add('closing');
        Menu.arrowHidingTimeout !== null && clearTimeout(Menu.arrowHidingTimeout);

        Menu.arrowHidingTimeout = setTimeout(() => {
          Menu.button.classList.remove('closing');
          clearTimeout(Menu.arrowHidingTimeout);
          Menu.arrowHidingTimeout = null;
        }, 1250);

        TweenMax.to('#nav__menu__links, #pixi_menu', 0.4, {
          opacity: 0,
          ease: Power2.easeInOut,
          onComplete: () => {
            Site.stageMenu.removeChildren();
            Site.exitComplete();
            TweenMax.set('#main__content', { clearProps: 'backgroundColor' });
          }
        });
      }
      else if (Site.body.classList.contains('home')) {
        Site.listenCursor = !1;
        Site.blockedAction = !0;

        Site.animateRandomElements('.random');
        TweenMax.staggerTo(Site.random, 0.4, { x: '24px', opacity: 0, ease: Power2.easeIn }, 0.1);

        TweenMax.to('#main__content', 1, { opacity: 0, delay: 0.4, ease: Power2.easeInOut, onComplete: () => Site.exitComplete() });
        Site.hovers = document.querySelectorAll('.main__pagination');

        Site.hovers.forEach((obj) => {
          obj.removeEventListener('mouseenter', Site.onHover);
          obj.removeEventListener('mouseleave', Site.offHover);

          obj.onmouseenter = null;
          obj.onmouseleave = null;
        });
      }
      else if (Site.body.classList.contains('single')) {
        Site.toNextProject.removeEventListener('mouseover', Site.onHoverNext);
        Site.toNextProject.removeEventListener('mouseout', Site.offHoverNext);

        Site.onmouseover = null;
        Site.onmouseout = null;

        if (Site.bottomLink) {
          let diff;

          if (Site.scrolling !== null) {
            diff = Site.main.clientHeight - (Site.scrolling.vars.current + window.innerHeight);
            TweenMax.to('#main__content', 1.2, { y: -(diff + window.innerHeight), ease: Power2.easeInOut });
            Menu.hideNavMenu();
            Site.innerProjectName.classList.add('changing');
            document.querySelector('.bottom_link').classList.add('changing');

            TweenMax.to('#next_proj > div', 1.2, {
              y: diff + window.innerHeight - (document.getElementById('top_half').clientHeight / 2),
              ease: Power2.easeInOut,
              onComplete: () => {
                TweenMax.to('#next_proj > div', 0.4, {
                  opacity: 0,
                  ease: Power2.easeInOut,
                  onComplete: () => {
                    Menu.showNavMenu();
                    Site.exitComplete();
                  }
                });
              }
            });
          }
          else {
            diff = Site.main.clientHeight - (window.pageYOffset + window.innerHeight);
            TweenMax.to('#next_proj, .inner_img', 1.2, { y: -(diff + window.innerHeight), ease: Power2.easeInOut });

            Menu.hideNavMenu();
            Site.innerProjectName.classList.add('changing');
            document.querySelector('.bottom_link').classList.add('changing');

            TweenMax.to('#next_proj > div', 1.2, {
              y: diff + window.innerHeight - (document.getElementById('top_half').clientHeight / 2),
              ease: Power2.easeInOut,
              onComplete: () => {
                TweenMax.to('#next_proj > div', 0.4, {
                  opacity: 0,
                  ease: Power2.easeInOut,
                  onComplete: () => {
                    // TweenMax.set('#main__content', { clearProps: 'y' });
                    Menu.showNavMenu();
                    Site.exitComplete();
                    /*** @param - window.scrollTo({Site.scrollMenuOpen}), 0) **/
                    !UserAgent.iOS ? Site.scrolling.scrollTo(0) : window.scrollTo(0, 0); // scroll back to top when reloading page
                  }
                });
              }
            });
          }
        }
        else TweenMax.to('#main__content', 0.4, { opacity: 0, ease: Power2.easeInOut, onComplete: () => Site.exitComplete() });
      }
      else if (Site.body.classList.contains('about')) TweenMax.to('#main__content', 0.4, { opacity: 0, clearProps: 'backgroundColor', ease: Power2.easeInOut, onComplete: () => Site.exitComplete() });
      /*** @NOTE - Most significant: Site.exitOk must return true **/
      else Site.exitComplete();
    };
    Site.onUpdatePage = function onUpdatePage(html) {
      const parser = new DOMParser();
      let doc = parser.parseFromString(html, 'text/html');
      let classList = doc.querySelectorAll('body')[0].getAttribute('class');
      document.title = doc.querySelector('title').innerHTML;
      let res = classList.replace('is-loading', '');
      Site.body.setAttribute('class', res);
      !UserAgent.iOS ? Site.body.classList.add('desktop') : Site.body.classList.add('mobile');
      Site.main.innerHTML = doc.getElementById('main__content').innerHTML;
      Site.init();
    };

    window.history.replaceState(Site.historyState, null, '');

    Site.init();

    Site.about.style.top = Math.abs(window.innerHeight / 2) - 25 + 'px';
    Site.contact.style.top = Math.abs(window.innerHeight / 2) - 25 + 'px';

    Drag.toggleHidden();

    /** @NOTE -> pixi menu statement */
    Site.rendererMenu = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight, { transparent: !0 });
    // Site.rendererMenu = PIXI.autoDetectRenderer(0.24 * window.innerWidth, window.innerHeight - 0.074 * window.innerWidth, { transparent: !0 });

    Site.pixiMenuCover && Site.pixiMenuCover.appendChild(Site.rendererMenu.view);

    /** @NOTE -> RENDER STATE TO FULL SCREEN WIDTH + HEIGHT */
    Site.rendererMenu.view.width = window.innerWidth;
    Site.rendererMenu.view.height = window.innerHeight;
    Site.stageMenu = new PIXI.Container();
    Site.pixiMenuAnchors.forEach(Site.setMenuDimensions);

    /** @NOTE -> displacement 2 */
    Site.displacementSprite3 = PIXI.Sprite.from(Site.directoryUri + 'images/gradient_large.png');
    Site.displacementSprite3.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;
    Site.displacementFilter3 = new PIXI.filters.DisplacementFilter(Site.displacementSprite3);

    Site.stageMenu.filters = [Site.displacementFilter3];

    /** @NOTE -> settings displacement2 - intensity */
    Site.displacementFilter3.scale.x = 0;
    Site.displacementFilter3.scale.y = 0;

    /** @NOTE -> ladder x/y */
    Site.displacementSprite3.scale.x = 0.4;

    window.addEventListener('onpopstate', Site.onPopStateHandler);
    window.addEventListener('onunload', Site.onUnloadHandler);
    // window.addEventListener('onhashchange', Site.onHashChangeHandler);

    window.onunload = Site.onUnloadHandler;
    window.onpopstate = Site.onPopStateHandler;
    // window.onhashchange = Site.onHashChangeHandler;

    window.addEventListener('resize', Throttle.actThenThrottleEvents(Site.onResizeHandler, 500), !1);
    window.addEventListener('keyup', Throttle.actThenThrottleEvents(Site.onKeydownHandler, 500), !1);
    // window.addEventListener('keydown', Throttle.actThenThrottleEvents(Site.onKeydownHandler, 500), !1);

    window.resize = Site.onResizeHandler;
    window.keyup = Site.onKeydownHandler;
    // window.keydown = Site.onKeydownHandler;

    window.DeviceOrientationEvent && (
      window.addEventListener('ondeviceorientation', Throttle.actThenThrottleEvents(Site.circleHandler, 500), !1),
      window.addEventListener('onorientationchange', Throttle.actThenThrottleEvents(Site.circleHandler, 500), !1),

      window.ondeviceorientation = Site.circleHandler,
      window.onorientationchange = Site.circleHandler
    );

    window.addEventListener('scroll', Throttle.actThenThrottleEvents(Site.scrollEventHandler, 500), !1);
    window.addEventListener('wheel', Throttle.actThenThrottleEvents(Site.scrollEventHandler, 500), !1);
    window.addEventListener('mousewheel', Throttle.actThenThrottleEvents(Site.scrollEventHandler, 500), !1);
    window.addEventListener('DOMMouseScroll', Throttle.actThenThrottleEvents(Site.scrollEventHandler, 500), !1);

    // window.wheel = Site.scrollEventHandler;
    // window.onscroll = Site.scrollEventHandler;
    // window.onmousewheel = Site.scrollEventHandler;
    // window.onmousedown = Site.scrollEventHandler;

    /**
      * Show Hide Menu Arrow events
      *
      * @NOTE -> COULD ADD -+-> if (Site.body.classList.contains('single')) {}
    **/
    window.addEventListener('scroll', Throttle.actThenThrottleEvents(Menu.showHideArrow, 500), !1);
    window.addEventListener('wheel', Throttle.actThenThrottleEvents(Menu.showHideArrow, 500), !1);
    window.addEventListener('mousewheel', Throttle.actThenThrottleEvents(Menu.showHideArrow, 500), !1);
    window.addEventListener('DOMMouseScroll', Throttle.actThenThrottleEvents(Menu.showHideArrow, 500), !1);
    // document.addEventListener('touchmove', Throttle.actThenThrottleEvents(Menu.showHideArrow, 500), !1);

    // window.wheel = Site.showHideArrow;
    // window.onscroll = Site.showHideArrow;
    // window.onmousewheel = Site.showHideArrow;
    // window.onmousedown = Site.showHideArrow;
    // document.ontouchmove = Site.showHideArrow;

    document.addEventListener('mousemove', Throttle.actThenThrottleEvents(Site.mousePositionHandler, 500), !1);
    // document.onmousemove = Site.mousePositionHandler;

    document.addEventListener(Site.clickEvent, Throttle.actThenThrottleEvents(Site.projectChangedHandler, 500), !1);
    // document.onmousedown = Site.projectChangedHandler;

    document.addEventListener('touchstart', Throttle.actThenThrottleEvents(Site.touchStartHandler, 500), !1);
    document.addEventListener('touchmove', Throttle.actThenThrottleEvents(Site.touchMoveHandler, 500), !1);
    // document.addEventListener('touchend', Throttle.actThenThrottleEvents(Site.touchEndHandler, 500), !1);

    document.ontouchstart = Site.touchStartHandler;
    document.ontouchmove = Site.touchMoveHandler;
    // document.ontouchend = Site.touchEndHandler;
  },
  createVirtualScroll: () => {
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
  },
  /*--------------------------------------------------------------------------*/
  /*                              Click Handler                               */
  /*--------------------------------------------------------------------------*/
  onClickHandler: (event) => {
    /** @NOTE - Using Event Capturing **/
    !UserAgent.iOS && (event = event || window.event, event.preventDefault() || false);

    event.type === 'touchstart' ? Site.supportsTouch = !0 : Site.supportsTouch && true;

    if (event.target.closest('.external')) {
      window.open(event.target.href, '_blank');
      window.focus();
      /**
        * window.open([data], [title], [url]);
        * window.open(url, windowName, [windowFeatures]);
        *
        * @param - {data} - Object
        * @param - {title} - String
        * @param - {url} - String
       **/
      window.history.pushState(Site.historyState, null, '');
      /** @bug ---> Intervention error on iOS devices */
      !UserAgent.iOS ? !1 : !0;
    }

    /* If the clicked element doesn't have the .external class, bail */
    if (!event.target.closest('.external')) {
      /**
        * @NOTE - This stops any click or touch events when user clicks on Projects that are 'Comming Soon'.
       **/
      if (event.target.getAttribute('href') === '' || event.target.getAttribute('href').length === 0) return !1;

      if (Site.linkInProgress === !1) {
        Site.linkInProgress = !0;

        let targetHref = event.target.getAttribute('href');
        let targetHTML = event.target.innerHTML;

        event.target.closest('.bottom_link')
          ? Site.bottomLink = !0
          // ? (Site.bottomLink = !0, event.target.classList.add('changing'))
          : Site.bottomLink = !1;

        Site.scrolling !== null && Site.scrolling.scrollTo(0, 0);

        Site.historyState = {
          stateChanged: Theme.stateChanged,
          dataTheme: Theme.dataTheme,
          isTouched: Theme.isTouched,
          toggleStatus: Theme.toggleStatus
        };

        if (window.history && window.history.pushState) window.history.pushState(Site.historyState, targetHTML, targetHref);

        Site.onLoadPage(targetHref);
        Site.onRafLoading();

        /** @bug ---> Intervention error on iOS devices */
        !UserAgent.iOS ? !1 : !0;
      }
    }
  },
  /*--------------------------------------------------------------------------*/
  /*                           State Change Events                            */
  /*--------------------------------------------------------------------------*/
  onPopStateHandler: (event) => {
    event = event || window.event;
    event.preventDefault() || false;

    // event.state is equal to the data-attribute of the last image we clicked
    event.state !== null && (
      // history changed because of pushState/replaceState
      Site.state = event.state,
      Site.onLoadPage(window.location.href),
      Site.onRafLoading()
    );
    // history changed because of a page load
  },
  onHashChangeHandler: (event) => {
    document.getElementById('main__content').innerHTML = window.location.href + ' (' + window.location.pathname + ')';
  },
  onUnloadHandler: (event) => {
    event = event || window.event;
    event.preventDefault() || false;

    /**
      * @NOTE - Scroll back to top when reloading page
     **/
    (!UserAgent.iOS && Site.scrolling) && (Site.scrolling.scrollTo(0));
    window.scrollTo(0, 0);

    // !UserAgent.iOS ? Site.scrolling.scrollTo(0) : window.scrollTo(0, 0); // scroll back to top when reloading page
    // !UserAgent.iOS && Site.scrolling !== null ? Site.scrolling.scrollTo(0) : window.scrollTo(0, 0); // scroll back to top when reloading page
  },
  /*--------------------------------------------------------------------------*/
  /*                           Called On Page Load                            */
  /*--------------------------------------------------------------------------*/
  sendHttpRequest: (url) => {
    const xhr = new XMLHttpRequest();
    const method = 'GET';
    xhr.open(method, url, !0);

    xhr.onreadystatechange = (event) => {
      (xhr.readyState === xhr.DONE && xhr.status === 200)
        ? Site.onAjaxLoad(xhr.responseText)
        : xhr.status === 400
          ? console.log('There was an error - 400')
          : null;
    };
    xhr.send();
  },

  projectChangedHandler: (event) => {
    !UserAgent.iOS && (event = event || window.event, event.preventDefault() || false);

    if (event.target.classList.contains('main__pagination')) Site.changePagination(event.target);
    else if (event.target.classList.contains('arrow-transition-in')) {
      Site.scrollBackUp(event.target);
      Site.showSideNav();
    }
    else if (event.target.classList.contains('to_next') && Site.blockedAction === !1) Site.nextSlide();
    else if (event.target.classList.contains('to_prev') && Site.blockedAction === !1) Site.prevSlide();
    else if (event.target.classList.contains('projects')) {
      // TEST CODE BELLOW

      // event = event || window.event;
      // event.preventDefault() || false;

      if (Menu.button.isArrow) {
        Site.scrolling !== null
          ? Site.scrolling.scrollTo(0) // Site.scrolling.scrollTo(0, !0);
          : Site.scrollToTop(Site.vsSection, 1000, 'easeOutQuad'); // Site.scrollToTop(Math.abs(Site.vsSection), 1000, 'easeOutQuad');
      }
      document.querySelectorAll('.projects').forEach((obj) => obj.classList.toggle('opened'));
      !Menu.button.isOpen ? Menu.open() : Menu.close();
    }
  },

  setDimensions: (item, index) => {
    Site.totalSlides++;

    window['image' + index] = new PIXI.Sprite(PIXI.Texture.from(item.getAttribute('data-url')));
    window['image' + index].alpha = 0;

    const img = new Image(); // equivalent to document.createElement('img')
    img.src = item.getAttribute('data-url');
    img.onload = function() {
      let width = this.width;
      let height = this.height;
      let imageRatio = width / height;
      // let windowRatio = window.innerWidth / window.innerHeight;

      // +10 and -5 values to avoid white edges
      if (window.innerWidth / window.innerHeight >= imageRatio) {
        window['image' + index].width = window.innerWidth + 10;
        window['image' + index].height = Math.round((height * window.innerWidth) / width);
        window['image' + index].x = -5;
        window['image' + index].y = Math.round(window.innerHeight / 2 - window['image' + index].height / 2);
      }
      else {
        window['image' + index].height = window.innerHeight;
        window['image' + index].width = Math.round((width * window.innerHeight / height) + 10);
        window['image' + index].x = Math.round((window.innerWidth / 2 - window['image' + index].width / 2) - 5);
      }
    };
  },
  setMenuDimensions: (item, index) => {
    window['menu_image' + index] = new PIXI.Sprite(PIXI.Texture.from(item.getAttribute('data-img')));
    window['menu_image' + index].alpha = 0;

    let frameWidth = 0.24 * window.innerWidth;
    let frameHeight = window.innerHeight - 0.074 * window.innerWidth;

    const img = new Image(); // equivalent to document.createElement('img')
    img.src = item.getAttribute('data-img');
    img.onload = function() {
      let width = this.width;
      let height = this.height;
      let imageRatio = width / height;
      let windowRatio = frameWidth / frameHeight;

      // +10 and -5 values to avoid white edges
      if (windowRatio >= imageRatio) {
        window['menu_image' + index].width = window.innerWidth + 10;
        window['menu_image' + index].height = Math.round((height * window.innerWidth) / width);
        window['menu_image' + index].x = -5;
        window['menu_image' + index].y = Math.round(window.innerHeight / 2 - window['menu_image' + index].height / 2);
      }
      else {
        window['menu_image' + index].width = Math.round((width * window.innerHeight / height) + 10);
        window['menu_image' + index].height = Math.round((height * window.innerWidth + 10) / width);
        window['menu_image' + index].x = Math.round((frameWidth / 2 - window['menu_image' + index].width / 2) - 25);
      }
    };
  },

  scrollBackUp: (event) => {
    if (!UserAgent.iOS) {
      if (Math.round(Site.scrolling.vars.bounding / 7)) {
        if (Site.scrolling !== null) {
          Site.scrolling.scrollTo(0);

          let delay = Math.round(Site.scrolling.vars.current / 7);

          Menu.arrowHidingTimeout && clearTimeout(Menu.arrowHidingTimeout);
          Menu.arrowHidingTimeout = setTimeout(() => Menu.hideArrow(), delay);

          document.querySelectorAll('.light').forEach((obj) => obj.classList.remove('light'));
          document.querySelectorAll('.point3').forEach((obj) => obj.classList.add('black'));
        }
      }
    }
    else {
      Site.scrollToTop(Site.vsSection, 1000, 'easeOutQuad');

      let mobDelay = Math.round(window.pageYOffset / 7);

      Menu.arrowHidingTimeout && clearTimeout(Menu.arrowHidingTimeout);
      Menu.arrowHidingTimeout = setTimeout(() => Menu.hideArrow(), mobDelay);

      document.querySelectorAll('.light').forEach((obj) => obj.classList.remove('light'));
      document.querySelectorAll('.point3').forEach((obj) => obj.classList.add('black'));
    }
  },
  /*--------------------------------------------------------------------------*/
  /*                          Anchor Mouse Events                             */
  /*--------------------------------------------------------------------------*/
  mouseOverHandler: (event) => {
    event = event || window.event;
    event.preventDefault() || false;

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
  },
  mouseMoveHandler: (event) => {
    event = event || window.event;
    event.preventDefault() || false;

    let pad = 26;
    let pad2 = 5;

    !Drag.cursorMain.classList.contains('visible')
      ? Drag.toggleVisible()
      : Drag.cursorMain.classList.contains('visible') ? (
        TweenMax.to(Drag.cursorMain, 0.1, { transform: 'translate( ' + (event.clientX - pad) + 'px , ' + (event.clientY - pad) + 'px )', ease: 'none' }), // Drag.cursorMain.style.transform = 'translate( ' + (event.clientX - pad) + 'px , ' + (event.clientY - pad) + 'px )';
        TweenMax.to(Drag.cursorJunior, 0.1, { transform: 'translate( ' + (event.clientX - pad2) + 'px , ' + (event.clientY - pad2) + 'px )', ease: 'none' }) // Drag.cursorJunior.style.transform = 'translate( ' + (event.clientX - pad2) + 'px , ' + (event.clientY - pad2) + 'px )';
      ) : false;
  },
  mouseOutHandler: (event) => {
    event = event || window.event;
    event.preventDefault() || false;

    if (event.target.classList.contains('link_hover')) {
      if (Site.body.classList.contains('home')) {
        Drag.cursorMain.classList.add('mainDrag');
        Drag.cursorJunior.classList.add('j_Drag');
        Drag.cursorMain.classList.remove('cursor_main-small');
        Drag.cursorMain.classList.remove('menu_opened');

        if (Menu.button.isOpen) {
          Drag.cursorMain.classList.remove('mainDrag');
          Drag.cursorJunior.classList.remove('j_Drag');
          Drag.cursorMain.classList.add('menu_opened');
        }
      }
      else {
        if (Site.scrolling !== null) {
          if (Site.scrolling.vars.target <= Math.round(Site.scrolling.vars.bounding - 500)) {
            Drag.cursorMain.classList.add('vertical_scroll');
            Drag.cursorJunior.classList.add('vertical_scroll');
            Drag.cursorMain.classList.remove('cursor_main-small');
            Drag.cursorMain.classList.remove('menu_opened');
          }
        }
        if (Menu.button.isOpen) {
          Drag.cursorMain.classList.remove('vertical_scroll');
          Drag.cursorJunior.classList.remove('vertical_scroll');
          Drag.cursorMain.classList.add('menu_opened');
        }

        Drag.cursorMain.classList.remove('cursor_main-small');
      }
    }
    else Site.mouseOverLinks.forEach((obj) => {
      document.removeEventListener('onmousemove', Site.mouseOverHandler, !1);
      document = Site.mouseOverHandler;
    });
  },

  circleHandler: (event) => {
    window.orientation === 0
      ? Site.gamma = event.gamma
      : window.orientation === 180
        ? Site.gamma = -event.gamma
        : window.orientation === -90
          ? Site.gamma = -event.beta
          : window.orientation === 90 && (Site.gamma = event.beta); // this is the last conditional block OR 'else' statement
  },

  touchStartHandler: (event) => {
    event.type === 'touchstart' ? Site.supportsTouch = !0 : Site.supportsTouch && true;
    Site.xDown = event.touches[0].clientX;
    Site.yDown = event.touches[0].clientY;
  },
  touchMoveHandler: (event) => {
    !!(!Site.xDown || !Site.yDown); // return if touch props are valid

    let xUp = event.touches[0].clientX;
    let yUp = event.touches[0].clientY;

    let xDiff = Site.xDown - xUp;
    let yDiff = Site.yDown - yUp;

    // let checkLethargy = Site.lethargy.check(event) !== false && Site.blockedAction === !1;
    // if (checkLethargy && Site.body.classList.contains('home') && !Menu.button.isOpen) {
    //   /* most significant */
    //   if (Math.abs(xDiff) > Math.abs(yDiff)) xDiff > 0 ? Site.nextSlide() : Site.prevSlide();
    //   else yDiff > 0 ? Site.nextSlide() : Site.prevSlide();
    //
    //   /* reset values */
    //   Site.xDown = null;
    //   Site.yDown = null;
    // }

    let expression = Site.body.classList.contains('home') && Site.blockedAction === !1;

    /* most significant */
    if (Math.abs(xDiff) > Math.abs(yDiff)) {
      if (expression) xDiff > 0 ? Site.nextSlide() : Site.prevSlide();
    }
    else {
      if (expression) yDiff > 0 ? Site.nextSlide() : Site.prevSlide();
    }

    /* reset values */
    Site.xDown = null;
    Site.yDown = null;
  },
  touchEndHandler: (event) => {
    console.log('touchEndHandler', event);
  },

  scrollEventHandler: (event) => {
    event = event || window.event;
    event.type === 'wheel'
      ? Site.supportsWheel = !0
      : Site.supportsWheel && true;

    let delta = (event.deltaY || -event.wheelDelta || event.detail) || 1;
    let checkLethargy = Site.lethargy.check(event) !== false && Site.blockedAction === !1;
    if (checkLethargy && Site.body.classList.contains('home') && !Menu.button.isOpen) {
      delta > 0
        ? Site.nextSlide()
        : (delta < 0)
          ? Site.prevSlide()
          : false;
    }
  },

  onKeydownHandler: (event) => {
    event = event || window.event;
    event.preventDefault() || false;

    const escKey = event.key === 'Escape' || event.keyCode === 27;
    (Menu.button.isOpen && escKey) && Menu.close();
  },
  onResizeHandler: () => {
    !UserAgent.iOS && Site.scrolling !== null
      ? Site.scrolling.resize()
      : (
        Site.about.style.top = (window.innerHeight / 2) - 50 + 'px',
        Site.contact.style.top = (window.innerHeight / 2) - 50 + 'px'
      );
  },

  onHover: (event) => {
    event.target.classList.add('feature');
    return document.querySelector('.main__pagination.current').classList.add('temp');
  },
  offHover: (event) => {
    event.target.classList.remove('feature');
    return document.querySelector('.main__pagination.current').classList.remove('temp');
  },

  nextSlide: () => {
    Site.speed = 4;
    // if (Site.body.classList.contains('home')) Site.commonTransition();
    Site.commonTransition();
    Site.updatePagination('next');
    window['image' + Site.currentSlide].alpha = 0;
    Site.stage.addChild(window['image' + Site.currentSlide]);
    // image1.alpha = 1;
    const timeline = new TimelineMax();

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
        Site.nextSlideTimeout && clearTimeout(Site.nextSlideTimeout);
        Site.nextSlideTimeout = setTimeout(() => {
          !UserAgent.iOS && (Site.stage.removeChild(Site.displacementSprite2), Site.stage.addChild(Site.displacementSprite));
          Site.listenCursor = !0;
          Site.currentSlide === 0 ? Site.stage.removeChild(window['image' + (Site.totalSlides - 1)]) : Site.stage.removeChild(window['image' + (Site.currentSlide - 1)]);
          Site.currentSlide < (Site.totalSlides - 1) ? Site.currentSlide++ : Site.currentSlide = 0;
          Site.displacementSprite.x = Site.currentMousePos.x;
          Site.blockedAction = !1;
          clearTimeout(Site.nextSlideTimeout);
          Site.nextSlideTimeout = null;
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
  },
  prevSlide: () => {
    Site.speed = -4;
    Site.commonTransition();
    Site.updatePagination('prev');

    Site.currentSlide === 0 ? (
      window['image' + (Site.totalSlides - 2)].alpha = 0,
      Site.stage.addChild(window['image' + (Site.totalSlides - 2)])
    ) : Site.currentSlide === 1 ? (
      window['image' + (Site.totalSlides - 1)].alpha = 0,
      Site.stage.addChild(window['image' + (Site.totalSlides - 1)])
    ) : (
      window['image' + (Site.currentSlide - 2)].alpha = 0,
      Site.stage.addChild(window['image' + (Site.currentSlide - 2)])
    );
    // image1.alpha = 1;
    const timeline = new TimelineMax();
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
        Site.prevSlideTimeout && clearTimeout(Site.prevSlideTimeout);
        Site.prevSlideTimeout = setTimeout(() => {
          !UserAgent.iOS && (Site.stage.removeChild(Site.displacementSprite2), Site.stage.addChild(Site.displacementSprite));
          Site.listenCursor = !0;
          Site.currentSlide === 0 ? Site.stage.removeChild(window['image' + (Site.totalSlides - 1)]) : Site.stage.removeChild(window['image' + (Site.currentSlide - 1)]);
          Site.currentSlide > 0 ? Site.currentSlide-- : Site.currentSlide = Site.totalSlides - 1;
          Site.displacementSprite.x = Site.currentMousePos.x;
          Site.blockedAction = !1;
          clearTimeout(Site.prevSlideTimeout);
          Site.prevSlideTimeout = null;
        }, 800);
      }
    });

    TweenMax.to(Site.attributes3, 0.6, {
      opacity: 1,
      delay: 0.6,
      ease: Linear.easeNone,
      onUpdate: () => {
        Site.currentSlide === 0
          ? window['image' + (Site.totalSlides - 2)].alpha = Site.attributes3.opacity
          : Site.currentSlide === 1
            ? window['image' + (Site.totalSlides - 1)].alpha = Site.attributes3.opacity
            : window['image' + (Site.currentSlide - 2)].alpha = Site.attributes3.opacity;
      }
    });
  },

  commonTransition: () => {
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
  },

  footerInView: () => {
    Site.scrolling.vars.target >= Math.round(Site.scrolling.vars.bounding - 34)
      ? (
        Drag.cursorMain.classList.remove('vertical_scroll', 'black'),
        Drag.cursorJunior.classList.remove('vertical_scroll', 'black'),
        Theme.lightStyle()
      ) : (
        Drag.cursorMain.classList.add('vertical_scroll', 'black'),
        Drag.cursorJunior.classList.add('vertical_scroll', 'black'),
        Theme.darkStyle()
      );
  },

  checkMenu: (item, index) => {
    if (
      Site.cursorPercentage > (Site.heightMargin + (index * Site.entranceHeight))
      && Site.cursorPercentage < (Site.heightMargin + ((index + 1) * Site.entranceHeight))
      && !item.classList.contains('active')
    ) {
      document.querySelector('#nav__menu__links .active').classList.remove('active');
      item.classList.add('active');
      Site.pixiMenuCover.setAttribute('href', item.querySelector('a').getAttribute('href'));

      /* add new image */
      Site.stageMenu.addChild(window['menu_image' + index]);
      Site.displace2.alpha = 0;
      // Site.stageMenu.removeChild(Site.displacementSprite3);

      TweenMax.to(Site.displace2, 0.2, {
        alpha: 1,
        ease: Linear.easeNone,
        onUpdate: () => {
          window['menu_image' + index].alpha = Site.displace2.alpha;
        }
        // onComplete: () => {
        //   // to do : management suppression former child
        //   // Site.stageMenu.removeChildren(2);
        //   // addedLast = index;
        // }
      });
    }
  },
  /*--------------------------------------------------------------------------*/
  /*                           Pixi Configurations                            */
  /*--------------------------------------------------------------------------*/
  homePixi: () => {
    // Site.rafPixiHome && cancelAnimationFrame(Site.homePixi);
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
  },
  singlePixi: () => {
    if (!UserAgent.iOS) {
      if (Site.vsSection.clientHeight !== Site.formerHeight) {
        Site.scrolling.resize();
        Site.formerHeight = Site.vsSection.clientHeight;
      }
    }

    // Site.ladderScale = parseFloat(Math.round((document.getElementById('the_imgs').clientHeight + (0.56 * window.innerHeight)) / document.getElementById('the_imgs').clientHeight * 100) / 100).toFixed(2);
    // Site.ladderScale = (document.getElementById('the_imgs').clientHeight + (0.56 * window.innerHeight)) / document.getElementById('the_imgs').clientHeight;
    // Site.ladderScale = parseFloat(Math.round(Site.ladderScale * 100) / 100).toFixed(2);

    // Site.rafPixiSingle && cancelAnimationFrame(Site.singlePixi);
    Site.rafPixiSingle = requestAnimationFrame(Site.singlePixi);
    Site.renderer.render(Site.stage);
    Site.displacementSprite2.x += Site.speed;

    if (Site.scrolling !== null) {
      if (Site.scrolling.vars.target !== 0 && Site.passOnce === !1) {
        Site.passOnce = !0;
        Site.increaseDisplacementIntensity();
      }
      else if (Site.scrolling.vars.target === 0 && Site.passOnce === !0) {
        Site.passOnce = !1;
        Site.decreaseDisplacementIntensity();
      }
    }
    else {
      if (window.pageYOffset !== 0 && Site.passOnce === !1) {
        Site.passOnce = !0;
        Site.increaseDisplacementIntensity();
      }
      else if (window.pageYOffset === 0 && Site.passOnce === !0) {
        Site.passOnce = !1;
        Site.decreaseDisplacementIntensity();
      }
    }

    // TweenMax.to('#the_imgs', 1.4, { scaleY: Site.intensity, ease: Power2.easeOut });
    // if (Site.scrolling !== null) Site.deltaScroll = Site.scrolling.vars.current;
    // else {}
  },
  /*--------------------------------------------------------------------------*/
  /*                            Home Pagination                               */
  /*--------------------------------------------------------------------------*/
  changePagination: (element) => {
    !!element.classList.contains('current'); // return if element contains the 'current' class

    Site.lindex = Array.from(document.getElementById('num_letter').children).indexOf(element);

    let currentIndex = Array.from(document.getElementById('num_letter').children).indexOf(document.querySelector('#num_letter .current'));

    Site.speed = 4;
    Site.commonTransition();

    window['image' + Site.lindex].alpha = 0;

    Site.stage.addChild(window['image' + Site.lindex]);

    const timeline = new TimelineMax();

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

        if (Site.changePaginationTimeout !== null) clearTimeout(Site.changePaginationTimeout);

        Site.changePaginationTimeout = setTimeout(() => {
          Site.stage.removeChild(Site.displacementSprite2);
          Site.stage.addChild(Site.displacementSprite);
          Site.listenCursor = !0;
          Site.stage.removeChild(window['image' + (currentIndex)]);
          Site.lindex >= Site.totalSlides - 1 ? Site.currentSlide = 0 : Site.currentSlide = Site.lindex + 1;
          Site.displacementSprite.x = Site.currentMousePos.x;
          Site.blockedAction = !1;

          clearTimeout(Site.changePaginationTimeout);
          Site.changePaginationTimeout = null;
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

    TweenMax.to('#white_circle', 0.9, { strokeDashoffset: 1900 * (1 - 1 / Site.totalSlides - (Number(Site.lindex) / Site.totalSlides)), ease: Power4.easeInOut });
    Site.animateRandomElements('.random');
    TweenMax.staggerTo(Site.random, 0.4, { x: '24px', opacity: 0, ease: Power2.easeIn }, 0.1, Site.clickablePagination);
  },
  updatePagination: (direction) => {
    if (direction === 'next') {
      Site.multiplier = 1;
      TweenMax.to('#white_circle', 0.9, { strokeDashoffset: 1900 * (1 - 1 / Site.totalSlides - (Number(Site.currentSlide) / Site.totalSlides)), ease: Power4.easeInOut });
    }
    else {
      Site.multiplier = -1;
      Site.currentSlide === 1
        ? TweenMax.to('#white_circle', 0.9, { strokeDashoffset: 0, ease: Power4.easeInOut })
        : Site.currentSlide === 0
          ? TweenMax.to('#white_circle', 0.9, { strokeDashoffset: 1900 / Site.totalSlides, ease: Power4.easeInOut })
          : TweenMax.to('#white_circle', 0.9, { strokeDashoffset: 1900 - (Site.currentSlide - 1) * 1900 / Site.totalSlides, ease: Power4.easeInOut });
    }

    Site.animateRandomElements('.random');
    TweenMax.staggerTo(Site.random, 0.4, { x: Site.multiplier * 24 + 'px', opacity: 0, ease: Power2.easeIn }, 0.1, Site.scrollablePagination);
  },

  scrollablePagination: () => {
    document.querySelectorAll('.random.first').forEach((obj) => obj.classList.remove('first'));
    /** @NOTE -> Added to prevent classList of null. */
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
              document.querySelectorAll('.main__pagination')[Site.totalSlides - 1].classList.contains('first') && document.querySelectorAll('.main__pagination')[Site.totalSlides - 1].classList.remove('first');
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
  },
  clickablePagination: () => {
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
    document.getElementById('num_project').innerHTML = Site.lindex + 1;
    document.getElementById('title_h2').innerHTML = document.querySelectorAll('#images div')[Site.lindex].getAttribute('data-title');
    document.getElementById('type').innerHTML = document.querySelectorAll('#images div')[Site.lindex].getAttribute('data-cap');
    document.getElementById('year').innerHTML = document.querySelectorAll('#images div')[Site.lindex].getAttribute('data-year');
    /* NodeList.prototype.forEach = NodeList.prototype.forEach || Array.prototype.forEach; */
    document.querySelectorAll('.update_link').forEach((obj) => obj.setAttribute('href', document.querySelectorAll('#images div')[Site.lindex].getAttribute('data-params')));
    document.querySelectorAll('#title_h2 span').forEach(Site.addRandomClass);
    Site.animateRandomElements('.random');
    TweenMax.staggerFromTo(Site.random, 1, { x: '-24px', opacity: 0 }, { x: '0px', opacity: 1, ease: Power2.easeOut }, 0.1);
  },
  /*--------------------------------------------------------------------------*/
  /*           Pixi on mousemove/ontouchmove displacement intensity             */
  /*--------------------------------------------------------------------------*/
  increaseDisplacementIntensity: () => {
    Site.speed = 2;
    const options = { intensity: 0, x: 4 };

    TweenMax.to(options, 0.9, {
      intensity: 150,
      x: 6,
      ease: Power2.easeIn,
      onUpdate: () => {
        Site.displacementFilter2.scale.x = options.intensity;
        Site.speed = options.x;
      }
    });
  },
  decreaseDisplacementIntensity: () => {
    Site.speed = 3;
    const options = { intensity: 150, x: 6 };

    TweenMax.to(options, 0.9, {
      intensity: 0,
      x: 2,
      ease: Power2.easeOut,
      onUpdate: () => {
        Site.displacementFilter2.scale.x = options.intensity;
        Site.speed = options.x;
      }
    });
  },
  /*--------------------------------------------------------------------------*/
  /*                          Next Project Button                             */
  /*--------------------------------------------------------------------------*/
  onHoverNext: (event) => {
    if (Site.playOnce === !1) {
      Site.playOnce = !0;
      Site.animateRandomElements('#to_next_project span');
      TweenMax.staggerTo(Site.random, 0.4, { opacity: 0, ease: Power2.easeIn }, 0.05, Site.animateNextBtn);
      TweenMax.to(Site.innerProjectName, 0.4, { x: (document.getElementById('project_name').clientWidth + 10) / 2 + 'px', delay: 0.4, ease: Power2.easeOut });
      TweenMax.staggerTo('.stag', 0.4, { opacity: 1, delay: 0.4, ease: Power2.easeOut }, -0.02);
    }
  },
  offHoverNext: (event) => {
    if (Site.playOnce === !0) {
      Site.playOnce = !1;
      Site.animateRandomElements('#to_next_project span');
      TweenMax.staggerTo(Site.random, 0.4, { opacity: 0, ease: Power2.easeIn }, 0.05, Site.animateNextInnerBtn);
    }
  },

  animateNextBtn: () => {
    Site.toNextProject.innerHTML = document.getElementById('to_next_project').getAttribute('data-next');
    TweenMax.set('#to_next_project span', { opacity: 0 });
    Site.animateRandomElements('#to_next_project span');
    TweenMax.staggerTo(Site.random, 0.4, { opacity: 1, ease: Power2.easeOut }, 0.05);
  },
  animateNextInnerBtn: () => {
    Site.toNextProject.innerHTML = '<span>N</span><span>e</span><span>x</span><span>t</span>';
    TweenMax.set(Site.toNextProjectLetter, { opacity: 0 });
    Site.animateRandomElements('#to_next_project span');
    TweenMax.staggerTo(Site.random, 0.4, { opacity: 1, ease: Power2.easeOut }, 0.05);
    TweenMax.to(Site.innerProjectName, 0.4, { x: '0px', ease: Power2.easeOut });
    TweenMax.staggerTo('.stag', 0.4, { opacity: 0, ease: Power2.easeOut }, 0.02);
  },
  /*--------------------------------------------------------------------------*/
  /*                        HELPER / UTILITY FUNCTIONS                        */
  /*--------------------------------------------------------------------------*/
  exitComplete: () => {
    Site.exitOk = !0;
  },
  animateRandomElements: (element) => {
    // console.log('[ animateRandomElements ] -+-> element -+->', element);
    Site.random = [];
    document.querySelectorAll(element).forEach((obj) => {
      // console.log('[ animateRandomElements ] -+-> obj -+->', obj);
      Site.random.push(obj);
    });
    return Site.random.sort(() => 0.5 - Math.random());
  },
  showSideNav: () => {
    TweenMax.set([Site.about, Site.contact], { display: 'block' });
  },
  hideSideNav: () => {
    TweenMax.set([Site.about, Site.contact], { display: 'none' });
  },
  addRandomClass: (item, index) => {
    return item.classList.add('random');
  },
  mousePositionHandler: (event) => {
    Site.currentMousePos.x = event.pageX;
    Site.currentMousePos.y = event.pageY;
  },
  scrollToTop: (destination, duration, easing, callback) => {
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

    const documentHeight = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.clientHeight, document.scrollHeight, document.offsetHeight);
    const windowHeight = window.innerHeight || document.clientHeight || document.getElementsByTagName('body')[0].clientHeight;
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
  }
};

var Theme = Theme || {};

Theme = {
  button: null,
  dataTheme: null,
  isTouched: !1,
  stateChanged: !1,
  toggleStatus: null,
  rafAutoChange: null,
  init: () => {
    Theme.button = document.getElementById('change-theme-btn');

    if (Theme.button) {
      Theme.button.addEventListener(Site.clickEvent, Theme.enableDarkTheme, !1);
      Theme.button.click = Theme.enableDarkTheme;
      Theme.button.touchstart = Theme.enableDarkTheme;
    }

    SunMoon.init();

    if (typeof (String) !== 'undefined') {
      let darkThemeEnabled = Site.body.classList.contains('dark-theme');
      window.localStorage.setItem('dark-theme-enabled', JSON.stringify(darkThemeEnabled));

      if (window.localStorage.getItem('dark-theme-enabled')) {
        Theme.isTouched === !1 && Theme.stateChanged === !1 && Theme.updateDarkMode();
        Site.historyState.isTouched === !0 && (Site.historyState.dataTheme === 'day' ? Theme.lightTheme() : Theme.darkTheme());
        Site.historyState.stateChanged === !0 && (Site.historyState.dataTheme === 'day' ? Theme.lightTheme() : Theme.darkTheme());
      }
    }

  },
  updateDarkMode: () => {
    Theme.stateChanged = !0;

    Theme.rafAutoChange && cancelAnimationFrame(Theme.rafAutoChange);
    Theme.rafAutoChange = requestAnimationFrame(Theme.updateDarkMode);

    const timeout = setTimeout(() => {
      Theme.calculateDaylight();
      clearTimeout(timeout);
    }, 500);

  },
  darkTheme: () => {
    window.localStorage.setItem('dark-theme-enabled', JSON.stringify(!0));
    Site.body.classList.add('dark-theme');
    Theme.toggleStatus = 'night';
    Theme.button.setAttribute('data-theme', 'night');
    Theme.button.classList.add('dark-mode');
    Theme.dataTheme = Theme.button.getAttribute('data-theme');
  },
  lightTheme: () => {
    window.localStorage.setItem('dark-theme-enabled', JSON.stringify(!1));
    Site.body.classList.remove('dark-theme');
    Theme.toggleStatus = 'day';
    Theme.button.setAttribute('data-theme', 'day');
    Theme.button.classList.remove('dark-mode');
    Theme.dataTheme = Theme.button.getAttribute('data-theme');
  },
  calculateDaylight: () => {
    let startTime = SunMoon.sunrise.toLocaleTimeString('en-GB');
    let endTime = SunMoon.sunset.toLocaleTimeString('en-GB');

    startTime.replace('AM', '').replace('PM', '');
    endTime.replace('AM', '').replace('PM', '');

    let currentDate = new Date();

    startDate = new Date(currentDate.getTime());
    startDate.setHours(startTime.split(':')[0]);
    startDate.setMinutes(startTime.split(':')[1]);
    startDate.setSeconds(startTime.split(':')[2]);

    let endDate = new Date(currentDate.getTime());

    endDate.setHours(endTime.split(':')[0]);
    endDate.setMinutes(endTime.split(':')[1]);
    endDate.setSeconds(endTime.split(':')[2]);

    let isDaylight = startDate < currentDate && endDate > currentDate; // let isNight = endDate > currentDate && startDate > currentDate;
    isDaylight ? Theme.lightTheme() : Theme.darkTheme(); // isNight ? Theme.darkTheme() : Theme.lightTheme();

    if (Theme.rafAutoChange !== null) cancelAnimationFrame(Theme.rafAutoChange);
  },
  enableDarkTheme: () => {
    Theme.isTouched = !0;
    Theme.dataTheme === 'day' ? Theme.darkTheme() : Theme.lightTheme();
    Site.historyState = {
      stateChanged: Theme.stateChanged,
      dataTheme: Theme.dataTheme,
      isTouched: Theme.isTouched,
      toggleStatus: Theme.toggleStatus
    };
  },
  lightStyle: () => {
    Theme.button && Theme.button.classList.add('light');
    Menu.lightFooter();
    Site.hideSideNav();
  },
  darkStyle: () => {
    Theme.button && Theme.button.classList.remove('light');
    Menu.darkFooter();
    Site.showSideNav();
  }
};

document.addEventListener('DOMContentLoaded', () => Site.setup());
