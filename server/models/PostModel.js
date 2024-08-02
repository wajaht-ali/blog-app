import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    category: {
        type: String,
        require: true,
        default: "news"
    },
    desc: {
        type: String,
        require: true
    },
    like: [{
        type: mongoose.Schema.ObjectId,
        ref: "users"
    }],
    file: {
        type: String,
        require: true
    },
    createdBy: {
        type: String,
        require: true
    }
}, { timestamps: true })

const PostModel = mongoose.model("posts", PostSchema);
export default PostModel;