import './index.scss'

$(document).ready(function () {
  class GalleryPage {
    constructor () {
      this.name = 'GalleryPage'
    }

    init () {
      // this.timelineBlock
      // .toggle( "slide" )
    }
  }
  window.GalleryPage = new GalleryPage()
  window.GalleryPage.init()

  $(window).resize(function () {

  })
})
