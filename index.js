import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

var blogPosts = [];

app.get("/", (req, res) => {
  res.render("index.ejs", { 
    blogPosts: blogPosts 
  });
});

app.get("/create-post", (req, res) => {
  res.render("create-post.ejs", {
    blogPosts: blogPosts
  });
});

app.get("/edit-post/:index", (req, res) => {
  const index = req.params.index;
  res.render("edit-post.ejs", {
    index: index,
    blogPosts: blogPosts
  });
});

app.post("/create-post", (req, res) => {
  const post = {
    title: req.body.title,
    author: req.body.author,
    content: req.body.content,
    date: new Date().toLocaleString()
  };
  blogPosts.push(post);
  console.log("Created new post:", post);
  res.redirect("/");
});

app.post("/delete-post/:index", (req, res) => {
  const index = req.params.index;
  console.log(`Deleting post at index: ${index}`);
  blogPosts.splice(index, 1);
  res.redirect("/");
});

app.post("/edit-post/:index", (req, res) => {
  const index = req.params.index;
  blogPosts[index] = {
    title: req.body.title,
    author: req.body.author,
    content: req.body.content,
    date: new Date().toLocaleString()
  };
  console.log(`Edited post at index: ${index}`, blogPosts[index]);
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});