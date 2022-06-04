function handleShowMessage() {
  console.log("Hello, world!")
}

function init() {
  app.commands.register(
    "helloworld:show-message",
    handleShowMessage,
    "Show Message"
  )
}

exports.init = init;
