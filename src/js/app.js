// PIXI.utils._saidHello = true;
PIXI.utils.skipHello();

var exitOk,
  ajaxOk,
  newPageContent,
  linkInProgress,
  raf,
  rafPixiHome,
  rafPixiMenu,
  rafPixiSingle,
  rafLoading,
  theRafAbout,
  rafAbout,
  displacementSprite,
  displacementSprite2,
  stage,
  texture2,
  displacementFilter,
  displacementFilter2,
  renderer,
  raf1,
  links,
  hovers,
  lowLink,
  ladderScale,
  theDeltaMenu,
  scrollMenuOpen,
  rendererMenu,
  displacementFilter3,
  displacementSprite3,
  stageMenu,
  intensity,
  heightMenu,
  margins,
  expression,
  heightMargin,
  cursorPercentage,
  entranceMenu,
  entranceHeight,
  totalSlides,
  loader,
  siriWave,
  counter,
  random,
  multiplier,
  gamma,
  deltaGamma,
  imageNumber,
  delayx,
  lindex;

var directoryUri = './';
var preload         = new createjs.LoadQueue(true);
var lethargy        = new Lethargy();
var scrolling       = null;
var xDown           = null;
var yDown           = null;
var blockedAction   = true;
var listenCursor    = false; // true
var supportsWheel   = false;
var playOnce        = false;
var passOnce        = false;
var mousePos        = {};
var attributs       = {};
var attributs2      = {};
var attributs3      = {};
var displace        = {};
var displace2       = {};
var tempImageNumber = -1;
var speed           = 0;
var currentSlide    = 0;
var formerDelta     = 0;
var deltaMenu       = 0;
var deltaScroll     = 0;
var formerHeight    = 0;
var dernier_ajoute  = 0;
var currentMousePos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

// // single hover
// document.getElementById('to_next_proj').addEventListener('mouseenter', function(event) {
//   random = [];
//   document.querySelectorAll('#to_next_proj span').forEach(x => random.push(x));
//
//   random.sort(function() {
//     return 0.5 - Math.random();
//   });
//
//   TweenMax.staggerTo(random, 0.2, {opacity: 0, ease: Power2.easeIn, onComplete:function(e) {
//     document.getElementById('to_next_proj').innerHTML = document.getElementById('to_next_proj').getAttribute('data-next');
//   }}, 0.05);
//
//   TweenMax.to('#inner_project name', 0.2, {x: (document.getElementById('project name').clientWidth + 10) / 2 + 'px', delay:0.2, ease: Power2.easeInOut});
//   TweenMax.staggerTo('.stag', 0.4, {opacity: 1, delay:0.2, ease: Power2.easeOut }, -0.02);
// });
// document.getElementById('to_next_proj').addEventListener('mouseleave', function(event) {
//   TweenMax.staggerTo('#to_next_proj span', 0.2, {opacity: 0, ease: Power2.easeIn, onComplete:function(e) {
//     this.target.classList.remove('blanc');
//     TweenMax.to(this.target, 0.2, {opacity: 1, ease: Power2.easeOut });
//   }}, 0.05);
//   TweenMax.to('#inner_project name', 0.2, {x: '0px', delay:0.2, ease: Power2.easeInOut});
//   TweenMax.staggerTo('.stag', 0.4, {opacity: 0, delay:0.2, ease: Power2.easeOut }, 0.02);
// });

/* Add the event listeners for each event. */
document.addEventListener('mousemove', mousePosition);
document.addEventListener('click', changeProject);

// scroll event
document.addEventListener('wheel', scrollEvent);
document.addEventListener('mousewheel', scrollEvent);
document.addEventListener('DOMMouseScroll', scrollEvent);

// swipe event
document.addEventListener('touchstart', handleTouchStart, false);
document.addEventListener('touchmove', handleTouchMove, false);

window.addEventListener('resize', resize);

// giroscope event
if (window.DeviceOrientationEvent) window.addEventListener('deviceorientation', processCircle, false);

function changeProject() {
  if (event.target.classList.contains('change_project')) changePagination(event.target);
  else if (event.target.classList.contains('to_next') && blockedAction === false) nextSlide();
  else if (event.target.classList.contains('to_prev') && blockedAction === false) prevSlide();
  else if (event.target.classList.contains('projects')) {
    document.querySelectorAll('.projects').forEach(x => x.classList.toggle('active'));
    if (document.querySelector('.projects').classList.contains('active')) {
      if (scrolling !== null) scrolling.off(onscroll);
      else scrollMenuOpen = window.pageYOffset;

      document.querySelectorAll('.front.point, .front .point').forEach(x => x.classList.add('black'));

      document.getElementById('menu').style.display = 'block';
      TweenMax.to('.feature1', 0.2, { scaleY: 0, delay: 0.2, ease: Power2.easeIn });

      TweenMax.to('#main', 0.2, {
        opacity: 0,
        ease: Power2.easeIn,
        onComplete: function() {
          if (isMobile()) {
            window.scrollTo(0, 0);
            document.getElementById('main').classList.add('black');
            document.querySelector('body').classList.add('temp');
          }
        }
      });

      TweenMax.to('#menu', 0.2, { opacity: 1, delay: 0.2, ease: Power2.easeOut });

      heightMenu     = document.getElementById('the_menu').clientHeight;
      margins        = window.innerHeight / 2 - 70;
      heightMargin   = Math.round((100 - (heightMenu - 2 * margins) * 100 / heightMenu) / 2 * 100) / 100;
      entranceMenu   = document.getElementById('the_menu').querySelectorAll('li').length;
      entranceHeight = Math.round((100 - 2 * heightMargin) / entranceMenu * 100)/100;

      stageMenu.addChild(displacementSprite3);
      stageMenu.addChild(image_menu0);
      image_menu0.alpha = 1;

      cancelAnimationFrame(rafPixiHome);
      cancelAnimationFrame(rafPixiSingle);

      pixiMenu();
    }
    else {
      if (scrolling !== null) scrolling.on(onscroll);
      if (document.querySelector('body').classList.contains('home')) document.querySelectorAll('.front.point, .front .point').forEach(x => x.classList.remove('black'));

        TweenMax.to('#menu', 0.2, {
          opacity:0,
          ease: Power2.easeIn,
          onComplete: function() {
            document.getElementById('menu').style.display = 'none';
            if (isMobile()) {
              document.getElementById('main').classList.remove('black');
              document.querySelector('body').classList.remove('temp');
              window.scrollTo(0, scrollMenuOpen);
            }
          }
        });

        TweenMax.to('#main', 0.2, { opacity: 1, delay: 0.2, ease: Power2.easeOut });
        TweenMax.to('.feature1', 0.2, { scaleY: 1, delay: 0.2, ease: Power2.easeIn });

        stageMenu.removeChildren();
        cancelAnimationFrame(rafPixiMenu);

        if (document.querySelector('body').classList.contains('home')) pixiHome();
        else if (document.querySelector('body').classList.contains('single')) pixiSingle();
      }
  }
}

