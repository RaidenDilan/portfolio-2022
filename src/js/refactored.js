PIXI.utils.skipHello();

// var Menu = Menu || {};
//
// Menu = {
//   isOpen: !1,
//   button: null,
//   menu: null,
//   modal: null,
//   logo: null,
//   pageContent: null,
//   animation: null,
//   menuItems: null,
//   init: function() {
//     Menu.menu = document.getElementById('menu');
//     Menu.menuItems = Array.from(document.getElementById('the_menu').getElementsByTagName('li'));
//     Menu.button = document.getElementById('menu-button');
//     Menu.modal = document.getElementById('menu-modal');
//     Menu.logo = document.getElementById('logo');
//     Menu.pageContent = document.getElementById('main');
//     Menu.selectCurrentSection(Site.currentPage.sectionName);
//
//     fastdom.mutate(function() {
//       Menu.setBackground(Color.rgbToRgbString(Ribbon.primaryColor), Color.rgbToRgbString(Ribbon.secondaryColor));
//     });
//     Menu.button.isArrow = !1;
//     Menu.button.onclick = function(a) {
//       a.preventDefault();
//       if (Menu.button.isArrow) Site.smoothScroll.scrollToY(0, !0);
//       else if (Menu.isOpen) Menu.close();
//       else Menu.open();
//     };
//     Menu.button.addEventListener('transitionend', function(a) {
//       // 'transform' == a.propertyName && Menu.button.classList.remove('closing');
//     });
//     Menu.menu.addEventListener("transitionend", function(a) {
//       // Menu.menu.classList.contains('closing') && Ribbon.unstraighten();
//       Menu.menu.classList.remove('opening');
//       Menu.menu.classList.remove('closing');
//     });
//     Menu.modal.addEventListener('transitionend', function(a) {
//       Menu.modal.classList.remove('closing');
//     });
//     Menu.modal.onclick = function(a) {
//       Menu.close();
//     };
//     Menu.logo.firstElementChild.onclick = Site.logoClicked;
//     Menu.menuItems.forEach(function(a) {
//       if (a.classList.contains('dropdown')) {
//         a.firstElementChild.onclick = function(d) {
//           d.preventDefault();
//           a.classList.toggle('opened');
//           if (a.classList.contains('opened')) {
//             d = a.getElementsByTagName('li');
//             var f = d[0];
//             d = d[d.length - 1].getBoundingClientRect().bottom - f.getBoundingClientRect().top;
//             a.getElementsByTagName('ul')[0].style.height = d + 'px';
//           }
//           else a.getElementsByTagName('ul')[0].style.height = '0';
//         };
//       }
//       else {
//         a.firstElementChild.onclick = function(a) {
//           a.preventDefault();
//           Menu.selectCurrentSection(this.parentElement.dataset.section);
//
//           if (a.target.href == location.href) Menu.close();
//           else if (UserAgent.edge || UserAgent.internetExplorer) location.href = a.target.href;
//           else Barba.Pjax.goTo(a.target.href);
//         };
//       }
//     });
//   },
//   selectCurrentSection: function(a) {
//     Menu.menuItems.forEach(function(d) {
//       if (d.dataset.section == a) d.classList.add('current');
//       else d.classList.remove('current');
//     });
//   },
//   setBackground: function(a, d) {
//     Menu.menu.style.background = a;
//     Menu.menu.dataset.midcolor = d;
//     Menu.menu.style.setProperty('--selection-color', d);
//   },
//   open: function() {
//     Menu.isOpen = !0;
//     Menu.pageContent = document.getElementsByClassName('vs-section')[0];
//     // Site.currentPage.menuWillAppear && Site.currentPage.menuWillAppear();
//     var a = Color.stringToRgb(Menu.menu.style.background);
//     if (a) {
//       fastdom.measure(function() {
//         if (79 < Color.rgbToCIELab(a).l) {
//           fastdom.mutate(function() {
//             Menu.menu.classList.add('reversed');
//             Menu.button.classList.add('reversed');
//           });
//         }
//       });
//     }
//     else {
//       fastdom.mutate(function() {
//         Menu.menu.classList.remove("reversed");
//         Menu.button.classList.remove("reversed");
//       });
//     }
//
//     fastdom.mutate(function() {
//       Menu.pageContent.style.transformOrigin = 'center ' + (pageYOffset + Site.height / 2) + 'px';
//       Menu.button.classList.add('opened');
//       Menu.button.classList.remove('closing');
//     });
//     Site.scrolling.off(onscroll);
//     Menu.animateMenu(0, 1);
//     Menu.logo.firstElementChild.onclick = function(a) {
//       a.preventDefault();
//       Menu.close();
//     };
//   },
//   close: function(a) {
//     Menu.isOpen = !1;
//     Menu.animateMenu(1, 0, function() {
//       Site.smoothScroll.enableScrolling();
//       if(Site.currentPage.menuDidDisappear) Site.currentPage.menuDidDisappear();
//     }, a);
//     Menu.button.classList.remove('opened');
//     Menu.button.classList.add('closing');
//     Menu.logo.firstElementChild.onclick = Site.logoClicked;
//   },
//   showArrow: function() {
//     // Menu.button.isArrow || (Menu.button.isArrow = !0, Menu.button.classList.add("arrow-transition-in"), Menu.button.classList.remove("arrow-transition-out"), Menu.arrowHidingTimeout && (clearTimeout(Menu.arrowHidingTimeout), Menu.arrowHidingTimeout = null))
//   },
//   arrowHidingTimeout: void 0,
//   hideArrow: function() {
//     // Menu.button.isArrow && (Menu.button.isArrow = !1, Menu.button.classList.remove("arrow-transition-in"), Menu.button.classList.add("arrow-transition-out"), Menu.arrowHidingTimeout = setTimeout(function() {
//     //   Menu.button.classList.remove("arrow-transition-out");
//     //   Menu.arrowHidingTimeout = void 0
//     // }, 500))
//   },
//   showDarkButtonStyle: function() {
//     Menu.button.classList.remove('light');
//   },
//   showLightButtonStyle: function() {
//     Menu.button.classList.add('light');
//   },
//   animateMenu: function(a, d, f, c) {
//       var g = RibbonHomeMode.widthForBreakpoint(Ribbon.breakpoint) * RibbonHomeMode.activeScaleForBreakpoint(Ribbon.breakpoint) * 0.75;
//       var h = Menu.widthForBreakpoint(Ribbon.breakpoint);
//       var n = a;
//       var p = CubicBezier.make(0.25, 0, 0.35, 1);
//       var q = CubicBezier.make(0.65, 0, 0.65, 1);
//
//       CubicBezier.make(0.43, 0, 0.05, 1);
//       var k = Color.stringToRgb(Menu.menu.dataset.midcolor);
//       var l = 0.625 > a;
//       var u = !l && c;
//
//       Menu.button.classList.add('animating');
//       // Menu.animation && (n = Menu.animation.obj.value, Menu.animation.stop());
//       var y = { value: n };
//       Menu.animation = new Tween(y, 1E3 * Math.abs(d - n), {
//         value: d,
//         ease: Ease.linear,
//         onUpdate: function(a) {
//           if (0.625 > y.value) c && !l && (c(), c = null), Ribbon.canvas.style.visibility = 'visible', Menu.menu.style.display = 'none', Menu.modal.style.display = 'none', u || (a = p(y.value / 0.625), Ribbon.straighten(a)), Menu.pageContent.style.removeProperty('transform'), Menu.logo.style.removeProperty('transform');
//           else {
//             Ribbon.canvas.style.visibility = 'hidden';
//             Menu.menu.style.display = 'block';
//             Menu.modal.style.display = 'block';
//             a = (y.value - 0.625) / 0.375;
//             var d = q(a);
//             Menu.menu.style.transform = 'translate(' + (h - (g + (h - g) * d)) + 'px, 0)';
//             Menu.modal.style.backgroundColor = 'rgba(255, 255, 255, ' + 0.8 * a + ')';
//             a = 1 - 0.05 * Ease.easeInOut.cubic(a);
//             Menu.pageContent.style.transform = 'scale(' + a + ', ' + a + ')';
//             Menu.logo.style.transform = 'scale(' + a + ', ' + a + ')';
//           }
//           Menu.button.classList.contains('reversed') ? Menu.button.style.removeProperty('--button-color') : (a = Math.min(Math.max((y.value - 0.25) / 0.5, 0), 1), 0.35 > a ? (a /= 0.35, Menu.button.style.setProperty('--button-color', 'rgb(' + (27 + Math.round((k.r - 27) * a)) + ', ' + (27 + Math.round((k.g - 27) * a)) + ', ' + (27 + Math.round((k.b - 27) * a)) + ')')) : (a = (a - 0.35) / 0.65, Menu.button.style.setProperty('--button-color', 'rgb(' + (k.r + Math.round((255 - k.r) * a)) + ', ' + (k.g + Math.round((255 - k.g) * a)) + ', ' + (k.b + Math.round((255 - k.b) * a)) + ')')));
//         },
//         onComplete: function(a) {
//             Menu.animation = null;
//             Menu.menu.style.transform = '';
//             Menu.button.classList.remove('animating');
//             if (f) f();
//           }
//       });
//   },
//   widthForBreakpoint: function(a) {
//     switch (a) {
//       case BreakPoints.MajorBreakPoints.A:
//         return 0.88 * Site.width;
//       case BreakPoints.MajorBreakPoints.B:
//         return 0.64 * Site.width;
//       case BreakPoints.MajorBreakPoints.C:
//         return 0.54 * Site.width;
//       default:
//         return 800;
//     }
//   }
// };

