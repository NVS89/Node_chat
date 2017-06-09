if $('#logout')[0]
  $('#logout').click ()->
#    $('#logout').after("<form id='logoutform' method='POST' action='/logout'>")
#    $('#logoutform').submit()
     xhr = new XMLHttpRequest()
     body = ''
     xhr.open "POST",'/logout',true
     xhr.setRequestHeader 'Content-Type', 'application/x-www-form-urlencoded'
     xhr.send body