function scrollEvent(e) {
  // console.log('scroll event', e);
  if (e.type == 'wheel') supportsWheel = true;
  else if (supportsWheel) return;

  var delta = (e.deltaY || -e.wheelDelta || e.detail) || 1;

  if (lethargy.check(e) !== false && blockedAction === false && !document.querySelector('.projects').classList.contains('active') && document.querySelector('body').classList.contains('home')) {
    if (delta > 0) nextSlide();
    else if (delta < 0) prevSlide();
  }
}

// document ready vanilla
document.addEventListener('DOMContentLoaded', function() {
  //--------------//
  // PRELOAD PART //
  //--------------//

  // var progressText = new createjs.Text('Hello World', '20px Arial', '#000000');
  // progressText.x = 300 - progressText.getMeasuredWidth() / 2;
  // progressText.y = 20;
  // stage.addChild(progressText);
  // stage.update();

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
  //   // stage.update();
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
  // var $main = $('#main'),

  // called each time a page is launched
  var init = function() {
    exitOk          = false;
    ajaxOk          = false;
    linkInProgress  = false;
    deltaMenu       = 0;
    deltaScroll     = 0;
    speed           = 0;
    lowLink         = false;
    playOnce        = false;

    TweenMax.set('#main, #the_menu, #pixi_menu', { opacity: 1 });
    TweenMax.set('#main', { clearProps: 'y' });
    TweenMax.to('.feature1', 0.2, { scaleY: 1, ease: Power2.easeIn });

    document.getElementById('menu').style.display = 'none';
    document.querySelector('.projects').classList.remove('active');

    if (document.querySelector('body').classList.contains('is-loading')) document.querySelector('.is-loading').classList.remove('is-loading');

    // when click on link
    links = document.querySelectorAll('a');

    links.forEach((link) => link.removeEventListener('click', onClick));

    function onClick(event) {
      if (!event.target.classList.contains('external')) {
        event.preventDefault();
        if (linkInProgress === false) {
          linkInProgress = true;
          var href = this.getAttribute('href');

          if (event.target.classList.contains('lowLink')) lowLink = true;

          // if (href.indexOf(document.domain) > -1 || href.indexOf(':') === -1) {
            history.pushState({}, '', href);
            loadPage(href);
            theRafLoading();

          // scrolling.off(onscroll);
            return false;
          //}
        }
        else return false;
      }
    }

    links.forEach((link) => link.addEventListener('click', onClick));

    animations();
  },
  // when get() completed
  ajaxLoad = function(html) {
    newPageContent = html;
    ajaxOk = true;
  },
  // animations input
  animations = function() {
    if (window.innerWidth < 768) document.querySelectorAll('#the_menu li').forEach(x => x.classList.remove('active'));
    if (isMobile()) {
      window.scrollTo(0, 0);
      document.getElementById('main').classList.remove('black');
    }
    if (document.querySelector('body').classList.contains('home')) {
      document.querySelectorAll('.point').forEach(x => x.classList.remove('black'));
      hovers = document.querySelectorAll('.change_project');

      hovers.forEach((hover) => hover.addEventListener('mouseenter', onHover));
      hovers.forEach((hover) => hover.addEventListener('mouseleave', offHover));

      currentSlide = 0;
      totalSlides  = 0;

      renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight, { transparent: !0 });
      document.getElementById('inner_canvas').appendChild(renderer.view);

      renderer.view.width  = window.innerWidth;
      renderer.view.height = window.innerHeight;

      stage  = new PIXI.Container();
      loader = new PIXI.Loader();

      document.querySelectorAll('#images div').forEach(setDimensions);

      // displacement 1
      displacementSprite = PIXI.Sprite.from(directoryUri + 'images/gradient4.png'); //gradient4_bis //gradient4
      displacementSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.CLAMP; // REPEAT // MIRRORED_REPEAT // CLAMP
      displacementFilter = new PIXI.filters.DisplacementFilter(displacementSprite);

      // displacement 2
      displacementSprite2 = PIXI.Sprite.from(directoryUri + 'images/gradient_large.png');
      displacementSprite2.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;
      displacementFilter2 = new PIXI.filters.DisplacementFilter(displacementSprite2);

      // settings displacement1
      // intensity
      displacementFilter.scale.x = 50;
      displacementFilter.scale.y = 0;
      // center for slider
      displacementSprite.pivot.x = 256;
      displacementSprite.pivot.y = 256;
      // ladder x/y
      displacementSprite.scale.x = 0.2;

      // settings displacement2
      // intensity
      displacementFilter2.scale.x = 0;
      displacementFilter2.scale.y = 0;
      // ladder x/y
      displacementSprite2.scale.x = 0.8;
      // displacementSprite2.anchor.x = 1;

      stage.addChild(displacementSprite);
      stage.filters = [displacementFilter, displacementFilter2];

      loader.load((loader, resources) => {
        blockedAction = false;

        if (!document.querySelector('.projects').classList.contains('active')) pixiHome();

        nextSlide();

        document.getElementById('progress').style.display = 'none';
      });
    }
    else if (document.querySelector('body').classList.contains('page-template-about')) {
      document.getElementById('progress').style.display = 'none';
      document.querySelectorAll('.point').forEach(x => x.classList.add('black'));

      // document.getElementById('volet1').classList.add('ouvert');
      // document.querySelector('.intro').classList.add('ouvert');

      TweenMax.to('.fond_intro', 1.2, { scaleX: 1, ease: Power4.easeOut });
      random = [];
      document.querySelectorAll('.random').forEach(x => random.push(x));

      random.sort(function() {
        return 0.5 - Math.random();
      });

      TweenMax.staggerFromTo(random, 1, { x: '-24px' }, { x: '0px', opacity: 1, delay: 0.6, ease: Power2.easeOut }, 0.1);

      if (!isMobile()) {
        if (scrolling !== null) scrolling.destroy();
        scrolling = null;
        scrolling = new Smooth({
          preload: true,
          native: false,
          section: document.querySelector('.vs-section'),
          divs: document.querySelectorAll('.vs-div'),
          vs : { mouseMultiplier: 0.4 }
        });
        scrolling.init();
      }

      TweenMax.to('#main', 0.4, { backgroundColor: '#EFEFEF', ease: Power2.easeInOut });
      TweenMax.to('#inner_svg', 1, { opacity: 1, ease: Power2.easeIn });
      TweenMax.fromTo('#inner_svg', 2, { rotation: 140 }, { rotation: 0, ease: Power2.easeOut });
      TweenMax.fromTo('#inner_svg img', 2, {
        rotation: -140
      },{
        rotation: 0,
        ease: Power2.easeOut,
        onComplete: function() {
          rafAbout();
        }
      });
    }
    else if (document.querySelector('body').classList.contains('single')) {
      if (window.innerWidth < 768) {
        document.querySelectorAll('#the_menu li').forEach(x => {
          if (document.querySelector('body').classList.contains(x.getAttribute('data-id'))) x.classList.add('active');
        });
      }

      document.querySelectorAll('.point').forEach(x => x.classList.add('black'));

      if (!isMobile()) {
        document.getElementById('to_next_proj').addEventListener('mouseover', onHoverNext);
        document.getElementById('to_next_proj').addEventListener('mouseout', offHoverNext);

        if (scrolling !== null) scrolling.destroy();
        scrolling = null;

        scrolling = new Smooth({
          preload: true,
          native: false,
          section: document.querySelector('.vs-section'),
          divs: document.querySelectorAll('.vs-div'),
          vs : { mouseMultiplier: 0.4 }
        });
        scrolling.init();
      } else {
        document.getElementById('to_next_proj').innerHTML = document.getElementById('to_next_proj').getAttribute('data-next');
        TweenMax.set('#inner_project name', { x: (document.getElementById('project name').clientWidth + 10) / 2 + 'px' });
        TweenMax.set('#project name .stag', { opacity: 1 });
      }

      var height;

      if (window.innerWidth > 767) {
        height               = 0.57 * window.innerWidth + 20;
        renderer             = PIXI.autoDetectRenderer(window.innerWidth, (0.57 * window.innerWidth + 20), { transparent: !0 });
        renderer.view.width  = window.innerWidth;
        // renderer.view.height = window.innerHeight;
      } else {
        height               = window.innerWidth + 20;
        renderer             = PIXI.autoDetectRenderer(window.innerWidth, (window.innerWidth + 20), { transparent: !0 });
        renderer.view.width  = window.innerWidth;
        // renderer.view.height = window.innerHeight;
      }
      document.getElementById('cover').appendChild(renderer.view);

      stage  = new PIXI.Container();
      loader = new PIXI.Loader();

      // document.querySelectorAll('#images div').forEach(setDimensions);
      var image = new PIXI.Sprite(PIXI.Texture.from(document.getElementById('cover').getAttribute('data-img')));

      loader.add('image', document.getElementById('cover').getAttribute('data-img'));

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
        //   window['image'+index].width = window.innerWidth + 10;
        //   window['image'+index].height = height * (window.innerWidth + 10) / width;
        //   window['image'+index].x = -5;
        //   window['image'+index].y = window.innerHeight / 2 - window['image'+index].height / 2;
        // } else {
        //   window['image'+index].height = window.innerHeight;
        //   window['image'+index].width = (width * window.innerHeight / height) + 10;
        //   window['image'+index].x = (window.innerWidth / 2 - window['image'+index].width / 2) - 5;
        // }
      };

      // displacement 2
      displacementSprite2 = PIXI.Sprite.from(directoryUri + 'images/gradient_large.png');
      displacementSprite2.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;
      displacementFilter2 = new PIXI.filters.DisplacementFilter(displacementSprite2);

      displacementFilter2.scale.x = 0; // 150
      // displacementFilter2.scale.y = 0;
      displacementSprite2.scale.x = 0.8; // 0.8

      stage.addChild(displacementSprite2);
      stage.addChild(image);
      stage.filters = [displacementFilter2];

      loader.load((loader, resources) => {
        blockedAction = false;
        if (!document.querySelector('.projects').classList.contains('active')) pixiSingle();

        random = [];
        document.querySelectorAll('.random').forEach(x => random.push(x));

        random.sort(() => 0.5 - Math.random());

        TweenMax.staggerFromTo(random, 1, { x: '-24px' }, { x: '0px', opacity: 1, ease: Power2.easeOut }, 0.1);
        TweenMax.to('#cover', 1, { opacity: 1, delay: 0.4, ease: Power2.easeOut });

        speed = 4;

        document.getElementById('progress').style.display = 'none';

        // console.log('document.getElementById("the_imgs")', document.getElementById('the_imgs'));

        ladderScale = (document.getElementById('the_imgs').clientHeight + (0.28 * window.innerHeight)) / document.getElementById('the_imgs').clientHeight;
        ladderScale = parseFloat(Math.round(ladderScale * 100) / 100).toFixed(2);
      });
    }
    // TweenMax.to('body', 1, {opacity: 1, onComplete: function() {
    //   scroll.init();
    //   scroll.resize();
    // }});
    //
    // if ($('event')[0]) {}
    // console.log('animations');
  },
  // animations output outputs
  loadPage = function(href) {
    document.getElementById('progress').style.display = 'block';
    if (scrolling !== null) scrolling.off(onscroll);

    var xhr = new XMLHttpRequest();
    var method = 'GET';
    var url = href;

    xhr.open(method, url, true);

    xhr.onreadystatechange = function() {
      if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) ajaxLoad(xhr.responseText);
    };

    xhr.send();

    // TweenMax.to('body', 3, { opacity: 0, onComplete: function() {
    //   exitOk = true;
    // }});

    if (document.querySelector('.projects').classList.contains('active')) {
      cancelAnimationFrame(rafPixiMenu);

      TweenMax.to('#the_menu, #pixi_menu', 0.4, {
        opacity: 0,
        ease: Power2.easeInOut,
        onComplete: function() {
          stageMenu.removeChildren();
          exitOk = true;
          TweenMax.set('#main', { clearProps: 'backgroundColor' });
        }
      });
    }
    else if (document.querySelector('body').classList.contains('home')) {
      // speed = 4;
      listenCursor  = false;
      blockedAction = true;

      // stage.removeChild(displacementSprite);
      // stage.addChild(displacementSprite2);

      random = [];
      document.querySelectorAll('.random').forEach(x => random.push(x));

      random.sort(function() {
        return 0.5 - Math.random();
      });

      TweenMax.staggerTo(random, 0.4, { x: '24px', opacity: 0, ease: Power2.easeIn }, 0.1);

      // TweenMax.to(attributs2, 0.9, {
      //   intensity: 150,
      //   x: 10,
      //   ease: Power2.easeIn,
      //   onUpdate: function() {
      //     displacementFilter2.scale.x = attributs2.intensity;
      //     speed = attributs2.x;
      //   },
      //   onComplete: function() {}
      // });

      TweenMax.to('#main', 1, {
        opacity: 0,
        delay: 0.4,
        ease: Power2.easeInOut,
        onComplete: function() {
          exitOk = true;
        }
      });

      hovers = document.querySelectorAll('.change_project');

      hovers.forEach(function(hover) {
        hover.removeEventListener('mouseenter', onHover);
        hover.removeEventListener('mouseleave', offHover);
      });
    }
    else if (document.querySelector('body').classList.contains('single')) {
      document.getElementById('to_next_proj').removeEventListener('mouseover', onHoverNext);
      document.getElementById('to_next_proj').removeEventListener('mouseout', offHoverNext);

      if (lowLink) {
        var diff;
        if (scrolling !== null) {
          diff = document.getElementById('main').clientHeight - (scrolling.vars.current + window.innerHeight);

          TweenMax.to('#main', 1.2, { y: - (diff + window.innerHeight), ease: Power2.easeInOut });
          TweenMax.to('#next_proj > div', 1.2, {
            y: diff + window.innerHeight - (document.getElementById('demi_haut').clientHeight / 2),
            ease: Power2.easeInOut,
            onComplete: function() {
              TweenMax.to('#next_proj > div', 0.4, {
                opacity: 0,
                ease: Power2.easeInOut,
                onComplete: function() {
                  // TweenMax.set('#main', {clearProps: 'y'});
                  exitOk = true;
                }
              });
          }});
        }
        else {
          diff = document.getElementById('main').clientHeight - (window.pageYOffset + window.innerHeight);

          TweenMax.to('#next_proj, .inner_img', 1.2, { y: - (diff + window.innerHeight), ease: Power2.easeInOut });
          TweenMax.to('#next_proj > div', 1.2, {
            y: diff + window.innerHeight - (document.getElementById('demi_haut').clientHeight / 2),
            ease: Power2.easeInOut,
            onComplete: function() {
              TweenMax.to('#next_proj > div', 0.4, {
                opacity: 0,
                ease: Power2.easeInOut,
                onComplete: function() {
                  // TweenMax.set('#main', {clearProps: 'y'});
                  exitOk = true;
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
          onComplete: function() {
            exitOk = true;
          }
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
        onComplete: function() {
          exitOk = true;
        }
      });
    }
    else exitOk = true;
  },
  // updating the data of the page
  updatePage = function(html) {
    var parser      = new DOMParser();
    var doc         = parser.parseFromString(html, 'text/html');
    var classList = doc.querySelectorAll('body')[0].getAttribute('class');

    // main title of the page
    document.title = doc.querySelector('title').innerHTML;

    // main class of body
    // document.querySelectorAll('body')[0].setAttribute('class', doc.querySelectorAll('body')[0].getAttribute('class'));
    var res = classList.replace('is-loading', '');
    document.querySelectorAll('body')[0].setAttribute('class', res);

    if (!isMobile()) document.querySelectorAll('body')[0].classList.add('desktop');
    else document.querySelectorAll('body')[0].classList.add('mobile');

    // main content #main
    document.getElementById('main').innerHTML = doc.getElementById('main').innerHTML;

    // on launches the new page
    init();
  };

  function theRafLoading() {
    rafLoading = requestAnimationFrame(theRafLoading);
    if (exitOk === true && ajaxOk === true) {
      cancelAnimationFrame(rafPixiHome);
      cancelAnimationFrame(rafPixiSingle);
      if (document.querySelector('body').classList.contains('single') || document.querySelector('body').classList.contains('home')) {
        stage.destroy();
        renderer.destroy();
      }
      updatePage(newPageContent);
      cancelAnimationFrame(rafLoading);
    }
  }

  // management button prev / next browser
  window.onpopstate = function(e) {
    if (e.state !== null) {
      loadPage(location.href);
      theRafLoading();
      //scrolling.off(onscroll);
    }
  };

  //------------------------------//
  // APPELS FIRST LOADING //
  //------------------------------//
  history.pushState({}, '', location);
  // theRaf();
  init();

  if (!isMobile()) document.querySelectorAll('body')[0].classList.add('desktop');
  else {
    document.querySelectorAll('body')[0].classList.add('mobile');
    document.getElementById('about').style.top = window.innerHeight / 2 + 'px';
    document.getElementById('contact').style.top = window.innerHeight / 2 + 'px';
  }

  // pixi menu statement
  // rendererMenu = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight, { transparent: !0 });
  // console.log('1', 0.24 * window.innerWidth); // ---> 307.2px
  // console.log('2', window.innerHeight - 0.074 * window.innerWidth); // ---> 705.28px

  rendererMenu = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight, { transparent: !0 });
  // rendererMenu = PIXI.autoDetectRenderer(0.24 * window.innerWidth, window.innerHeight - 0.074 * window.innerWidth, { transparent: !0 });

  document.getElementById('pixi_menu').appendChild(rendererMenu.view);

  rendererMenu.view.width  = window.innerWidth;
  rendererMenu.view.height = window.innerHeight;

  stageMenu = new PIXI.Container();

  document.querySelectorAll('#the_menu li a').forEach(setDimensionsMenu);

  // displacement 2
  displacementSprite3 = PIXI.Sprite.from(directoryUri + 'images/gradient_large.png');
  displacementSprite3.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;
  displacementFilter3 = new PIXI.filters.DisplacementFilter(displacementSprite3);

  stageMenu.filters = [displacementFilter3];

  // settings displacement2
  // intensity
  displacementFilter3.scale.x = 0;
  displacementFilter3.scale.y = 0;
  // ladder x/y
  displacementSprite3.scale.x = 0.4;
});
// end doc ready vanilla

// -------------------------------------------------------------------------- //

// SLIDER FUNCTIONS
function nextSlide() {
  speed = 4;
  commonTransition();
  updatePagination('next');

  window['image'+currentSlide].alpha = 0;
  stage.addChild(window['image'+currentSlide]);

  // image1.alpha = 1;
  var tl = new TimelineMax();

  tl.to(attributs2, 0.9, {
    intensity: 150,
    x: 20,
    // width: 0.8,
    ease: Power2.easeIn,
    onUpdate: function() {
      displacementFilter2.scale.x = attributs2.intensity;
      speed = attributs2.x;
      // displacementSprite2.scale.x = attributs2.width;
    },
    onComplete: function() {
      tl.reverse();

      setTimeout(function() {
        if (!isMobile()) {
          stage.removeChild(displacementSprite2);
          stage.addChild(displacementSprite);
        }
        listenCursor = true;

        if (currentSlide === 0) stage.removeChild(window['image'+(totalSlides-1)]);
        else stage.removeChild(window['image'+(currentSlide-1)]);

        if (currentSlide < (totalSlides-1)) currentSlide++;
        else currentSlide = 0;

        displacementSprite.x = currentMousePos.x;
        blockedAction = false;
      }, 800);
    }
  });

  TweenMax.to(attributs3, 0.6, {
    opacity: 1,
    delay: 0.6,
    ease: Linear.easeNone,
    onUpdate: function() {
      window['image'+currentSlide].alpha = attributs3.opacity;
    }
  });
}

function prevSlide() {
  speed = -4;
  commonTransition();
  updatePagination('prev');

  if (currentSlide === 0) {
    window['image'+(totalSlides-2)].alpha = 0;
    stage.addChild(window['image'+(totalSlides-2)]);
  } else if (currentSlide === 1) {
    window['image'+(totalSlides-1)].alpha = 0;
    stage.addChild(window['image'+(totalSlides-1)]);
  } else {
    window['image'+(currentSlide-2)].alpha = 0;
    stage.addChild(window['image'+(currentSlide-2)]);
  }

  // image1.alpha = 1;
  var tl = new TimelineMax();

  //attributs2.anchor = 0;

  tl.to(attributs2, 0.9, {
    intensity: 150,
    x: -20,
    // width: 0.8,
    // anchor: 1,
    ease: Power2.easeIn,
    onUpdate: function() {
      displacementFilter2.scale.x = attributs2.intensity;
      speed = attributs2.x;
      // displacementSprite2.scale.x = attributs2.width;
      // displacementSprite2.anchor.x = attributs2.anchor;
    },
    onComplete: function() {
      tl.reverse();
      // attributs2.intensity = 150;
      // attributs2.x = -20;
      // tl.to(attributs2, 0.9, {
      //     intensity: 0,
      //     x: 0,
      //     ease: Power1.easeOut,
      //     onUpdate: function() {
      //         console.log(attributs2.width);
      //         displacementFilter2.scale.x = attributs2.intensity;
      //         speed = attributs2.x;
      //     }
      // });
      setTimeout(function() {
        if (!isMobile()) {
          stage.removeChild(displacementSprite2);
          stage.addChild(displacementSprite);
        }
        listenCursor = true;

        if (currentSlide === 0) stage.removeChild(window['image'+(totalSlides-1)]);
        else stage.removeChild(window['image'+(currentSlide-1)]);

        if (currentSlide > 0) currentSlide--;
        else currentSlide = totalSlides-1;

        displacementSprite.x = currentMousePos.x;
        blockedAction = false;
      }, 800);
    }
  });

  TweenMax.to(attributs3, 0.6, {
    opacity: 1,
    delay: 0.6,
    ease: Linear.easeNone,
    onUpdate: function() {
      if (currentSlide === 0) window['image'+(totalSlides-2)].alpha = attributs3.opacity;
      else if (currentSlide === 1) window['image'+(totalSlides-1)].alpha = attributs3.opacity;
      else window['image'+(currentSlide-2)].alpha = attributs3.opacity;
    }
  });
}

function commonTransition() {
  listenCursor  = false;
  blockedAction = true;

  stage.removeChild(displacementSprite);
  stage.addChild(displacementSprite2);

  attributs.intensity = displacementFilter.scale.x;

  TweenMax.to(attributs, 0.3, {
    intensity: 0,
    ease: Power2.easeOut,
    onUpdate: function() {
      displacementFilter.scale.x = attributs.intensity;
    }
  });

  displacementSprite2.x = 0;
  attributs2.intensity  = displacementFilter2.scale.x;
  attributs2.x          = speed;
  attributs2.width      = displacementSprite2.scale.x;
  attributs3.opacity    = 0;
}


function setDimensions(item, index) {
  totalSlides++;

  window['image'+index] = new PIXI.Sprite(PIXI.Texture.from(item.getAttribute('data-url')));
  window['image'+index].alpha = 0;

  loader.add('image' + index, item.getAttribute('data-url'));

  // Chainable `pre` to add a middleware that runs for each resource, *before* loading that resource.
  // This is useful to implement custom caching modules (using filesystem, indexeddb, memory, etc).
  // loader.pre(cachingMiddleware);

  var img = new Image();
  img.src = item.getAttribute('data-url');

  img.onload = function() {
    var width         = this.width;
    var height        = this.height;
    var ratio_img     = width / height;
    var ratio_fenetre = window.innerWidth / window.innerHeight;

    // +10 and - 5 values ​​to avoid white edges
    if (ratio_fenetre >= ratio_img) {
      window['image'+index].width = window.innerWidth + 10;
      window['image'+index].height = height * (window.innerWidth + 10) / width;
      window['image'+index].x = -5;
      window['image'+index].y = window.innerHeight / 2 - window['image'+index].height / 2;
    } else {
      window['image'+index].height = window.innerHeight;
      window['image'+index].width = (width * window.innerHeight / height) + 10;
      window['image'+index].x = (window.innerWidth / 2 - window['image'+index].width / 2) - 5;
    }
  };
}

function setDimensionsMenu(item, index) {
  // totalSlides++;
  var frame_width  = 0.24 * window.innerWidth;
  var frame_height = window.innerHeight - 0.074 * window.innerWidth; // ---> 705.28px

  window['image_menu'+index] = new PIXI.Sprite(PIXI.Texture.from(item.getAttribute('data-img')));
  window['image_menu'+index].alpha = 0;

  var img = new Image();
  img.src = item.getAttribute('data-img');

  img.onload = function() {
    var width         = this.width;
    var height        = this.height;
    var ratio_img     = width / height;
    var ratio_fenetre = frame_width / frame_height;

    // +10 and - 5 values ​​to avoid white edges
    if (ratio_fenetre >= ratio_img) {
      window['image_menu'+index].width  = frame_width + 10;
      window['image_menu'+index].height = height * (frame_width + 10) / width;
      window['image_menu'+index].x      = - 5;
      window['image_menu'+index].y      = frame_height / 2 - window['image_menu'+index].height / 2;
    }
    else {
      window['image_menu'+index].height = height;
      window['image_menu'+index].width  = width;
      window['image_menu'+index].x      = (frame_width / 2 - window['image_menu'+index].width / 2) + 49; // -757.4
      // window['image_menu'+index].x      = (frame_height / 2 - window['image_menu'+index].width / 2) - 150; // -757.36
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
}


function updatePagination(direction) {
  if (direction === 'next') {
    multiplier = 1;

    TweenMax.to('#white_circle', 0.9, { 'stroke-dashoffset': 190 * (1 - 1 / totalSlides - (currentSlide * 1 / totalSlides)), ease: Power4.easeInOut });
  } else {
    multiplier = -1;

    if (currentSlide === 1) TweenMax.to('#white_circle', 0.9, { 'stroke-dashoffset': 0, ease: Power4.easeInOut });
    else if (currentSlide === 0) TweenMax.to('#white_circle', 0.9, { 'stroke-dashoffset': 190 / totalSlides, ease: Power4.easeInOut });
    else TweenMax.to('#white_circle', 0.9, { 'stroke-dashoffset' : 190 - (currentSlide-1) * 190 / totalSlides, ease: Power4.easeInOut });
  }

  random = [];
  document.querySelectorAll('.random').forEach(x => random.push(x));

  random.sort(() => 0.5 - Math.random());

  TweenMax.staggerTo(random, 0.4, { x: multiplier * 24 + 'px', opacity: 0, ease: Power2.easeIn }, 0.1, allDone);
}

//------------------//
// HELPER FUNCTIONS //
//------------------//
function addRandom(item, index) {
  item.classList.add('random');
}

function isMobile() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  // return true;
}

function processCircle(event) {
  if (window.orientation === 0) gamma = event.gamma;
  else if (window.orientation === 180) gamma = -event.gamma;
  else if (window.orientation === -90) gamma = -event.beta;
  else if (window.orientation === 90) gamma = event.beta;
}

function handleTouchStart(evt) {
  xDown = evt.touches[0].clientX;
  yDown = evt.touches[0].clientY;
}

function handleTouchMove(evt) {
  if (!xDown || !yDown) return;

  var xUp   = evt.touches[0].clientX;
  var yUp   = evt.touches[0].clientY;

  var xDiff = xDown - xUp;
  var yDiff = yDown - yUp;

  if (Math.abs(xDiff) > Math.abs(yDiff)) { /* most significant */
    if (document.querySelector('body').classList.contains('home') && blockedAction === false) {
      if (xDiff > 0) nextSlide();
      else prevSlide();
    }
  }
  else {
    if (document.querySelector('body').classList.contains('home') && blockedAction === false) {
      if (yDiff > 0) nextSlide();
      else prevSlide();
    }
  }
  /* reset values */
  xDown = null;
  yDown = null;
}

function onHover(event) {
  event.target.classList.add('feature');
  document.querySelector('.change_project.current').classList.add('temp');
}

function offHover(event) {
  event.target.classList.remove('feature');
  document.querySelector('.change_project.current').classList.remove('temp');
}

function resize() {
  if (scrolling !== null) scrolling.resize();
  else {
    document.getElementById('about').style.top = window.innerHeight / 2 + 'px';
    document.getElementById('contact').style.top = window.innerHeight / 2 + 'px';
  }
}

function mousePosition(event) {
  currentMousePos.x = event.pageX;
  currentMousePos.y = event.pageY;
}

//------------------//
// R.A.F.S.         // ---> cancelAnimationFrame(raf_pixi);
//------------------//

function pixiHome() {
  rafPixiHome = requestAnimationFrame(pixiHome);
  // console.log('pixi home tourne');

  renderer.render(stage);

  if (listenCursor) {
    // window['image' + (currentSlide - 1)].x = 100
    mousePos.x = displacementSprite.x;
    // mousePos.y = displacementSprite.y;
    mousePos.intensity = displacementFilter.scale.x;
    mousePos.width = displacementSprite.scale.x;

    if (currentSlide !== tempImageNumber) {
      tempImageNumber = currentSlide;

      if (currentSlide === 0) imageNumber = totalSlides-1;
      else imageNumber = currentSlide-1;
      // currentMousePos.x = 0;
      delayx = window['image' + imageNumber].x;
    }
    mousePos.correction = 0;

    TweenMax.to(mousePos, 0.3, {
      x: currentMousePos.x,
      //y: currentMousePos.y,
      intensity: (currentMousePos.x - formerDelta) * 10,
      width: Math.abs(((currentMousePos.x - formerDelta) / 80) - 0.2),
      correction: (currentMousePos.x - formerDelta) / 40,
      onUpdate: function() {
        displacementSprite.x = mousePos.x;
        // displacementSprite.y = mousePos.y;
        displacementFilter.scale.x = mousePos.intensity;
        displacementSprite.scale.x = mousePos.width;
        window['image' + imageNumber].x = delayx + mousePos.correction;
      },
      ease: Linear.easeNone
    });

    // console.log((currentMousePos.x - formerDelta) / 100);

    if (isMobile()) {
      mousePos.penche = displacementFilter2.scale.x; // penche :: definition => looks

      TweenMax.to(mousePos, 0.3, {
        penche: (gamma * 20 - deltaGamma),
        onUpdate: function() {
          displacementFilter2.scale.x = mousePos.penche;
        },
        ease: Linear.easeNone
      });

      // document.getElementById('title_h2').innerHTML = gamma;
      displacementSprite2.x += 10;
    }
  }
  else displacementSprite2.x += speed;

  formerDelta = currentMousePos.x;
  deltaGamma  = gamma * 20;
}

function pixiMenu() {

  rafPixiMenu = requestAnimationFrame(pixiMenu);
  // console.log('pixi menu tourne');

  rendererMenu.render(stageMenu);
  displacementSprite3.x += 4;

  if (!isMobile()) {
    cursorPercentage = Math.round(currentMousePos.y * 100 / window.innerHeight * 100)/100;
    theDeltaMenu = currentMousePos.y;
  }
  else {
    cursorPercentage = window.pageYOffset * 100 / (heightMenu - window.innerHeight);
    theDeltaMenu = window.pageYOffset;
  }

  if (Math.abs((theDeltaMenu - deltaMenu) / 200 + 1) < 1.8) intensity = Math.abs((theDeltaMenu - deltaMenu) / 200 + 1);
  else intensity = 1.8;

  // displacement menu
  if (!isMobile()) {
    expression = -1 * (heightMenu - window.innerHeight) / window.innerHeight * currentMousePos.y;

    TweenMax.to('#the_menu', 1.4, {
      y: expression + 'px',
      scaleY: intensity,
      ease: Power2.easeOut
    });
  }
  else TweenMax.to('#the_menu', 1.4, { scaleY: intensity, ease: Power2.easeOut });

  if (window.innerWidth > 767) {
    if (cursorPercentage > heightMargin && cursorPercentage < (100 - heightMargin)) document.querySelectorAll('#the_menu li').forEach(checkMenu);

    displace.intensity = displacementFilter3.scale.x;

    TweenMax.to(displace, 0.3, {
      intensity: (theDeltaMenu - deltaMenu) * 4,
      onUpdate: function() {
        displacementFilter3.scale.x = displace.intensity;
      },
      ease: Linear.easeNone
    });
  }
  deltaMenu = theDeltaMenu;
}

function pixiSingle() {
  if (document.querySelector('.vs-section').clientHeight != formerHeight && !isMobile()) {
    scrolling.resize();
    formerHeight = document.querySelector('.vs-section').clientHeight;
  }

  rafPixiSingle = requestAnimationFrame(pixiSingle);

  //l adder_scale = parseFloat(Math.round((document.getElementById('the_imgs').clientHeight + (0.56 * window.innerHeight)) / document.getElementById('the_imgs').clientHeight * 100) / 100).toFixed(2);
  // ladderScale = (document.getElementById('the_imgs').clientHeight + (0.56 * window.innerHeight)) / document.getElementById('the_imgs').clientHeight;
  // ladderScale = parseFloat(Math.round(ladderScale * 100) / 100).toFixed(2);
  // console.log(ladderScale);
  // console.log('pixi single tourne');

  renderer.render(stage);

  displacementSprite2.x += speed;

  if (scrolling !== null) {
    if (scrolling.vars.target !== 0 && passOnce === false) {
      passOnce = true;
      singleAnimation();
    } else if (scrolling.vars.target === 0 && passOnce === true) {
      passOnce = false;
      singleAnimation2();
    }
  } else {
    if (window.pageYOffset !== 0 && passOnce === false) {
      passOnce = true;
      singleAnimation();
    } else if (window.pageYOffset === 0 && passOnce === true) {
      passOnce = false;
      singleAnimation2();
    }
  }

  // TweenMax.to('#the_imgs', 1.4, { scaleY: intensity, ease: Power2.easeOut });

  // if (scrolling !== null) deltaScroll = scrolling.vars.current;
  // else {}
}

function rafAbout() {
  theRafAbout = requestAnimationFrame(rafAbout);

  if (scrolling !== null) {
    TweenMax.to('#inner_svg', 1, { rotation: -scrolling.vars.current / 4, ease: Linear.easeNone });
    TweenMax.to('#inner_svg img', 1, { rotation: scrolling.vars.current / 4, ease: Linear.easeNone });

    if (Math.abs((scrolling.vars.current - deltaScroll) / 200 + 1) < 2.2) intensity = Math.abs((scrolling.vars.current - deltaScroll) / 200 + 1);
    else intensity = 2.2;
  }
  else {
    TweenMax.to('#inner_svg', 1, {rotation: -window.pageYOffset/4, ease: Linear.easeNone});
    TweenMax.to('#inner_svg img', 1, {rotation: window.pageYOffset/4, ease: Linear.easeNone});

    if (Math.abs((window.pageYOffset - deltaScroll) / 200 + 1) < 2.2) intensity = Math.abs((window.pageYOffset - deltaScroll) / 200 + 1);
    else intensity = 2.2;
  }

  // if (scrolling !== null) {
  // }else{
  // }

  TweenMax.to('#scaleA', 1.4, { scaleX: intensity, ease: Power2.easeOut });

  if (scrolling !== null) deltaScroll = scrolling.vars.current;
  else deltaScroll = window.pageYOffset;
}


function checkMenu(item, index) {
  if (cursorPercentage > (heightMargin + (index * entranceHeight)) && cursorPercentage < (heightMargin + ((index + 1) * entranceHeight)) && !item.classList.contains('active')) {
    document.querySelector('#the_menu .active').classList.remove('active');
    item.classList.add('active');

    document.getElementById('pixi_menu').setAttribute('href',item.querySelector('a').getAttribute('href'));

    // add new image
    stageMenu.addChild(window['image_menu' + index]);

    displace2.alpha = 0;
    // stageMenu.removeChild(displacementSprite3);

    TweenMax.to(displace2, 0.2, {
      alpha: 1,
      onUpdate: function() {
        window['image_menu' + index].alpha = displace2.alpha;
      },
      onComplete: function() {
        // to do : gestion suppression ancien child
        // stageMenu.removeChildren(2);
        // dernier_ajoute = index;
      },
      ease: Linear.easeNone
    });
  }
}

function changePagination(element) {
  if (element.classList.contains('current')) return;
  else {
    lindex = Array.from(document.getElementById('num_letter').children).indexOf(element);
    const currentIndex = Array.from(document.getElementById('num_letter').children).indexOf(document.querySelector('#num_letter .current'));

    speed = 4;
    commonTransition();

    window['image'+lindex].alpha = 0;
    stage.addChild(window['image'+lindex]);

    var tl = new TimelineMax();

    tl.to(attributs2, 0.9, {
      intensity: 150,
      x: 20,
      ease: Power2.easeIn,
      onUpdate: function() {
        displacementFilter2.scale.x = attributs2.intensity;
        speed = attributs2.x;
      },
      onComplete: function() {
        tl.reverse();
        setTimeout(function() {
          stage.removeChild(displacementSprite2);
          stage.addChild(displacementSprite);
          listenCursor = true;

          stage.removeChild(window['image'+(currentIndex)]);

          if (lindex >= totalSlides-1) currentSlide = 0;
          else currentSlide = lindex + 1;
          displacementSprite.x = currentMousePos.x;
          blockedAction = false;
        }, 800);
      }
    });

    TweenMax.to(attributs3, 0.6, {
      opacity: 1,
      delay: 0.6,
      ease: Linear.easeNone,
      onUpdate: function() {
        window['image'+lindex].alpha = attributs3.opacity;
      }
    });

    TweenMax.to('#white_circle', 0.9, { 'stroke-dashoffset' : 190 * (1 - 1 / totalSlides - (lindex * 1 / totalSlides)), ease: Power4.easeInOut });

    random = [];
    document.querySelectorAll('.random').forEach(x => random.push(x));

    random.sort(() => 0.5 - Math.random());

    TweenMax.staggerTo(random, 0.4, { x: '24px', opacity: 0, ease: Power2.easeIn }, 0.1, allDone2);
  }
}

function allDone() {
  document.querySelectorAll('.random.first').forEach(x => x.classList.remove('first'));
  document.querySelector('#num_letter .current').classList.add('after');

  if (multiplier === 1) {
    if (document.querySelector('#num_letter .current').nextElementSibling !== null) {
      document.querySelector('#num_letter .current').nextElementSibling.classList.add('before');
      var next = document.querySelector('#num_letter .current').nextElementSibling;
      TweenMax.to('.current .letter', 0.4, { x: '100%', clearProps: 'x', ease: Power4.easeInOut });

      TweenMax.to(document.querySelector('#num_letter .current').nextElementSibling.querySelector('div'), 0.4, { x: '0%', clearProps: 'x', ease: Power4.easeInOut, onComplete: function() {
        document.querySelector('#num_letter .current').classList.remove('current','after');
        next.classList.add('current');
        next.classList.remove('before');
      }});
    }
    else {
      var first = document.querySelector('#num_letter div');
      first.classList.add('before');

      TweenMax.to('.current .letter', 0.4, { x: '100%', clearProps: 'x', ease: Power4.easeInOut });
      TweenMax.to(first.querySelector('div'), 0.4, { x: '0%', clearProps: 'x', ease: Power4.easeInOut, onComplete: function() {
        if (document.querySelectorAll('.change_project')[totalSlides-1].classList.contains('first')) document.querySelectorAll('.change_project')[totalSlides-1].classList.remove('first');
        document.querySelector('#num_letter .current').classList.remove('current','after');
        first.classList.add('current');
        first.classList.remove('before');
      }});
    }
    document.getElementById('num_project').innerHTML = currentSlide + 1;
    document.getElementById('title_h2').innerHTML    = document.querySelectorAll('#images div')[currentSlide].getAttribute('data-title');
    document.getElementById('type').innerHTML        = document.querySelectorAll('#images div')[currentSlide].getAttribute('data-cat');
    document.getElementById('year').innerHTML        = document.querySelectorAll('#images div')[currentSlide].getAttribute('data-year');

    document.querySelectorAll('.update_link').forEach(x => x.setAttribute('href',document.querySelectorAll('#images div')[currentSlide].getAttribute('data-perma')));
  }
  else {
    if (document.querySelector('#num_letter .current').previousElementSibling !== null) {
      document.querySelector('#num_letter .current').previousElementSibling.classList.add('before');
      var prev = document.querySelector('#num_letter .current').previousElementSibling;

      TweenMax.to('.current .letter', 0.4, { x: '-100%', clearProps: 'x', ease: Power4.easeInOut });
      TweenMax.fromTo(document.querySelector('#num_letter .current').previousElementSibling.querySelector('div'), 0.4, { x: '100%'}, { x: '0%', clearProps: 'x', ease: Power4.easeInOut, onComplete: function() {
        document.querySelector('#num_letter .current').classList.remove('current','after');
        prev.classList.add('current');
        prev.classList.remove('before');
      }});
    }
    else {
      var last = document.querySelectorAll('#num_letter > div')[totalSlides-1];
      last.classList.add('before');

      TweenMax.to('.current .letter', 0.4, { x: '-100%', clearProps: 'x', ease: Power4.easeInOut });
      TweenMax.fromTo(last.querySelector('div'), 0.4, { x: '100%' }, { x: '0%', clearProps: 'x', ease: Power4.easeInOut, onComplete: function() {
        document.querySelector('#num_letter .current').classList.remove('current','after');
        last.classList.add('current');
        last.classList.remove('before');
      }});
    }

    if (currentSlide === 1) {
      document.getElementById('num_project').innerHTML = totalSlides;
      document.getElementById('title_h2').innerHTML    = document.querySelectorAll('#images div')[totalSlides-1].getAttribute('data-title');
      document.getElementById('type').innerHTML        = document.querySelectorAll('#images div')[totalSlides-1].getAttribute('data-cat');
      document.getElementById('year').innerHTML        = document.querySelectorAll('#images div')[totalSlides-1].getAttribute('data-year');

      document.querySelectorAll('.update_link').forEach(x => x.setAttribute('href', document.querySelectorAll('#images div')[totalSlides-1].getAttribute('data-perma')));
    }
    else if (currentSlide === 0) {
      document.getElementById('num_project').innerHTML = totalSlides-1;
      document.getElementById('title_h2').innerHTML   = document.querySelectorAll('#images div')[totalSlides-2].getAttribute('data-title');
      document.getElementById('type').innerHTML       = document.querySelectorAll('#images div')[totalSlides-2].getAttribute('data-cat');
      document.getElementById('year').innerHTML       = document.querySelectorAll('#images div')[totalSlides-2].getAttribute('data-year');

      document.querySelectorAll('.update_link').forEach(x=> x.setAttribute('href', document.querySelectorAll('#images div')[totalSlides-2].getAttribute('data-perma')));
    }
    else {
      document.getElementById('num_project').innerHTML = currentSlide-1;
      document.getElementById('title_h2').innerHTML   = document.querySelectorAll('#images div')[currentSlide-2].getAttribute('data-title');
      document.getElementById('type').innerHTML       = document.querySelectorAll('#images div')[currentSlide-2].getAttribute('data-cat');
      document.getElementById('year').innerHTML       = document.querySelectorAll('#images div')[currentSlide-2].getAttribute('data-year');

      document.querySelectorAll('.update_link').forEach(x => x.setAttribute('href', document.querySelectorAll('#images div')[currentSlide-2].getAttribute('data-perma')));
    }
  }

  document.querySelectorAll('#title_h2 span').forEach(addRandom);
  random = [];
  document.querySelectorAll('.random').forEach(x => random.push(x));

  random.sort(() => 0.5 - Math.random());

  TweenMax.staggerFromTo(random, 1, { x: -multiplier * 24 + 'px', opacity: 0 }, { x: '0px', opacity: 1, ease: Power2.easeOut }, 0.1);
}

function allDone2() {
  document.querySelector('#num_letter .current').classList.add('after');
  TweenMax.to('.current .letter', 0.4, { x: '100%', clearProps: 'x', ease: Power4.easeInOut});
  document.querySelectorAll('#num_letter > div')[lindex].classList.add('before');
  TweenMax.to(document.querySelectorAll('#num_letter > div')[lindex].querySelector('div'), 0.4, {
    x: '0%',
    clearProps: 'x',
    ease: Power4.easeInOut,
    onComplete: function() {
      document.querySelector('#num_letter .current').classList.remove('current','after');
      document.querySelectorAll('#num_letter > div')[lindex].classList.add('current');
      document.querySelectorAll('#num_letter > div')[lindex].classList.remove('before');
    }
  });

  // if (document.querySelector('#num_letter .current').nextElementSibling !== null) {
  //     document.querySelector('#num_letter .current').nextElementSibling.classList.add('before');
  //     var next = document.querySelector('#num_letter .current').nextElementSibling;
  //     TweenMax.to('.current .letter', 0.4, {x: '100%', clearProps: 'x', ease: Power4.easeInOut});
  //     TweenMax.to(document.querySelector('#num_letter .current').nextElementSibling.querySelector('div'), 0.4, {x: '0%', clearProps: 'x', ease: Power4.easeInOut, onComplete: function() {
  //         document.querySelector('#num_letter .current').classList.remove('current','after');
  //         next.classList.add('current');
  //         next.classList.remove('before');
  //     }});
  // }else{
  //     var first = document.querySelector('#num_letter div');
  //     first.classList.add('before');

  //     TweenMax.to('.current .letter', 0.4, {x: '100%', clearProps: 'x', ease: Power4.easeInOut});
  //     TweenMax.to(first.querySelector('div'), 0.4, {x: '0%', clearProps: 'x', ease: Power4.easeInOut, onComplete: function() {
  //         document.querySelector('#num_letter .current').classList.remove('current','after');
  //         first.classList.add('current');
  //         first.classList.remove('before');
  //     }});
  // }

  document.getElementById('num_project').innerHTML = lindex + 1;
  document.getElementById('title_h2').innerHTML   = document.querySelectorAll('#images div')[lindex].getAttribute('data-title');
  document.getElementById('type').innerHTML       = document.querySelectorAll('#images div')[lindex].getAttribute('data-cat');
  document.getElementById('year').innerHTML       = document.querySelectorAll('#images div')[lindex].getAttribute('data-year');

  document.querySelectorAll('.update_link').forEach(x => x.setAttribute('href',document.querySelectorAll('#images div')[lindex].getAttribute('data-perma')));

  document.querySelectorAll('#title_h2 span').forEach(addRandom);
  random = [];
  document.querySelectorAll('.random').forEach(x => random.push(x));

  random.sort(() => 0.5 - Math.random());

  TweenMax.staggerFromTo(random, 1, { x: '-24px', opacity:0}, {x: '0px', opacity: 1, ease: Power2.easeOut }, 0.1);
}

function singleAnimation() {
  speed = 4;
  var options = { intensity: 0, x: 4 };

  TweenMax.to(options, 0.9, {
    intensity: 150,
    x: 6,
    ease: Power2.easeIn,
    onUpdate: function() {
      displacementFilter2.scale.x = options.intensity;
      speed = options.x;
    }
  });
}

function singleAnimation2() {
  speed = 6;
  var options = { intensity: 150, x: 6 };

  TweenMax.to(options, 0.9, {
    intensity: 0,
    x: 4,
    ease: Power2.easeOut,
    onUpdate: function() {
      displacementFilter2.scale.x = options.intensity;
      speed = options.x;
    }
  });
}

function onHoverNext (event) {
  if (playOnce === false) {
    playOnce = true;

    random = [];
    document.querySelectorAll('#to_next_proj span').forEach(x => random.push(x));

    random.sort(() => 0.5 - Math.random());

    TweenMax.staggerTo(random, 0.4, { opacity: 0, ease: Power2.easeIn }, 0.05, allDoneNext);
    TweenMax.to('#inner_project name', 0.4, { x: (document.getElementById('project name').clientWidth + 10) / 2 + 'px', delay: 0.4, ease: Power2.easeOut });
    TweenMax.staggerTo('.stag', 0.4, { opacity: 1, delay: 0.4, ease: Power2.easeOut }, -0.02);
  }
}

function offHoverNext (event) {
  if (playOnce === true) {
    playOnce = false;

    random = [];
    document.querySelectorAll('#to_next_proj span').forEach(x => random.push(x));
    random.sort(() => 0.5 - Math.random());

    TweenMax.staggerTo(random, 0.4, { opacity: 0, ease: Power2.easeIn }, 0.05, allDoneNext2);
  }
}

function allDoneNext() {
  document.getElementById('to_next_proj').innerHTML = document.getElementById('to_next_proj').getAttribute('data-next');
  TweenMax.set('#to_next_proj span', {opacity:0});

  random = [];
  document.querySelectorAll('#to_next_proj span').forEach(x => random.push(x));

  random.sort(() => 0.5 - Math.random());

  TweenMax.staggerTo(random, 0.4, { opacity: 1, ease: Power2.easeOut }, 0.05);
}

function allDoneNext2() {
  document.getElementById('to_next_proj').innerHTML = '<span>N</span><span>e</span><span>x</span><span>t</span>';
  TweenMax.set('#to_next_proj span', { opacity: 0 });

  random = [];
  document.querySelectorAll('#to_next_proj span').forEach(x => random.push(x));

  random.sort(() => 0.5 - Math.random());

  TweenMax.staggerTo(random, 0.4, { opacity: 1, ease: Power2.easeOut }, 0.05);

  TweenMax.to('#inner_project name', 0.4, { x: '0px', ease: Power2.easeOut });
  TweenMax.staggerTo('.stag', 0.4, { opacity: 0, ease: Power2.easeOut }, 0.02);
}

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
