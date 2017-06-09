socket = io();
if $('#chat form') && $('#chat ul')
  form = $ '#chat form'
  ul = $ '#chat ul'
  form.submit ()->
    input = $(this).find 'input'
    text = input.val()
    input.val ''
    socket.emit 'message', text, (data)->
      $('<li>', {text: text}).appendTo ul
    return false

socket.on 'user disconnected',(data) ->
  console.log 'user disconnected'

socket.on 'message', (text)->
  $('<li>', {text: text}).appendTo ul
