/*  */

PIXI.utils.skipHello();

var Site = Site || {};

Site.setup = function setup() {
  history.pushState({}, '', location);
  Site.init();

  if (!Site.isMobile()) document.querySelectorAll('body')[0].classList.add('desktop');
  else {
    document.querySelectorAll('body')[0].classList.add('mobile');
    Site.about.style.top   = Math.abs(window.innerHeight / 2) - 25 + 'px';
    Site.contact.style.top = Math.abs(window.innerHeight / 2) - 25 + 'px';
  }

  Site.initMenuPixi();
};

/* called each time a page is launched */
Site.init = function init() {
  this.directoryUri    = './';
  this.preload         = new createjs.LoadQueue(true);
  this.lethargy        = new Lethargy();
  this.scrolling       = null;
  this.xDown           = null;
  this.yDown           = null;
  this.blockedAction   = true;
  this.listenCursor    = false;
  this.supportsWheel   = false;
  this.playOnce        = false;
  this.passOnce        = false;
  this.mousePos        = {};
  this.attributes      = {};
  this.attributes2     = {};
  this.attributes3     = {};
  this.displace        = {};
  this.displace2       = {};
  this.tempImageNumber = -1;
  this.speed           = 0;
  this.currentSlide    = 0;
  this.formerDelta     = 0;
  this.deltaMenu       = 0;
  this.deltaScroll     = 0;
  this.formerHeight    = 0;
  this.lastAdds        = 0;
  this.currentMousePos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  this.windowOffset    = window.pageYOffset;
  this.lFollowX        = 0;
  this.lFollowY        = 0;
  this.x               = 0;
  this.y               = 0;
  this.friction        = 1 / 30;
  this.exitOk          = false;
  this.ajaxOk          = false;
  this.linkInProgress  = false;
  this.deltaMenu       = 0;
  this.deltaScroll     = 0;
  this.speed           = 0;
  this.bottomLink      = false;
  this.playOnce        = false;
  this.scrollMenuOpen  = 0;
  this.theRafAbout     = void 0;
  // this.scrollingBackUpBtn = void 0;
  this.clickEvent      = ('ontouchstart' in window ? 'touchend' : 'click');
  this.vsSection       = document.querySelector('.vs-section');
  this.vsDivs          = document.querySelectorAll('.vs-div');
  this.cursorMain      = document.getElementsByClassName('cursor_main')[0];
  this.cursorJunior    = document.getElementsByClassName('cursor_junior')[0];
  this.innerH2         = document.getElementsByClassName('inner_h2');
  this.body            = document.querySelector('body');
  this.homeCanvas      = document.getElementsByClassName('inner_h2')[0];
  this.mouseOverLinks  = document.querySelectorAll('.link');
  this.logo            = document.querySelector('.logo');
  this.projMenu        = document.querySelector('.projects');
  this.social          = document.getElementById('social');
  this.menu            = document.getElementById('menu');
  this.about           = document.getElementById('about');
  this.contact         = document.getElementById('contact');
  this.links           = document.querySelectorAll('a'); // when clicking on a anchor link with class of '.link'
  this.isDown          = false; /* DRAG VARIABLES */

  TweenMax.set('#main, #the_menu, #pixi_menu', { opacity: 1 });
  TweenMax.set('#main', { display: 'block', clearProps: 'y' });
  // TweenMax.to('.feature1', 0.2, { scaleY: 1, ease: Power2.easeIn });
  // Site.resize();

  // Resets header menu elements back to their defaults states/classes.
  Site.menu.style.display = 'none';

  /* Update and Animate '.projects' menu from arrow/Close(X) */
  if (Site.projMenu.classList.contains('arrow-transition-in')) {
    Site.projMenu.classList.remove('arrow-transition-in');
    Site.projMenu.classList.add('arrow-transition-out');
  }

  /* Remove arrow-transition-out class after switching states */
  setTimeout(() => Site.projMenu.classList.remove('arrow-transition-out'), 200);

  /* close Nav Menu when anchor click events */
  Site.projMenu.classList.remove('opened');

  /* Reset lightButtonStyles */
  Site.projMenu.classList.remove('light');
  Site.social.classList.remove('light');
  Site.logo.classList.remove('light');
  Site.cursorMain.classList.remove('menu_opened');

  Site.about.style.display   = 'block';
  Site.contact.style.display = 'block';

  // Site.about.classList.remove('light');
  // Site.contact.classList.remove('light');

  /* classList of undefined when going from state to another => BUG!!! */
  if (Site.body.classList.contains('is-loading')) setTimeout(() => document.querySelector('.is-loading').classList.remove('is-loading'), 1000, false);

  /* removes event listeners from elements with 'link' class before adding click events to each element */
  Site.links.forEach((link) => link.removeEventListener('click', Site.onClick, false));
  Site.links.forEach((link) => link.addEventListener('click', Site.onClick, false));

  Site.animations();
  // Site.preloadImages();

  // /* State Change Events */
  // /* Add these events to window element */
  window.onpopstate = Site.onPopState;
  window.onunload   = Site.onUnload;

  /* management button - prev / next browser */
  window.addEventListener('onpopstate', Site.onPopState);
  window.addEventListener('onunload', Site.onUnload);

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

  window.addEventListener('resize', Site.actThenThrottleEvents(Site.resize, 500));

  if (!Site.isMobile()) window.addEventListener('mousemove', Site.actThenThrottleEvents(Site.handlerMouseMove, 500));

  /* device giroscope event */
  if (window.DeviceOrientationEvent) window.addEventListener('deviceorientation', Site.actThenThrottleEvents(Site.handleCircle, 500));

  // /* Mouse events */
  // /* Add these events to document element */
  window.onmousedown = Site.mousePosition;
  window.onmousedown = Site.changeProject;
  window.onmousedown = Site.scrollEvent;
  window.onmousedown = Site.handleTouchStart;
  window.onmousedown = Site.handleTouchMove;
  window.onmousedown = Site.showHideArrow;

  /* Add the event listeners for each event. */
  window.addEventListener('mousemove', Site.actThenThrottleEvents(Site.mousePosition, 500));
  window.addEventListener(Site.clickEvent, Site.changeProject, false);
  // window.addEventListener('click', Site.changeProject, false);
  // window.addEventListener('touchend', Site.changeProject, false);

  /* scroll event */
  window.addEventListener('wheel', Site.actThenThrottleEvents(Site.scrollEvent, 500));
  window.addEventListener('mousewheel', Site.actThenThrottleEvents(Site.scrollEvent, 500));
  window.addEventListener('DOMMouseScroll', Site.actThenThrottleEvents(Site.scrollEvent, 500));

  /* swipe event */
  window.addEventListener('touchstart', Site.actThenThrottleEvents(Site.handleTouchStart, 500));
  window.addEventListener('touchmove', Site.actThenThrottleEvents(Site.handleTouchMove, 500));

  /* Show Hide Menu Arrow events */
  // window.addEventListener('scroll', Site.showHideArrow, false); // shows/hides menu arrow when scrolling on mobile devices
  window.addEventListener('touchmove', Site.actThenThrottleEvents(Site.showHideArrow, 500)); // shows/hides menu arrow when scrolling on mobile devices
  window.addEventListener('wheel', Site.actThenThrottleEvents(Site.showHideArrow, 500));
  window.addEventListener('mousewheel', Site.actThenThrottleEvents(Site.showHideArrow, 500));
  window.addEventListener('DOMMouseScroll', Site.actThenThrottleEvents(Site.showHideArrow, 500));

  // window.addEventListener('scroll', () => Site.aboutRafs());

  // if (Site.body.classList.contains('about')) {
  //   console.log('||||||||||||||||||||||||', Site.body.classList.contains('about'));
  //   // window.addEventListener('scroll', Site.actThenThrottleEvents(Site.aboutRafs(), 500));
  // }

  // function scrollStartedListener(event) {
  //   /* operator (+=) adds a value to a variable in this case 'notice text content'.
  //    * e.g. 'scrolling...scrolling...scrolling...'
  //    * var txt1 = "What a very ";
  //    * txt1 += "nice day";
  //    * => "What a very nice day"
  //    */
  //   notice.textContent += 'scrolling...';
  // }
  // function scrollFinishedListener(event) {
  //   notice.textContent = 'Are you finished scrolling yet? ';
  // }
  // function resizeStartedListener() {
  //   console.log('throttle events Finished');
  // }

  /* used with named functions */
  // window.addEventListener('touchmove', Site.actThenThrottleEvents(Site.showHideArrow, 1000));
  // window.addEventListener('touchmove', Site.throttleEvents(Site.showHideArrow, 500));

  /* used with named functions */
  // window.addEventListener('resize', Site.throttleEvents(resizeStartedListener, 500));
  /* or with anonymous functions */
  // window.addEventListener('resize', throttleEvents(() => notice.textContent = 'Just the right size', 500));

  // let root = document.documentElement;
  //
  // root.addEventListener("mousemove", e => {
  //   root.style.setProperty('--mouse-x', e.clientX + "px");
  //   root.style.setProperty('--mouse-y', e.clientY + "px");
  // });

  if (!Site.isMobile()) {
    /* adds  mouse events to each element with the class of link_hover and animate the cursor accordingly */
    Site.mouseOverLinks.forEach((obj) => document.addEventListener('mouseover', Site.actThenThrottleEvents(Site.handleMouseOver, 500)));
    Site.mouseOverLinks.forEach((obj) => document.addEventListener('mouseout', Site.actThenThrottleEvents(Site.handleMouseOut, 500)));

    if (Site.body.classList.contains('home')) {
      Site.cursorMain.classList.remove('vertical_scroll');
      Site.cursorJunior.classList.remove('vertical_scroll');

      Site.cursorMain.classList.add('mainDrag');
      Site.cursorJunior.classList.add('j_Drag');


      // /* Mouse events */
      // /* Add these events to document element */
      // document.onmousedown = Site.dragStart;
      // document.onmousedown = Site.dragMove;
      // document.onmousedown = Site.dragEnd;

      /* drag event */
      window.addEventListener('mousedown', Site.actThenThrottleEvents(Site.dragStart, 500)); // touchStart
      window.addEventListener('mousemove', Site.actThenThrottleEvents(Site.dragMove, 500)); // touchMove
      window.addEventListener('mouseup', Site.actThenThrottleEvents(Site.dragEnd, 500)); // touchEnd
    }
    else {
      Site.cursorMain.classList.remove('mainDrag');
      Site.cursorJunior.classList.remove('j_Drag');
    }
  }
};