var Site = Site || {};

Site.setup = function setup() {
  // this.exitOk              = void 0;
  // this.ajaxOk              = void 0;
  // this.newPageContent      = void 0;
  // this.linkInProgress      = void 0;
  // this.raf                 = void 0;
  // this.rafPixiHome         = void 0;
  // this.rafPixiMenu         = void 0;
  // this.rafPixiSingle       = void 0;
  // this.rafLoading          = void 0;
  // this.theRafAbout         = void 0;
  // this.aboutRafs           = void 0;
  // this.displacementSprite  = void 0;
  // this.displacementSprite2 = void 0;
  // this.stage               = void 0;
  // this.texture2            = void 0;
  // this.displacementFilter  = void 0;
  // this.displacementFilter2 = void 0;
  // this.renderer            = void 0;
  // this.raf1                = void 0;
  // this.links               = void 0;
  // this.hovers              = void 0;
  // this.bottomLink          = void 0;
  // this.ladderScale         = void 0;
  // this.theDeltaMenu        = void 0;
  // this.scrollMenuOpen      = void 0;
  // this.rendererMenu        = void 0;
  // this.displacementFilter3 = void 0;
  // this.displacementSprite3 = void 0;
  // this.stageMenu           = void 0;
  // this.intensity           = void 0;
  // this.heightMenu          = void 0;
  // this.margins             = void 0;
  // this.expression          = void 0;
  // this.heightMargin        = void 0;
  // this.cursorPercentage    = void 0;
  // this.entranceMenu        = void 0;
  // this.entranceHeight      = void 0;
  // this.totalSlides         = void 0;
  // this.loader              = void 0;
  // this.siriWave            = void 0;
  // this.counter             = void 0;
  // this.random              = void 0;
  // this.multiplier          = void 0;
  // this.gamma               = void 0;
  // this.deltaGamma          = void 0;
  // this.imageNumber         = void 0;
  // this.delayx              = void 0;
  // this.lindex              = void 0;

  this.directoryUri        = './';
  this.preload             = new createjs.LoadQueue(true);
  this.lethargy            = new Lethargy();
  this.scrolling           = null;
  this.xDown               = null;
  this.yDown               = null;
  this.blockedAction       = true;
  this.listenCursor        = false; // true
  this.supportsWheel       = false;
  this.playOnce            = false;
  this.passOnce            = false;
  this.mousePos            = {};
  this.attributes          = {};
  this.attributes2         = {};
  this.attributes3         = {};
  this.displace            = {};
  this.displace2           = {};
  this.tempImageNumber     = -1;
  this.speed               = 0;
  this.currentSlide        = 0;
  this.formerDelta         = 0;
  this.deltaMenu           = 0;
  this.deltaScroll         = 0;
  this.formerHeight        = 0;
  this.lastAdds            = 0;
  this.currentMousePos     = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  this.windowOffset        = window.pageYOffset;

  // this.isOpen              = !1;
  // this.button              = document.getElementsByClassName('projects');
  // this.button.isArrow      = !1;
  // this.arrowHidingTimeout  = void 0;


  /* Add the event listeners for each event. */
  document.addEventListener('mousemove', Site.mousePosition);
  document.addEventListener('click', Site.changeProject);

  // scroll event
  document.addEventListener('wheel', Site.scrollEvent);
  document.addEventListener('mousewheel', Site.scrollEvent);
  document.addEventListener('DOMMouseScroll', Site.scrollEvent);

  // swipe event
  document.addEventListener('touchstart', Site.handleTouchStart, false);
  document.addEventListener('touchmove', Site.handleTouchMove, false);

  window.addEventListener('resize', Site.resize);

  // device giroscope event
  if (window.DeviceOrientationEvent) window.addEventListener('deviceorientation', Site.handleCircle, false);
};

