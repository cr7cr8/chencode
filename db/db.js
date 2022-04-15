const mongoose = require("mongoose")
mongoose.connection.on('error', function (err) {
  // console.log('Mongoose default connection error: ' + err);

 // console.log("aaaaaaaaaaaaaaa")
});

const { connDB3, connEmojiDB, connPictureDB, connParam } = {



  DB3_: "mongodb+srv://boss:ABCabc123@cluster0.iiqnu.azure.mongodb.net/DB3?retryWrites=true&w=majority",
  


  connParam: { useNewUrlParser: true, useUnifiedTopology: true, /*poolSize:10*/ },

  get connDB3() {
    return mongoose.createConnection(this.DB3_, this.connParam)
  },

  // get connEmojiDB() {
  //   return mongoose.createConnection(this.EmojiDB, this.connParam)
  // },

  // get connPictureDB() {
  //   return mongoose.createConnection(this.pictureDB, this.connParam)
  // },

}

 

 

function wrapAndMerge(...args) {

  return args.map(function (fn) {
    return {
      [fn.name]: function (req, res, next) {
        try {
          const obj = fn(req, res, next);
          return (Promise.resolve(obj) === obj)
            ? obj.catch(ex => res.send(`<h1>Async error from function <br> ${fn.name}<br> ${ex}</h1>`))
            : obj
        }
        catch (ex) { res.send(`<h1>something wrong when calling function  <br> ${fn.name}<br></h1> ${ex.stack}`) }
      }
    }
  }).reduce(
    function (accumulator, currentValue) {
      return { ...accumulator, ...currentValue }
    })
}

module.exports = {
 
    connDB3,
  // connEmojiDB,
  // connPictureDB,
  wrapAndMerge,
}
