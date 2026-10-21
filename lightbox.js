(()=>{
 const photos=[...document.querySelectorAll('.project-hero, .gallery img')];
 if(!photos.length)return;
 const modal=document.createElement('div');modal.className='lightbox';modal.setAttribute('role','dialog');modal.setAttribute('aria-modal','true');modal.setAttribute('aria-label','Project photo viewer');modal.hidden=true;
 modal.innerHTML='<div class="lightbox-bar"><span class="lightbox-count" aria-live="polite"></span><button class="lightbox-close" aria-label="Close photo viewer" title="Close (Esc)">✕</button></div><button class="lightbox-prev" aria-label="Previous photo">‹</button><img class="lightbox-image" alt=""><button class="lightbox-next" aria-label="Next photo">›</button><p class="lightbox-caption"></p><p class="lightbox-hint">Click the image to zoom · Esc to close</p>';
 document.body.append(modal);
 let index=0,zoom=false,lastFocus=null;
 const pic=modal.querySelector('.lightbox-image');
 function show(n){index=(n+photos.length)%photos.length;const source=photos[index];pic.src=source.currentSrc||source.src;pic.alt=source.alt;modal.querySelector('.lightbox-caption').textContent=source.closest('figure')?.querySelector('figcaption')?.textContent||source.alt;modal.querySelector('.lightbox-count').textContent=`${index+1} / ${photos.length}`;zoom=false;pic.classList.remove('zoomed');}
 function open(n){lastFocus=document.activeElement;show(n);modal.hidden=false;document.body.classList.add('lightbox-open');modal.querySelector('.lightbox-close').focus();}
 function close(){modal.hidden=true;document.body.classList.remove('lightbox-open');pic.src='';lastFocus?.focus();}
 photos.forEach((el,i)=>{el.classList.add('zoomable');el.tabIndex=0;el.setAttribute('role','button');el.setAttribute('aria-label',`Enlarge image: ${el.alt}`);el.addEventListener('click',()=>open(i));el.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();open(i);}});});
 modal.querySelector('.lightbox-close').addEventListener('click',close);
 modal.querySelector('.lightbox-prev').addEventListener('click',()=>show(index-1));
 modal.querySelector('.lightbox-next').addEventListener('click',()=>show(index+1));
 pic.addEventListener('click',()=>{zoom=!zoom;pic.classList.toggle('zoomed',zoom);});
 modal.addEventListener('click',e=>{if(e.target===modal)close();});
 document.addEventListener('keydown',e=>{if(modal.hidden)return;if(e.key==='Escape')close();if(e.key==='ArrowLeft')show(index-1);if(e.key==='ArrowRight')show(index+1);if(e.key==='Tab'){const controls=[modal.querySelector('.lightbox-close'),modal.querySelector('.lightbox-prev'),modal.querySelector('.lightbox-next')];const i=controls.indexOf(document.activeElement);if(e.shiftKey&&i===0){e.preventDefault();controls[2].focus();}else if(!e.shiftKey&&i===2){e.preventDefault();controls[0].focus();}}});
})();