document.addEventListener('DOMContentLoaded', function() {
  // Menu.init();
  // console.log('Menu', Menu);

  //--------------------------------------------------------------------------//
  //                               PRELOAD PART                               //
  //--------------------------------------------------------------------------//

  // var progressText = new createjs.Text('Hello World', '20px Arial', '#000000');
  // progressText.x = 300 - progressText.getMeasuredWidth() / 2;
  // progressText.y = 20;
  // Site.stage.addChild(progressText);
  // Site.stage.update();

  // preload.loadFile('../images/tp-hm2.jpg');
  // preload.on('progress', handleOverallProgress); // -> handleOverallProgress, this
  // preload.on('complete', handleComplete); /// -> handleComplete, this
  // preload.on('fileload', handleFileLoad);
  // preload.on('error', handleError);

  // function handleFileLoad(event) {
  //   console.log('A file has loaded of type: ' + event.item.type);
  //
  //   if(event.item.id == 'logo') console.log('Logo is loaded'); // create bitmap here
  // }
  // function handleOverallProgress(event) {
  //   console.log('handleOverallProgress', 1 - event.progress);
  //
  //   // progressText.text = (preload.progress * 100 | 0) + ' % Loaded';
  //   // Site.stage.update();
  // }
  // function handleComplete(event) {
  //   console.log('handleComplete', event.type);
  // }
  // function handleError(event) {
  //   console.log('handleError!', event.text);
  // }

  //--------------------------------------------------------------------------//
  //                               PROCESS AJAX                               //
  //--------------------------------------------------------------------------//

  // called each time a page is launched
  Site.init = function init() {
    this.exitOk          = false;
    this.ajaxOk          = false;
    this.linkInProgress  = false;
    this.deltaMenu       = 0;
    this.deltaScroll     = 0;
    this.speed           = 0;
    this.bottomLink      = false;
    this.playOnce        = false;

    TweenMax.set('#main, #the_menu, #pixi_menu', { opacity: 1 });
    TweenMax.set('#main', { clearProps: 'y' });
    // TweenMax.to('.feature1', 0.2, { scaleY: 1, ease: Power2.easeIn });
    // Site.resize();

    document.getElementById('menu').style.display = 'none';
    document.querySelector('.projects').classList.remove('active');
    document.querySelector('.projects').classList.remove('arrow-transition-in');
    document.querySelector('.projects').classList.add('arrow-transition-out');
    setTimeout(() => document.querySelector('.projects').classList.remove('arrow-transition-out'), 500);

    if (document.querySelector('body').classList.contains('is-loading')) {
      setTimeout(() => document.querySelector('.is-loading').classList.remove('is-loading'), 2000, false);
      console.log('is-loading', document.querySelector('body').classList.contains('is-loading'));
    }

    // when click on link
    Site.links = document.querySelectorAll('a');

    Site.links.forEach((link) => link.removeEventListener('click', Site.onClick));

    Site.onClick = function(event) {
      if (!event.target.classList.contains('external')) {
        event.preventDefault();

        if (Site.linkInProgress === false) {
          Site.linkInProgress = true;
          var href = this.getAttribute('href');

          if (event.target.classList.contains('bottom_link')) Site.bottomLink = true;
          // if (href.indexOf(document.domain) > -1 || href.indexOf(':') === -1) {
            history.pushState({}, '', href);
            Site.loadPage(href);
            Site.theRafLoading();
            // Site.scrolling.off(onscroll);
            return false;
            // }
        }
        else return false;
      }
    };

    Site.links.forEach((link) => link.addEventListener('click', Site.onClick));

    Site.animations();
  };

  // when get() completed
  Site.ajaxLoad = function ajaxLoad(html) {
    Site.newPageContent = html;
    Site.ajaxOk         = true;
  };

  // animations input
  Site.animations = function animations() {
    if (window.innerWidth < 768) document.querySelectorAll('#the_menu li').forEach(x => x.classList.remove('active'));
    if (Site.isMobile()) {
      window.scrollTo(0, 0);
      document.getElementById('main').classList.remove('black');
    }
    if (document.querySelector('body').classList.contains('home')) {
      document.querySelectorAll('.point3').forEach(x => x.classList.remove('black'));
      Site.hovers = document.querySelectorAll('.change_project');

      Site.hovers.forEach((hover) => hover.addEventListener('mouseenter', Site.onHover));
      Site.hovers.forEach((hover) => hover.addEventListener('mouseleave', Site.offHover));

      Site.currentSlide = 0;
      Site.totalSlides  = 0;

      Site.renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight, { transparent: !0 });
      document.getElementById('inner_canvas').appendChild(Site.renderer.view);

      Site.renderer.view.width  = window.innerWidth;
      Site.renderer.view.height = window.innerHeight;

      Site.stage  = new PIXI.Container();
      Site.loader = new PIXI.Loader();

      document.querySelectorAll('#images div').forEach(Site.setDimensions);

      // displacement 1
      Site.displacementSprite = PIXI.Sprite.from(Site.directoryUri + 'images/gradient4.png'); //gradient4_bis //gradient4
      Site.displacementSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.CLAMP; // REPEAT // MIRRORED_REPEAT // CLAMP
      Site.displacementFilter = new PIXI.filters.DisplacementFilter(Site.displacementSprite);

      // displacement 2
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

        if (!document.querySelector('.projects').classList.contains('active')) Site.homePixi();

        Site.nextSlide();

        document.getElementById('progress').style.display = 'none';
      });
    }
    else if (document.querySelector('body').classList.contains('page-template-about')) {
      document.getElementById('progress').style.display = 'none';
      document.querySelectorAll('.point3').forEach(x => x.classList.add('black'));

      // document.getElementById('volet1').classList.add('ouvert');
      // document.querySelector('.intro').classList.add('ouvert');

      TweenMax.to('.fond_intro', 1.2, { scaleX: 1, ease: Power4.easeOut });

      Site.random = [];

      document.querySelectorAll('.random').forEach(x => Site.random.push(x));

      Site.random.sort(() => 0.5 - Math.random());

      TweenMax.staggerFromTo(Site.random, 1, { x: '-24px' }, { x: '0px', opacity: 1, delay: 0.6, ease: Power2.easeOut }, 0.1);

      if (!Site.isMobile()) {
        if (Site.scrolling !== null) Site.scrolling.destroy();
        Site.scrolling = null;

        Site.scrolling = new Smooth({
          preload: true,
          native: false,
          section: document.querySelector('.vs-section'),
          divs: document.querySelectorAll('.vs-div'),
          vs : { mouseMultiplier: 0.4 }
        });

        Site.scrolling.init();
      }

      TweenMax.to('#main', 0.4, { backgroundColor: '#EFEFEF', ease: Power2.easeInOut });
      TweenMax.to('#inner_svg', 1, { opacity: 1, ease: Power2.easeIn });
      TweenMax.fromTo('#inner_svg', 2, { rotation: 140 }, { rotation: 0, ease: Power2.easeOut });
      TweenMax.fromTo('#inner_svg img', 2, {
        rotation: -140
      },{
        rotation: 0,
        ease: Power2.easeOut,
        onComplete: () => Site.aboutRafs()
      });
    }
    else if (document.querySelector('body').classList.contains('single')) {
      if (window.innerWidth < 768) {
        document.querySelectorAll('#the_menu li').forEach(x => {
          if (document.querySelector('body').classList.contains(x.getAttribute('data-id'))) x.classList.add('active');
        });
      }

      document.querySelectorAll('.point3').forEach(x => x.classList.add('black'));

      if (!Site.isMobile()) {
        document.getElementById('to_next_project').addEventListener('mouseover', Site.onHoverNext);
        document.getElementById('to_next_project').addEventListener('mouseout', Site.offHoverNext);

        if (Site.scrolling !== null) Site.scrolling.destroy();
        Site.scrolling = null;

        Site.scrolling = new Smooth({
          preload: true,
          native: false,
          section: document.querySelector('.vs-section'),
          divs: document.querySelectorAll('.vs-div'),
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
        height                    = 0.57 * window.innerWidth + 20;
        Site.renderer             = PIXI.autoDetectRenderer(window.innerWidth, (0.57 * window.innerWidth + 20), { transparent: !0 });
        Site.renderer.view.width  = window.innerWidth;
        // Site.renderer.view.height = window.innerHeight;
      }
      else {
        height                    = window.innerWidth + 20;
        Site.renderer             = PIXI.autoDetectRenderer(window.innerWidth, (window.innerWidth + 20), { transparent: !0 });
        Site.renderer.view.width  = window.innerWidth;
        // Site.renderer.view.height = window.innerHeight;
      }

      document.getElementById('cover').appendChild(Site.renderer.view);

      Site.stage  = new PIXI.Container();
      Site.loader = new PIXI.Loader();

      // document.querySelectorAll('#images div').forEach(Site.setDimensions);
      var image = new PIXI.Sprite(PIXI.Texture.from(document.getElementById('cover').getAttribute('data-img')));

      Site.loader.add('image', document.getElementById('cover').getAttribute('data-img'));

      var img = new Image();
      img.src = document.getElementById('cover').getAttribute('data-img');

      img.onload = function() {
        var width         = this.width;
        var height        = this.height;
        var ratio_img     = width / height;
        var ratio_fenetre = window.innerWidth / window.innerHeight;

        // +10 et - 5 valeurs pour éviter les bords blancs
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

        // var width         = this.width;
        // var height        = this.height;
        // var ratio_img     = width / height;
        // var ratio_fenetre = window.innerWidth / window.innerHeight;
        //
        // // +10 and - 5 values ​​to avoid white edges
        // if (ratio_fenetre >= ratio_img) {
        //   window['image' + index].width = window.innerWidth + 10;
        //   window['image' + index].height = height * (window.innerWidth + 10) / width;
        //   window['image' + index].x = -5;
        //   window['image' + index].y = window.innerHeight / 2 - window['image' + index].height / 2;
        // } else {
        //   window['image' + index].height = window.innerHeight;
        //   window['image' + index].width = (width * window.innerHeight / height) + 10;
        //   window['image' + index].x = (window.innerWidth / 2 - window['image' + index].width / 2) - 5;
        // }
      };

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

      Site.stage.filters = [Site.displacementFilter2];

      Site.loader.load((loader, resources) => {
        Site.blockedAction = false;

        if (!document.querySelector('.projects').classList.contains('active')) Site.singlePixi();

        Site.random = [];

        document.querySelectorAll('.random').forEach(x => Site.random.push(x));

        Site.random.sort(() => 0.5 - Math.random());

        TweenMax.staggerFromTo(Site.random, 1, { x: '-24px' }, { x: '0px', opacity: 1, ease: Power2.easeOut }, 0.1);
        TweenMax.to('#cover', 1, { opacity: 1, delay: 0.4, ease: Power2.easeOut });

        Site.speed = 4;

        document.getElementById('progress').style.display = 'none';

        Site.ladderScale = (document.getElementById('the_imgs').clientHeight + (0.28 * window.innerHeight)) / document.getElementById('the_imgs').clientHeight;
        Site.ladderScale = parseFloat(Math.round(Site.ladderScale * 100) / 100).toFixed(2);
      });
    }
    // TweenMax.to('body', 1, { opacity: 1, onComplete: ()  => {
    //   scroll.init();
    //   scroll.Site.resize();
    // }});
    //
    // if ($('event')[0]) {}
    // console.log('animations');
  };

  // animations output outputs
  Site.loadPage = function loadPage(href) {
    document.getElementById('progress').style.display = 'block';

    if (Site.scrolling !== null) Site.scrolling.off(onscroll);

    var xhr    = new XMLHttpRequest();
    var method = 'GET';
    var url    = href;

    xhr.open(method, url, true);

    xhr.onreadystatechange = function() {
      if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) Site.ajaxLoad(xhr.responseText);
    };

    xhr.send();

    // TweenMax.to('body', 3, { opacity: 0, onComplete: ()  => {
    //   exitOk = true;
    // }});

    if (document.querySelector('.projects').classList.contains('active')) {
      cancelAnimationFrame(Site.rafPixiMenu);
      TweenMax.to('#the_menu, #pixi_menu', 0.4, {
        opacity: 0,
        ease: Power2.easeInOut,
        onComplete: ()  => {
          Site.stageMenu.removeChildren();
          Site.exitOk = true;

          TweenMax.set('#main', { clearProps: 'backgroundColor' });
        }
      });
    }
    else if (document.querySelector('body').classList.contains('home')) {
      // speed = 4;
      Site.listenCursor  = false;
      Site.blockedAction = true;

      // Site.stage.removeChild(displacementSprite);
      // Site.stage.addChild(Site.displacementSprite2);

      Site.random = [];

      document.querySelectorAll('.random').forEach(x => Site.random.push(x));

      Site.random.sort(() => 0.5 - Math.random());

      TweenMax.staggerTo(Site.random, 0.4, { x: '24px', opacity: 0, ease: Power2.easeIn }, 0.1);

      // TweenMax.to(attributes2, 0.9, {
      //   intensity: 150,
      //   x: 10,
      //   ease: Power2.easeIn,
      //   onUpdate: function() {
      //     Site.displacementFilter2.scale.x = attributes2.intensity;
      //     speed = attributes2.x;
      //   },
      //   onComplete: ()  => {}
      // });

      TweenMax.to('#main', 1, {
        opacity: 0,
        delay: 0.4,
        ease: Power2.easeInOut,
        onComplete: () => Site.exitOk = true
      });

      Site.hovers = document.querySelectorAll('.change_project');

      Site.hovers.forEach(function(hover) {
        hover.removeEventListener('mouseenter', Site.onHover);
        hover.removeEventListener('mouseleave', Site.offHover);
      });
    }
    else if (document.querySelector('body').classList.contains('single')) {
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
            onComplete: ()  => {
              TweenMax.to('#next_proj > div', 0.4, {
                opacity: 0,
                ease: Power2.easeInOut,
                onComplete: () => Site.exitOk = true
              });
          }});
        }
        else {
          diff = document.getElementById('main').clientHeight - (window.pageYOffset + window.innerHeight);

          TweenMax.to('#next_proj, .inner_img', 1.2, { y: - (diff + window.innerHeight), ease: Power2.easeInOut });

          TweenMax.to('#next_proj > div', 1.2, {
            y: diff + window.innerHeight - (document.getElementById('top_half').clientHeight / 2),
            ease: Power2.easeInOut,
            onComplete: ()  => {
              TweenMax.to('#next_proj > div', 0.4, {
                opacity: 0,
                ease: Power2.easeInOut,
                onComplete: ()  => {
                  // TweenMax.set('#main', {clearProps: 'y'});
                  Site.exitOk = true;
                  window.scrollTo(0, 0);
                }
              });
            }
          });
        }
      } else {
        TweenMax.to('#main', 0.4, {
          opacity: 0,
          ease: Power2.easeInOut,
          onComplete: () => Site.exitOk = true
        });
      }
      // exitOk = true;
    }
    else if (document.querySelector('body').classList.contains('page-template-about')) {
      // document.querySelector('.intro2').classList.remove('ouvert');
      // document.querySelector('.intro').classList.remove('ouvert');
      // setTimeout(function() {
      //     document.querySelector('.intro2').classList.add('ouvert');
      // document.querySelector('.intro').classList.add('ouvert');
      // }, 400);
      TweenMax.to('#main', 0.4, {
        opacity: 0,
        clearProps: 'backgroundColor',
        ease: Power2.easeInOut,
        onComplete: () => Site.exitOk = true
      });
    }
    else Site.exitOk = true;
  };

  // updating the data of the page
  Site.updatePage = function updatePage(html) {
    var parser    = new DOMParser();
    var doc       = parser.parseFromString(html, 'text/html');
    var classList = doc.querySelectorAll('body')[0].getAttribute('class');

    // main title of the page
    document.title = doc.querySelector('title').innerHTML;

    // main class of body
    // document.querySelectorAll('body')[0].setAttribute('class', doc.querySelectorAll('body')[0].getAttribute('class'));
    var res = classList.replace('is-loading', '');

    document.querySelectorAll('body')[0].setAttribute('class', res);

    if (!Site.isMobile()) document.querySelectorAll('body')[0].classList.add('desktop');
    else document.querySelectorAll('body')[0].classList.add('mobile');

    // main content #main
    document.getElementById('main').innerHTML = doc.getElementById('main').innerHTML;

    // on launches the new page
    Site.init();
  };

  Site.theRafLoading = function theRafLoading() {
    Site.rafLoading = requestAnimationFrame(Site.theRafLoading);

    if (Site.exitOk === true && Site.ajaxOk === true) {
      cancelAnimationFrame(Site.rafPixiHome);
      cancelAnimationFrame(Site.rafPixiSingle);

      if (document.querySelector('body').classList.contains('single') || document.querySelector('body').classList.contains('home')) {
        Site.stage.destroy();
        Site.renderer.destroy();
      }

      Site.updatePage(Site.newPageContent);
      cancelAnimationFrame(Site.rafLoading);
    }
  };

  // management button - prev / next browser
  window.onpopstate = function(e) {
    if (e.state !== null) {
      Site.loadPage(location.href);
      Site.theRafLoading();
      // Site.scrolling.off(onscroll);
    }
  };

  //--------------------------------------------------------------------------//
  //                           CALLS FIRST LOADING                            //
  //--------------------------------------------------------------------------//

  history.pushState({}, '', location);
  // theRaf();
  Site.init();

  if (!Site.isMobile()) document.querySelectorAll('body')[0].classList.add('desktop');
  else {
    document.querySelectorAll('body')[0].classList.add('mobile');
    document.getElementById('about').style.top = window.innerHeight / 2 + 'px';
    document.getElementById('contact').style.top = window.innerHeight / 2 + 'px';
  }

  // pixi menu statement
  // Site.rendererMenu = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight, { transparent: !0 });
  // console.log('1', 0.24 * window.innerWidth); // ---> 307.2px
  // console.log('2', window.innerHeight - 0.074 * window.innerWidth); // ---> 705.28px

  Site.rendererMenu = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight, { transparent: !0 });
  // Site.rendererMenu = PIXI.autoDetectRenderer(0.24 * window.innerWidth, window.innerHeight - 0.074 * window.innerWidth, { transparent: !0 });

  document.getElementById('pixi_menu').appendChild(Site.rendererMenu.view);

  Site.rendererMenu.view.width  = window.innerWidth;
  Site.rendererMenu.view.height = window.innerHeight;

  Site.stageMenu = new PIXI.Container();

  document.querySelectorAll('#the_menu li a').forEach(Site.setMenuDimensions);

  // displacement 2
  Site.displacementSprite3 = PIXI.Sprite.from(Site.directoryUri + 'images/gradient_large.png');
  Site.displacementSprite3.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;
  Site.displacementFilter3 = new PIXI.filters.DisplacementFilter(Site.displacementSprite3);

  Site.stageMenu.filters = [Site.displacementFilter3];

  // settings displacement2
  // intensity
  Site.displacementFilter3.scale.x = 0;
  Site.displacementFilter3.scale.y = 0;
  // ladder x/y
  Site.displacementSprite3.scale.x = 0.4;
});

