module.exports = {
    createError: (message, errorCode) => {      
    var err = new Error()
    err.message = message
    err.status = errorCode
    return err
  }
}