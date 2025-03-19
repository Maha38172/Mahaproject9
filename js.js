
'use strict';
let firstThing=document.querySelector('.first-thing')
let learnMore=document.querySelector('.learn-more')
let digital=document.querySelector('.digital')
let links=document.querySelectorAll('.nav-link')
let listOfHeader=document.querySelector('.list-of-header');
let tabs=document.querySelectorAll('.tab');
let part1=document.querySelector('.part-1');
let operationContent=document.querySelectorAll('.operation');
let header=document.querySelector('header');
let allsection =document.querySelectorAll('.section');
let img=document.querySelectorAll('img[data-src]');
let slide=document.querySelectorAll('.slide')
let slider=document.querySelector('.sections');
let btnLeft=document.querySelector('.section-part1')
let btnRight=document.querySelector('.section-part3');
let circle=document.querySelector('.circle')
let currentSlide=0;
let maxSlides=slide.length;
///////////////////////////////////////

learnMore.addEventListener('click',function () {
digital.scrollIntoView({behavior:'smooth'})
})

///////////////////////////////////////


listOfHeader.addEventListener("click",function (e) {
      e.preventDefault();
      if(e.target.classList.contains('nav-link')){
      let id=e.target.getAttribute('href');
   document.getElementById(id).scrollIntoView({behavior:'smooth'})   
  
      }})

///////////////////////////////////////


part1.addEventListener('click',function (e) {
    const clicked=e.target.closest('.tab');
    if(!clicked) return;
    
   tabs.forEach((el)=>el.classList.remove('operation-tab'));
operationContent.forEach((el)=>el.classList.remove('operation-content-active'))
    
 clicked.classList.add('operation-tab');

document.querySelector(`.content-${clicked.dataset.tab}`)
.classList.add('operation-content-active')

  
});

///////////////////////////////////////
const handleHover=function (e) {
  if(e.target.classList.contains('nav-link')) {
  const link=e.target;
 const siblings=link.closest('header').querySelectorAll('.nav-link')
    const logo= link.closest('header').querySelector('img');
   
siblings.forEach((el)=>
{if(el!==link)  el.style.opacity=this});
logo.style.opacity=this;   
   
}  
}

///////////////////////////////////////

header.addEventListener('mouseover',handleHover.bind(0.5));


///////////////////////////////////////
header.addEventListener('mouseout',
handleHover.bind(1))
///////////////////////////////////////

const headHight=header.getBoundingClientRect().height;


let stickyHeader=function (entries) {
    let [entry]=entries;
    if(entry.isIntersecting) {
        header.classList.remove('sticky')
    }else{
        header.classList.add('sticky')
    }
}




const headerObserve=new IntersectionObserver(stickyHeader,{
  root:null,
  threshold:0.5,
  rootMargin:`-${headHight}px`
})

headerObserve.observe(firstThing)


//////////////////////////////////////

const sectionScroll=function (entries,obsever) {
    let [entry]=entries;
    if(entry.isIntersecting){ entry.target.classList.add('section-visible');
     
   }
    
}

const sectionObserve=new IntersectionObserver(sectionScroll,{
    root:null,
    threshold:0.15
   
})

allsection.forEach(function (section) {
  
  sectionObserve.observe(section); section.classList.add('section-hidden')
})
//////////////////////////////////////
let imgload=function (entries) {
  let [entry]=entries;
  if(entry.isIntersecting) {   entry.target.src=entry.target.dataset.src;
 entry.target.addEventListener('load',function () {
   entry.target.classList.remove('lazy-img')  
 }) ;
 
  }
}


let imgObserve=new IntersectionObserver(imgload,{
    root:null,
    threshold:0,
    rootMargin:"-200px"
})

img.forEach(function (image) {
    imgObserve.observe(image)
})
///////////////////////////////////////
//slide.forEach((s,i) =>{
 //s.style.transform=`translateX(${100*i}%)`
//});


let goToslide=function (slides) {
   slide.forEach((s,i) =>{ s.style.transform=`translateX(${(i-slides)*100}%)`
}); 
}
goToslide(0);
let createDots=function () {
    slide.forEach(function (_,i) {
        circle.insertAdjacentHTML('beforeend',
 `<button class="circles" data-slide="${i}" ></button>`
             )
    });
    
}
createDots();


let activeDots=function (slide) {

 document.querySelectorAll('.circles').forEach(dot=>{dot
     .classList.remove('dots-active');
     dot.style.backgroundColor = "#ddd"
     });
  let activeDot= document.querySelector(`.circles[data-slide="${slide}"]`);
  activeDot.classList.add('dots-active');
 activeDot.style.backgroundColor = "#ccc";
}


activeDots(0)

let nextSlide=function () {
    if(currentSlide===maxSlides-1) {
  currentSlide=0;
}else{
   currentSlide++;
}
   goToslide(currentSlide)
    activeDots(currentSlide)
};
let privousSlide=function () {
if(currentSlide===0) {
    currentSlide=maxSlides-1;
    
}else{
    currentSlide--;
}
   
   goToslide(currentSlide); 
   activeDots(currentSlide);
}
btnRight.addEventListener('click',nextSlide);

btnLeft.addEventListener('click', privousSlide);

document.addEventListener('keydown',function (e) {
    if(e.key==='ArrowLeft') {
        privousSlide()
    }else if(e.key==='ArrowRight'){
        nextSlide()
    }
});

/////////////////////////////////////


circle.addEventListener('click',function (e) {

if(e.target.classList.contains('circles')) {
   
   const {slide}=e.target.dataset;
    //or the above is for destruction 
    //const slide=e.target.dataset.slide
        goToslide(slide);
        activeDots(slide)
   }
  
})
