/* anchor click events */
Site.onClick = function onClick(event) {
  if (!event.target.classList.contains('external')) {
    event.preventDefault();

    if (Site.linkInProgress === false) {
      Site.linkInProgress = true;

      var href = this.getAttribute('href');

      if (event.target.classList.contains('bottom_link')) {
        Site.bottomLink = true;
        event.target.classList.add('changing');
      }

      history.pushState({}, '', href);
      Site.loadPage(href);
      Site.theRafLoading();

      return false;
    }
    else return false;
  }
};

/* when get() completed */
Site.ajaxLoad = function ajaxLoad(html) {
  Site.newPageContent = html;
  Site.ajaxOk         = true;
};

/* animations input */
Site.animations = function animations() {
  if (window.innerWidth < 768) document.querySelectorAll('#the_menu li').forEach((obj) => obj.classList.remove('active'));
  if (Site.isMobile()) {
    window.scrollTo(Site.scrollMenuOpen, 0);
    document.getElementById('main').classList.remove('black');
  }

  if (Site.body.classList.contains('home')) {
    document.querySelectorAll('.point3').forEach((obj) => obj.classList.remove('black'));

    Site.hovers = document.querySelectorAll('.change_project');

    Site.hovers.forEach((hover) => hover.addEventListener('mouseenter', Site.onHover, false));
    Site.hovers.forEach((hover) => hover.addEventListener('mouseleave', Site.offHover, false));

    Site.currentSlide = 0;
    Site.totalSlides  = 0;
    Site.renderer     = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight, { transparent: !0 });

    document.getElementById('inner_canvas').appendChild(Site.renderer.view);

    Site.renderer.view.width  = window.innerWidth;
    Site.renderer.view.height = window.innerHeight;

    Site.stage  = new PIXI.Container();
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
      if (!Site.projMenu.classList.contains('opened')) Site.homePixi();
      Site.nextSlide();
      document.getElementById('progress').style.display = 'none';
    });
  }
  else if (Site.body.classList.contains('notFound')) document.getElementById('progress').style.display = 'none';
  else if (Site.body.classList.contains('internalServerError')) document.getElementById('progress').style.display = 'none';
  else if (Site.body.classList.contains('about')) {
    document.getElementById('progress').style.display = 'none';
    document.querySelectorAll('.point3').forEach((obj) => obj.classList.add('black'));

    // document.getElementById('shutter1').classList.add('open');
    // document.querySelector('.intro').classList.add('open');

    TweenMax.to('.background_intro', 1.4, { scale: 1, ease: Power4.easeOut });
    Site.animateRandom('.random');
    TweenMax.staggerFromTo(Site.random, 1, { x: '-24px' }, { x: '0px', opacity: 1, delay: 0.6, ease: Power2.easeOut }, 0.1);

    if (!Site.isMobile()) {
      if (Site.scrolling !== null) Site.scrolling.destroy();
      Site.scrolling = null;

      Site.scrolling = new Smooth({
        preload: !0,
        native: !1,
        section: Site.vsSection,
        divs: Site.vsDivs,
        vs : { mouseMultiplier: 0.4 }
      });

      Site.scrolling.init();
    }

    // TweenMax.to('#main', 0.4, { backgroundColor: '#EFEFEF', ease: Power2.easeInOut });
    TweenMax.to('#inner_svg', 1, { opacity: 1, ease: Power2.easeIn });
    TweenMax.fromTo('#inner_svg', 2, { rotation: 140 }, { rotation: 0, ease: Power2.easeOut });
    TweenMax.fromTo('#inner_svg img', 2, { rotation: -140 }, {
      rotation: 0,
      ease: Power2.easeOut,
      onComplete: function event() {
        Site.aboutRafs();
        // window.addEventListener('scroll', () => Site.aboutRafs());
        console.log('aboutRafs COMPLETE');
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

    if (!Site.isMobile()) {
      Site.cursorMain.classList.add('vertical_scroll');
      Site.cursorJunior.classList.add('vertical_scroll');

      document.getElementById('to_next_project').addEventListener('mouseover', Site.onHoverNext, false);
      document.getElementById('to_next_project').addEventListener('mouseout', Site.offHoverNext, false);

      if (Site.scrolling !== null) Site.scrolling.destroy();
      Site.scrolling = null;

      Site.scrolling = new Smooth({
        preload: !0,
        native: !1,
        section: Site.vsSection,
        divs: Site.vsDivs,
        vs : { mouseMultiplier: 0.4 }
      });

      Site.scrolling.init();
    }
    else {
      document.getElementById('to_next_project').innerHTML = document.getElementById('to_next_project').getAttribute('data-next');
      TweenMax.set('#inner_project_name', { x: (document.getElementById('project_name').clientWidth + 10) / 2 + 'px' });
      TweenMax.set('#project_name .stag', { opacity: 1 });
    }

    var height;

    if (window.innerWidth > 767) {
      height                   = 0.57 * window.innerWidth + 20;
      Site.renderer            = PIXI.autoDetectRenderer(window.innerWidth, (0.57 * window.innerWidth + 20), { transparent: !0 });
      Site.renderer.view.width = window.innerWidth;
      // Site.renderer.view.height = window.innerHeight;
    } else {
      height                   = window.innerWidth + 20;
      Site.renderer            = PIXI.autoDetectRenderer(window.innerWidth, (window.innerWidth + 20), { transparent: !0 });
      Site.renderer.view.width = window.innerWidth;
      // Site.renderer.view.height = window.innerHeight;
    }

    document.getElementById('cover').appendChild(Site.renderer.view);

    Site.stage  = new PIXI.Container();
    Site.loader = new PIXI.Loader();
    // Site.ticker = new PIXI.Ticker();

    // document.querySelectorAll('#images div').forEach(Site.setDimensions);
    var image = new PIXI.Sprite(PIXI.Texture.from(document.getElementById('cover').getAttribute('data-img')));

    // DISABLED - Because PixiJS doesn't like duplicate resources saved into TextureCache. Therefore, we access our assets with Site.loader.resources
    // Site.loader.add('image', document.getElementById('cover').getAttribute('data-img'));

    var img = new Image();

    img.src = document.getElementById('cover').getAttribute('data-img');

    img.onload = function() {
      var width         = this.width;
      var height        = this.height;
      var ratio_img     = width / height;
      var ratio_fenetre = window.innerWidth / window.innerHeight;

      // +10 and - 5 values ​​to avoid white edges
      if (ratio_fenetre >= ratio_img) {
        image.width  = window.innerWidth + 10;
        image.height = height * (window.innerWidth + 10) / width;
        image.x      = -5;
        image.y      = window.innerHeight / 2 - image.height / 2;
      }
      else {
        image.height = height;
        image.width  = (width * window.innerHeight / height) + 10;
        // image.x      = (window.innerWidth / 2 - image.width / 2) - 5;
        image.y      = height / 6 - image.height / 2; // ADDED BY ME
      }
    };

    // /* center the sprite's anchor point */
    // image.anchor = 0.5;
    // /* move the sprite to the center of the screen */
    // image.x = Site.﻿renderer.width / 2;
    // image.y = Site.renderer.height / 2;

    /* displacement 2 */
    Site.displacementSprite2 = PIXI.Sprite.from(Site.directoryUri + 'images/gradient_large.png');
    Site.displacementSprite2.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;
    Site.displacementFilter2 = new PIXI.filters.DisplacementFilter(Site.displacementSprite2);

    /* settings displacement2 - intensity */
    Site.displacementFilter2.scale.x = 0; // 150
    // Site.displacementFilter2.scale.y = 0;

    /* ladder x/y */
    Site.displacementSprite2.scale.x = 0.8; // 0.8

    Site.stage.addChild(Site.displacementSprite2);
    Site.stage.addChild(image);

    // Site.stage.hitArea     = Site.renderer.screen;
    // Site.stage.interactive = true;
    //
    // Site.stage.on('mousemove', function(event) {
    //   const x = event.data.global.x;
    //   const y = event.data.global.y;
    //   image.rotation = Math.atan2(y - image.y, x - image.x);
    // });
    //
    // // Listen for animate update
    // Site.ticker.add(function(delta) {
    //   // just for fun, let's rotate mr rabbit a little
    //   // delta is 1 if running at 100% performance
    //   // creates frame-independent tranformation
    //   image.x += Math.cos(image.rotation) * delta;
    //   image.y += Math.sin(image.rotation) * delta;
    //
    // });

    Site.stage.filters = [Site.displacementFilter2];

    Site.loader.load((loader, resources) => {
      Site.blockedAction = false;
      if (!Site.projMenu.classList.contains('opened')) Site.singlePixi();

      Site.animateRandom('.random');

      TweenMax.staggerFromTo(Site.random, 1, { x: '-24px' }, { x: '0px', opacity: 1, ease: Power2.easeOut }, 0.1);
      TweenMax.to('#cover', 1, { opacity: 1, delay: 0.4, ease: Power2.easeOut });

      Site.speed = 4;
      document.getElementById('progress').style.display = 'none';

      Site.ladderScale = (document.getElementById('the_imgs').clientHeight + (0.28 * window.innerHeight)) / document.getElementById('the_imgs').clientHeight;
      Site.ladderScale = parseFloat(Math.round(Site.ladderScale * 100) / 100).toFixed(2);
    });
  }

  // TweenMax.to('body', 1, { opacity: 1, onComplete: function event() {
  //   scroll.init();
  //   scroll.Site.resize();
  // }});
  //
  // if ($('event')[0]) {}
};

/* animations output outputs */
Site.loadPage = function loadPage(href) {
  document.getElementById('progress').style.display = 'block';

  if (Site.scrolling !== null) Site.scrolling.off();

  var xhr    = new XMLHttpRequest();
  var method = 'GET';
  var url    = href;

  xhr.open(method, url, true);

  // xhr.onreadystatechange = callback
  // callback is the function to be executed when the readyState changes.
  xhr.onreadystatechange = function() {
    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) Site.ajaxLoad(xhr.responseText);
  };

  xhr.send();

  if (Site.projMenu.classList.contains('opened')) {
    cancelAnimationFrame(Site.rafPixiMenu);

    /* reset projMenu when changing states/clicking on anchor elements */
    Site.projMenu.classList.add('closing');
    setTimeout(() => Site.projMenu.classList.remove('closing'), 1250); // delay is unusally long

    TweenMax.to('#the_menu, #pixi_menu', 0.4, {
      opacity: 0,
      ease: Power2.easeInOut,
      onComplete: function event() {
        Site.stageMenu.removeChildren();
        Site.exitOk = true;
        TweenMax.set('#main', { clearProps: 'backgroundColor' });
      }
    });
  }
  else if (Site.body.classList.contains('home')) {
    // speed = 4;
    Site.listenCursor  = false;
    Site.blockedAction = true;

    // Site.stage.removeChild(displacementSprite);
    // Site.stage.addChild(Site.displacementSprite2);

    Site.animateRandom('.random');
    TweenMax.staggerTo(Site.random, 0.4, { x: '24px', opacity: 0, ease: Power2.easeIn }, 0.1);

    // TweenMax.to(attributes2, 0.9, {
    //   intensity: 150,
    //   x: 10,
    //   ease: Power2.easeIn,
    //   onUpdate: function() {
    //     Site.displacementFilter2.scale.x = attributes2.intensity;
    //     speed = attributes2.x;
    //   },
    //   onComplete: function event() {}
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

        TweenMax.to('#main', 1.2, { y: - (diff + window.innerHeight), ease: Power2.easeInOut });

        TweenMax.to('#next_proj > div', 1.2, {
          y: diff + window.innerHeight - (document.getElementById('top_half').clientHeight / 2),
          ease: Power2.easeInOut,
          onComplete: function event() {
            TweenMax.to('#next_proj > div', 0.4, {
              opacity: 0,
              ease: Power2.easeInOut,
              onComplete: function event() {
                Site.exitOk = true;
              }
            });
        }});
      }
      else {
        diff = document.getElementById('main').clientHeight - (window.pageYOffset + window.innerHeight);

        TweenMax.to('#next_proj, .inner_img', 1.2, { y: - (diff + window.innerHeight), ease: Power2.easeInOut });

        TweenMax.to('#next_proj > div', 1.2, {
          y: diff + window.innerHeight - (document.getElementById('top_half').clientHeight / 2),
          ease: Power2.easeInOut,
          onComplete: function event() {
            TweenMax.to('#next_proj > div', 0.4, {
              opacity: 0,
              ease: Power2.easeInOut,
              onComplete: function event() {
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
        onComplete: function event() {
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
      onComplete: function event() {
        Site.exitOk = true;
      }
    });
  }
  else Site.exitOk = true;
};

/* updating the data of the page */
Site.updatePage = function updatePage(html) {
  var parser    = new DOMParser();
  var doc       = parser.parseFromString(html, 'text/html');
  var classList = doc.querySelectorAll('body')[0].getAttribute('class');

  /* main title of the page */
  document.title = doc.querySelector('title').innerHTML;

  /* main class of body */
  var response = classList.replace('is-loading', '');

  document.querySelectorAll('body')[0].setAttribute('class', response);

  if (!Site.isMobile()) document.querySelectorAll('body')[0].classList.add('desktop');
  else document.querySelectorAll('body')[0].classList.add('mobile');

  /* main content #main */
  document.getElementById('main').innerHTML = doc.getElementById('main').innerHTML;

  /* launches the new page */
  Site.init();
};

/* RAFs loading screen */
Site.theRafLoading = function theRafLoading() {
  Site.rafLoading = requestAnimationFrame(Site.theRafLoading);

  if (Site.exitOk === true && Site.ajaxOk === true) {
    cancelAnimationFrame(Site.rafPixiHome);
    cancelAnimationFrame(Site.rafPixiSingle);

    if (Site.body.classList.contains('single') || Site.body.classList.contains('home')) {
      Site.stage.destroy();
      Site.renderer.destroy();
    }

    Site.updatePage(Site.newPageContent);
    cancelAnimationFrame(Site.rafLoading);
  }
};

Site.initMenuPixi = function initMenuPixi() {
  /* pixi menu statement */
  // Site.rendererMenu = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight, { transparent: !0 });

  Site.rendererMenu = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight, { transparent: !0 });
  // Site.rendererMenu = PIXI.autoDetectRenderer(0.24 * window.innerWidth, window.innerHeight - 0.074 * window.innerWidth, { transparent: !0 });

  document.getElementById('pixi_menu').appendChild(Site.rendererMenu.view);

  Site.rendererMenu.view.width  = window.innerWidth;
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
};

Site.changeProject = function changeProject(event) {
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
    // document.querySelectorAll('.projects').forEach((obj) => obj.classList.toggle('opened')); // Takes a second argument => true || false |\ Condition
    document.querySelector('.projects').classList.toggle('opened');

    if (!Site.projMenu.classList.contains('opened')) {
      Site.projMenu.classList.add('closing');
      setTimeout(() => Site.projMenu.classList.remove('closing'), 1250); // delay is unusally long
    }

    if (Site.projMenu.classList.contains('opened')) {
      Site.projMenu.classList.remove('closing');

      if (Site.scrolling !== null) Site.scrolling.off();
      else Site.scrollMenuOpen = window.pageYOffset;

      document.querySelectorAll('.front.point3, .front .point3').forEach((obj) => obj.classList.add('black'));
      document.getElementById('menu').style.display = 'block';

      // TweenMax.to('.feature1', 0.2, { scaleY: 0, delay: 0.2, ease: Power2.easeIn });

      TweenMax.to('#main', 0.2, {
        opacity: 0,
        display: 'none',
        ease: Power2.easeIn,
        onComplete: function event() {
          if (Site.isMobile()) {
            window.scrollTo(Site.scrollMenuOpen, 0);
            document.getElementById('main').classList.add('black');
            Site.body.classList.add('temp');
          }
        }
      });
      TweenMax.to('#menu', 0.2, { opacity: 1, delay: 0.2, ease: Power2.easeOut });

      Site.heightMenu     = document.getElementById('the_menu').clientHeight;
      Site.margins        = window.innerHeight / 2 - 70;
      Site.heightMargin   = Math.round((100 - (Site.heightMenu - 2 * Site.margins) * 100 / Site.heightMenu) / 2 * 100) / 100;
      Site.entranceMenu   = document.getElementById('the_menu').querySelectorAll('li').length;
      Site.entranceHeight = Math.round((100 - 2 * Site.heightMargin) / Site.entranceMenu * 100)/100;

      Site.stageMenu.addChild(Site.displacementSprite3);

      /* image_menu0 returned by PixiJS */
      var imageSprite = image_menu0;

      Site.stageMenu.addChild(imageSprite);
      imageSprite.alpha = 1;

      cancelAnimationFrame(Site.rafPixiHome);
      cancelAnimationFrame(Site.rafPixiSingle);

      Site.menuPixi();
    }
    else {
      if (Site.scrolling !== null) Site.scrolling.on();
      if (Site.body.classList.contains('home')) document.querySelectorAll('.front.point3, .front .point3').forEach((obj) => obj.classList.remove('black'));

      TweenMax.to('#menu', 0.2, {
        opacity: 0,
        ease: Power2.easeIn,
        onComplete: function event() {
          document.getElementById('menu').style.display = 'none';

          if (Site.isMobile()) {
            document.getElementById('main').classList.remove('black');
            Site.body.classList.remove('temp');
            window.scrollTo(Site.scrollMenuOpen, 0); // OR equivalent of => window.scrollTo({ top: Site.scrollMenuOpen, left: 0});
          }
        }
      });
      TweenMax.to('#main', 0.2, { opacity: 1, display: 'block', delay: 0.2, ease: Power2.easeOut });
      // TweenMax.to('.feature1', 0.2, { scaleY: 1, delay: 0.2, ease: Power2.easeIn });

      Site.stageMenu.removeChildren();
      cancelAnimationFrame(Site.rafPixiMenu);

      if (Site.body.classList.contains('home')) Site.homePixi();
      else if (Site.body.classList.contains('single')) Site.singlePixi();
    }
  }
};

/*
 * Generates an event listener wrapper function
 * that will only run the main listener
 * if there has been a given delay (in ms)
 * since the last time the event was triggered.
 */
Site.throttleEvents = function throttleEvents(listener, delay) {
  var timeout;
  return function(event) {
    if (timeout) cancelAnimationFrame(timeout);
    timeout = requestAnimationFrame(listener, delay, event);
  };
};

/*
 * Generates an event listener wrapper function
 * that will prevent the main listener from running
 * if it has previously run within the given delay (in ms).
 */
Site.actThenThrottleEvents = function actThenThrottleEvents(listener, delay) {
  var timeout;
  return function(event) {
    if (!timeout) { // no timer running
      listener(event); // run the function
      timeout = requestAnimationFrame(() => timeout = null, delay); // start a timer that turns itself off when it's done
    }
    // else, do nothing (we're in a throttling stage)
  };
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
    onUpdate: function event() {
      Site.displacementFilter2.scale.x = Site.attributes2.intensity;
      Site.speed                       = Site.attributes2.x;
      // Site.displacementSprite2.scale.x = Site.attributes2.width;
    },
    onComplete: function event() {
      timeline.reverse();

      setTimeout(() => {
        if (!Site.isMobile()) {
          Site.stage.removeChild(Site.displacementSprite2);
          Site.stage.addChild(Site.displacementSprite);
        }

        Site.listenCursor = true;

        if (Site.currentSlide === 0) Site.stage.removeChild(window['image' + (Site.totalSlides - 1)]);
        else Site.stage.removeChild(window['image' + (Site.currentSlide - 1)]);

        if (Site.currentSlide < (Site.totalSlides - 1)) Site.currentSlide++;
        else Site.currentSlide = 0;

        Site.displacementSprite.x = Site.currentMousePos.x;
        Site.blockedAction        = false;
      }, 800);
    }
  });

  TweenMax.to(Site.attributes3, 0.6, {
    opacity: 1,
    delay: 0.6,
    ease: Linear.easeNone,
    onUpdate: function event() {
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
  } else if (Site.currentSlide === 1) {
    window['image' + (Site.totalSlides - 1)].alpha = 0;
    Site.stage.addChild(window['image' + (Site.totalSlides - 1)]);
  } else {
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
    onUpdate: function event() {
      Site.displacementFilter2.scale.x = Site.attributes2.intensity;
      Site.speed                       = Site.attributes2.x;
      // Site.displacementSprite2.scale.x = Site.attributes2.width;
      // Site.displacementSprite2.anchor.x = Site.attributes2.anchor;
    },
    onComplete: function event() {
      timeline.reverse();
      // Site.attributes2.intensity = 150;
      // Site.attributes2.x = -20;
      // timeline.to(Site.attributes2, 0.9, {
      //     intensity: 0,
      //     x: 0,
      //     ease: Power1.easeOut,
      //     onUpdate: function() {
      //         Site.displacementFilter2.scale.x = Site.attributes2.intensity;
      //         speed = Site.attributes2.x;
      //     }
      // });
      setTimeout(() => {
        if (!Site.isMobile()) {
          Site.stage.removeChild(Site.displacementSprite2);
          Site.stage.addChild(Site.displacementSprite);
        }

        Site.listenCursor = true;

        if (Site.currentSlide === 0) Site.stage.removeChild(window['image' + (Site.totalSlides - 1)]);
        else Site.stage.removeChild(window['image' + (Site.currentSlide - 1)]);

        if (Site.currentSlide > 0) Site.currentSlide--;
        else Site.currentSlide = Site.totalSlides - 1;

        Site.displacementSprite.x = Site.currentMousePos.x;
        Site.blockedAction        = false;
      }, 800);
    }
  });

  TweenMax.to(Site.attributes3, 0.6, {
    opacity: 1,
    delay: 0.6,
    ease: Linear.easeNone,
    onUpdate: function event() {
      if (Site.currentSlide === 0) window['image' + (Site.totalSlides - 2)].alpha = Site.attributes3.opacity;
      else if (Site.currentSlide === 1) window['image' + (Site.totalSlides - 1)].alpha = Site.attributes3.opacity;
      else window['image' + (Site.currentSlide - 2)].alpha = Site.attributes3.opacity;
    }
  });
};

Site.commonTransition = function commonTransition() {
  Site.listenCursor  = false;
  Site.blockedAction = true;

  Site.stage.removeChild(Site.displacementSprite);
  Site.stage.addChild(Site.displacementSprite2);

  Site.attributes.intensity = Site.displacementFilter.scale.x;

  TweenMax.to(Site.attributes, 0.3, {
    intensity: 0,
    ease: Power2.easeOut,
    onUpdate: function event() {
      Site.displacementFilter.scale.x = Site.attributes.intensity;
    }
  });

  Site.displacementSprite2.x = 0;
  Site.attributes2.intensity = Site.displacementFilter2.scale.x;
  Site.attributes2.x         = Site.speed;
  Site.attributes2.width     = Site.displacementSprite2.scale.x;
  Site.attributes3.opacity   = 0;
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
    var width         = this.width;
    var height        = this.height;
    var ratio_img     = width / height;
    // var ratio_fenetre = window.innerWidth / window.innerHeight;

    // +10 and - 5 values ​​to avoid white edges
    if (window.innerWidth / window.innerHeight >= ratio_img) {
      console.log(`window['image' + index]`, window['image' + index]);

      window['image' + index].width  = window.innerWidth + 10;
      window['image' + index].height = height * (window.innerWidth + 10) / width;
      window['image' + index].x      = -5;
      window['image' + index].y      = window.innerHeight / 2 - window['image' + index].height / 2;
    } else {
      window['image' + index].height = window.innerHeight;
      window['image' + index].width  = (width * window.innerHeight / height) + 10;
      window['image' + index].x      = (window.innerWidth / 2 - window['image' + index].width / 2) - 5;
    }
  };
};

Site.setMenuDimensions = function setMenuDimensions(item, index) {
  // Site.totalSlides++;
  var frame_width  = 0.24 * window.innerWidth;
  var frame_height = window.innerHeight - 0.074 * window.innerWidth; // ---> 705.28px

  window['image_menu' + index] = new PIXI.Sprite(PIXI.Texture.from(item.getAttribute('data-img')));
  window['image_menu' + index].alpha = 0;

  var img = new Image();

  img.src = item.getAttribute('data-img');
  img.onload = function() {
    var width         = this.width;
    var height        = this.height;
    var ratio_img     = width / height;
    var ratio_fenetre = frame_width / frame_height;

    // +10 and - 5 values ​​to avoid white edges
    if (ratio_fenetre >= ratio_img) {
      console.log(`window['image_menu' + index]`, window['image_menu' + index]);

      window['image_menu' + index].width  = frame_width + 10;
      window['image_menu' + index].height = height * (frame_width + 10) / width;
      window['image_menu' + index].x      = -5;
      window['image_menu' + index].y      = frame_height / 2 - window['image_menu' + index].height / 2;
    } else {
      window['image_menu' + index].width  = width;
      window['image_menu' + index].height = height;
      window['image_menu' + index].x      = (frame_width / 2 - window['image_menu' + index].width / 2) + 49; // -757.4
      // window['image_menu' + index].x      = (frame_height / 2 - window['image_menu' + index].width / 2) - 150; // -757.36
    }
    // // ORIGINAL
    // // +10 and - 5 values ​​to avoid white edges
    // if (ratio_fenetre >= ratio_img) {
    //   window['image_menu' + index].width  = frame_width + 10;
    //   window['image_menu' + index].height = height * (frame_width + 10) / width;
    //   window['image_menu' + index].x      = - 5;
    //   window['image_menu' + index].y      = frame_height / 2 - window['image_menu' + index].height / 2;
    // } else {
    //   window['image_menu' + index].height = frame_height;
    //   window['image_menu' + index].width  = (width * frame_height / height) + 10;
    //   window['image_menu' + index].x      = (frame_width / 2 - window['image_menu' + index].width / 2) - 5;
    // }
  };
};

Site.scrollBackUp = function scrollBackUp(target) {
  // Site.scrollingBackUpBtn = requestAnimationFrame(Site.scrollBackUp);
  // if (!Site.isMobile() && Math.round(Site.scrolling.vars.bounding / 7)) {
  console.log('Start');
  if (!Site.isMobile()) {
    if (Math.round(Site.scrolling.vars.bounding / 7)) {
      if (Site.scrolling !== null) {
        Site.scrolling.scrollTo(0);

        var delay = Math.round(Site.scrolling.vars.current / 7);
        setTimeout(() => Site.hideArrow(), delay);

        document.querySelectorAll('.light').forEach((obj) => obj.classList.remove('light'));
        document.querySelectorAll('.point3').forEach((obj) => obj.classList.add('black'));
      }
    }
    // else {
    //   console.log('Done');
    //   cancelAnimationFrame(Site.scrollBackUp);
    //   console.log('cancelAnimationFrame');
    // }
  } else {
    Site.scrollIt(Site.vsSection, 1000, 'easeOutQuad');
    // setTimeout(() => window.scrollTo({ top: Site.scrollMenuOpen, left: 0, behavior: 'smooth' }), 1);
    // Site.projMenu.addEventListener('click', () => Site.scrollIt(Site.vsSection, 300, 'easeOutQuad', () => console.log(`Just finished scrolling to ${window.pageYOffset}px`)));
    // Site.scrollIt(Site.vsSection, 1000, 'easeOutQuad', () => console.log(`Just finished scrolling to ${window.pageYOffset}px`));
    // Site.projMenu.addEventListener('click', () => scrollIt(50000));

    // window.scrollTo({ top: Site.scrollMenuOpen, left: 0, behavior: 'smooth' });

    var mobDelay = Math.round(window.pageYOffset / 7);
    setTimeout(() => Site.hideArrow(), mobDelay);

    document.querySelectorAll('.light').forEach((obj) => obj.classList.remove('light'));
    document.querySelectorAll('.point3').forEach((obj) => obj.classList.add('black'));
  }
};

/* homePixi mouse/touch : drag events */
Site.dragStart = function dragStart(event) {
  Site.isDown = true;
  event.preventDefault();
  event = event || window.event;

  Site.startPosition = event.pageX;
  // Site.body.classList.add('dragging');

  if (event.type == 'touchstart') Site.posX1 = event.touches[0].clientX;
  else {
    Site.posX1 = event.clientX;
    document.onmouseup   = Site.dragEnd;
    document.onmousemove = Site.dragAction;
  }
};

Site.dragMove = function dragMove(event) {
  if (!Site.isDown) return;
  event.preventDefault();
  event = event || window.event;

  if (event.type == 'touchmove') {
    Site.posX2 = Site.posX1 - event.touches[0].clientX;
    Site.posX1 = event.touches[0].clientX;
  } else {
    Site.posX2 = Site.posX1 - event.clientX;
    Site.posX1 = event.clientX;
  }
};

Site.dragEnd = function dragEnd(event) {
  var threshold = 100; /* DRAG VARIABLES */
  Site.isDown   = false;

  event.preventDefault();
  event = event || window.event;

  Site.finishPosition = event.pageX;
  // Site.body.classList.remove('dragging');

  if ((Site.finishPosition - Site.startPosition < -threshold) && Site.blockedAction === false) Site.nextSlide();
  else if ((Site.finishPosition - Site.startPosition > threshold) && Site.blockedAction === false) Site.prevSlide();

  document.onmouseup   = null;
  document.onmousemove = null;
};

Site.showDragCursor = function showDragCursor() {
  Site.cursorMain.classList.add('visible');
  Site.cursorJunior.classList.add('visible');
};

/* anchor mouse events */
Site.handleMouseOver = function handleMouseOver(event) {
  event = event || window.event;
  event.preventDefault();

  if (event.target.classList.contains('link_hover')) {
    if (Site.body.classList.contains('home')) {
      Site.cursorMain.classList.remove('mainDrag');
      Site.cursorJunior.classList.remove('j_Drag');
      Site.cursorMain.classList.add('cursor_main-small');
    } else {
      Site.cursorMain.classList.remove('vertical_scroll');
      Site.cursorJunior.classList.remove('vertical_scroll');
      Site.cursorMain.classList.add('cursor_main-small');
    }
  }
  else return false;
};

Site.handleMouseOut = function handleMouseOut(event) {
  event = event || window.event;
  event.preventDefault();

  if (event.target.classList.contains('link_hover')) {
    if (Site.body.classList.contains('home')) {
      Site.cursorMain.classList.add('mainDrag');
      Site.cursorJunior.classList.add('j_Drag');
      Site.cursorMain.classList.remove('cursor_main-small');
      Site.cursorMain.classList.remove('menu_opened');

      if (Site.projMenu.classList.contains('opened')) {
        Site.cursorMain.classList.remove('mainDrag');
        Site.cursorJunior.classList.remove('j_Drag');
        Site.cursorMain.classList.add('menu_opened');
      }
    } else {
      if (Site.scrolling.vars.target <= Math.round(Site.scrolling.vars.bounding - 500)) {
        Site.cursorMain.classList.add('vertical_scroll');
        Site.cursorJunior.classList.add('vertical_scroll');
        Site.cursorMain.classList.remove('cursor_main-small');
        Site.cursorMain.classList.remove('menu_opened');
      }
      if (Site.projMenu.classList.contains('opened')) {
        Site.cursorMain.classList.remove('vertical_scroll');
        Site.cursorJunior.classList.remove('vertical_scroll');
        Site.cursorMain.classList.add('menu_opened');
      }

      Site.cursorMain.classList.remove('cursor_main-small');
    }
  }
  else Site.mouseOverLinks.forEach((obj) => document.removeEventListener('mousemove', Site.handleMouseOver, false));

  return false;
};

Site.handlerMouseMove = function handlerMouseMove(event) {
  event = event || window.event;
  event.preventDefault();

  let pad  = 26;
  let pad2 = 5;

  if (!Site.cursorMain.classList.contains('visible')) Site.showDragCursor();
  else if (Site.cursorMain.classList.contains('visible')) {
    TweenMax.to(Site.cursorMain, 0.1, { transform: 'translate( ' + (event.clientX - pad) + 'px , ' + (event.clientY - pad) + 'px )', ease: 'none' }); // Site.cursorMain.style.transform = 'translate( ' + (event.clientX - pad) + 'px , ' + (event.clientY - pad) + 'px )';
    TweenMax.to(Site.cursorJunior, 0.1, { transform: 'translate( ' + (event.clientX - pad2) + 'px , ' + (event.clientY - pad2) + 'px )', ease: 'none' }); // Site.cursorJunior.style.transform = 'translate( ' + (event.clientX - pad2) + 'px , ' + (event.clientY - pad2) + 'px )';
  }
  else {
    console.log('ELSE ???');
    return false;
  }
};

Site.handleCircle = function handleCircle(event) {
  if (window.orientation === 0) Site.gamma = event.gamma;
  else if (window.orientation === 180) Site.gamma = -event.gamma;
  else if (window.orientation === -90) Site.gamma = -event.beta;
  else if (window.orientation === 90) Site.gamma = event.beta;

  /* TERNARY OPERATOR */
  // 0 === window.orientation ? gamma = e.gamma : 180 === window.orientation ? gamma = -e.gamma : -90 === window.orientation ? gamma = -e.beta : 90 === window.orientation && (gamma = e.beta)
};

Site.handleTouchStart = function handleTouchStart(event) {
  Site.xDown = event.touches[0].clientX;
  Site.yDown = event.touches[0].clientY;
};

Site.handleTouchMove = function handleTouchMove(event) {
  if (!Site.xDown || !Site.yDown) return;

  var xUp   = event.touches[0].clientX;
  var yUp   = event.touches[0].clientY;

  var xDiff = Site.xDown - xUp;
  var yDiff = Site.yDown - yUp;

  if (Math.abs(xDiff) > Math.abs(yDiff)) { /* most significant */
    if (Site.body.classList.contains('home') && Site.blockedAction === false) {
      if (xDiff > 0) Site.nextSlide();
      else Site.prevSlide();
    }
  } else {
    if (Site.body.classList.contains('home') && Site.blockedAction === false) {
      if (yDiff > 0) Site.nextSlide();
      else Site.prevSlide();
    }
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

Site.resize = function resize() {
  if (!Site.isMobile() && Site.scrolling !== null) Site.scrolling.resize();
  else {
    Site.about.style.top   = window.innerHeight / 2 + 'px';
    Site.contact.style.top = window.innerHeight / 2 + 'px';
  }
};

Site.scrollEvent = function scrollEvent(event) {
  if (event.type === 'wheel') Site.supportsWheel = true;
  else if (Site.supportsWheel) return;

  var delta = (event.deltaY || -event.wheelDelta || event.detail) || 1;

  if (Site.lethargy.check(event) !== false && Site.blockedAction === false && !Site.projMenu.classList.contains('opened') && Site.body.classList.contains('home')) {
    if (delta > 0) Site.nextSlide();
    else if (delta < 0) Site.prevSlide();
  }
};

/*----------------------------------------------------------------------------*/
/*                            Arrow Visibility                                */
/*----------------------------------------------------------------------------*/

Site.showArrow = function showArrow() {
  // Site.showArrowRaf = requestAnimationFrame(Site.hideArrow);

  Site.projMenu.classList.remove('arrow-transition-out');
  Site.projMenu.classList.add('arrow-transition-in');

  // cancelAnimationFrame(Site.hideArrowRaf);
  // cancelAnimationFrame(Site.showArrowRaf);
};

Site.hideArrow = function hideArrow() {
  // Site.hideArrowRaf = requestAnimationFrame(Site.hideArrow);

  Site.projMenu.classList.remove('arrow-transition-in');
  Site.projMenu.classList.add('arrow-transition-out');
  setTimeout(() => Site.projMenu.classList.remove('arrow-transition-out'), 300);

  // cancelAnimationFrame(Site.showArrowRaf);
  // cancelAnimationFrame(Site.hideArrowRaf);
};

Site.changeArrow = function changeArrow() {
  return Site.scrolling && Site.scrolling.vars.target >= 50 ? Site.showArrow() : Site.hideArrow();
};

Site.showHideArrow = function showHideArrow() {
  if (!Site.projMenu.classList.contains('opened')) {
    if (!Site.isMobile()) {
      if (Site.body.classList.contains('single')) {
        Site.changeArrow();
        Site.footerInView();
      }
      else if (Site.body.classList.contains('about')) Site.changeArrow();
    } else {
      if (Site.body.classList.contains('single')) {
        if (window.pageYOffset >= 50) Site.showArrow();
        else Site.hideArrow();

        if (window.innerHeight + Math.round(window.pageYOffset) >= (document.body.offsetHeight - 34)) Site.showLightButtonStyle();
        else Site.showDarkButtonStyle();
      } else if (Site.body.classList.contains('about')) {
        if (window.pageYOffset >= 50) Site.showArrow();
        else Site.hideArrow();
      }
    }
  }
};

/*----------------------------------------------------------------------------*/
/*                                Theme Color                                 */
/*----------------------------------------------------------------------------*/

Site.showLightButtonStyle = function showLightButtonStyle() {
  Site.projMenu.classList.add('light');
  Site.social.classList.add('light');
  Site.logo.classList.add('light');
  // Site.about.classList.add('light');
  // Site.contact.classList.add('light');
  // Site.about.style.display   = 'none';
  // Site.contact.style.display = 'none';
  TweenMax.set(Site.about, { display: 'none' });
  TweenMax.set(Site.contact, { display: 'none' });
};

Site.showDarkButtonStyle = function showDarkButtonStyle() {
  Site.projMenu.classList.remove('light');
  Site.social.classList.remove('light');
  Site.logo.classList.remove('light');
  // Site.about.classList.remove('light');
  // Site.contact.classList.remove('light');
  // Site.about.style.display   = 'block';
  // Site.contact.style.display = 'block';
  TweenMax.set(Site.about, { display: 'block' });
  TweenMax.set(Site.contact, { display: 'block' });
};

Site.footerInView = function footerInView() {
  // if (Site.scrolling.vars.target <= window.innerHeight) {
  //   TweenMax.set(Site.about, { display: 'block' });
  //   TweenMax.set(Site.contact, { display: 'block' });
  // }

  if (Site.scrolling.vars.target >= Math.round(Site.scrolling.vars.bounding - 34)) {
    Site.cursorMain.classList.remove('vertical_scroll', 'black');
    Site.cursorJunior.classList.remove('vertical_scroll', 'black');
    Site.showLightButtonStyle();
  } else {
    Site.cursorMain.classList.add('vertical_scroll', 'black');
    Site.cursorJunior.classList.add('vertical_scroll', 'black');
    Site.showDarkButtonStyle();
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
    Site.mousePos.width     = Site.displacementSprite.scale.x;

    if (Site.currentSlide !== Site.tempImageNumber) {
      Site.tempImageNumber = Site.currentSlide;

      if (Site.currentSlide === 0) Site.imageNumber = Site.totalSlides - 1;
      else Site.imageNumber = Site.currentSlide - 1;
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
      onUpdate: function event() {
        Site.displacementSprite.x       = Site.mousePos.x;
        // SitedisplacementSprite.y        = Site.mousePos.y;
        Site.displacementFilter.scale.x = Site.mousePos.intensity;
        Site.displacementSprite.scale.x = Site.mousePos.width;

        window['image' + Site.imageNumber].x = Site.delayx + Site.mousePos.correction;
      },
      ease: Linear.easeNone
    });

    if (Site.isMobile()) {
      Site.mousePos.penche = Site.displacementFilter2.scale.x; // penche :: definition => looks

      TweenMax.to(Site.mousePos, 0.3, {
        penche: 20 * Site.gamma - Site.deltaGamma,
        // penche: (Site.gamma * 20 - Site.deltaGamma), // penche = 'looks' in english
        onUpdate: function event() {
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
  Site.deltaGamma  = Site.gamma * 20;
};

Site.menuPixi = function menuPixi() {
  Site.rafPixiMenu = requestAnimationFrame(Site.menuPixi);

  Site.rendererMenu.render(Site.stageMenu);
  Site.displacementSprite3.x += 2;

  if (!Site.isMobile()) {
    Site.cursorPercentage = Math.round(Site.currentMousePos.y * 100 / window.innerHeight * 100)/100;
    Site.theDeltaMenu     = Site.currentMousePos.y;
  } else {
    Site.cursorPercentage = window.pageYOffset * 100 / (Site.heightMenu - window.innerHeight);
    Site.theDeltaMenu     = window.pageYOffset;
  }

  if (Math.abs((Site.theDeltaMenu - Site.deltaMenu) / 200 + 1) < 1.8) Site.intensity = Math.abs((Site.theDeltaMenu - Site.deltaMenu) / 200 + 1);
  else Site.intensity = 1.8;

  /* displacement menu */
  if (!Site.isMobile()) {
    let expression = -1 * (Site.heightMenu - window.innerHeight) / window.innerHeight * Site.currentMousePos.y;
    TweenMax.to('#the_menu', 1.4, { y: expression + 'px', scaleY: Site.intensity, ease: Power2.easeOut });
  }
  else TweenMax.to('#the_menu', 1.4, { scaleY: Site.intensity, ease: Power2.easeOut });

  if (window.innerWidth > 767) {
    if (Site.cursorPercentage > Site.heightMargin && Site.cursorPercentage < (100 - Site.heightMargin)) document.querySelectorAll('#the_menu li').forEach(Site.checkMenu);

    Site.displace.intensity = Site.displacementFilter3.scale.x;

    TweenMax.to(Site.displace, 0.3, {
      intensity: 4 * (Site.theDeltaMenu - Site.deltaMenu),
      onUpdate: function event() {
        Site.displacementFilter3.scale.x = Site.displace.intensity;
      },
      ease: Linear.easeNone
    });
  }
  Site.deltaMenu = Site.theDeltaMenu;
};

Site.singlePixi = function singlePixi() {
  // if (!Site.isMobile() && Site.vsSection.clientHeight !== Site.formerHeight) {
  if (!Site.isMobile()) {
    if (Site.vsSection.clientHeight !== Site.formerHeight) {
      Site.scrolling.resize();
      Site.formerHeight = Site.vsSection.clientHeight;
    }
  }

  Site.rafPixiSingle = requestAnimationFrame(Site.singlePixi);

  /* ladderScale = parseFloat(Math.round((document.getElementById('the_imgs').clientHeight + (0.56 * window.innerHeight)) / document.getElementById('the_imgs').clientHeight * 100) / 100).toFixed(2); */
  /* ladderScale = (document.getElementById('the_imgs').clientHeight + (0.56 * window.innerHeight)) / document.getElementById('the_imgs').clientHeight; */
  /* ladderScale = parseFloat(Math.round(ladderScale * 100) / 100).toFixed(2); */

  Site.renderer.render(Site.stage);
  Site.displacementSprite2.x += Site.speed;

  if (Site.scrolling !== null) {
    if (Site.scrolling.vars.target !== 0 && Site.passOnce === false) {
      Site.passOnce = true;
      Site.increaseDisplacementIntensity();
    } else if (Site.scrolling.vars.target === 0 && Site.passOnce === true) {
      Site.passOnce = false;
      Site.decreaseDisplacementIntensity();
    }
  } else {
    if (window.pageYOffset !== 0 && Site.passOnce === false) {
      Site.passOnce = true;
      Site.increaseDisplacementIntensity();
    } else if (window.pageYOffset === 0 && Site.passOnce === true) {
      Site.passOnce = false;
      Site.decreaseDisplacementIntensity();
    }
  }

  // TweenMax.to('#the_imgs', 1.4, { scaleY: Site.intensity, ease: Power2.easeOut });
  // if (Site.scrolling !== null) Site.deltaScroll = Site.scrolling.vars.current;
  // else {}
};

Site.checkMenu = function checkMenu(item, index) {
  if (Site.cursorPercentage > (Site.heightMargin + (index * Site.entranceHeight)) && Site.cursorPercentage < (Site.heightMargin + ((index + 1) * Site.entranceHeight)) && !item.classList.contains('active')) {
    document.querySelector('#the_menu .active').classList.remove('active');
    item.classList.add('active');
    document.getElementById('pixi_menu').setAttribute('href', item.querySelector('a').getAttribute('href'));

    /* add new image */
    Site.stageMenu.addChild(window['image_menu' + index]);
    Site.displace2.alpha = 0;
    // Site.stageMenu.removeChild(Site.displacementSprite3);

    TweenMax.to(Site.displace2, 0.2, {
      alpha: 1,
      onUpdate: function event() {
        window['image_menu' + index].alpha = Site.displace2.alpha;
      },
      // onComplete: () => {
        //   // to do : management suppression former child
        //   // Site.stageMenu.removeChildren(2);
        //   // lastAdds = index;
        // },
        ease: Linear.easeNone
      });
    }
  };

/*----------------------------------------------------------------------------*/
/*                          About requestAnimationFrame                        */
/*----------------------------------------------------------------------------*/

Site.aboutRafs = function aboutRafs(timestamp) {
  // this.theRafAbout = void 0;
  Site.theRafAbout = requestAnimationFrame(Site.aboutRafs);

  // console.log('timestamp', timestamp);

  if (Site.scrolling !== null) {
    TweenMax.to('#inner_svg', 1, { rotation: Math.ceil(-Site.scrolling.vars.current / 4), ease: Linear.easeNone });
    TweenMax.to('#inner_svg img', 1, { rotation: Math.ceil(Site.scrolling.vars.current / 4), ease: Linear.easeNone });

    if (Math.abs((Site.scrolling.vars.current - Site.deltaScroll) / 200 + 1) < 2.2) Site.intensity = Math.abs((Site.scrolling.vars.current - Site.deltaScroll) / 200 + 1);
    else Site.intensity = 2.2;

    Site.deltaScroll = Site.scrolling.vars.current;
  }
  else {
    TweenMax.to('#inner_svg', 1, { rotation: -window.pageYOffset / 4, ease: Linear.easeNone });
    TweenMax.to('#inner_svg img', 1, { rotation: window.pageYOffset / 4, ease: Linear.easeNone });

    if (Math.abs((window.pageYOffset - Site.deltaScroll) / 200 + 1) < 2.2) Site.intensity = Math.abs((window.pageYOffset - Site.deltaScroll) / 200 + 1);
    else Site.intensity = 2.2;

    Site.deltaScroll = window.pageYOffset;
  }

  if (!Site.isMobile()) {
    TweenMax.to('.scaleA', 1.4, {
      scaleX: Site.intensity,
      ease: Power2.easeOut,
      onComplete: function event() {
        // cancelAnimationFrame(Site.theRafAbout);
        // console.log('cancelAnimationFrame');
      }
    });
  }
  // cancelAnimationFrame(Site.theRafAbout);
  // console.log('cancelAnimationFrame mmmmmm');

  // if (Site.scrolling !== null) Site.deltaScroll = Site.scrolling.vars.current;
  // else Site.deltaScroll = window.pageYOffset;
};

Site.aboutSkills = function aboutSkills() {
  /* DOM Elements */
  // const button = document.querySelector('.js-button');
  const circle = document.querySelector('.js-circle');
  const skills = document.querySelectorAll('.js-circle');
  const text   = document.querySelector('.js-text');

  /* Circle radius, diameter and offset function */
  const radius   = circle.getAttribute('r');
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
};

/*----------------------------------------------------------------------------*/
/*                             Home Pagination                                */
/*----------------------------------------------------------------------------*/

Site.changePagination = function changePagination(element) {
  if (element.classList.contains('current')) return;
  else {
    Site.lindex        = Array.from(document.getElementById('num_letter').children).indexOf(element);
    const currentIndex = Array.from(document.getElementById('num_letter').children).indexOf(document.querySelector('#num_letter .current'));
    Site.speed         = 4;

    Site.commonTransition();

    window['image' + Site.lindex].alpha = 0;
    Site.stage.addChild(window['image' + Site.lindex]);

    var timeline = new TimelineMax();

    timeline.to(Site.attributes2, 0.9, {
      intensity: 150,
      x: 20,
      ease: Power2.easeIn,
      onUpdate: function event() {
        Site.displacementFilter2.scale.x = Site.attributes2.intensity;
        // console.log('changePagination : speed =>', Site.speed);
        Site.speed = Site.attributes2.x;
      },
      onComplete: function event() {
        timeline.reverse();

        setTimeout(() => {
          Site.stage.removeChild(Site.displacementSprite2);
          Site.stage.addChild(Site.displacementSprite);
          Site.listenCursor = true;
          Site.stage.removeChild(window['image'+(currentIndex)]);

          if (Site.lindex >= Site.totalSlides - 1) Site.currentSlide = 0;
          else Site.currentSlide = Site.lindex + 1;

          Site.displacementSprite.x = Site.currentMousePos.x;
          Site.blockedAction        = false;
        }, 800);
      }
    });

    TweenMax.to(Site.attributes3, 0.6, {
      opacity: 1,
      delay: 0.6,
      ease: Linear.easeNone,
      onUpdate: function event() {
        window['image' + Site.lindex].alpha = Site.attributes3.opacity;
      }
    });

    TweenMax.to('#white_circle', 0.9, { 'stroke-dashoffset' : 1900 * (1 - 1 / Site.totalSlides - (Site.lindex * 1 / Site.totalSlides)), ease: Power4.easeInOut });
    Site.animateRandom('.random');
    TweenMax.staggerTo(Site.random, 0.4, { x: '24px', opacity: 0, ease: Power2.easeIn }, 0.1, Site.clickablePagination);
  }
};

Site.updatePagination = function updatePagination(direction) {
  if (direction === 'next') {
    Site.multiplier = 1;
    TweenMax.to('#white_circle', 0.9, { 'stroke-dashoffset': 1900 * (1 - 1 / Site.totalSlides - (Site.currentSlide * 1 / Site.totalSlides)), ease: Power4.easeInOut });
  } else {
    Site.multiplier = -1;
    if (Site.currentSlide === 1) TweenMax.to('#white_circle', 0.9, { 'stroke-dashoffset': 0, ease: Power4.easeInOut });
    else if (Site.currentSlide === 0) TweenMax.to('#white_circle', 0.9, { 'stroke-dashoffset': 1900 / Site.totalSlides, ease: Power4.easeInOut });
    else TweenMax.to('#white_circle', 0.9, { 'stroke-dashoffset' : 1900 - (Site.currentSlide - 1) * 1900 / Site.totalSlides, ease: Power4.easeInOut });
  }

  Site.animateRandom('.random');
  TweenMax.staggerTo(Site.random, 0.4, { x: Site.multiplier * 24 + 'px', opacity: 0, ease: Power2.easeIn }, 0.1, Site.scrollablePagination);
};

Site.scrollablePagination = function scrollablePagination() {
  document.querySelectorAll('.random.first').forEach((obj) => obj.classList.remove('first'));
  document.querySelector('#num_letter .current').classList.add('after');

  if (Site.multiplier === 1) {
    if (document.querySelector('#num_letter .current').nextElementSibling !== null) {
      document.querySelector('#num_letter .current').nextElementSibling.classList.add('before');
      var next = document.querySelector('#num_letter .current').nextElementSibling;

      TweenMax.to('.current .letter', 0.4, { x: '100%', clearProps: 'x', ease: Power4.easeInOut });
      TweenMax.to(document.querySelector('#num_letter .current').nextElementSibling.querySelector('div'), 0.4, {
        x: '0%',
        clearProps: 'x',
        ease: Power4.easeInOut,
        onComplete: function event() {
          document.querySelector('#num_letter .current').classList.remove('current','after');
          next.classList.add('current');
          next.classList.remove('before');
        }
      });
    } else {
      var first = document.querySelector('#num_letter div');
      first.classList.add('before');

      TweenMax.to('.current .letter', 0.4, { x: '100%', clearProps: 'x', ease: Power4.easeInOut });
      TweenMax.to(first.querySelector('div'), 0.4, {
        x: '0%',
        clearProps: 'x',
        ease: Power4.easeInOut,
        onComplete: function event() {
          if (document.querySelectorAll('.change_project')[Site.totalSlides - 1].classList.contains('first')) document.querySelectorAll('.change_project')[Site.totalSlides - 1].classList.remove('first');
          document.querySelector('#num_letter .current').classList.remove('current','after');
          first.classList.add('current');
          first.classList.remove('before');
        }
      });
    }

    document.getElementById('num_project').innerHTML = Site.currentSlide + 1;
    document.getElementById('title_h2').innerHTML    = document.querySelectorAll('#images div')[Site.currentSlide].getAttribute('data-title');
    document.getElementById('type').innerHTML        = document.querySelectorAll('#images div')[Site.currentSlide].getAttribute('data-cap');
    document.getElementById('year').innerHTML        = document.querySelectorAll('#images div')[Site.currentSlide].getAttribute('data-year');

    // if(Site.isMobile()) {
    //   if (document.querySelectorAll('#title_h2 span').length <= 2) document.getElementById('title_h2').style.fontSize = '14vw';
    //   else document.getElementById('title_h2').style.fontSize = '11vw';
    // }

    document.querySelectorAll('.update_link').forEach((obj) => obj.setAttribute('href',document.querySelectorAll('#images div')[Site.currentSlide].getAttribute('data-params')));
  } else {
    if (document.querySelector('#num_letter .current').previousElementSibling !== null) {
      document.querySelector('#num_letter .current').previousElementSibling.classList.add('before');
      var prev = document.querySelector('#num_letter .current').previousElementSibling;
      TweenMax.to('.current .letter', 0.4, { x: '-100%', clearProps: 'x', ease: Power4.easeInOut });
      TweenMax.fromTo(document.querySelector('#num_letter .current').previousElementSibling.querySelector('div'), 0.4, {
        x: '100%'
      }, {
        x: '0%',
        clearProps: 'x',
        ease: Power4.easeInOut,
        onComplete: function event() {
          document.querySelector('#num_letter .current').classList.remove('current','after');
          prev.classList.add('current');
          prev.classList.remove('before');
        }
      });
    } else {
      var last = document.querySelectorAll('#num_letter > div')[Site.totalSlides - 1];
      last.classList.add('before');

      TweenMax.to('.current .letter', 0.4, { x: '-100%', clearProps: 'x', ease: Power4.easeInOut });
      TweenMax.fromTo(last.querySelector('div'), 0.4, {
        x: '100%'
      }, {
        x: '0%',
        clearProps: 'x',
        ease: Power4.easeInOut,
        onComplete: function event() {
          document.querySelector('#num_letter .current').classList.remove('current','after');
          last.classList.add('current');
          last.classList.remove('before');
        }
      });
    }

    if (Site.currentSlide === 1) {
      document.getElementById('num_project').innerHTML = Site.totalSlides;
      document.getElementById('title_h2').innerHTML    = document.querySelectorAll('#images div')[Site.totalSlides - 1].getAttribute('data-title');
      document.getElementById('type').innerHTML        = document.querySelectorAll('#images div')[Site.totalSlides - 1].getAttribute('data-cap');
      document.getElementById('year').innerHTML        = document.querySelectorAll('#images div')[Site.totalSlides - 1].getAttribute('data-year');

      document.querySelectorAll('.update_link').forEach((obj) => obj.setAttribute('href', document.querySelectorAll('#images div')[Site.totalSlides - 1].getAttribute('data-params')));
    } else if (Site.currentSlide === 0) {
      document.getElementById('num_project').innerHTML = Site.totalSlides - 1;
      document.getElementById('title_h2').innerHTML    = document.querySelectorAll('#images div')[Site.totalSlides - 2].getAttribute('data-title');
      document.getElementById('type').innerHTML        = document.querySelectorAll('#images div')[Site.totalSlides - 2].getAttribute('data-cap');
      document.getElementById('year').innerHTML        = document.querySelectorAll('#images div')[Site.totalSlides - 2].getAttribute('data-year');

      document.querySelectorAll('.update_link').forEach(x=> x.setAttribute('href', document.querySelectorAll('#images div')[Site.totalSlides - 2].getAttribute('data-params')));
    } else {
      document.getElementById('num_project').innerHTML = Site.currentSlide - 1;
      document.getElementById('title_h2').innerHTML    = document.querySelectorAll('#images div')[Site.currentSlide - 2].getAttribute('data-title');
      document.getElementById('type').innerHTML        = document.querySelectorAll('#images div')[Site.currentSlide - 2].getAttribute('data-cap');
      document.getElementById('year').innerHTML        = document.querySelectorAll('#images div')[Site.currentSlide - 2].getAttribute('data-year');

      document.querySelectorAll('.update_link').forEach((obj) => obj.setAttribute('href', document.querySelectorAll('#images div')[Site.currentSlide - 2].getAttribute('data-params')));
    }
  }

  document.querySelectorAll('#title_h2 span').forEach(Site.addRandom);
  Site.animateRandom('.random');
  TweenMax.staggerFromTo(Site.random, 1, { x: -Site.multiplier * 24 + 'px', opacity: 0 }, { x: '0px', opacity: 1, ease: Power2.easeOut }, 0.1);
};

Site.clickablePagination = function clickablePagination() {
  document.querySelector('#num_letter .current').classList.add('after');
  TweenMax.to('.current .letter', 0.4, { x: '100%', clearProps: 'x', ease: Power4.easeInOut});
  document.querySelectorAll('#num_letter > div')[Site.lindex].classList.add('before');
  TweenMax.to(document.querySelectorAll('#num_letter > div')[Site.lindex].querySelector('div'), 0.4, {
    x: '0%',
    clearProps: 'x',
    ease: Power4.easeInOut,
    onComplete: function event() {
      document.querySelector('#num_letter .current').classList.remove('current','after');
      document.querySelectorAll('#num_letter > div')[Site.lindex].classList.add('current');
      document.querySelectorAll('#num_letter > div')[Site.lindex].classList.remove('before');
    }
  });

  // if (document.querySelector('#num_letter .current').nextElementSibling !== null) {
  //     document.querySelector('#num_letter .current').nextElementSibling.classList.add('before');
  //     var next = document.querySelector('#num_letter .current').nextElementSibling;
  //     TweenMax.to('.current .letter', 0.4, {x: '100%', clearProps: 'x', ease: Power4.easeInOut});
  //     TweenMax.to(document.querySelector('#num_letter .current').nextElementSibling.querySelector('div'), 0.4, {x: '0%', clearProps: 'x', ease: Power4.easeInOut, onComplete: function event() {
  //         document.querySelector('#num_letter .current').classList.remove('current','after');
  //         next.classList.add('current');
  //         next.classList.remove('before');
  //     }});
  // } else {
  //     var first = document.querySelector('#num_letter div');
  //     first.classList.add('before');

  //     TweenMax.to('.current .letter', 0.4, {x: '100%', clearProps: 'x', ease: Power4.easeInOut});
  //     TweenMax.to(first.querySelector('div'), 0.4, {x: '0%', clearProps: 'x', ease: Power4.easeInOut, onComplete: function event() {
  //         document.querySelector('#num_letter .current').classList.remove('current','after');
  //         first.classList.add('current');
  //         first.classList.remove('before');
  //     }});
  // }

  document.getElementById('num_project').innerHTML = Site.lindex + 1;
  document.getElementById('title_h2').innerHTML    = document.querySelectorAll('#images div')[Site.lindex].getAttribute('data-title');
  document.getElementById('type').innerHTML        = document.querySelectorAll('#images div')[Site.lindex].getAttribute('data-cap');
  document.getElementById('year').innerHTML        = document.querySelectorAll('#images div')[Site.lindex].getAttribute('data-year');

  /* NodeList.prototype.forEach = NodeList.prototype.forEach || Array.prototype.forEach; */
  document.querySelectorAll('.update_link').forEach((obj) => obj.setAttribute('href', document.querySelectorAll('#images div')[Site.lindex].getAttribute('data-params')));
  document.querySelectorAll('#title_h2 span').forEach(Site.addRandom);

  Site.animateRandom('.random');
  TweenMax.staggerFromTo(Site.random, 1, { x: '-24px', opacity: 0 }, { x: '0px', opacity: 1, ease: Power2.easeOut }, 0.1);
};

/*----------------------------------------------------------------------------*/
/*            Pixi on mousemove/touchmove displacement intensity              */
/*----------------------------------------------------------------------------*/

Site.increaseDisplacementIntensity = function increaseDisplacementIntensity() {
  Site.speed  = 2;
  var options = { intensity: 0, x: 4 };

  TweenMax.to(options, 0.9, {
    intensity: 150,
    x: 6,
    ease: Power2.easeIn,
    onUpdate: function event() {
      Site.displacementFilter2.scale.x = options.intensity;
      Site.speed = options.x;
    }
  });
};

Site.decreaseDisplacementIntensity = function decreaseDisplacementIntensity() {
  Site.speed  = 3;
  var options = { intensity: 150, x: 6 };

  TweenMax.to(options, 0.9, {
    intensity: 0,
    x: 2,
    ease: Power2.easeOut,
    onUpdate: function event() {
      Site.displacementFilter2.scale.x = options.intensity;
      Site.speed = options.x;
    }
  });
};

/*----------------------------------------------------------------------------*/
/*                           Next Project Button                              */
/*----------------------------------------------------------------------------*/

Site.onHoverNext = function onHoverNext(event) {
  if (Site.playOnce === false) {
    Site.playOnce = true;
    Site.animateRandom('#to_next_project span');
    TweenMax.staggerTo(Site.random, 0.4, { opacity: 0, ease: Power2.easeIn }, 0.05, Site.animateNextBtn);
    TweenMax.to('#inner_project_name', 0.4, { x: (document.getElementById('project_name').clientWidth + 10) / 2 + 'px', delay: 0.4, ease: Power2.easeOut });
    TweenMax.staggerTo('.stag', 0.4, { opacity: 1, delay: 0.4, ease: Power2.easeOut }, -0.02);
  }
};

Site.offHoverNext = function offHoverNext(event) {
  if (Site.playOnce === true) {
    Site.playOnce = false;
    Site.animateRandom('#to_next_project span');
    TweenMax.staggerTo(Site.random, 0.4, { opacity: 0, ease: Power2.easeIn }, 0.05, Site.animateNextInnerBtn);
  }
};

Site.animateNextBtn = function animateNextBtn() {
  document.getElementById('to_next_project').innerHTML = document.getElementById('to_next_project').getAttribute('data-next');
  TweenMax.set('#to_next_project span', { opacity: 0 });
  Site.animateRandom('#to_next_project span');
  TweenMax.staggerTo(Site.random, 0.4, { opacity: 1, ease: Power2.easeOut }, 0.05);
};

Site.animateNextInnerBtn = function animateNextInnerBtn() {
  document.getElementById('to_next_project').innerHTML = '<span>N</span><span>e</span><span>x</span><span>t</span>';
  TweenMax.set('#to_next_project span', { opacity: 0 });
  Site.animateRandom('#to_next_project span');
  TweenMax.staggerTo(Site.random, 0.4, { opacity: 1, ease: Power2.easeOut }, 0.05);
  TweenMax.to('#inner_project_name', 0.4, { x: '0px', ease: Power2.easeOut });
  TweenMax.staggerTo('.stag', 0.4, { opacity: 0, ease: Power2.easeOut }, 0.02);
};

/*----------------------------------------------------------------------------*/
/*                           HELP FUNCTIONS - START                           */
/*----------------------------------------------------------------------------*/

Site.onPopState = function onPopState(event) {
  if (event.state !== null) {
    Site.loadPage(location.href);
    Site.theRafLoading();
  }
};

Site.onUnload = function onUnload(event) {
  window.scrollTo(Site.scrollMenuOpen, 0); // scroll back to top when reloading page
  // if (Site.scrolling) {
  //   console.log('Site.scrolling', Site.scrolling);
  //   Site.scrolling.scrollTo(0, 0);
  // }
};

Site.animateRandom = function animateRandom(element) {
  Site.random = [];
  document.querySelectorAll(element).forEach((obj) => Site.random.push(obj));
  Site.random.sort(() => 0.5 - Math.random());
};

Site.addRandom = function addRandom(item, index) {
  item.classList.add('random');
};

Site.isMobile = function isMobile() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

Site.mousePosition = function mousePosition(event) {
  Site.currentMousePos.x = event.pageX;
  Site.currentMousePos.y = event.pageY;
  // console.log(Site.currentMousePos);
};

Site.scrollIt = function scrollIt(destination, duration, easing, callback) {
  const easings = {
    linear(t) { return t; },
    easeInQuad(t) { return t * t; },
    easeOutQuad(t) { return t * (2 - t); },
    easeInOutQuad(t) { return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t; },
    easeInCubic(t) { return t * t * t; },
    easeOutCubic(t) { return (--t) * t * t + 1; },
    easeInOutCubic(t) { return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1; },
    easeInQuart(t) { return t * t * t * t; },
    easeOutQuart(t) { return 1 - (--t) * t * t * t; },
    easeInOutQuart(t) { return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t; },
    easeInQuint(t) { return t * t * t * t * t; },
    easeOutQuint(t) { return 1 + (--t) * t * t * t * t; },
    easeInOutQuint(t) { return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t; }
  };

  const start = window.pageYOffset;
  const startTime = 'now' in window.performance ? performance.now() : new Date().getTime();

  const documentHeight            = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight);
  const windowHeight              = window.innerHeight || document.documentElement.clientHeight || document.getElementsByTagName('body')[0].clientHeight;
  const destinationOffset         = typeof destination === 'number' ? destination : destination.offsetTop;
  const destinationOffsetToScroll = Math.round(documentHeight - destinationOffset < windowHeight ? documentHeight - windowHeight : destinationOffset);

  if ('requestAnimationFrame' in window === false) {
    window.scroll(0, destinationOffsetToScroll);
    if (callback) callback();
    return;
  }

  function scroll() {
    const now          = 'now' in window.performance ? performance.now() : new Date().getTime();
    const time         = Math.min(1, ((now - startTime) / duration));
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

// Site.getElem = function getElem(el) {
//   return document.getElementById(el);
// };

// Site.acceptsTouch = function acceptsTouch() {
//   return 'ontouchstart' in document.documentElement;
// };

// Site.getPageMaxScroll = function getPageMaxScroll() {
//   // Cross browser page height detection is ugly
//   return Math.max(
//     document.body.scrollHeight,
//     document.body.offsetHeight,
//     document.documentElement.clientHeight,
//     document.documentElement.scrollHeight,
//     document.documentElement.offsetHeight
//   ) - window.innerHeight; // Subtract viewport height
// };

/*----------------------------------------------------------------------------*/
/*                           HELP FUNCTIONS - END                           */
/*----------------------------------------------------------------------------*/

// Site.moveBackground = function moveBackground() {
//   Site.x += (Site.lFollowX - Site.x) * Site.friction;
//   Site.y += (Site.lFollowY - Site.y) * Site.friction;
//
//   var translate = 'translate(' + Site.x + 'px, ' + Site.y + 'px) scale(1.1)';
//
//   document.getElementById('inner_canvas').style.transform       = translate;
//   document.getElementById('inner_canvas').style.webkitTransform = translate;
//
//   window.requestAnimationFrame(Site.moveBackground);
// };
//
// Site.backgroundGyro = function backgroundGyro() {
//   document.getElementById('#container').on('mousemove', function(e) {
//     parallaxIt(e, '.slide', -100);
//     parallaxIt(e, 'img', -30);
//   });
//
//   function parallaxIt(e, target, movement) {
//     var $this = $("#container");
//     var relX = e.pageX - $this.offset().left;
//     var relY = e.pageY - $this.offset().top;
//
//     TweenMax.to(target, 1, {
//       x: (relX - $this.width() / 2) / $this.width() * movement,
//       y: (relY - $this.height() / 2) / $this.height() * movement
//     });
//   }
// };
//
// Site.preloadImages = function preloadImages() {
//   // var progressText = new createjs.Text('Hello World', '20px Arial', '#000000');
//   // progressText.x = 300 - progressText.getMeasuredWidth() / 2;
//   // progressText.y = 20;
//   // Site.stage.addChild(progressText);
//   // Site.stage.update();
//
//   Site.preload.loadFile('../images/tp-hm2.jpeg');
//   Site.preload.on('fileload', Site.handleFileLoad, this);
//   Site.preload.on('progress', Site.handleOverallProgress, this);
//   Site.preload.on('complete', Site.handleComplete, this);
//   Site.preload.on('error', Site.handleError, this);
//
//   Site.handleFileLoad = function handleFileLoad(event) {
//     console.log('handleFileLoad => event', event);
//
//     // var item = event.item; // A reference to the item that was passed in to the LoadQueue
//     // var type = item.type;
//     //
//     // // Add any images to the page body.
//     // if (type == createjs.Types.IMAGE) document.body.appendChild(event.result);
//   };
//
//   Site.handleOverallProgress = function handleOverallProgress(event) {
//     console.log('handleOverallProgress => event', event);
//     // progressText.text = (preload.progress * 100 | 0) + ' % Loaded';
//     // Site.stage.update();
//   };
//
//   Site.handleComplete = function handleComplete(event) {
//     console.log('handleComplete => event', event);
//   };
//
//   Site.handleError = function handleError(event) {
//     console.log('handleError => event', event);
//   };
// };
//
// Site.IntersectImages = function IntersectImages() {
//   var lazyloadImages;
//
//   if ('IntersectionObserver' in window) {
//     lazyloadImages = document.querySelectorAll('.lazy');
//
//     var imageObserver = new IntersectionObserver(function(entries, observer) {
//       entries.forEach(function(entry) {
//         if (entry.isIntersecting) {
//           var image = entry.target;
//           image.src = image.dataset.src;
//           image.classList.remove('lazy');
//           imageObserver.unobserve(image);
//         }
//       });
//     });
//
//     lazyloadImages.forEach((image) => {
//       console.log('image', image);
//       imageObserver.observe(image);
//     });
//   }
//   else {
//     lazyloadImages = document.querySelectorAll('.lazy');
//
//     var lazyloadThrottleTimeout;
//
//     if (lazyloadThrottleTimeout) clearTimeout(lazyloadThrottleTimeout);
//
//     lazyloadThrottleTimeout = setTimeout(function() {
//       var scrollTop = window.pageYOffset;
//
//       lazyloadImages.forEach(function(img) {
//         if (img.offsetTop < (window.innerHeight + scrollTop)) {
//           console.log('img', img);
//           img.src = img.dataset.src;
//           img.classList.remove('lazy');
//         }
//       });
//
//       if (lazyloadImages.length == 0) {
//         document.removeEventListener('scroll', lazyload);
//         window.removeEventListener('resize', lazyload);
//         window.removeEventListener('orientationChange', lazyload);
//       }
//     }, 20);
//
//     document.addEventListener('scroll', lazyload);
//     window.addEventListener('resize', lazyload);
//     window.addEventListener('orientationChange', lazyload);
//   }
// };

document.addEventListener('DOMContentLoaded', () => Site.setup());
