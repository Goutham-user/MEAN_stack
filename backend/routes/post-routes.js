const express = require('express');
const Post = require('../models/posts');
const multer = require('multer');
const checkAuth = require('../middlewares/check-auth');

const route = express.Router();



const MIME_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg'
}
const storage = multer.diskStorage({
    destination: (req, file, cb )=> {
        const isValid = MIME_TYPE_MAP[file.mimetype];
        let error = new Error('Invalid MimeType');
        if(isValid){
            error = null;
        }
        cb(error, 'backend/images')

},
filename: (req, file, cb)=>{
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + '-' + Date.now() + '.' + ext)
}
})

route.post("", checkAuth, multer({storage: storage}).single("image"), (req, res, next)=>{
    const url = req.protocol + '://' + req.get('host');
    const post = new Post({
        title : req.body.title,
        content : req.body.content,
        description: req.body.description,
        imagePath: url + "/images/" + req.file.filename,
        creator: req.userData.userId
    });
    console.log(post);
    post.save().then((result)=>{
        res.status(201).json({
            message:"Post added Sucessfully!",
            post : {
                ...result,
                id: result._id,
                }
        })
    });

});

route.put("/:id", checkAuth, multer({storage: storage}).single("image"), (req, res, next)=>{
    let imagePath =req.body.imagePath;
    if(req.file){
        const url = req.protocol + '://' + req.get('host');
        imagePath = url + "/images/" + req.file.filename
    }
    const post = new Post({
        _id : req.body.id,
        title: req.body.title,
        content: req.body.content,
        description: req.body.description,
        imagePath: imagePath,
        creator: req.userData.userId
    })

    Post.updateOne({ _id: req.params.id, creator: req.userData.userId }, post).then((result)=>{
        // console.log(result, 'update', req.params.id, post)
        // console.log(result)
        if(result.modifiedCount){
            res.status(200).json({
                message: "Post updated sucessfully!"
            })
        }else{
            res.status(401).json({message: "This user is not entitled, creator of the post is only entitled to perform operations"})
        }
    })  
})

route.get("", (req, res, next) => {
    const pageSize = +req.query.pagesize;
    const currentPage = +req.query.page;
    const postQuery = Post.find();
    let fetcheedPosts;    
    if(pageSize && currentPage){
        postQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
    }
    postQuery.find().then((documents)=>{
        // console.log(document)
        fetcheedPosts = documents;
        return Post.count();
        }).then(count =>{
            console.log(count)
            res.status(200).json({
                message: "Posts fetched Sucessfully!",
                posts: fetcheedPosts,
                maxPosts: count
        })
    })
    
});

route.get("/:id", (req, res, next)=>{
    Post.findById(req.params.id).then((postData)=>{
        if(postData){
            res.status(200).json(postData)
        }else{
            res.status(404).json({message: "Post not Found."})
        }
    })
})

route.delete("/:id", checkAuth, (req, res, next)=>{
    Post.deleteOne({_id: req.params.id, creator: req.userData.userId}).then((result)=>{
        // console.log(result)
        if(result.deletedCount){
            res.status(200).json({message: "Deleted Sucessfully!"})
        }else{
            res.status(401).json({ message: "This user is not entitled, creator of the post is only entitled to perform operations" })
        }
    })
})





module.exports = route;