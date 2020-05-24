$(window).on('load', function () {
  $('#cookieBanner').modal('show')
})

function cookiesOK () {
  $.get('/cookieBanner/OK', (results) => {
  })
}
function cookiesReadMore () {
  $.get('/cookieBanner/SkipOnce', (results) => {
    window.location.href = '/about'
  })
}
function deleteBannerCookie () {
  $.get('/cookieBanner/deleteCookie', (results) => {
  })
}

function randomIndex (max) { return Math.floor(Math.random() * Math.floor(max)) }
const urls = ['https://theuselessweb.com/', 'https://c.xkcd.com/random/comic/', 'https://www.gocomics.com/random/bloomcounty']
function cookiesGoodBye () {
  window.location.href = urls[randomIndex(urls.length)]
}
