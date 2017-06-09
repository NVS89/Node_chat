socket = io();
if $('#chat form') && $('#chat ul')
  form = $ '#chat form'
  ul = $ '#chat ul'
  input = $ '#chat input'
  printMessage = (text)->
    $('<li>', {text: text}).appendTo ul
  printStatus = (text, color)->
    console.log(text)
    $(('<li>'), {text: text,style:'color:'+color+';'}).appendTo ul
  sendMessage = ()->
    text = input.val()
    input.val ''
    socket.emit 'message', text, (data)->
      printMessage text
    return false

  socket
  .on 'message', (text)->
    printMessage text
  .on 'connect',()->
    printStatus('connected', 'green');
    form.on 'submit', sendMessage
    input.prop 'disabled', false
  .on 'disconnect',(data) ->
    printStatus('disconnected', 'red');
    form.off 'submit', sendMessage
    input.prop 'disabled', true
  .on 'user disconnected',(data) ->
    printStatus('user disconnected', 'grey');


