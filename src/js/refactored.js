/** R.A.F.S. => requestAnimationFrame */

var portfolio = portfolio || {};

/* portfolio variables: defining variables that will change later */

portfolio.setup = function setup() {
  // PIXI.utils._saidHello = true;
  PIXI.utils.skipHello();
  
  this.exitOk; // jshint ignore:line
  this.ajaxOk; // jshint ignore:line
  this.newPageContent; // jshint ignore:line
  this.linkInProgress; // jshint ignore:line
  this.raf; // jshint ignore:line
  this.rafPixiHome; // jshint ignore:line
  this.rafPixiMenu; // jshint ignore:line
  this.rafPixiSingle; // jshint ignore:line
  this.rafLoading; // jshint ignore:line
  this.theRafAbout; // jshint ignore:line
  this.aboutRafs; // jshint ignore:line
  this.displacementSprite; // jshint ignore:line
  this.displacementSprite2; // jshint ignore:line
  this.stage; // jshint ignore:line
  this.texture2; // jshint ignore:line
  this.displacementFilter; // jshint ignore:line
  this.displacementFilter2; // jshint ignore:line
  this.renderer; // jshint ignore:line
  this.raf1; // jshint ignore:line
  this.links; // jshint ignore:line
  this.hovers; // jshint ignore:line
  this.lowLink; // jshint ignore:line
  this.ladderScale; // jshint ignore:line
  this.theDeltaMenu; // jshint ignore:line
  this.scrollMenuOpen; // jshint ignore:line
  this.rendererMenu; // jshint ignore:line
  this.displacementFilter3; // jshint ignore:line
  this.displacementSprite3; // jshint ignore:line
  this.stageMenu; // jshint ignore:line
  this.intensity; // jshint ignore:line
  this.heightMenu; // jshint ignore:line
  this.margins; // jshint ignore:line
  this.expression; // jshint ignore:line
  this.heightMargin; // jshint ignore:line
  this.cursorPercentage; // jshint ignore:line
  this.entranceMenu; // jshint ignore:line
  this.entranceHeight; // jshint ignore:line
  this.totalSlides; // jshint ignore:line
  this.loader; // jshint ignore:line
  this.siriWave; // jshint ignore:line
  this.counter; // jshint ignore:line
  this.random; // jshint ignore:line
  this.multiplier; // jshint ignore:line
  this.gamma; // jshint ignore:line
  this.deltaGamma; // jshint ignore:line
  this.imageNumber; // jshint ignore:line
  this.delayx; // jshint ignore:line
  this.lindex; // jshint ignore:line

  this.directoryUri    = './';
  this.preload         = new createjs.LoadQueue(true);
  this.lethargy        = new Lethargy();
  this.scrolling       = null;
  this.xDown           = null;
  this.yDown           = null;
  this.blockedAction   = true;
  this.listenCursor    = false; // true
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
  this.lastAdds  = 0;
  this.currentMousePos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

  /* Add the event listeners for each event. */
  document.addEventListener('mousemove', portfolio.mousePosition);
  document.addEventListener('click', portfolio.changeProject);

  // scroll event
  document.addEventListener('wheel', portfolio.scrollEvent);
  document.addEventListener('mousewheel', portfolio.scrollEvent);
  document.addEventListener('DOMMouseScroll', portfolio.scrollEvent);

  // swipe event
  document.addEventListener('touchstart', portfolio.handleTouchStart, false);
  document.addEventListener('touchmove', portfolio.handleTouchMove, false);

  window.addEventListener('resize', portfolio.resize);

  // giroscope event
  if (window.DeviceOrientationEvent) window.addEventListener('deviceorientation', portfolio.handleCircle, false);

  console.log('setup', this);
};

portfolio.changeProject = function changeProject() {
  if (event.target.classList.contains('change_project')) portfolio.changePagination(event.target);
  else if (event.target.classList.contains('to_next') && portfolio.blockedAction === false) portfolio.nextSlide();
  else if (event.target.classList.contains('to_prev') && portfolio.blockedAction === false) portfolio.prevSlide();
  else if (event.target.classList.contains('projects')) {
    document.querySelectorAll('.projects').forEach(x => x.classList.toggle('active'));
    if (document.querySelector('.projects').classList.contains('active')) {
      if (portfolio.scrolling !== null) portfolio.scrolling.off(onscroll);
      else portfolio.scrollMenuOpen = window.pageYOffset;

      document.querySelectorAll('.front.point, .front .point').forEach(x => x.classList.add('black'));

      document.getElementById('menu').style.display = 'block';

      TweenMax.to('.feature1', 0.2, { scaleY: 0, delay: 0.2, ease: Power2.easeIn });

      TweenMax.to('#main', 0.2, {
        opacity: 0,
        ease: Power2.easeIn,
        onComplete: () => {
          if (portfolio.isMobile()) {
            window.scrollTo(0, 0);

            document.getElementById('main').classList.add('black');
            document.querySelector('body').classList.add('temp');
          }
        }
      });

      TweenMax.to('#menu', 0.2, { opacity: 1, delay: 0.2, ease: Power2.easeOut });

      portfolio.heightMenu     = document.getElementById('the_menu').clientHeight;
      portfolio.margins        = window.innerHeight / 2 - 70;
      portfolio.heightMargin   = Math.round((100 - (portfolio.heightMenu - 2 * portfolio.margins) * 100 / portfolio.heightMenu) / 2 * 100) / 100;
      portfolio.entranceMenu   = document.getElementById('the_menu').querySelectorAll('li').length;
      portfolio.entranceHeight = Math.round((100 - 2 * portfolio.heightMargin) / portfolio.entranceMenu * 100)/100;

      portfolio.stageMenu.addChild(portfolio.displacementSprite3);

      // image_menu0 from PixiJS
      portfolio.stageMenu.addChild(image_menu0);
      image_menu0.alpha = 1;

      cancelAnimationFrame(portfolio.rafPixiHome);
      cancelAnimationFrame(portfolio.rafPixiSingle);

      portfolio.menuPixi();
    }
    else {
      if (portfolio.scrolling !== null) portfolio.scrolling.on(onscroll);
      if (document.querySelector('body').classList.contains('home')) document.querySelectorAll('.front.point, .front .point').forEach(x => x.classList.remove('black'));

        TweenMax.to('#menu', 0.2, {
          opacity: 0,
          ease: Power2.easeIn,
          onComplete: ()  => {
            document.getElementById('menu').style.display = 'none';
            if (portfolio.isMobile()) {
              document.getElementById('main').classList.remove('black');
              document.querySelector('body').classList.remove('temp');
              window.scrollTo(0, portfolio.scrollMenuOpen);
            }
          }
        });

        TweenMax.to('#main', 0.2, { opacity: 1, delay: 0.2, ease: Power2.easeOut });
        TweenMax.to('.feature1', 0.2, { scaleY: 1, delay: 0.2, ease: Power2.easeIn });

        portfolio.stageMenu.removeChildren();
        cancelAnimationFrame(portfolio.rafPixiMenu);

        if (document.querySelector('body').classList.contains('home')) portfolio.homePixi();
        else if (document.querySelector('body').classList.contains('single')) portfolio.singlePixi();
      }
  }
};

portfolio.scrollEvent = function scrollEvent(e) {
  // console.log('scroll event', e);
  if (e.type == 'wheel') portfolio.supportsWheel = true;
  else if (portfolio.supportsWheel) return;

  var delta = (e.deltaY || -e.wheelDelta || e.detail) || 1;

  if (portfolio.lethargy.check(e) !== false && portfolio.blockedAction === false && !document.querySelector('.projects').classList.contains('active') && document.querySelector('body').classList.contains('home')) {
    if (delta > 0) portfolio.nextSlide();
    else if (delta < 0) portfolio.prevSlide();
  }
};

