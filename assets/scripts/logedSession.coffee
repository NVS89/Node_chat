if $('#logout')[0]
  $('#logout').click ()->
    $('#logout').after("<form id='logoutform' method='POST' action='/logout'>")
    $('#logoutform').submit()
