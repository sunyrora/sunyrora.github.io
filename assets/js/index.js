(function(document) {
  let toggle = document.querySelector('#sidebar-toggle');
  let sidebar = document.querySelector('#nav-profil');
  let checkbox = document.querySelector('#sidebar-checkbox');
  let btnTop = document.querySelector("#btn-top");
  let btnBottom = document.querySelector("#btn-bottom");
  let scrollElement = document.scrollingElement || document.documentElement;

  if (
    document.readyState === "complete" ||
    (document.readyState !== "loading" && !document.documentElement.doScroll)
  ) {
    checkScroll();
  } else {
    document.addEventListener("DOMContentLoaded", checkScroll());
  }

  function checkScroll() {
    if(window.scrollY <= 300 ) {
      btnTop.style.visibility = "hidden";
    } else {
      btnTop.style.visibility = "visible";
    }

    if(window.scrollY >=  scrollElement.scrollHeight - scrollElement.clientHeight) {
      btnBottom.style.visibility = "hidden";
    } else {
      btnBottom.style.visibility = "visible";
    }
  }

  window.addEventListener("scroll", (e) => {
    checkScroll();
  });

  //////////////////////////////////////////////////////////////////
  /// from https://gist.github.com/andjosh/6764939
  function scrollTo(element, to, duration) {
    var start = element.scrollTop,
        change = to - start,
        currentTime = 0,
        increment = 20;
        
    var animateScroll = () =>{        
        currentTime += increment;
        var val = Math.easeInOutQuad(currentTime, start, change, duration);
        element.scrollTop = val;
        if(currentTime < duration) {
            setTimeout(animateScroll, increment);
        }
    };
    animateScroll();
}

  //t = current time
  //b = start value
  //c = change in value
  //d = duration
  Math.easeInOutQuad = (t, b, c, d) => {
    t /= d/2;
    if (t < 1) return c/2*t*t + b;
    t--;
    return -c/2 * (t*(t-2) - 1) + b;
  };
///// https://gist.github.com/andjosh/6764939
//////////////////////////////////////////////////////////////////


  btnTop.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    // window.scrollTo(0, 0);
    // let element = document.scrollingElement || document.documentElement;
    scrollTo(scrollElement, 0, 300);

  }, false);

  btnBottom.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    scrollTo(scrollElement, scrollElement.scrollHeight, 300);

  }, false);

  document.addEventListener('click', function(e) {
    let target = e.target;
    
    if (target === toggle) {
      checkbox.checked = !checkbox.checked;
      e.preventDefault();
    } else if (checkbox.checked && !sidebar.contains(target)) {
      /* click outside the sidebar when sidebar is open */
      checkbox.checked = false;
    }
  }, false);

})(document);
