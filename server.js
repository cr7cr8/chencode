const cors = require('cors')
const express = require("express")

const app = express()
const axios = require("axios")
const multer = require("multer");
const { Blob } = require("buffer");
const imgbbUploader = require("imgbb-uploader");
const path = require("path")


const { User, ImageInfo, Message } = require("./db/schema");
//const clientPack = require("./clientPack/aaa.txt")

console.log("start")

  
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cors())

// app.get("/",(req,res,next)=>{
//     res.send("hihihih")
// })


app.post("/upload",

    multer({ storage: multer.memoryStorage() }).array("file", 789 /*789 is max count,default infinity*/),

    (req, res, next) => {

        const imageInfoArr = []

        req.files.forEach((file, index) => {

            console.log(file.originalname, req.files.length)


            imgbbUploader({
                apiKey: "5bc9b6d33b513abac7369ade2d2df6f6",
                //name: "aaa"+Math.random(),//file.originalname,
                name: file.originalname,
                //  imageUrl:URL.createObjectURL(new Blob([file.buffer]))
                //  imagePath: URL.createObjectURL(new Blob([file.buffer])),// "./clientdev/public/logo512.png"
                //  file.buffer
                base64string: Buffer.from(file.buffer).toString('base64')
            })
                .then((response) => {


                    console.log(response)
                    imageInfoArr.push({ url: response.image.url, filename: response.image.filename, itemKey: file.originalname })


                    if (req.files.length === imageInfoArr.length) {
                        console.log("sent")
                        res.json(imageInfoArr)

                    }



                })
                .catch((error) => console.error(error));

        })


    })

app.post("/uploadMessage", (req, res, next) => {


    Message.create({ ...req.body }).then(doc => {

        res.json(doc)
    })


})

app.get("/getMessage", (req, res, next) => {



    Message.find({}).sort({ createTime: -1 }).limit(5).then(docs => {

        //   console.log(docs)
        res.json(docs)

    })


})




app.delete("/:createTime?", (req, res, next) => {
    console.log(req.params.createTime)

    Message.deleteOne({ createTime: { $eq: req.params.createTime.indexOf(":") < 0 ? new Date(Number(req.params.createTime)) : req.params.createTime } }).exec()

})

//const clientPack = require("./router/clientPack")

app.get("*", express.static(path.resolve(__dirname, "./clientPack/build")))

app.listen(process.env.PORT || 80)
