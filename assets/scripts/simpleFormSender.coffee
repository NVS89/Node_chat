$ document.forms['login-form']
    .on 'submit', ()->
      form = $ this

      $ '.error', form
          .html ''
      $ ':submit', form
          .button "loading"
      $.ajax
          url:"/login"
          method:"POST"
          data: form.serialize()
          complete: ()->
            $ 'submit', form
              .button "reset"

          statusCode: {
            200: ()->
              form.html "You're entered"
                .addClass 'alert-success'
              window.location.href = "/chat"
            400: (jqXHR)->
              error = JSON.parse jqXHR.responseText
              $ '.error', form
                .html error.message
          }.timeout(10000)

      return false;