Site.changeProject = function changeProject() {
  if (event.target.classList.contains('change_project')) Site.changePagination(event.target);
  else if (event.target.classList.contains('arrow-transition-in')) Site.scrollBackUp(event.target);
  else if (event.target.classList.contains('to_next') && Site.blockedAction === false) Site.nextSlide();
  else if (event.target.classList.contains('to_prev') && Site.blockedAction === false) Site.prevSlide();
  else if (event.target.classList.contains('projects')) {
    document.querySelectorAll('.projects').forEach(x => x.classList.toggle('active'));

    if (document.querySelector('.projects').classList.contains('active')) {
      if (Site.scrolling !== null) Site.scrolling.off(onscroll);
      else Site.scrollMenuOpen = window.pageYOffset;

      document.querySelectorAll('.front.point3, .front .point3').forEach(x => x.classList.add('black'));

      document.getElementById('menu').style.display = 'block';

      // TweenMax.to('.feature1', 0.2, { scaleY: 0, delay: 0.2, ease: Power2.easeIn });

      TweenMax.to('#main', 0.2, {
        opacity: 0,
        ease: Power2.easeIn,
        onComplete: () => {
          if (Site.isMobile()) {
            window.scrollTo(0, 0);

            document.getElementById('main').classList.add('black');
            document.querySelector('body').classList.add('temp');
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

      // image_menu0 from PixiJS
      Site.stageMenu.addChild(image_menu0);
      image_menu0.alpha = 1;

      cancelAnimationFrame(Site.rafPixiHome);
      cancelAnimationFrame(Site.rafPixiSingle);

      Site.menuPixi();
    }
    else {
      if (Site.scrolling !== null) Site.scrolling.on(onscroll);
      if (document.querySelector('body').classList.contains('home')) document.querySelectorAll('.front.point3, .front .point3').forEach(x => x.classList.remove('black'));

        TweenMax.to('#menu', 0.2, {
          opacity: 0,
          ease: Power2.easeIn,
          onComplete: ()  => {
            document.getElementById('menu').style.display = 'none';
            if (Site.isMobile()) {
              document.getElementById('main').classList.remove('black');
              document.querySelector('body').classList.remove('temp');
              window.scrollTo(0, Site.scrollMenuOpen);
            }
          }
        });

        TweenMax.to('#main', 0.2, { opacity: 1, delay: 0.2, ease: Power2.easeOut });
        // TweenMax.to('.feature1', 0.2, { scaleY: 1, delay: 0.2, ease: Power2.easeIn });

        Site.stageMenu.removeChildren();
        cancelAnimationFrame(Site.rafPixiMenu);

        if (document.querySelector('body').classList.contains('home')) Site.homePixi();
        else if (document.querySelector('body').classList.contains('single')) Site.singlePixi();
      }
  }
};

Site.scrollBackUp = function scrollBackUp(target) {
  // if (Site.scrolling !== null) {
    Site.scrolling.scrollTo(0);

    if (Math.abs(document.querySelector('.vs-section').getBoundingClientRect().top) / 7) {
      setTimeout(() => {
        document.querySelector('.projects').classList.remove('arrow-transition-in');
        document.querySelector('.projects').classList.add('arrow-transition-out');
        setTimeout(() => document.querySelector('.projects').classList.remove('arrow-transition-out'), 250);
      }, Math.abs(document.querySelector('.vs-section').getBoundingClientRect().top) / 7);
    }
  // }
};

Site.scrollEvent = function scrollEvent(e) {
  if (e.type == 'wheel') Site.supportsWheel = true;
  else if (Site.supportsWheel) return;

  var delta = (e.deltaY || -e.wheelDelta || e.detail) || 1;

  if (Site.lethargy.check(e) !== false && Site.blockedAction === false && !document.querySelector('.projects').classList.contains('active') && document.querySelector('body').classList.contains('home')) {
    if (delta > 0) Site.nextSlide();
    else if (delta < 0) Site.prevSlide();
  }

  var element = document.querySelector('.vs-section');

  if(typeof(element) != 'undefined' && element != null) Site.scrollPosition(); // If it isn't "undefined" and it isn't "null", then it exists and execute next code.
};

Site.scrollPosition = function scrollPosition(event) {
  if (Math.abs(document.querySelector('.vs-section').getBoundingClientRect().top) > 50 || Math.abs(document.querySelector('.vs-section').getBoundingClientRect().y) > 50) {
    document.querySelector('.projects').classList.remove('arrow-transition-out');
    document.querySelector('.projects').classList.add('arrow-transition-in');
  }
  else if (document.querySelector('.vs-section').getBoundingClientRect().top < 50 || document.querySelector('.vs-section').getBoundingClientRect().y < 50) {
    document.querySelector('.projects').classList.remove('arrow-transition-in');
    document.querySelector('.projects').classList.add('arrow-transition-out');
    setTimeout(() => document.querySelector('.projects').classList.remove('arrow-transition-out'), 250);
  }
};

//----------------------------------------------------------------------------//
//                          Home Porject Arrow Buttons                        //
//----------------------------------------------------------------------------//

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
    // width: 0.8,
    ease: Power2.easeIn,
    onUpdate: () => {
      Site.displacementFilter2.scale.x = Site.attributes2.intensity;
      Site.speed                       = Site.attributes2.x;
      // Site.displacementSprite2.scale.x = Site.attributes2.width;
    },
    onComplete: () => {
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
    onUpdate: () => window['image' + Site.currentSlide].alpha = Site.attributes3.opacity
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

  //Site.attributes2.anchor = 0;

  timeline.to(Site.attributes2, 0.9, {
    intensity: 150,
    x: -20,
    // width: 0.8,
    // anchor: 1,
    ease: Power2.easeIn,
    onUpdate: () => {
      Site.displacementFilter2.scale.x = Site.attributes2.intensity;
      Site.speed                       = Site.attributes2.x;
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
      //     onUpdate: function() {
      //         console.log(Site.attributes2.width);
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
    onUpdate: () => {
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
    onUpdate: () => Site.displacementFilter.scale.x = Site.attributes.intensity
  });

  Site.displacementSprite2.x  = 0;
  Site.attributes2.intensity  = Site.displacementFilter2.scale.x;
  Site.attributes2.x          = Site.speed;
  Site.attributes2.width      = Site.displacementSprite2.scale.x;
  Site.attributes3.opacity    = 0;
};

Site.setDimensions = function setDimensions(item, index) {
  Site.totalSlides++;

  window['image' + index] = new PIXI.Sprite(PIXI.Texture.from(item.getAttribute('data-url')));
  window['image' + index].alpha = 0;

  Site.loader.add('image' + index, item.getAttribute('data-url'));

  // Chainable `pre` to add a middleware that runs for each resource, *before* loading that resource.
  // This is useful to implement custom caching modules (using filesystem, indexeddb, memory, etc).
  // Site.loader.pre(cachingMiddleware);

  var img = new Image();
  img.src = item.getAttribute('data-url');

  img.onload = function() {
    var width         = this.width;
    var height        = this.height;
    var ratio_img     = width / height;
    var ratio_fenetre = window.innerWidth / window.innerHeight;

    // +10 and - 5 values ​​to avoid white edges
    if (ratio_fenetre >= ratio_img) {
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
      window['image_menu' + index].width  = frame_width + 10;
      window['image_menu' + index].height = height * (frame_width + 10) / width;
      window['image_menu' + index].x      = - 5;
      window['image_menu' + index].y      = frame_height / 2 - window['image_menu' + index].height / 2;
    }
    else {
      window['image_menu' + index].height = height;
      window['image_menu' + index].width  = width;
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

Site.updatePagination = function updatePagination(direction) {
  if (direction === 'next') {
    Site.multiplier = 1;
    TweenMax.to('#white_circle', 0.9, { 'stroke-dashoffset': 1900 * (1 - 1 / Site.totalSlides - (Site.currentSlide * 1 / Site.totalSlides)), ease: Power4.easeInOut });
  }
  else {
    Site.multiplier = -1;

    if (Site.currentSlide === 1) TweenMax.to('#white_circle', 0.9, { 'stroke-dashoffset': 0, ease: Power4.easeInOut });
    else if (Site.currentSlide === 0) TweenMax.to('#white_circle', 0.9, { 'stroke-dashoffset': 1900 / Site.totalSlides, ease: Power4.easeInOut });
    else TweenMax.to('#white_circle', 0.9, { 'stroke-dashoffset' : 1900 - (Site.currentSlide - 1) * 1900 / Site.totalSlides, ease: Power4.easeInOut });
  }

  Site.random = [];

  document.querySelectorAll('.random').forEach(x => Site.random.push(x));

  Site.random.sort(() => 0.5 - Math.random());

  TweenMax.staggerTo(Site.random, 0.4, { x: Site.multiplier * 24 + 'px', opacity: 0, ease: Power2.easeIn }, 0.1, Site.scrollablePagination);
};

//----------------------------------------------------------------------------//
//                              HELPER FUNCTIONS                              //
//----------------------------------------------------------------------------//

Site.addRandom = function addRandom(item, index) {
  item.classList.add('random');
};

Site.isMobile = function isMobile() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

Site.handleCircle = function handleCircle(event) {
  if (window.orientation === 0) Site.gamma = event.gamma;
  else if (window.orientation === 180) Site.gamma = -event.gamma;
  else if (window.orientation === -90) Site.gamma = -event.beta;
  else if (window.orientation === 90) Site.gamma = event.beta;
};

//----------------------------------------------------------------------------//
//                                    Events                                   //
//----------------------------------------------------------------------------//

Site.handleTouchStart = function handleTouchStart(event) {
  Site.xDown = event.touches[0].clientX;
  Site.yDown = event.touches[0].clientY;
};

Site.handleTouchMove = function handleTouchMove(event) {
  if (!Site.xDown || !Site.yDown) return;

  var xUp = event.touches[0].clientX;
  var yUp = event.touches[0].clientY;

  var xDiff = Site.xDown - xUp;
  var yDiff = Site.yDown - yUp;

  if (Math.abs(xDiff) > Math.abs(yDiff)) { /* most significant */
    if (document.querySelector('body').classList.contains('home') && Site.blockedAction === false) {
      if (xDiff > 0) Site.nextSlide();
      else Site.prevSlide();
    }
  }
  else {
    if (document.querySelector('body').classList.contains('home') && Site.blockedAction === false) {
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
  console.log('event.target ===>', event.target);
  document.querySelector('.change_project.current').classList.add('temp');
};

Site.offHover = function offHover(event) {
  event.target.classList.remove('feature');
  document.querySelector('.change_project.current').classList.remove('temp');
};

Site.resize = function resize() {
  if (Site.scrolling !== null) Site.scrolling.resize();
  else {
    document.getElementById('about').style.top = window.innerHeight / 2 + 'px';
    document.getElementById('contact').style.top = window.innerHeight / 2 + 'px';
  }
};

Site.mousePosition = function mousePosition(event) {
  Site.currentMousePos.x = event.pageX;
  Site.currentMousePos.y = event.pageY;
};

//----------------------------------------------------------------------------//
//                     R.A.F.S. (Request Animation Frames)                    //
//----------------------------------------------------------------------------//

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
      intensity: (Site.currentMousePos.x - Site.formerDelta) * 10,
      width: Math.abs(((Site.currentMousePos.x - Site.formerDelta) / 80) - 0.2),
      correction: (Site.currentMousePos.x - Site.formerDelta) / 40,
      onUpdate: () => {
        Site.displacementSprite.x       = Site.mousePos.x;
        // displacementSprite.y                 = Site.mousePos.y;
        Site.displacementFilter.scale.x = Site.mousePos.intensity;
        Site.displacementSprite.scale.x = Site.mousePos.width;

        window['image' + Site.imageNumber].x = Site.delayx + Site.mousePos.correction;
      },
      ease: Linear.easeNone
    });

    // console.log((Site.currentMousePos.x - Site.formerDelta) / 100);

    if (Site.isMobile()) {
      Site.mousePos.penche = Site.displacementFilter2.scale.x; // penche :: definition => looks

      TweenMax.to(Site.mousePos, 0.3, {
        penche: (Site.gamma * 20 - Site.deltaGamma),
        onUpdate: () => Site.displacementFilter2.scale.x = Site.mousePos.penche,
        ease: Linear.easeNone
      });

      // document.getElementById('title_h2').innerHTML = gamma;
      Site.displacementSprite2.x += 10;
    }
  }
  else Site.displacementSprite2.x += Site.speed;

  Site.formerDelta = Site.currentMousePos.x;
  Site.deltaGamma  = Site.gamma * 20;
};

Site.menuPixi = function menuPixi() {
  Site.rafPixiMenu = requestAnimationFrame(Site.menuPixi);
  // console.log('pixi menu turned');

  Site.rendererMenu.render(Site.stageMenu);
  Site.displacementSprite3.x += 2;

  if (!Site.isMobile()) {
    Site.cursorPercentage = Math.round(Site.currentMousePos.y * 100 / window.innerHeight * 100)/100;
    Site.theDeltaMenu = Site.currentMousePos.y;
  }
  else {
    Site.cursorPercentage = window.pageYOffset * 100 / (Site.heightMenu - window.innerHeight);
    Site.theDeltaMenu = window.pageYOffset;
  }

  if (Math.abs((Site.theDeltaMenu - Site.deltaMenu) / 200 + 1) < 1.8) Site.intensity = Math.abs((Site.theDeltaMenu - Site.deltaMenu) / 200 + 1);
  else Site.intensity = 1.8;

  // displacement menu
  if (!Site.isMobile()) {
    expression = -1 * (Site.heightMenu - window.innerHeight) / window.innerHeight * Site.currentMousePos.y;
    // console.log('expression', expression);

    TweenMax.to('#the_menu', 1.4, {
      y: expression + 'px',
      scaleY: Site.intensity,
      ease: Power2.easeOut
    });
  }
  else TweenMax.to('#the_menu', 1.4, { scaleY: Site.intensity, ease: Power2.easeOut });

  if (window.innerWidth > 767) {
    if (Site.cursorPercentage > Site.heightMargin && Site.cursorPercentage < (100 - Site.heightMargin)) document.querySelectorAll('#the_menu li').forEach(Site.checkMenu);

    Site.displace.intensity = Site.displacementFilter3.scale.x;

    TweenMax.to(Site.displace, 0.3, {
      intensity: (Site.theDeltaMenu - Site.deltaMenu) * 4,
      onUpdate: () => Site.displacementFilter3.scale.x = Site.displace.intensity,
      ease: Linear.easeNone
    });
  }
  Site.deltaMenu = Site.theDeltaMenu;
};

Site.singlePixi = function singlePixi() {
  if (document.querySelector('.vs-section').clientHeight != Site.formerHeight && !Site.isMobile()) {
    Site.scrolling.resize();
    Site.formerHeight = document.querySelector('.vs-section').clientHeight;
  }

  Site.rafPixiSingle = requestAnimationFrame(Site.singlePixi);

  // ladderScale = parseFloat(Math.round((document.getElementById('the_imgs').clientHeight + (0.56 * window.innerHeight)) / document.getElementById('the_imgs').clientHeight * 100) / 100).toFixed(2);
  // ladderScale = (document.getElementById('the_imgs').clientHeight + (0.56 * window.innerHeight)) / document.getElementById('the_imgs').clientHeight;
  // ladderScale = parseFloat(Math.round(ladderScale * 100) / 100).toFixed(2);
  // console.log(ladderScale);
  // console.log('pixi single turned');

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
  } else {
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

Site.aboutRafs = function aboutRafs() {
  Site.theRafAbout = requestAnimationFrame(Site.aboutRafs);

  if (Site.scrolling !== null) {
    TweenMax.to('#inner_svg', 1, { rotation: -Site.scrolling.vars.current / 4, ease: Linear.easeNone });
    TweenMax.to('#inner_svg img', 1, { rotation: Site.scrolling.vars.current / 4, ease: Linear.easeNone });

    if (Math.abs((Site.scrolling.vars.current - Site.deltaScroll) / 200 + 1) < 2.2) Site.intensity = Math.abs((Site.scrolling.vars.current - Site.deltaScroll) / 200 + 1);
    else Site.intensity = 2.2;
  }
  else {
    TweenMax.to('#inner_svg', 1, { rotation: -window.pageYOffset / 4, ease: Linear.easeNone });
    TweenMax.to('#inner_svg img', 1, { rotation: window.pageYOffset / 4, ease: Linear.easeNone });

    if (Math.abs((window.pageYOffset - Site.deltaScroll) / 200 + 1) < 2.2) Site.intensity = Math.abs((window.pageYOffset - Site.deltaScroll) / 200 + 1);
    else Site.intensity = 2.2;
  }

  TweenMax.to('#scaleA', 1.4, { scaleX: Site.intensity, ease: Power2.easeOut });

  if (Site.scrolling !== null) Site.deltaScroll = Site.scrolling.vars.current;
  else Site.deltaScroll = window.pageYOffset;
};

Site.checkMenu = function checkMenu(item, index) {
  if (Site.cursorPercentage > (Site.heightMargin + (index * Site.entranceHeight)) && Site.cursorPercentage < (Site.heightMargin + ((index + 1) * Site.entranceHeight)) && !item.classList.contains('active')) {
    document.querySelector('#the_menu .active').classList.remove('active');

    item.classList.add('active');

    document.getElementById('pixi_menu').setAttribute('href', item.querySelector('a').getAttribute('href'));

    // add new image
    Site.stageMenu.addChild(window['image_menu' + index]);

    Site.displace2.alpha = 0;
    // Site.stageMenu.removeChild(Site.displacementSprite3);

    TweenMax.to(Site.displace2, 0.2, {
      alpha: 1,
      onUpdate: () => window['image_menu' + index].alpha = Site.displace2.alpha,
      // onComplete: () => {
      //   // to do : management suppression former child
      //   // Site.stageMenu.removeChildren(2);
      //   // lastAdds = index;
      // },
      ease: Linear.easeNone
    });
  }
};

//----------------------------------------------------------------------------//
//                               Home Pagination                              //
//----------------------------------------------------------------------------//

Site.changePagination = function changePagination(element) {
  if (element.classList.contains('current')) return;

  else {
    Site.lindex   = Array.from(document.getElementById('num_letter').children).indexOf(element);
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
        speed = Site.attributes2.x;
      },
      onComplete: () => {
        timeline.reverse();

        setTimeout(() => {
          Site.stage.removeChild(Site.displacementSprite2);
          Site.stage.addChild(Site.displacementSprite);

          Site.listenCursor = true;
          Site.stage.removeChild(window['image'+(currentIndex)]);

          if (Site.lindex >= Site.totalSlides - 1) Site.currentSlide = 0;
          else Site.currentSlide = Site.lindex + 1;

          Site.displacementSprite.x = Site.currentMousePos.x;
          Site.blockedAction = false;
        }, 800);
      }
    });

    TweenMax.to(Site.attributes3, 0.6, {
      opacity: 1,
      delay: 0.6,
      ease: Linear.easeNone,
      onUpdate: () => window['image' + Site.lindex].alpha = Site.attributes3.opacity
    });

    TweenMax.to('#white_circle', 0.9, { 'stroke-dashoffset' : 1900 * (1 - 1 / Site.totalSlides - (Site.lindex * 1 / Site.totalSlides)), ease: Power4.easeInOut });

    Site.random = [];

    document.querySelectorAll('.random').forEach(x => Site.random.push(x));

    Site.random.sort(() => 0.5 - Math.random());

    TweenMax.staggerTo(Site.random, 0.4, { x: '24px', opacity: 0, ease: Power2.easeIn }, 0.1, Site.clickablePagination);
  }
};

Site.scrollablePagination = function scrollablePagination() {
  document.querySelectorAll('.random.first').forEach(x => x.classList.remove('first'));
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
        onComplete: () => {
          document.querySelector('#num_letter .current').classList.remove('current','after');

          next.classList.add('current');
          next.classList.remove('before');
        }
      });
    }
    else {
      var first = document.querySelector('#num_letter div');
      first.classList.add('before');

      TweenMax.to('.current .letter', 0.4, { x: '100%', clearProps: 'x', ease: Power4.easeInOut });

      TweenMax.to(first.querySelector('div'), 0.4, {
        x: '0%',
        clearProps: 'x',
        ease: Power4.easeInOut,
        onComplete: () => {
          if (document.querySelectorAll('.change_project')[Site.totalSlides - 1].classList.contains('first')) document.querySelectorAll('.change_project')[Site.totalSlides - 1].classList.remove('first');

          document.querySelector('#num_letter .current').classList.remove('current','after');

          first.classList.add('current');
          first.classList.remove('before');
        }
      });
    }
    document.getElementById('num_project').innerHTML = Site.currentSlide + 1;
    document.getElementById('title_h2').innerHTML    = document.querySelectorAll('#images div')[Site.currentSlide].getAttribute('data-title');
    document.getElementById('type').innerHTML        = document.querySelectorAll('#images div')[Site.currentSlide].getAttribute('data-cat');
    document.getElementById('year').innerHTML        = document.querySelectorAll('#images div')[Site.currentSlide].getAttribute('data-year');

    document.querySelectorAll('.update_link').forEach(x => x.setAttribute('href',document.querySelectorAll('#images div')[Site.currentSlide].getAttribute('data-perma')));
  }
  else {
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
        onComplete: () =>{
          document.querySelector('#num_letter .current').classList.remove('current','after');

          prev.classList.add('current');
          prev.classList.remove('before');
        }
      });
    }
    else {
      var last = document.querySelectorAll('#num_letter > div')[Site.totalSlides - 1];
      last.classList.add('before');

      TweenMax.to('.current .letter', 0.4, { x: '-100%', clearProps: 'x', ease: Power4.easeInOut });

      TweenMax.fromTo(last.querySelector('div'), 0.4, {
        x: '100%'
      }, {
        x: '0%',
        clearProps: 'x',
        ease: Power4.easeInOut,
        onComplete: () => {
          document.querySelector('#num_letter .current').classList.remove('current','after');

          last.classList.add('current');
          last.classList.remove('before');
        }
      });
    }

    if (Site.currentSlide === 1) {
      document.getElementById('num_project').innerHTML = Site.totalSlides;
      document.getElementById('title_h2').innerHTML    = document.querySelectorAll('#images div')[Site.totalSlides - 1].getAttribute('data-title');
      document.getElementById('type').innerHTML        = document.querySelectorAll('#images div')[Site.totalSlides - 1].getAttribute('data-cat');
      document.getElementById('year').innerHTML        = document.querySelectorAll('#images div')[Site.totalSlides - 1].getAttribute('data-year');

      document.querySelectorAll('.update_link').forEach(x => x.setAttribute('href', document.querySelectorAll('#images div')[Site.totalSlides - 1].getAttribute('data-perma')));
    }
    else if (Site.currentSlide === 0) {
      document.getElementById('num_project').innerHTML = Site.totalSlides - 1;
      document.getElementById('title_h2').innerHTML    = document.querySelectorAll('#images div')[Site.totalSlides - 2].getAttribute('data-title');
      document.getElementById('type').innerHTML        = document.querySelectorAll('#images div')[Site.totalSlides - 2].getAttribute('data-cat');
      document.getElementById('year').innerHTML        = document.querySelectorAll('#images div')[Site.totalSlides - 2].getAttribute('data-year');

      document.querySelectorAll('.update_link').forEach(x=> x.setAttribute('href', document.querySelectorAll('#images div')[Site.totalSlides - 2].getAttribute('data-perma')));
    }
    else {
      document.getElementById('num_project').innerHTML = Site.currentSlide - 1;
      document.getElementById('title_h2').innerHTML    = document.querySelectorAll('#images div')[Site.currentSlide - 2].getAttribute('data-title');
      document.getElementById('type').innerHTML        = document.querySelectorAll('#images div')[Site.currentSlide - 2].getAttribute('data-cat');
      document.getElementById('year').innerHTML        = document.querySelectorAll('#images div')[Site.currentSlide - 2].getAttribute('data-year');

      document.querySelectorAll('.update_link').forEach(x => x.setAttribute('href', document.querySelectorAll('#images div')[Site.currentSlide - 2].getAttribute('data-perma')));
    }
  }

  document.querySelectorAll('#title_h2 span').forEach(Site.addRandom);

  Site.random = [];

  document.querySelectorAll('.random').forEach(x => Site.random.push(x));

  Site.random.sort(() => 0.5 - Math.random());

  TweenMax.staggerFromTo(Site.random, 1, { x: -Site.multiplier * 24 + 'px', opacity: 0 }, { x: '0px', opacity: 1, ease: Power2.easeOut }, 0.1);
};

