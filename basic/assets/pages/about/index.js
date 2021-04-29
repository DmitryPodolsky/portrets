import './index.scss'

$(document).ready(function () {
  class AboutPage {
    constructor () {
      this.name = 'AboutPage'
      this.navBlock = $('.about-page__nav')
      this.header = $('.common-header')
      this.anchorsElms = $('.about-page__nav').find('a')
      this.anchors = [
        {
          id: 0,
          elm: $('#ach-0'),
          offset: 0,
        },
        {
          id: 1,
          elm: $('#ach-1'),
        },
        {
          id: 2,
          elm: $('#ach-2'),
          offset: 0,
        },
        {
          id: 3,
          elm: $('#ach-3'),
          offset: 0,
        },
      ]
    }

    init () {
      this.navBlock.css({
        top: this.anchors[0].elm.offset().top - 120,
      })
      this.setOffsets()
      this.animTo()
    }

    setOffsets () {
      this.anchors.forEach((item) => {
        if (item.elm[0]) {
          item.offset = item.elm.offset().top
        }
      })
    }

    animTo () {
      const _this = this
      this.navBlock.find('a').on('click', function (e) {
        e.preventDefault()
        $('html, body').animate({
          scrollTop: _this.anchors[$(this).attr('href').split('-')[1]].offset,
        }, 500)
      })
    }

    setNavCurrent () {
      let current = 0
      this.navBlock.find('a').removeClass('active')
      this.anchors.forEach((item, i) => {
        if (window.pageYOffset + this.header[0].clientHeight >= item.offset) {
          current = i
        }
      })
      this.navBlock.find('a[href="#ach-' + current + '"]').addClass('active')
    }

    setNavPos () {
      if (window.pageYOffset + this.header[0].clientHeight >= this.anchors[0].elm.offset().top) {
        this.navBlock.addClass('fixed')
        this.navBlock.css({
          position: 'fixed',
          top: this.header[0].clientHeight,
        })
      } else {
        this.navBlock.removeClass('fixed')
        this.navBlock.css({
          position: 'absolute',
          top: this.anchors[0].elm.offset().top - 100,
        })
      }
    }
  }
  window.AboutPage = new AboutPage()
  window.AboutPage.init()

  $(window).scroll(function () {
    window.AboutPage.setNavPos()
    window.AboutPage.setNavCurrent()
  })
})
