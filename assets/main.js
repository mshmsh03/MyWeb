(function(){
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function typewriter(){
    var els = document.querySelectorAll('.typewriter');
    els.forEach(function(el, idx){
      var text = el.getAttribute('data-text') || '';
      if(reduceMotion){
        var cursor = el.querySelector('.cursor');
        var node = document.createTextNode(text);
        if(cursor){ el.insertBefore(node, cursor); } else { el.appendChild(node); }
        return;
      }
      var cursor = el.querySelector('.cursor');
      var textNode = document.createTextNode('');
      if(cursor){ el.insertBefore(textNode, cursor); } else { el.appendChild(textNode); }
      var i = 0;
      var delay = idx * 250;
      setTimeout(function step(){
        if(i <= text.length){
          textNode.textContent = text.slice(0, i);
          i++;
          setTimeout(step, 40);
        }
      }, delay);
    });
  }

  function revealOnScroll(){
    var items = document.querySelectorAll('.reveal');
    if(!('IntersectionObserver' in window) || reduceMotion){
      items.forEach(function(el){ el.classList.add('visible'); });
      return;
    }
    var observer = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    items.forEach(function(el, idx){
      el.style.transitionDelay = (idx % 4) * 80 + 'ms';
      observer.observe(el);
    });
  }

  function rippleButtons(){
    document.querySelectorAll('.btn').forEach(function(btn){
      btn.addEventListener('click', function(e){
        var rect = btn.getBoundingClientRect();
        var size = Math.max(rect.width, rect.height);
        var ripple = document.createElement('span');
        ripple.className = 'ripple';
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
        ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
        btn.appendChild(ripple);
        ripple.addEventListener('animationend', function(){ ripple.remove(); });
      });
    });
  }

  document.addEventListener('DOMContentLoaded', function(){
    typewriter();
    revealOnScroll();
    rippleButtons();
  });
})();
