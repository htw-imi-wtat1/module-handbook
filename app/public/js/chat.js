$(document).ready(() => {
  const socket = io()
  $('#chatForm').submit(() => {
    const text = $('#chat-input').val()
    const userName = $('#chat-user-name').val()
    const userId = $('#chat-user-id').val()
    socket.emit('message', {
      content: text,
      userName: userName,
      userId: userId
    })
    $('#chat-input').val('')
    return false
  })

  socket.on('load all messages', data => {
    data.forEach(message => {
      displayMessage(message)
    })
  })

  socket.on('message', message => {
    console.log('displaying message ' + message)
    displayMessage(message)
    for (let i = 0; i < 5; i++) {
      $('.chat-icon')
        .fadeOut(400)
        .fadeIn(200)
    }
  })

  const displayMessage = message => {
    $('#chat').prepend(
      $('<p>').html(`
				<div class='message ${getCurrentUserClass(message.user)}'>
				<span class="user-name">
					${message.userName}:
				</span>
					${message.content}
				</div>
			`)
    )
  }

  const getCurrentUserClass = id => {
    const userId = $('#chat-user-id').val()
    if (userId === id) return 'current-user'
    else return ''
  }

  $('#modal-button').click(() => {
    $('.modal-body').html('')
    $.get('/api/courses', (results = {}) => {
      const data = results.data
      if (!data || !data.courses) return
      data.courses.forEach(course => {
        $('.modal-body').append(
                    `<div>
						<span class="course-title">
							${course.title}
						</span>
						<span class="course-cost">$${course.cost}</span>
						<button class="${course.joined ? 'joined-button' : 'join-button'} btn btn-info btn-sm" data-id="${
                        course._id
                    }">
							${course.joined ? 'Joined' : 'Join'}
						</button>
						<div class="course-description">
							${course.description}
						</div>
					</div>`
        )
      })
    }).then(() => {
      addJoinButtonListener()
    })
  })
})

const addJoinButtonListener = () => {
  $('.join-button').click(event => {
    const $button = $(event.target)
    const courseId = $button.data('id')
    console.log(`/api/courses/${courseId}/join`)
    $.get(`/api/courses/${courseId}/join`, (results = {}) => {
      const data = results.data
      if (data && data.success) {
        $button
          .text('Joined')
          .addClass('joined-button')
          .removeClass('join-button')
      } else {
        $button.text('Try again')
      }
    })
  })
}