Site.clickablePagination = function clickablePagination() {
  console.log('clickablePagination()');
  document.querySelector('#num_letter .current').classList.add('after');

  TweenMax.to('.current .letter', 0.4, { x: '100%', clearProps: 'x', ease: Power4.easeInOut});

  document.querySelectorAll('#num_letter > div')[Site.lindex].classList.add('before');

  TweenMax.to(document.querySelectorAll('#num_letter > div')[Site.lindex].querySelector('div'), 0.4, {
    x: '0%',
    clearProps: 'x',
    ease: Power4.easeInOut,
    onComplete: () => {
      document.querySelector('#num_letter .current').classList.remove('current','after');
      document.querySelectorAll('#num_letter > div')[Site.lindex].classList.add('current');
      document.querySelectorAll('#num_letter > div')[Site.lindex].classList.remove('before');
    }
  });

  // if (document.querySelector('#num_letter .current').nextElementSibling !== null) {
  //     document.querySelector('#num_letter .current').nextElementSibling.classList.add('before');
  //     var next = document.querySelector('#num_letter .current').nextElementSibling;
  //     TweenMax.to('.current .letter', 0.4, {x: '100%', clearProps: 'x', ease: Power4.easeInOut});
  //     TweenMax.to(document.querySelector('#num_letter .current').nextElementSibling.querySelector('div'), 0.4, {x: '0%', clearProps: 'x', ease: Power4.easeInOut, onComplete: ()  => {
  //         document.querySelector('#num_letter .current').classList.remove('current','after');
  //         next.classList.add('current');
  //         next.classList.remove('before');
  //     }});
  // }else{
  //     var first = document.querySelector('#num_letter div');
  //     first.classList.add('before');

  //     TweenMax.to('.current .letter', 0.4, {x: '100%', clearProps: 'x', ease: Power4.easeInOut});
  //     TweenMax.to(first.querySelector('div'), 0.4, {x: '0%', clearProps: 'x', ease: Power4.easeInOut, onComplete: ()  => {
  //         document.querySelector('#num_letter .current').classList.remove('current','after');
  //         first.classList.add('current');
  //         first.classList.remove('before');
  //     }});
  // }

  document.getElementById('num_project').innerHTML = Site.lindex + 1;
  document.getElementById('title_h2').innerHTML    = document.querySelectorAll('#images div')[Site.lindex].getAttribute('data-title');
  document.getElementById('type').innerHTML        = document.querySelectorAll('#images div')[Site.lindex].getAttribute('data-cat');
  document.getElementById('year').innerHTML        = document.querySelectorAll('#images div')[Site.lindex].getAttribute('data-year');

  document.querySelectorAll('.update_link').forEach(x => x.setAttribute('href',document.querySelectorAll('#images div')[Site.lindex].getAttribute('data-perma')));
  document.querySelectorAll('#title_h2 span').forEach(Site.addRandom);

  Site.random = [];

  document.querySelectorAll('.random').forEach(x => Site.random.push(x));

  Site.random.sort(() => 0.5 - Math.random());

  TweenMax.staggerFromTo(Site.random, 1, { x: '-24px', opacity: 0 }, { x: '0px', opacity: 1, ease: Power2.easeOut }, 0.1);
};

