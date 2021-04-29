import './index.scss'

$(document).ready(function () {
  class TimlinePage {
    constructor () {
      this.name = 'TndexPage'
      this.container = $('.common-container')
      this.timelineBlock = $('.timline-block__bottom')
      this.slideDrag = {}
      this.sliders = [
        {
          id: 0,
          config: {
            spaceBetween: 0,
            mousewheel: {
              invert: false,
            },
            slidesPerView: 'auto',
            freeMode: true,
            scrollbar: {
              draggable: false,
              dragSize: 14,
              el: '.swiper-scrollbar-3',
            },
            // pagination: {
            //   el: '.swiper-pagination-3',
            //   type: 'progressbar',
            // },
            navigation: {
              nextEl: '.swiper-button-next-3',
              prevEl: '.swiper-button-prev-3',
            },
            on: {
              init: function () {
                // setTimeout(()=>{
                //   this.slideDrag = $('.swiper-scrollbar-drag')
                //   this.slideDrag.append('<span>1939</span>')
                // },500)
              },
              progress: function (e) {
                // console.log(e.slides.length, e)
                // if(e.slides.length === e.realIndex + 1){
                //   console.log('last')
                // }
                //this.slideDrag = $('.swiper-scrollbar-drag')
                // this.slideDrag.find('span').text(1939 + e.activeIndex + 1)

              },
            }
          },
          containerName: '.swiper-container-3',
          object: null,
        },
      ]
    }

    init () {
      this.setMargin()
      this.initSliders()
      // this.timelineBlock
      // .toggle( "slide" )
    }

    setMargin(){
      const margin = parseInt(this.container.css('margin-left'))
      this.timelineBlock.css({
        'margin-left': margin + 'px',
      })
    }

    initSliders () {
      this.sliders.forEach((item) => {
        item.object = new Swiper(item.containerName, item.config)
      })
      console.log(this.sliders[0].object)

    }
  }
  window.TimelinePage = new TimlinePage()
  window.TimelinePage.init()

  $(window).resize(function(){
    window.TimelinePage.setMargin()
  })
})
