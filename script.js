const INTERVAL_BASE = 100
const DEFAULT_FLIES_N = 20
const FLY_URL = 'https://imagizer.imageshack.com/v2/100x75q90/924/NllTM6.png'

const flyCountButton = $('#flyCount')

function move(fly) {
  const classes = 'top-left top-right bottom-left bottom-right'.split(' ')

  $.each(classes, function(_, klass) {
    fly.find('.fly').removeClass(klass)
  })

  fly.find('.fly').addClass(
    classes[
      Math.floor(
        Math.random() * classes.length
      )
    ]
  )
}

function addFly() {
  const wrapper = $([
    '<div class="wrapper">',
    '<div class="fly">',
    '<img src="' + FLY_URL + '">',
    '<div>',
    '</div>'
  ].join(''))
  $('body').append(wrapper)

  return wrapper
}

function randomNear(n) {
  return Math.floor(Math.random() * n + n / 2)
}

function start(n) {
  $('.wrapper').remove()
  flyCountButton.text(`${n} мух`)
  for (let i = 0; i < n; ++i)
    (function() {
      const fly = addFly()
      setInterval(function() {
        move(fly)
      }, randomNear(INTERVAL_BASE))
    }())
}

function promptAndStart() {
  const flies = prompt('Сколько мух?', DEFAULT_FLIES_N)
  start(flies)
}

$('#flyCount').click(promptAndStart)

start(DEFAULT_FLIES_N)

$(document).keydown(function(event) {
  if (event.keyCode === 67 /* E key */) {
    $('.turd').toggleClass('hidden')
    $('.clippy').toggleClass('hidden')
  }

  if (event.keyCode === 70 /* F key */) {
    promptAndStart()
  }
  
  if (event.keyCode === 68 /* D key */) {
    $('body').toggleClass('debug');
  }
  
  console.log(event.keyCode)
})