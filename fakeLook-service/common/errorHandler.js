var next

module.exports = {
    createError: (message, errorCode) => {      
    var err = new Error()
    err.message = message
    err.status = errorCode
    return err
  },
  throwException: (message, errorCode) => {
    var err = new Error()
    err.message = message
    err.status = errorCode
    next(err.message)
  },
  setNext: (n) => {    
    next = n
    next()
  }}