var next

module.exports = {
    throwException: (message, errorCode) => {      
    var err = new Error()
    err.message = message
    err.status = errorCode
    next(err)
  }, setNext: (n) => {    
    next = n
    next()
  }}