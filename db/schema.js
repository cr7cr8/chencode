const mongoose = require("mongoose");
const { connDB3 } = require("./db")


const userSchema = new mongoose.Schema({

    userName: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50,
        index: { unique: true },
        //     validate: [(val) => { return /\d{3}-\d{3}-\d{4}/.test(val) }, "please enter a valid userName"],

    },
    hasAvatar: {
        type: Boolean,
        default: false
    },
    colorName: {
        type: String,
        default: null
    },
    description: {
        type: String,
        default: "nothing written yet."
    }
}, {
    toObject: { virtuals: true },
    collection: "users",
    //timestamps: true,
}
)

const messageSchema = new mongoose.Schema({
    content: { type: String, default: "" },
    createTime: { type: Date, default: 0 }
}, {
    toObject: { virtuals: true },
    collection: "message",
    //timestamps: true,
})

const imageInfoSchema = new mongoose.Schema({

    url: { type: String, defalut: null },
    imageName: { type: String, defalut: null },

}, {
    toObject: { virtuals: true },
    collection: "imageInfo",
    //timestamps: true,
})


const User = connDB3.model("users", userSchema);
const ImageInfo = connDB3.model("imageInfo", imageInfoSchema);
const Message = connDB3.model("message", messageSchema);

module.exports = { User, ImageInfo, Message }