//----------------------------------------------------------------------------//
//                         PixiJS Displacement Filter                         //
//----------------------------------------------------------------------------//

Site.increaseDisplacementIntensity = function increaseDisplacementIntensity() {
  Site.speed  = 2;
  var options = { intensity: 0, x: 2 };

  TweenMax.to(options, 0.9, {
    intensity: 25,
    x: 3,
    ease: Power2.easeIn,
    onUpdate: () => {
      Site.displacementFilter2.scale.x = options.intensity;
      Site.speed                       = options.x;
    }
  });
};

Site.decreaseDisplacementIntensity = function decreaseDisplacementIntensity() {
  Site.speed  = 3;
  var options = { intensity: 25, x: 3 };

  TweenMax.to(options, 0.9, {
    intensity: 0,
    x: 2,
    ease: Power2.easeOut,
    onUpdate: () => {
      Site.displacementFilter2.scale.x = options.intensity;
      Site.speed                       = options.x;
    }
  });
};

//----------------------------------------------------------------------------//
//                         Single Project Next Buttons                        //
//----------------------------------------------------------------------------//

Site.onHoverNext = function onHoverNext(event) {
  if (Site.playOnce === false) {
    Site.playOnce = true;
    Site.random   = [];

    document.querySelectorAll('#to_next_project span').forEach(x => Site.random.push(x));

    Site.random.sort(() => 0.5 - Math.random());

    TweenMax.staggerTo(Site.random, 0.4, { opacity: 0, ease: Power2.easeIn }, 0.05, Site.animateNextBtn);
    TweenMax.to('#inner_project_name', 0.4, { x: (document.getElementById('project_name').clientWidth + 10) / 2 + 'px', delay: 0.4, ease: Power2.easeOut });
    TweenMax.staggerTo('.stag', 0.4, { opacity: 1, delay: 0.4, ease: Power2.easeOut }, -0.02);
  }
};

