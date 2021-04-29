import './index.scss'

// const swiper1 = new Swiper('.swiper-container', {
//   slidesPerView: 4,
//   spaceBetween: 20,
//   pagination: {
//     el: '.swiper-pagination',
//     clickable: true,
//   },
// })

console.log(window)

$(document).ready(function () {
  class IndexPage {
    constructor () {
      this.name = 'indexPage'
      this.btnMenu = $('.btn--menu')
      this.btnSearch = $('.btn--search')
      this.sliders = [
        {
          id: 0,
          config: {
            slidesPerView: 1,
            spaceBetween: 20,
            pagination: {
              el: '.swiper-pagination-1',
              type: 'fraction',
              clickable: true,
            },
            navigation: {
              nextEl: '.swiper-button-next-1',
              prevEl: '.swiper-button-prev-1',
            },
            breakpoints: {
              // 440: {
              //   slidesPerView: 2,
              //   spaceBetween: 20,
              // },
              540: {
                slidesPerView: 3,
                spaceBetween: 20,
                pagination: {
                  el: '.swiper-pagination-1',
                  type: 'bullets',
                  clickable: true,
                },
              },
              768: {
                slidesPerView: 4,
                spaceBetween: 20,
                pagination: {
                  el: '.swiper-pagination-1',
                  type: 'bullets',
                  clickable: true,
                },
              },
            },
          },
          containerName: '.swiper-container-1',
          object: null,
          handlers: [
            $('.next-mobile-1'),
            $('.prev-mobile-1'),
          ],
        },
        {
          id: 1,
          config: {
            slidesPerView: 1,
            spaceBetween: 0,
            pagination: {
              el: '.swiper-pagination-2',
              clickable: true,
            },
            navigation: {
              nextEl: '.swiper-button-next-2',
              prevEl: '.swiper-button-prev-2',
            },
          },
          containerName: '.swiper-container-2',
          object: null,
        },
      ]
    }

    init () {
      this.initSliders()
      this.btnSearch.on('click', function () {
        $(this).toggleClass('toggle')
        $('.common-header__mobile-search-collapse').toggleClass('slide-left')
      })
      this.btnMenu.on('click', function () {
        $(this).toggleClass('toggle')
        $('.common-header__mobile-menu-collapse').toggleClass('slide-left')
      })
      // .toggle( "slide" )
    }

    initSliders () {
      const _this = this
      this.sliders.forEach((item) => {
        item.object = new Swiper(item.containerName, item.config)
      })
      console.log(this.sliders[0].handlers)
      this.sliders[0].handlers[0].on('click', function () {
        _this.sliders[0].object.slideNext()
      })
      this.sliders[0].handlers[1].on('click', function () {
        _this.sliders[0].object.slidePrev()
      })
    }
  }
  window.indexPage = new IndexPage()
  window.indexPage.init()
})
