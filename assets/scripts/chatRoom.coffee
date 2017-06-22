socket = io()
if $('#chat form') && $('#chat ul')
  form = $ '#chat form'
  ul = $ '#chat ul'
  input = $ '#chat input'
  printMessage = (text)->
    $('<li>', {text: text}).appendTo ul
  printStatus = (text, color)->
    color = color or 'gray'
    $(('<li>'), {text: text,style:'color:'+color+';'}).appendTo ul
  sendMessage = ()->
    text = input.val()
    input.val ''
    socket.emit 'message', text, (data)->
      printMessage "I'am >>" + text
    return false

  socket
  .on 'message', (username,message)->
    printMessage username + ' >> ' + message
  .on 'join', (username)->
    console.log(username);
    printStatus (username + ' has joined to chat'), 'blue'
  .on 'leave', (username)->
    console.log(username);
    printStatus (username + ' has leave chat'), 'brown'
  .on 'connect',()->
    printStatus 'Connected', 'green'
    form.on 'submit', sendMessage
    input.prop 'disabled', false
  .on 'logout', ()->
    console.log('true')
    location.href = "/"
  .on 'disconnect',(data) ->
    printStatus 'disconnected', 'red'
    form.off 'submit', sendMessage
    input.prop 'disabled', true
  .on 'user disconnected',(data) ->
    printStatus 'User disconnected', 'grey'
  .on 'error', (reason)->
    if reason is "handshake unauthorized"
      printStatus("You are leave chat");