Site.offHoverNext = function offHoverNext(event) {
  if (Site.playOnce === true) {
    Site.playOnce = false;
    Site.random   = [];

    document.querySelectorAll('#to_next_project span').forEach(x => Site.random.push(x));

    Site.random.sort(() => 0.5 - Math.random());

    TweenMax.staggerTo(Site.random, 0.4, { opacity: 0, ease: Power2.easeIn }, 0.05, Site.animateNextInnerBtn);
  }
};

Site.animateNextBtn = function animateNextBtn() {
  document.getElementById('to_next_project').innerHTML = document.getElementById('to_next_project').getAttribute('data-next');

  TweenMax.set('#to_next_project span', { opacity: 0 });

  Site.random = [];

  document.querySelectorAll('#to_next_project span').forEach(x => Site.random.push(x));

  Site.random.sort(() => 0.5 - Math.random());

  TweenMax.staggerTo(Site.random, 0.4, { opacity: 1, ease: Power2.easeOut }, 0.05);
};

Site.animateNextInnerBtn = function animateNextInnerBtn() {
  document.getElementById('to_next_project').innerHTML = '<span>N</span><span>e</span><span>x</span><span>t</span>';

  TweenMax.set('#to_next_project span', { opacity: 0 });

  Site.random = [];

  document.querySelectorAll('#to_next_project span').forEach(x => Site.random.push(x));

  Site.random.sort(() => 0.5 - Math.random());

  TweenMax.staggerTo(Site.random, 0.4, { opacity: 1, ease: Power2.easeOut }, 0.05);
  TweenMax.to('#inner_project_name', 0.4, { x: '0px', ease: Power2.easeOut });
  TweenMax.staggerTo('.stag', 0.4, { opacity: 0, ease: Power2.easeOut }, 0.02);
};

//----------------------------------------------------------------------------//
//                               INITIALIZATION                               //
//----------------------------------------------------------------------------//
// window.addEventListener('DOMContentLoaded', () => Site.setup());
Site.setup();

// function theRaf() {
//   raf = requestAnimationFrame(theRaf);
// }
//
// const ticker = new PIXI.ticker.Ticker();
// ticker.stop();
// ticker.add((deltaTime) => {
//   // do something every frame
//   console.log('iii');
// });
// ticker.start();


