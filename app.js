const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
const mongoose = require("mongoose");



// connecting to mongodb
mongoose.connect("mongodb://127.0.0.1:27017/blogdb");
const blogSchema = mongoose.Schema({
    title: String,
    body: String

});
const blogpost = mongoose.model("blogpost", blogSchema);







const homecontent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Posuere lorem ipsum dolor sit amet consectetur adipiscing. Senectus et netus et malesuada fames. Dictum at tempor commodo ullamcorper a lacus vestibulum. Sit amet nisl suscipit adipiscing bibendum est. Convallis aenean et tortor at risus viverra adipiscing at in. Dolor sit amet consectetur adipiscing elit duis tristique. Enim tortor at auctor urna nunc id cursus metus. Eget dolor morbi non arcu risus quis varius quam quisque. Integer vitae justo eget magna fermentum. Massa sapien faucibus et molestie. Tristique senectus et netus et malesuada fames ac. Aliquet porttitor lacus luctus accumsan tortor posuere ac. Aliquam id diam maecenas ultricies mi. Nisl condimentum id venenatis a condimentum. Consequat ac felis donec et odio pellentesque diam. At quis risus sed vulputate odio ut enim. Ut pharetra sit amet aliquam id diam maecenas ultricies. Malesuada proin libero nunc consequat interdum varius sit. Eget aliquet nibh praesent tristique.";
const contactcontent = "Varius duis at consectetur lorem donec massa sapien faucibus. Imperdiet proin fermentum leo vel orci. Sollicitudin aliquam ultrices sagittis orci a scelerisque. Sapien nec sagittis aliquam malesuada bibendum arcu vitae elementum. Vulputate sapien nec sagittis aliquam malesuada bibendum arcu vitae. Enim diam vulputate ut pharetra sit amet aliquam id. Adipiscing bibendum est ultricies integer quis auctor. Porta lorem mollis aliquam ut porttitor leo a. Pretium nibh ipsum consequat nisl vel pretium lectus quam id. Est placerat in egestas erat. Luctus venenatis lectus magna fringilla urna porttitor. Rhoncus aenean vel elit scelerisque mauris pellentesque. Diam phasellus vestibulum lorem sed risus ultricies. Nunc pulvinar sapien et ligula ullamcorper. Erat pellentesque adipiscing commodo elit at imperdiet. Quis vel eros donec ac odio tempor orci dapibus ultrices. Enim nunc faucibus a pellentesque sit. Vitae auctor eu augue ut lectus arcu.";
const aboutcontent = "Hendrerit dolor magna eget est lorem ipsum dolor. Tempor orci dapibus ultrices in iaculis nunc. Nunc faucibus a pellentesque sit amet porttitor. Pulvinar etiam non quam lacus suspendisse faucibus interdum. Et magnis dis parturient montes nascetur ridiculus mus. Feugiat nisl pretium fusce id velit ut tortor pretium viverra. Convallis convallis tellus id interdum velit laoreet id donec. Varius duis at consectetur lorem donec massa. In fermentum posuere urna nec tincidunt praesent semper feugiat. Urna et pharetra pharetra massa massa ultricies mi quis. Non odio euismod lacinia at. Dis parturient montes nascetur ridiculus mus mauris.";

app.get("/compose", (req, res) => {
    res.render("compose");

});

app.get("/", (req, res) => {
    blogpost.find({}, (err, posts) => {
        if (err) {
            console.log(err);
        } else {
            res.render("home", { homecontent: homecontent, posts: posts });

        }


    });

});
app.get("/contact", (req, res) => {
    res.render("contact", { contactcontent: contactcontent });
});
app.get("/about", (req, res) => {
    res.render("about", { aboutcontent: aboutcontent });
});



app.post("/compose", (req, res) => {
    const p_title = req.body.post_title;
    const p_body = req.body.post_body;
    const new_post = new blogpost({
        title: p_title,
        body: p_body
    });
    new_post.save();


    res.redirect("/");



});

app.get("/posts/:postName", (req, res) => {
    var orgpost = req.params.postName;
    blogpost.findOne({ title: orgpost }, (err, reqpost) => {
        if (err) {
            console.log(err);
        } else {

            res.render("post", { req_title: reqpost.title, req_body: reqpost.body, reqid: reqpost._id });
        }

    });
});

app.listen(3000, function() {
    console.log("yay working");

});
app.post("/delete", (req, res) => {
    let id = req.body.deleteid;
    blogpost.findByIdAndDelete(id, (err, docs) => {
        if (err) {
            console.log(err);
        } else {

            res.redirect("/");
        }

    });

});