// document ready vanilla
document.addEventListener('DOMContentLoaded', function() {
  //--------------//
  // PRELOAD PART //
  //--------------//

  // var progressText = new createjs.Text('Hello World', '20px Arial', '#000000');
  // progressText.x = 300 - progressText.getMeasuredWidth() / 2;
  // progressText.y = 20;
  // portfolio.stage.addChild(progressText);
  // portfolio.stage.update();

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
  //   // portfolio.stage.update();
  // }
  // function handleComplete(event) {
  //   console.log('handleComplete', event.type);
  // }
  // function handleError(event) {
  //   console.log('handleError!', event.text);
  // }

  //--------------//
  // PROCESS AJAX //
  //--------------//

  // called each time a page is launched
  var init = function() {
    portfolio.exitOk          = false;
    portfolio.ajaxOk          = false;
    portfolio.linkInProgress  = false;
    portfolio.deltaMenu       = 0;
    portfolio.deltaScroll     = 0;
    portfolio.speed           = 0;
    portfolio.lowLink         = false;
    portfolio.playOnce        = false;

    TweenMax.set('#main, #the_menu, #pixi_menu', { opacity: 1 });
    TweenMax.set('#main', { clearProps: 'y' });
    TweenMax.to('.feature1', 0.2, { scaleY: 1, ease: Power2.easeIn });

    document.getElementById('menu').style.display = 'none';
    document.querySelector('.projects').classList.remove('active');

    if (document.querySelector('body').classList.contains('is-loading')) document.querySelector('.is-loading').classList.remove('is-loading');

    // when click on link
    portfolio.links = document.querySelectorAll('a');

    portfolio.links.forEach((link) => link.removeEventListener('click', portfolio.onClick));

    portfolio.onClick = function(event) {
      if (!event.target.classList.contains('external')) {
        event.preventDefault();

        if (portfolio.linkInProgress === false) {
          portfolio.linkInProgress = true;
          var href                 = this.getAttribute('href');

          if (event.target.classList.contains('lowLink')) portfolio.lowLink = true;
          // if (href.indexOf(document.domain) > -1 || href.indexOf(':') === -1) {
            history.pushState({}, '', href);
            loadPage(href);
            portfolio.theRafLoading();
          // portfolio.scrolling.off(onscroll);
            return false;
          //}
        }
        else return false;
      }
    };

    portfolio.links.forEach((link) => link.addEventListener('click', portfolio.onClick));

    animations();
  },
  // when get() completed
  ajaxLoad = function(html) {
    portfolio.newPageContent = html;
    portfolio.ajaxOk         = true;
  },
  // animations input
  animations = function() {
    if (window.innerWidth < 768) document.querySelectorAll('#the_menu li').forEach(x => x.classList.remove('active'));
    if (portfolio.isMobile()) {
      window.scrollTo(0, 0);
      document.getElementById('main').classList.remove('black');
    }
    if (document.querySelector('body').classList.contains('home')) {
      document.querySelectorAll('.point').forEach(x => x.classList.remove('black'));
      portfolio.hovers = document.querySelectorAll('.change_project');

      portfolio.hovers.forEach((hover) => hover.addEventListener('mouseenter', portfolio.nHover));
      portfolio.hovers.forEach((hover) => hover.addEventListener('mouseleave', portfolio.offHover));

      portfolio.currentSlide = 0;
      portfolio.totalSlides  = 0;

      portfolio.renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight, { transparent: !0 });
      document.getElementById('inner_canvas').appendChild(portfolio.renderer.view);

      portfolio.renderer.view.width  = window.innerWidth;
      portfolio.renderer.view.height = window.innerHeight;

      portfolio.stage  = new PIXI.Container();
      portfolio.loader = new PIXI.Loader();

      document.querySelectorAll('#images div').forEach(portfolio.setDimensions);

      // displacement 1
      portfolio.displacementSprite = PIXI.Sprite.from(portfolio.directoryUri + 'images/gradient4.png'); //gradient4_bis //gradient4
      portfolio.displacementSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.CLAMP; // REPEAT // MIRRORED_REPEAT // CLAMP
      portfolio.displacementFilter = new PIXI.filters.DisplacementFilter(portfolio.displacementSprite);

      // displacement 2
      portfolio.displacementSprite2 = PIXI.Sprite.from(portfolio.directoryUri + 'images/gradient_large.png');
      portfolio.displacementSprite2.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;
      portfolio.displacementFilter2 = new PIXI.filters.DisplacementFilter(portfolio.displacementSprite2);

      // settings displacement1
      // intensity
      portfolio.displacementFilter.scale.x = 50;
      portfolio.displacementFilter.scale.y = 0;

      // center for slider
      portfolio.displacementSprite.pivot.x = 256;
      portfolio.displacementSprite.pivot.y = 256;

      // ladder x/y
      portfolio.displacementSprite.scale.x = 0.2;

      // settings displacement2
      // intensity
      portfolio.displacementFilter2.scale.x = 0;
      portfolio.displacementFilter2.scale.y = 0;

      // ladder x/y
      portfolio.displacementSprite2.scale.x = 0.8;
      // displacementSprite2.anchor.x = 1;

      portfolio.stage.addChild(portfolio.displacementSprite);
      portfolio.stage.filters = [portfolio.displacementFilter, portfolio.displacementFilter2];

      portfolio.loader.load((loader, resources) => {
        portfolio.blockedAction = false;

        if (!document.querySelector('.projects').classList.contains('active')) portfolio.homePixi();

        portfolio.nextSlide();

        document.getElementById('progress').style.display = 'none';
      });
    }
    else if (document.querySelector('body').classList.contains('page-template-about')) {
      document.getElementById('progress').style.display = 'none';
      document.querySelectorAll('.point').forEach(x => x.classList.add('black'));

      // document.getElementById('volet1').classList.add('ouvert');
      // document.querySelector('.intro').classList.add('ouvert');

      TweenMax.to('.fond_intro', 1.2, { scaleX: 1, ease: Power4.easeOut });

      portfolio.random = [];

      document.querySelectorAll('.random').forEach(x => portfolio.random.push(x));

      portfolio.random.sort(() => 0.5 - Math.random());

      TweenMax.staggerFromTo(portfolio.random, 1, { x: '-24px' }, { x: '0px', opacity: 1, delay: 0.6, ease: Power2.easeOut }, 0.1);

      if (!portfolio.isMobile()) {
        if (portfolio.scrolling !== null) portfolio.scrolling.destroy();
        portfolio.scrolling = null;

        portfolio.scrolling = new Smooth({
          preload: true,
          native: false,
          section: document.querySelector('.vs-section'),
          divs: document.querySelectorAll('.vs-div'),
          vs : { mouseMultiplier: 0.4 }
        });

        portfolio.scrolling.init();
      }

      TweenMax.to('#main', 0.4, { backgroundColor: '#EFEFEF', ease: Power2.easeInOut });
      TweenMax.to('#inner_svg', 1, { opacity: 1, ease: Power2.easeIn });
      TweenMax.fromTo('#inner_svg', 2, { rotation: 140 }, { rotation: 0, ease: Power2.easeOut });
      TweenMax.fromTo('#inner_svg img', 2, {
        rotation: -140
      },{
        rotation: 0,
        ease: Power2.easeOut,
        onComplete: () => portfolio.aboutRafs()
      });
    }
    else if (document.querySelector('body').classList.contains('single')) {
      if (window.innerWidth < 768) {
        document.querySelectorAll('#the_menu li').forEach(x => {
          if (document.querySelector('body').classList.contains(x.getAttribute('data-id'))) x.classList.add('active');
        });
      }

      document.querySelectorAll('.point').forEach(x => x.classList.add('black'));

      if (!portfolio.isMobile()) {
        document.getElementById('to_next_proj').addEventListener('mouseover', portfolio.onHoverNext);
        document.getElementById('to_next_proj').addEventListener('mouseout', portfolio.offHoverNext);

        if (portfolio.scrolling !== null) portfolio.scrolling.destroy();
        portfolio.scrolling = null;

        portfolio.scrolling = new Smooth({
          preload: true,
          native: false,
          section: document.querySelector('.vs-section'),
          divs: document.querySelectorAll('.vs-div'),
          vs : { mouseMultiplier: 0.4 }
        });
        portfolio.scrolling.init();
      } else {
        document.getElementById('to_next_proj').innerHTML = document.getElementById('to_next_proj').getAttribute('data-next');

        TweenMax.set('#inner_project_name', { x: (document.getElementById('project_name').clientWidth + 10) / 2 + 'px' });
        TweenMax.set('#project_name .stag', { opacity: 1 });
      }

      var height;

      if (window.innerWidth > 767) {
        height                         = 0.57 * window.innerWidth + 20;
        portfolio.renderer             = PIXI.autoDetectRenderer(window.innerWidth, (0.57 * window.innerWidth + 20), { transparent: !0 });
        portfolio.renderer.view.width  = window.innerWidth;
        // portfolio.renderer.view.height = window.innerHeight;
      } else {
        height                         = window.innerWidth + 20;
        portfolio.renderer             = PIXI.autoDetectRenderer(window.innerWidth, (window.innerWidth + 20), { transparent: !0 });
        portfolio.renderer.view.width  = window.innerWidth;
        // portfolio.renderer.view.height = window.innerHeight;
      }
      document.getElementById('cover').appendChild(portfolio.renderer.view);

      portfolio.stage  = new PIXI.Container();
      portfolio.loader = new PIXI.Loader();

      // document.querySelectorAll('#images div').forEach(portfolio.setDimensions);
      var image = new PIXI.Sprite(PIXI.Texture.from(document.getElementById('cover').getAttribute('data-img')));

      portfolio.loader.add('image', document.getElementById('cover').getAttribute('data-img'));

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

      // displacement 2
      portfolio.displacementSprite2 = PIXI.Sprite.from(portfolio.directoryUri + 'images/gradient_large.png');
      portfolio.displacementSprite2.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;
      portfolio.displacementFilter2 = new PIXI.filters.DisplacementFilter(portfolio.displacementSprite2);

      portfolio.displacementFilter2.scale.x = 0; // 150
      // portfolio.displacementFilter2.scale.y = 0;
      portfolio.displacementSprite2.scale.x = 0.8; // 0.8

      portfolio.stage.addChild(portfolio.displacementSprite2);
      portfolio.stage.addChild(image);

      portfolio.stage.filters = [portfolio.displacementFilter2];

      portfolio.loader.load((loader, resources) => {
        portfolio.blockedAction = false;

        if (!document.querySelector('.projects').classList.contains('active')) portfolio.singlePixi();

        portfolio.random = [];

        document.querySelectorAll('.random').forEach(x => portfolio.random.push(x));

        portfolio.random.sort(() => 0.5 - Math.random());

        TweenMax.staggerFromTo(portfolio.random, 1, { x: '-24px' }, { x: '0px', opacity: 1, ease: Power2.easeOut }, 0.1);
        TweenMax.to('#cover', 1, { opacity: 1, delay: 0.4, ease: Power2.easeOut });

        portfolio.speed = 4;

        document.getElementById('progress').style.display = 'none';

        portfolio.ladderScale = (document.getElementById('the_imgs').clientHeight + (0.28 * window.innerHeight)) / document.getElementById('the_imgs').clientHeight;
        portfolio.ladderScale = parseFloat(Math.round(portfolio.ladderScale * 100) / 100).toFixed(2);
      });
    }
    // TweenMax.to('body', 1, {opacity: 1, onComplete: ()  => {
    //   scroll.init();
    //   scroll.portfolio.resize();
    // }});
    //
    // if ($('event')[0]) {}
    // console.log('animations');
  },
  // animations output outputs
  loadPage = function(href) {
    document.getElementById('progress').style.display = 'block';

    if (portfolio.scrolling !== null) portfolio.scrolling.off(onscroll);

    var xhr    = new XMLHttpRequest();
    var method = 'GET';
    var url    = href;

    xhr.open(method, url, true);

    xhr.onreadystatechange = function() {
      if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) ajaxLoad(xhr.responseText);
    };

    xhr.send();

    // TweenMax.to('body', 3, { opacity: 0, onComplete: ()  => {
    //   exitOk = true;
    // }});

    if (document.querySelector('.projects').classList.contains('active')) {
      cancelAnimationFrame(portfolio.rafPixiMenu);

      TweenMax.to('#the_menu, #pixi_menu', 0.4, {
        opacity: 0,
        ease: Power2.easeInOut,
        onComplete: ()  => {
          portfolio.stageMenu.removeChildren();
          portfolio.exitOk = true;

          TweenMax.set('#main', { clearProps: 'backgroundColor' });
        }
      });
    }
    else if (document.querySelector('body').classList.contains('home')) {
      // speed = 4;
      portfolio.listenCursor  = false;
      portfolio.blockedAction = true;

      // portfolio.stage.removeChild(displacementSprite);
      // portfolio.stage.addChild(portfolio.displacementSprite2);

      portfolio.random = [];

      document.querySelectorAll('.random').forEach(x => portfolio.random.push(x));

      portfolio.random.sort(() => 0.5 - Math.random());

      TweenMax.staggerTo(portfolio.random, 0.4, { x: '24px', opacity: 0, ease: Power2.easeIn }, 0.1);

      // TweenMax.to(attributes2, 0.9, {
      //   intensity: 150,
      //   x: 10,
      //   ease: Power2.easeIn,
      //   onUpdate: function() {
      //     portfolio.displacementFilter2.scale.x = attributes2.intensity;
      //     speed = attributes2.x;
      //   },
      //   onComplete: ()  => {}
      // });

      TweenMax.to('#main', 1, {
        opacity: 0,
        delay: 0.4,
        ease: Power2.easeInOut,
        onComplete: () => portfolio.exitOk = true
      });

      portfolio.hovers = document.querySelectorAll('.change_project');

      portfolio.hovers.forEach(function(hover) {
        hover.removeEventListener('mouseenter', portfolio.nHover);
        hover.removeEventListener('mouseleave', portfolio.ffHover);
      });
    }
    else if (document.querySelector('body').classList.contains('single')) {
      document.getElementById('to_next_proj').removeEventListener('mouseover', portfolio.onHoverNext);
      document.getElementById('to_next_proj').removeEventListener('mouseout', portfolio.offHoverNext);

      if (portfolio.lowLink) {
        var diff;

        if (portfolio.scrolling !== null) {
          diff = document.getElementById('main').clientHeight - (portfolio.scrolling.vars.current + window.innerHeight);

          TweenMax.to('#main', 1.2, { y: - (diff + window.innerHeight), ease: Power2.easeInOut });

          TweenMax.to('#next_proj > div', 1.2, {
            y: diff + window.innerHeight - (document.getElementById('demi_haut').clientHeight / 2),
            ease: Power2.easeInOut,
            onComplete: ()  => {
              TweenMax.to('#next_proj > div', 0.4, {
                opacity: 0,
                ease: Power2.easeInOut,
                onComplete: () => portfolio.exitOk = true
              });
          }});
        }
        else {
          diff = document.getElementById('main').clientHeight - (window.pageYOffset + window.innerHeight);

          TweenMax.to('#next_proj, .inner_img', 1.2, { y: - (diff + window.innerHeight), ease: Power2.easeInOut });

          TweenMax.to('#next_proj > div', 1.2, {
            y: diff + window.innerHeight - (document.getElementById('demi_haut').clientHeight / 2),
            ease: Power2.easeInOut,
            onComplete: ()  => {
              TweenMax.to('#next_proj > div', 0.4, {
                opacity: 0,
                ease: Power2.easeInOut,
                onComplete: ()  => {
                  // TweenMax.set('#main', {clearProps: 'y'});
                  portfolio.exitOk = true;
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
          onComplete: () => portfolio.exitOk = true
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
        onComplete: () => portfolio.exitOk = true
      });
    }
    else portfolio.exitOk = true;
  },
  // updating the data of the page
  updatePage = function(html) {
    var parser      = new DOMParser();
    var doc         = parser.parseFromString(html, 'text/html');
    var classList   = doc.querySelectorAll('body')[0].getAttribute('class');

    // main title of the page
    document.title = doc.querySelector('title').innerHTML;

    // main class of body
    // document.querySelectorAll('body')[0].setAttribute('class', doc.querySelectorAll('body')[0].getAttribute('class'));
    var res = classList.replace('is-loading', '');
    document.querySelectorAll('body')[0].setAttribute('class', res);

    if (!portfolio.isMobile()) document.querySelectorAll('body')[0].classList.add('desktop');
    else document.querySelectorAll('body')[0].classList.add('mobile');

    // main content #main
    document.getElementById('main').innerHTML = doc.getElementById('main').innerHTML;

    // on launches the new page
    init();
  };

  portfolio.theRafLoading = function theRafLoading() {
    portfolio.rafLoading = requestAnimationFrame(portfolio.theRafLoading);

    if (portfolio.exitOk === true && portfolio.ajaxOk === true) {
      cancelAnimationFrame(portfolio.rafPixiHome);
      cancelAnimationFrame(portfolio.rafPixiSingle);

      if (document.querySelector('body').classList.contains('single') || document.querySelector('body').classList.contains('home')) {
        portfolio.stage.destroy();
        portfolio.renderer.destroy();
      }

      updatePage(portfolio.newPageContent);
      cancelAnimationFrame(portfolio.rafLoading);
    }
  };

  // management button prev / next browser
  window.onpopstate = function(e) {
    if (e.state !== null) {
      loadPage(location.href);
      portfolio.theRafLoading();
      // portfolio.scrolling.off(onscroll);
    }
  };

  //------------------------------//
  //     APPELS FIRST LOADING     //
  //------------------------------//

  history.pushState({}, '', location);
  // theRaf();
  init();

  if (!portfolio.isMobile()) document.querySelectorAll('body')[0].classList.add('desktop');
  else {
    document.querySelectorAll('body')[0].classList.add('mobile');
    document.getElementById('about').style.top = window.innerHeight / 2 + 'px';
    document.getElementById('contact').style.top = window.innerHeight / 2 + 'px';
  }

  // pixi menu statement
  // portfolio.rendererMenu = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight, { transparent: !0 });
  // console.log('1', 0.24 * window.innerWidth); // ---> 307.2px
  // console.log('2', window.innerHeight - 0.074 * window.innerWidth); // ---> 705.28px

  portfolio.rendererMenu = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight, { transparent: !0 });
  // portfolio.rendererMenu = PIXI.autoDetectRenderer(0.24 * window.innerWidth, window.innerHeight - 0.074 * window.innerWidth, { transparent: !0 });

  document.getElementById('pixi_menu').appendChild(portfolio.rendererMenu.view);

  portfolio.rendererMenu.view.width  = window.innerWidth;
  portfolio.rendererMenu.view.height = window.innerHeight;

  portfolio.stageMenu = new PIXI.Container();

  document.querySelectorAll('#the_menu li a').forEach(portfolio.setMenuDimensions);

  // displacement 2
  portfolio.displacementSprite3 = PIXI.Sprite.from(portfolio.directoryUri + 'images/gradient_large.png');
  portfolio.displacementSprite3.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;
  portfolio.displacementFilter3 = new PIXI.filters.DisplacementFilter(portfolio.displacementSprite3);

  portfolio.stageMenu.filters = [portfolio.displacementFilter3];

  // settings displacement2
  // intensity
  portfolio.displacementFilter3.scale.x = 0;
  portfolio.displacementFilter3.scale.y = 0;
  // ladder x/y
  portfolio.displacementSprite3.scale.x = 0.4;
});
// end doc ready vanilla

// -------------------------------------------------------------------------- //

// SLIDER FUNCTIONS
portfolio.nextSlide = function nextSlide() {
  portfolio.speed = 4;

  portfolio.commonTransition();
  portfolio.updatePagination('next');

  window['image' + portfolio.currentSlide].alpha = 0;
  portfolio.stage.addChild(window['image' + portfolio.currentSlide]);

  // image1.alpha = 1;
  var timeline = new TimelineMax();

  timeline.to(portfolio.attributes2, 0.9, {
    intensity: 150,
    x: 20,
    // width: 0.8,
    ease: Power2.easeIn,
    onUpdate: () => {
      portfolio.displacementFilter2.scale.x = portfolio.attributes2.intensity;
      portfolio.speed                       = portfolio.attributes2.x;
      // portfolio.displacementSprite2.scale.x = portfolio.attributes2.width;
    },
    onComplete: () => {
      timeline.reverse();

      setTimeout(() => {
        if (!portfolio.isMobile()) {
          portfolio.stage.removeChild(portfolio.displacementSprite2);
          portfolio.stage.addChild(portfolio.displacementSprite);
        }

        portfolio.listenCursor = true;

        if (portfolio.currentSlide === 0) portfolio.stage.removeChild(window['image' + (portfolio.totalSlides - 1)]);
        else portfolio.stage.removeChild(window['image' + (portfolio.currentSlide - 1)]);

        if (portfolio.currentSlide < (portfolio.totalSlides - 1)) portfolio.currentSlide++;
        else portfolio.currentSlide = 0;

        portfolio.displacementSprite.x = portfolio.currentMousePos.x;
        portfolio.blockedAction        = false;
      }, 800);
    }
  });

  TweenMax.to(portfolio.attributes3, 0.6, {
    opacity: 1,
    delay: 0.6,
    ease: Linear.easeNone,
    onUpdate: () => window['image' + portfolio.currentSlide].alpha = portfolio.attributes3.opacity
  });
};

portfolio.prevSlide = function prevSlide() {
  portfolio.speed = -4;

  portfolio.commonTransition();
  portfolio.updatePagination('prev');

  if (portfolio.currentSlide === 0) {
    window['image' + (portfolio.totalSlides - 2)].alpha = 0;
    portfolio.stage.addChild(window['image' + (portfolio.totalSlides - 2)]);
  }
  else if (portfolio.currentSlide === 1) {
    window['image' + (portfolio.totalSlides - 1)].alpha = 0;
    portfolio.stage.addChild(window['image' + (portfolio.totalSlides - 1)]);
  }
  else {
    window['image' + (portfolio.currentSlide - 2)].alpha = 0;
    portfolio.stage.addChild(window['image' + (portfolio.currentSlide - 2)]);
  }

  // image1.alpha = 1;
  var timeline = new TimelineMax();

  //portfolio.attributes2.anchor = 0;

  timeline.to(portfolio.attributes2, 0.9, {
    intensity: 150,
    x: -20,
    // width: 0.8,
    // anchor: 1,
    ease: Power2.easeIn,
    onUpdate: () => {
      portfolio.displacementFilter2.scale.x = portfolio.attributes2.intensity;
      portfolio.speed                       = portfolio.attributes2.x;
      // portfolio.displacementSprite2.scale.x = portfolio.attributes2.width;
      // portfolio.displacementSprite2.anchor.x = portfolio.attributes2.anchor;
    },
    onComplete: () => {
      timeline.reverse();
      // portfolio.attributes2.intensity = 150;
      // portfolio.attributes2.x = -20;
      // timeline.to(portfolio.attributes2, 0.9, {
      //     intensity: 0,
      //     x: 0,
      //     ease: Power1.easeOut,
      //     onUpdate: function() {
      //         console.log(portfolio.attributes2.width);
      //         portfolio.displacementFilter2.scale.x = portfolio.attributes2.intensity;
      //         speed = portfolio.attributes2.x;
      //     }
      // });
      setTimeout(() => {
        if (!portfolio.isMobile()) {
          portfolio.stage.removeChild(portfolio.displacementSprite2);
          portfolio.stage.addChild(portfolio.displacementSprite);
        }

        portfolio.listenCursor = true;

        if (portfolio.currentSlide === 0) portfolio.stage.removeChild(window['image' + (portfolio.totalSlides - 1)]);
        else portfolio.stage.removeChild(window['image' + (portfolio.currentSlide - 1)]);

        if (portfolio.currentSlide > 0) portfolio.currentSlide--;
        else portfolio.currentSlide = portfolio.totalSlides - 1;

        portfolio.displacementSprite.x = portfolio.currentMousePos.x;
        portfolio.blockedAction        = false;
      }, 800);
    }
  });

  TweenMax.to(portfolio.attributes3, 0.6, {
    opacity: 1,
    delay: 0.6,
    ease: Linear.easeNone,
    onUpdate: () => {
      if (portfolio.currentSlide === 0) window['image' + (portfolio.totalSlides - 2)].alpha = portfolio.attributes3.opacity;
      else if (portfolio.currentSlide === 1) window['image' + (portfolio.totalSlides - 1)].alpha = portfolio.attributes3.opacity;
      else window['image' + (portfolio.currentSlide - 2)].alpha = portfolio.attributes3.opacity;
    }
  });
};

portfolio.commonTransition = function commonTransition() {
  portfolio.listenCursor  = false;
  portfolio.blockedAction = true;

  portfolio.stage.removeChild(portfolio.displacementSprite);
  portfolio.stage.addChild(portfolio.displacementSprite2);

  portfolio.attributes.intensity = portfolio.displacementFilter.scale.x;

  TweenMax.to(portfolio.attributes, 0.3, {
    intensity: 0,
    ease: Power2.easeOut,
    onUpdate: () => portfolio.displacementFilter.scale.x = portfolio.attributes.intensity
  });

  portfolio.displacementSprite2.x  = 0;
  portfolio.attributes2.intensity  = portfolio.displacementFilter2.scale.x;
  portfolio.attributes2.x          = portfolio.speed;
  portfolio.attributes2.width      = portfolio.displacementSprite2.scale.x;
  portfolio.attributes3.opacity    = 0;
};


portfolio.setDimensions = function setDimensions(item, index) {
  portfolio.totalSlides++;

  window['image' + index] = new PIXI.Sprite(PIXI.Texture.from(item.getAttribute('data-url')));
  window['image' + index].alpha = 0;

  portfolio.loader.add('image' + index, item.getAttribute('data-url'));

  // Chainable `pre` to add a middleware that runs for each resource, *before* loading that resource.
  // This is useful to implement custom caching modules (using filesystem, indexeddb, memory, etc).
  // portfolio.loader.pre(cachingMiddleware);

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

portfolio.setMenuDimensions = function setMenuDimensions(item, index) {
  // portfolio.totalSlides++;
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


portfolio.updatePagination = function updatePagination(direction) {
  if (direction === 'next') {
    portfolio.multiplier = 1;
    TweenMax.to('#white_circle', 0.9, { 'stroke-dashoffset': 190 * (1 - 1 / portfolio.totalSlides - (portfolio.currentSlide * 1 / portfolio.totalSlides)), ease: Power4.easeInOut });
  }
  else {
    portfolio.multiplier = -1;

    if (portfolio.currentSlide === 1) TweenMax.to('#white_circle', 0.9, { 'stroke-dashoffset': 0, ease: Power4.easeInOut });
    else if (portfolio.currentSlide === 0) TweenMax.to('#white_circle', 0.9, { 'stroke-dashoffset': 190 / portfolio.totalSlides, ease: Power4.easeInOut });
    else TweenMax.to('#white_circle', 0.9, { 'stroke-dashoffset' : 190 - (portfolio.currentSlide - 1) * 190 / portfolio.totalSlides, ease: Power4.easeInOut });
  }

  portfolio.random = [];

  document.querySelectorAll('.random').forEach(x => portfolio.random.push(x));

  portfolio.random.sort(() => 0.5 - Math.random());

  TweenMax.staggerTo(portfolio.random, 0.4, { x: portfolio.multiplier * 24 + 'px', opacity: 0, ease: Power2.easeIn }, 0.1, portfolio.scrollablePagination);
};

//------------------//
// HELPER FUNCTIONS //
//------------------//

portfolio.addRandom = function addRandom(item, index) {
  item.classList.add('random');
};

portfolio.isMobile = function isMobile() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

portfolio.handleCircle = function handleCircle(event) {
  if (window.orientation === 0) portfolio.gamma = event.gamma;
  else if (window.orientation === 180) portfolio.gamma = -event.gamma;
  else if (window.orientation === -90) portfolio.gamma = -event.beta;
  else if (window.orientation === 90) portfolio.gamma = event.beta;
};

portfolio.handleTouchStart = function handleTouchStart(evt) {
  portfolio.xDown = evt.touches[0].clientX;
  portfolio.yDown = evt.touches[0].clientY;
};

portfolio.handleTouchMove = function handleTouchMove(evt) {
  if (!portfolio.xDown || !portfolio.yDown) return;

  var xUp = evt.touches[0].clientX;
  var yUp = evt.touches[0].clientY;

  var xDiff = portfolio.xDown - xUp;
  var yDiff = portfolio.yDown - yUp;

  if (Math.abs(xDiff) > Math.abs(yDiff)) { /* most significant */
    if (document.querySelector('body').classList.contains('home') && portfolio.blockedAction === false) {
      if (xDiff > 0) portfolio.nextSlide();
      else portfolio.prevSlide();
    }
  }
  else {
    if (document.querySelector('body').classList.contains('home') && portfolio.blockedAction === false) {
      if (yDiff > 0) portfolio.nextSlide();
      else portfolio.prevSlide();
    }
  }

  /* reset values */
  portfolio.xDown = null;
  portfolio.yDown = null;
};

portfolio.onHover = function onHover(event) {
  event.target.classList.add('feature');
  document.querySelector('.change_project.current').classList.add('temp');
};

portfolio.offHover = function offHover(event) {
  event.target.classList.remove('feature');
  document.querySelector('.change_project.current').classList.remove('temp');
};

portfolio.resize = function resize() {
  if (portfolio.scrolling !== null) portfolio.scrolling.resize();
  else {
    document.getElementById('about').style.top = window.innerHeight / 2 + 'px';
    document.getElementById('contact').style.top = window.innerHeight / 2 + 'px';
  }
};

portfolio.mousePosition = function mousePosition(event) {
  portfolio.currentMousePos.x = event.pageX;
  portfolio.currentMousePos.y = event.pageY;
};

//------------------//
// R.A.F.S.         // ---> cancelAnimationFrame(raf_pixi);
//------------------//

portfolio.homePixi = function homePixi() {
  portfolio.rafPixiHome = requestAnimationFrame(portfolio.homePixi);
  portfolio.renderer.render(portfolio.stage);

  if (portfolio.listenCursor) {
    // window['image' + (portfolio.currentSlide - 1)].x = 100
    portfolio.mousePos.x = portfolio.displacementSprite.x;
    // portfolio.mousePos.y = displacementSprite.y;
    portfolio.mousePos.intensity = portfolio.displacementFilter.scale.x;
    portfolio.mousePos.width     = portfolio.displacementSprite.scale.x;

    if (portfolio.currentSlide !== portfolio.tempImageNumber) {
      portfolio.tempImageNumber = portfolio.currentSlide;

      if (portfolio.currentSlide === 0) portfolio.imageNumber = portfolio.totalSlides - 1;
      else portfolio.imageNumber = portfolio.currentSlide - 1;
      // portfolio.currentMousePos.x = 0;
      portfolio.delayx = window['image' + portfolio.imageNumber].x;
    }
    portfolio.mousePos.correction = 0;

    TweenMax.to(portfolio.mousePos, 0.3, {
      x: portfolio.currentMousePos.x,
      // y: portfolio.currentMousePos.y,
      intensity: (portfolio.currentMousePos.x - portfolio.formerDelta) * 10,
      width: Math.abs(((portfolio.currentMousePos.x - portfolio.formerDelta) / 80) - 0.2),
      correction: (portfolio.currentMousePos.x - portfolio.formerDelta) / 40,
      onUpdate: () => {
        portfolio.displacementSprite.x       = portfolio.mousePos.x;
        // displacementSprite.y                 = portfolio.mousePos.y;
        portfolio.displacementFilter.scale.x = portfolio.mousePos.intensity;
        portfolio.displacementSprite.scale.x = portfolio.mousePos.width;

        window['image' + portfolio.imageNumber].x = portfolio.delayx + portfolio.mousePos.correction;
      },
      ease: Linear.easeNone
    });

    // console.log((portfolio.currentMousePos.x - portfolio.formerDelta) / 100);

    if (portfolio.isMobile()) {
      portfolio.mousePos.penche = portfolio.displacementFilter2.scale.x; // penche :: definition => looks

      TweenMax.to(portfolio.mousePos, 0.3, {
        penche: (portfolio.gamma * 20 - portfolio.deltaGamma),
        onUpdate: () => portfolio.displacementFilter2.scale.x = portfolio.mousePos.penche,
        ease: Linear.easeNone
      });

      // document.getElementById('title_h2').innerHTML = gamma;
      portfolio.displacementSprite2.x += 10;
    }
  }
  else portfolio.displacementSprite2.x += portfolio.speed;

  portfolio.formerDelta = portfolio.currentMousePos.x;
  portfolio.deltaGamma  = portfolio.gamma * 20;
};

portfolio.menuPixi = function menuPixi() {
  portfolio.rafPixiMenu = requestAnimationFrame(portfolio.menuPixi);
  // console.log('pixi menu turned');

  portfolio.rendererMenu.render(portfolio.stageMenu);
  portfolio.displacementSprite3.x += 4;

  if (!portfolio.isMobile()) {
    portfolio.cursorPercentage = Math.round(portfolio.currentMousePos.y * 100 / window.innerHeight * 100)/100;
    portfolio.theDeltaMenu = portfolio.currentMousePos.y;
  }
  else {
    portfolio.cursorPercentage = window.pageYOffset * 100 / (portfolio.heightMenu - window.innerHeight);
    portfolio.theDeltaMenu = window.pageYOffset;
  }

  if (Math.abs((portfolio.theDeltaMenu - portfolio.deltaMenu) / 200 + 1) < 1.8) portfolio.intensity = Math.abs((portfolio.theDeltaMenu - portfolio.deltaMenu) / 200 + 1);
  else portfolio.intensity = 1.8;

  // displacement menu
  if (!portfolio.isMobile()) {
    expression = -1 * (portfolio.heightMenu - window.innerHeight) / window.innerHeight * portfolio.currentMousePos.y;

    TweenMax.to('#the_menu', 1.4, {
      y: expression + 'px',
      scaleY: portfolio.intensity,
      ease: Power2.easeOut
    });
  }
  else TweenMax.to('#the_menu', 1.4, { scaleY: portfolio.intensity, ease: Power2.easeOut });

  if (window.innerWidth > 767) {
    if (portfolio.cursorPercentage > portfolio.heightMargin && portfolio.cursorPercentage < (100 - portfolio.heightMargin)) document.querySelectorAll('#the_menu li').forEach(portfolio.checkMenu);

    portfolio.displace.intensity = portfolio.displacementFilter3.scale.x;

    TweenMax.to(portfolio.displace, 0.3, {
      intensity: (portfolio.theDeltaMenu - portfolio.deltaMenu) * 4,
      onUpdate: () => portfolio.displacementFilter3.scale.x = portfolio.displace.intensity,
      ease: Linear.easeNone
    });
  }
  portfolio.deltaMenu = portfolio.theDeltaMenu;
};

portfolio.singlePixi = function singlePixi() {
  if (document.querySelector('.vs-section').clientHeight != portfolio.formerHeight && !portfolio.isMobile()) {
    portfolio.scrolling.resize();
    portfolio.formerHeight = document.querySelector('.vs-section').clientHeight;
  }

  portfolio.rafPixiSingle = requestAnimationFrame(portfolio.singlePixi);

  // ladderScale = parseFloat(Math.round((document.getElementById('the_imgs').clientHeight + (0.56 * window.innerHeight)) / document.getElementById('the_imgs').clientHeight * 100) / 100).toFixed(2);
  // ladderScale = (document.getElementById('the_imgs').clientHeight + (0.56 * window.innerHeight)) / document.getElementById('the_imgs').clientHeight;
  // ladderScale = parseFloat(Math.round(ladderScale * 100) / 100).toFixed(2);
  // console.log(ladderScale);
  // console.log('pixi single turned');

  portfolio.renderer.render(portfolio.stage);
  portfolio.displacementSprite2.x += portfolio.speed;

  if (portfolio.scrolling !== null) {
    if (portfolio.scrolling.vars.target !== 0 && portfolio.passOnce === false) {
      portfolio.passOnce = true;
      portfolio.increaseDisplacementIntensity();
    }
    else if (portfolio.scrolling.vars.target === 0 && portfolio.passOnce === true) {
      portfolio.passOnce = false;
      portfolio.decreaseDisplacementIntensity();
    }
  } else {
    if (window.pageYOffset !== 0 && portfolio.passOnce === false) {
      portfolio.passOnce = true;
      portfolio.increaseDisplacementIntensity();
    }
    else if (window.pageYOffset === 0 && portfolio.passOnce === true) {
      portfolio.passOnce = false;
      portfolio.decreaseDisplacementIntensity();
    }
  }

  // TweenMax.to('#the_imgs', 1.4, { scaleY: portfolio.intensity, ease: Power2.easeOut });

  // if (portfolio.scrolling !== null) portfolio.deltaScroll = portfolio.scrolling.vars.current;
  // else {}
};

portfolio.aboutRafs = function aboutRafs() {
  portfolio.theRafAbout = requestAnimationFrame(portfolio.aboutRafs);

  if (portfolio.scrolling !== null) {
    TweenMax.to('#inner_svg', 1, { rotation: -portfolio.scrolling.vars.current / 4, ease: Linear.easeNone });
    TweenMax.to('#inner_svg img', 1, { rotation: portfolio.scrolling.vars.current / 4, ease: Linear.easeNone });

    if (Math.abs((portfolio.scrolling.vars.current - portfolio.deltaScroll) / 200 + 1) < 2.2) portfolio.intensity = Math.abs((portfolio.scrolling.vars.current - portfolio.deltaScroll) / 200 + 1);
    else portfolio.intensity = 2.2;
  }
  else {
    TweenMax.to('#inner_svg', 1, { rotation: -window.pageYOffset / 4, ease: Linear.easeNone });
    TweenMax.to('#inner_svg img', 1, { rotation: window.pageYOffset / 4, ease: Linear.easeNone });

    if (Math.abs((window.pageYOffset - portfolio.deltaScroll) / 200 + 1) < 2.2) portfolio.intensity = Math.abs((window.pageYOffset - portfolio.deltaScroll) / 200 + 1);
    else portfolio.intensity = 2.2;
  }

  TweenMax.to('#scaleA', 1.4, { scaleX: portfolio.intensity, ease: Power2.easeOut });

  if (portfolio.scrolling !== null) portfolio.deltaScroll = portfolio.scrolling.vars.current;
  else portfolio.deltaScroll = window.pageYOffset;
};

portfolio.checkMenu = function checkMenu(item, index) {
  if (portfolio.cursorPercentage > (portfolio.heightMargin + (index * portfolio.entranceHeight)) && portfolio.cursorPercentage < (portfolio.heightMargin + ((index + 1) * portfolio.entranceHeight)) && !item.classList.contains('active')) {
    document.querySelector('#the_menu .active').classList.remove('active');

    item.classList.add('active');

    document.getElementById('pixi_menu').setAttribute('href',item.querySelector('a').getAttribute('href'));

    // add new image
    portfolio.stageMenu.addChild(window['image_menu' + index]);

    portfolio.displace2.alpha = 0;
    // portfolio.stageMenu.removeChild(portfolio.displacementSprite3);

    TweenMax.to(portfolio.displace2, 0.2, {
      alpha: 1,
      onUpdate: () => window['image_menu' + index].alpha = portfolio.displace2.alpha,
      // onComplete: () => {
      //   // to do : management suppression former child
      //   // portfolio.stageMenu.removeChildren(2);
      //   // lastAdds = index;
      // },
      ease: Linear.easeNone
    });
  }
};

portfolio.changePagination = function changePagination(element) {
  if (element.classList.contains('current')) return;

  else {
    portfolio.lindex   = Array.from(document.getElementById('num_letter').children).indexOf(element);
    const currentIndex = Array.from(document.getElementById('num_letter').children).indexOf(document.querySelector('#num_letter .current'));

    portfolio.speed = 4;
    portfolio.commonTransition();

    window['image' + portfolio.lindex].alpha = 0;
    portfolio.stage.addChild(window['image' + portfolio.lindex]);

    var timeline = new TimelineMax();

    timeline.to(portfolio.attributes2, 0.9, {
      intensity: 150,
      x: 20,
      ease: Power2.easeIn,
      onUpdate: () => {
        portfolio.displacementFilter2.scale.x = portfolio.attributes2.intensity;
        speed = portfolio.attributes2.x;
      },
      onComplete: () => {
        timeline.reverse();

        setTimeout(() => {
          portfolio.stage.removeChild(portfolio.displacementSprite2);
          portfolio.stage.addChild(portfolio.displacementSprite);

          portfolio.listenCursor = true;
          portfolio.stage.removeChild(window['image'+(currentIndex)]);

          if (portfolio.lindex >= portfolio.totalSlides - 1) portfolio.currentSlide = 0;
          else portfolio.currentSlide = portfolio.lindex + 1;

          portfolio.displacementSprite.x = portfolio.currentMousePos.x;
          portfolio.blockedAction = false;
        }, 800);
      }
    });

    TweenMax.to(portfolio.attributes3, 0.6, {
      opacity: 1,
      delay: 0.6,
      ease: Linear.easeNone,
      onUpdate: () => window['image' + portfolio.lindex].alpha = portfolio.attributes3.opacity
    });

    TweenMax.to('#white_circle', 0.9, { 'stroke-dashoffset' : 190 * (1 - 1 / portfolio.totalSlides - (portfolio.lindex * 1 / portfolio.totalSlides)), ease: Power4.easeInOut });

    portfolio.random = [];

    document.querySelectorAll('.random').forEach(x => portfolio.random.push(x));

    portfolio.random.sort(() => 0.5 - Math.random());

    TweenMax.staggerTo(portfolio.random, 0.4, { x: '24px', opacity: 0, ease: Power2.easeIn }, 0.1, portfolio.clickablePagination);
  }
};

portfolio.scrollablePagination = function scrollablePagination() {
  console.log('scrollablePagination()');
  document.querySelectorAll('.random.first').forEach(x => x.classList.remove('first'));
  document.querySelector('#num_letter .current').classList.add('after');

  if (portfolio.multiplier === 1) {
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
          if (document.querySelectorAll('.change_project')[portfolio.totalSlides - 1].classList.contains('first')) document.querySelectorAll('.change_project')[portfolio.totalSlides - 1].classList.remove('first');

          document.querySelector('#num_letter .current').classList.remove('current','after');

          first.classList.add('current');
          first.classList.remove('before');
        }
      });
    }
    document.getElementById('num_project').innerHTML = portfolio.currentSlide + 1;
    document.getElementById('title_h2').innerHTML    = document.querySelectorAll('#images div')[portfolio.currentSlide].getAttribute('data-title');
    document.getElementById('type').innerHTML        = document.querySelectorAll('#images div')[portfolio.currentSlide].getAttribute('data-cat');
    document.getElementById('year').innerHTML        = document.querySelectorAll('#images div')[portfolio.currentSlide].getAttribute('data-year');

    document.querySelectorAll('.update_link').forEach(x => x.setAttribute('href',document.querySelectorAll('#images div')[portfolio.currentSlide].getAttribute('data-perma')));
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
      var last = document.querySelectorAll('#num_letter > div')[portfolio.totalSlides - 1];
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

    if (portfolio.currentSlide === 1) {
      document.getElementById('num_project').innerHTML = portfolio.totalSlides;
      document.getElementById('title_h2').innerHTML    = document.querySelectorAll('#images div')[portfolio.totalSlides - 1].getAttribute('data-title');
      document.getElementById('type').innerHTML        = document.querySelectorAll('#images div')[portfolio.totalSlides - 1].getAttribute('data-cat');
      document.getElementById('year').innerHTML        = document.querySelectorAll('#images div')[portfolio.totalSlides - 1].getAttribute('data-year');

      document.querySelectorAll('.update_link').forEach(x => x.setAttribute('href', document.querySelectorAll('#images div')[portfolio.totalSlides - 1].getAttribute('data-perma')));
    }
    else if (portfolio.currentSlide === 0) {
      document.getElementById('num_project').innerHTML = portfolio.totalSlides - 1;
      document.getElementById('title_h2').innerHTML    = document.querySelectorAll('#images div')[portfolio.totalSlides - 2].getAttribute('data-title');
      document.getElementById('type').innerHTML        = document.querySelectorAll('#images div')[portfolio.totalSlides - 2].getAttribute('data-cat');
      document.getElementById('year').innerHTML        = document.querySelectorAll('#images div')[portfolio.totalSlides - 2].getAttribute('data-year');

      document.querySelectorAll('.update_link').forEach(x=> x.setAttribute('href', document.querySelectorAll('#images div')[portfolio.totalSlides - 2].getAttribute('data-perma')));
    }
    else {
      document.getElementById('num_project').innerHTML = portfolio.currentSlide - 1;
      document.getElementById('title_h2').innerHTML    = document.querySelectorAll('#images div')[portfolio.currentSlide - 2].getAttribute('data-title');
      document.getElementById('type').innerHTML        = document.querySelectorAll('#images div')[portfolio.currentSlide - 2].getAttribute('data-cat');
      document.getElementById('year').innerHTML        = document.querySelectorAll('#images div')[portfolio.currentSlide - 2].getAttribute('data-year');

      document.querySelectorAll('.update_link').forEach(x => x.setAttribute('href', document.querySelectorAll('#images div')[portfolio.currentSlide - 2].getAttribute('data-perma')));
    }
  }

  document.querySelectorAll('#title_h2 span').forEach(portfolio.addRandom);

  portfolio.random = [];

  document.querySelectorAll('.random').forEach(x => portfolio.random.push(x));

  portfolio.random.sort(() => 0.5 - Math.random());

  TweenMax.staggerFromTo(portfolio.random, 1, { x: -portfolio.multiplier * 24 + 'px', opacity: 0 }, { x: '0px', opacity: 1, ease: Power2.easeOut }, 0.1);
};

portfolio.clickablePagination = function clickablePagination() {
  console.log('clickablePagination()');
  document.querySelector('#num_letter .current').classList.add('after');

  TweenMax.to('.current .letter', 0.4, { x: '100%', clearProps: 'x', ease: Power4.easeInOut});

  document.querySelectorAll('#num_letter > div')[portfolio.lindex].classList.add('before');

  TweenMax.to(document.querySelectorAll('#num_letter > div')[portfolio.lindex].querySelector('div'), 0.4, {
    x: '0%',
    clearProps: 'x',
    ease: Power4.easeInOut,
    onComplete: () => {
      document.querySelector('#num_letter .current').classList.remove('current','after');
      document.querySelectorAll('#num_letter > div')[portfolio.lindex].classList.add('current');
      document.querySelectorAll('#num_letter > div')[portfolio.lindex].classList.remove('before');
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

  document.getElementById('num_project').innerHTML = portfolio.lindex + 1;
  document.getElementById('title_h2').innerHTML    = document.querySelectorAll('#images div')[portfolio.lindex].getAttribute('data-title');
  document.getElementById('type').innerHTML        = document.querySelectorAll('#images div')[portfolio.lindex].getAttribute('data-cat');
  document.getElementById('year').innerHTML        = document.querySelectorAll('#images div')[portfolio.lindex].getAttribute('data-year');

  document.querySelectorAll('.update_link').forEach(x => x.setAttribute('href',document.querySelectorAll('#images div')[portfolio.lindex].getAttribute('data-perma')));
  document.querySelectorAll('#title_h2 span').forEach(portfolio.addRandom);

  portfolio.random = [];

  document.querySelectorAll('.random').forEach(x => portfolio.random.push(x));

  portfolio.random.sort(() => 0.5 - Math.random());

  TweenMax.staggerFromTo(portfolio.random, 1, { x: '-24px', opacity: 0 }, { x: '0px', opacity: 1, ease: Power2.easeOut }, 0.1);
};

portfolio.increaseDisplacementIntensity = function increaseDisplacementIntensity() {
  portfolio.speed = 4;
  var options     = { intensity: 0, x: 4 };

  TweenMax.to(options, 0.9, {
    intensity: 150,
    x: 6,
    ease: Power2.easeIn,
    onUpdate: () => {
      portfolio.displacementFilter2.scale.x = options.intensity;
      portfolio.speed                       = options.x;
    }
  });
};

portfolio.decreaseDisplacementIntensity = function decreaseDisplacementIntensity() {
  portfolio.speed = 6;
  var options     = { intensity: 150, x: 6 };

  TweenMax.to(options, 0.9, {
    intensity: 0,
    x: 4,
    ease: Power2.easeOut,
    onUpdate: () => {
      portfolio.displacementFilter2.scale.x = options.intensity;
      portfolio.speed                       = options.x;
    }
  });
};

portfolio.onHoverNext = function onHoverNext(event) {
  if (portfolio.playOnce === false) {
    portfolio.playOnce = true;
    portfolio.random   = [];

    document.querySelectorAll('#to_next_proj span').forEach(x => portfolio.random.push(x));

    portfolio.random.sort(() => 0.5 - Math.random());

    TweenMax.staggerTo(portfolio.random, 0.4, { opacity: 0, ease: Power2.easeIn }, 0.05, portfolio.animateNextBtn);
    TweenMax.to('#inner_project_name', 0.4, { x: (document.getElementById('project_name').clientWidth + 10) / 2 + 'px', delay: 0.4, ease: Power2.easeOut });
    TweenMax.staggerTo('.stag', 0.4, { opacity: 1, delay: 0.4, ease: Power2.easeOut }, -0.02);
  }
};

portfolio.offHoverNext = function offHoverNext(event) {
  if (portfolio.playOnce === true) {
    portfolio.playOnce = false;
    portfolio.random   = [];

    document.querySelectorAll('#to_next_proj span').forEach(x => portfolio.random.push(x));

    portfolio.random.sort(() => 0.5 - Math.random());

    TweenMax.staggerTo(portfolio.random, 0.4, { opacity: 0, ease: Power2.easeIn }, 0.05, portfolio.animateNextInnerBtn);
  }
};

portfolio.animateNextBtn = function animateNextBtn() {
  document.getElementById('to_next_proj').innerHTML = document.getElementById('to_next_proj').getAttribute('data-next');

  TweenMax.set('#to_next_proj span', { opacity: 0 });

  portfolio.random = [];

  document.querySelectorAll('#to_next_proj span').forEach(x => portfolio.random.push(x));

  portfolio.random.sort(() => 0.5 - Math.random());

  TweenMax.staggerTo(portfolio.random, 0.4, { opacity: 1, ease: Power2.easeOut }, 0.05);
};

portfolio.animateNextInnerBtn = function animateNextInnerBtn() {
  document.getElementById('to_next_proj').innerHTML = '<span>N</span><span>e</span><span>x</span><span>t</span>';

  TweenMax.set('#to_next_proj span', { opacity: 0 });

  portfolio.random = [];

  document.querySelectorAll('#to_next_proj span').forEach(x => portfolio.random.push(x));

  portfolio.random.sort(() => 0.5 - Math.random());

  TweenMax.staggerTo(portfolio.random, 0.4, { opacity: 1, ease: Power2.easeOut }, 0.05);
  TweenMax.to('#inner_project_name', 0.4, { x: '0px', ease: Power2.easeOut });
  TweenMax.staggerTo('.stag', 0.4, { opacity: 0, ease: Power2.easeOut }, 0.02);
};

// function theRaf() {
//   raf = requestAnimationFrame(theRaf);
// }

// const ticker = new PIXI.ticker.Ticker();
// ticker.stop();
// ticker.add((deltaTime) => {
//   // do something every frame
//   console.log('iii');
// });
// ticker.start();

portfolio.setup();