// var Menu = Menu || {};
// Menu = {
//   isOpen: !1,
//   button: null,
//   menu: null,
//   modal: null,
//   logo: null,
//   pageContent: null,
//   animation: null,
//   menuItems: null,
//   init: function() {
//     Menu.menu = document.getElementById("menu");
//     Menu.menuItems = Array.from(document.getElementById("menu-items").getElementsByTagName("li"));
//     Menu.button = document.getElementById("menu-button");
//     Menu.modal = document.getElementById("menu-modal");
//     Menu.logo = document.getElementById("logo");
//     Menu.pageContent = document.getElementById("wrapper");
//     Menu.selectCurrentSection(Site.currentPage.sectionName);
//
//     fastdom.mutate(function() {
//       Menu.setBackground(Color.rgbToRgbString(Ribbon.primaryColor),
//       Color.rgbToRgbString(Ribbon.secondaryColor));
//     });
//     Menu.button.isArrow = !1;
//     Menu.button.onclick = function(a) {
//       a.preventDefault();
//       // Menu.button.isArrow ? Site.smoothScroll.scrollToY(0, !0) : Menu.isOpen ? Menu.close() : Menu.open();
//     };
//     Menu.button.addEventListener("transitionend", function(a) {
//       // "transform" == a.propertyName && Menu.button.classList.remove("closing");
//     });
//     Menu.menu.addEventListener("transitionend", function(a) {
//       // Menu.menu.classList.contains("closing") && Ribbon.unstraighten();
//       Menu.menu.classList.remove("opening");
//       Menu.menu.classList.remove("closing");
//     });
//     Menu.modal.addEventListener("transitionend", function(a) {
//       Menu.modal.classList.remove("closing");
//     });
//     Menu.modal.onclick = function(a) {
//       Menu.close();
//     };
//     Menu.logo.firstElementChild.onclick = Site.logoClicked;
//     Menu.menuItems.forEach(function(a) {
//       a.classList.contains("dropdown") ? a.firstElementChild.onclick = function(d) {
//         d.preventDefault();
//         a.classList.toggle("opened");
//         if (a.classList.contains("opened")) {
//           d = a.getElementsByTagName("li");
//           var f = d[0];
//           d = d[d.length - 1].getBoundingClientRect().bottom - f.getBoundingClientRect().top;
//           a.getElementsByTagName("ul")[0].style.height = d + "px";
//         }
//         else a.getElementsByTagName("ul")[0].style.height = "0";
//       } : a.firstElementChild.onclick = function(a) {
//         a.preventDefault();
//         Menu.selectCurrentSection(this.parentElement.dataset.section);
//         // a.target.href == location.href ? Menu.close() : UserAgent.edge || UserAgent.internetExplorer ? location.href = a.target.href : Barba.Pjax.goTo(a.target.href);
//       }
//     });
//   },
//   selectCurrentSection: function(a) {
//     Menu.menuItems.forEach(function(d) {
//       // d.dataset.section == a ? d.classList.add("current") : d.classList.remove("current");
//     });
//   },
//   setBackground: function(a, d) {
//     Menu.menu.style.background = a;
//     Menu.menu.dataset.midcolor = d;
//     Menu.menu.style.setProperty("--selection-color", d);
//   },
//   open: function() {
//     Menu.isOpen = !0;
//     Menu.pageContent = document.getElementsByClassName("page-content")[0];
//     // Site.currentPage.menuWillAppear && Site.currentPage.menuWillAppear();
//     var a = Color.stringToRgb(Menu.menu.style.background);
//     a && fastdom.measure(function() {
//       79 < Color.rgbToCIELab(a).l ? fastdom.mutate(function() {
//         Menu.menu.classList.add("reversed");
//         Menu.button.classList.add("reversed");
//         }) : fastdom.mutate(function() {
//           Menu.menu.classList.remove("reversed");
//           Menu.button.classList.remove("reversed");
//         })
//     });
//     fastdom.mutate(function() {
//       Menu.pageContent.style.transformOrigin = "center " + (pageYOffset + Site.height / 2) + "px";
//       Menu.button.classList.add("opened");
//       Menu.button.classList.remove("closing");
//     });
//     Site.smoothScroll.disableScrolling();
//     Menu.animateMenu(0, 1);
//     Menu.logo.firstElementChild.onclick = function(a) {
//       a.preventDefault();
//       Menu.close();
//     };
//   },
//   close: function(a) {
//     Menu.isOpen = !1;
//     Menu.animateMenu(1, 0, function() {
//       Site.smoothScroll.enableScrolling();
//       Site.currentPage.menuDidDisappear && Site.currentPage.menuDidDisappear();
//     }, a);
//     Menu.button.classList.remove("opened");
//     Menu.button.classList.add("closing");
//     Menu.logo.firstElementChild.onclick = Site.logoClicked;
//   },
//   showArrow: function() {
//     Menu.button.isArrow || (Menu.button.isArrow = !0, Menu.button.classList.add("arrow-transition-in"), Menu.button.classList.remove("arrow-transition-out"), Menu.arrowHidingTimeout && (clearTimeout(Menu.arrowHidingTimeout), Menu.arrowHidingTimeout = null));
//   },
//   arrowHidingTimeout: void 0,
//   hideArrow: function() {
//     Menu.button.isArrow &&
//       (Menu.button.isArrow = !1, Menu.button.classList.remove("arrow-transition-in"), Menu.button.classList.add("arrow-transition-out"), Menu.arrowHidingTimeout = setTimeout(function() {
//         Menu.button.classList.remove("arrow-transition-out");
//         Menu.arrowHidingTimeout = void 0
//       }, 500))
//   },
//   showDarkButtonStyle: function() {
//     Menu.button.classList.remove("light");
//   },
//   showLightButtonStyle: function() {
//     Menu.button.classList.add("light");
//   },
//   animateMenu: function(a, d, f, c) {
//     var g = RibbonHomeMode.widthForBreakpoint(Ribbon.breakpoint) * RibbonHomeMode.activeScaleForBreakpoint(Ribbon.breakpoint) * 0.75;
//     var h = Menu.widthForBreakpoint(Ribbon.breakpoint);
//     var n = a;
//     var p = CubicBezier.make(0.25, 0, 0.35, 1);
//     var q = CubicBezier.make(0.65, 0, 0.65, 1);
//
//
//     CubicBezier.make(0.43, 0, 0.05, 1);
//
//     var k = Color.stringToRgb(Menu.menu.dataset.midcolor);
//     var l = 0.625 > a;
//     var u = !l && c;
//
//     Menu.button.classList.add("animating");
//     Menu.animation && (n = Menu.animation.obj.value, Menu.animation.stop());
//
//     var y = {
//       value: n
//     };
//     Menu.animation = new Tween(y, 1E3 * Math.abs(d - n), {
//       value: d,
//       ease: Ease.linear,
//       onUpdate: function(a) {
//         if (.625 > y.value) c && !l && (c(), c = null), Ribbon.canvas.style.visibility = "visible",
//           Menu.menu.style.display = "none", Menu.modal.style.display = "none", u || (a = p(y.value / .625), Ribbon.straighten(a)), Menu.pageContent.style.removeProperty("transform"), Menu.logo.style.removeProperty("transform");
//         else {
//           Ribbon.canvas.style.visibility = "hidden";
//           Menu.menu.style.display = "block";
//           Menu.modal.style.display = "block";
//           a = (y.value - .625) / .375;
//           var d = q(a);
//           Menu.menu.style.transform = "translate(" + (h - (g + (h - g) * d)) + "px, 0)";
//           Menu.modal.style.backgroundColor = "rgba(255, 255, 255, " + .8 * a + ")";
//           a = 1 - .05 * Ease.easeInOut.cubic(a);
//           Menu.pageContent.style.transform = "scale(" + a + ", " + a + ")";
//           Menu.logo.style.transform = "scale(" + a + ", " + a + ")"
//         }
//         Menu.button.classList.contains("reversed") ? Menu.button.style.removeProperty("--button-color") : (a = Math.min(Math.max((y.value - .25) / .5, 0), 1), .35 > a ? (a /= .35, Menu.button.style.setProperty("--button-color", "rgb(" + (27 + Math.round((k.r - 27) * a)) + ", " + (27 + Math.round((k.g - 27) * a)) + ", " + (27 + Math.round((k.b - 27) * a)) + ")")) : (a = (a - .35) / .65, Menu.button.style.setProperty("--button-color", "rgb(" + (k.r + Math.round((255 - k.r) *
//           a)) + ", " + (k.g + Math.round((255 - k.g) * a)) + ", " + (k.b + Math.round((255 - k.b) * a)) + ")")))
//       },
//       onComplete: function(a) {
//         Menu.animation = null;
//         Menu.menu.style.transform = "";
//         Menu.button.classList.remove("animating");
//         f && f();
//       }
//     });
//   },
//   widthForBreakpoint: function(a) {
//     switch (a) {
//       case BreakPoints.MajorBreakPoints.A:
//         return 0.88 * Site.width;
//       case BreakPoints.MajorBreakPoints.B:
//         return 0.64 * Site.width;
//       case BreakPoints.MajorBreakPoints.C:
//         return 0.54 * Site.width;
//       default:
//         return 800;
//     }
//   }
// };
