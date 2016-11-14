var express = require("express");
var router = express.Router();

router.get('/', function(req, res){
  console.log("GET LOGIN");
  console.log(req.session.appUid);
  if(!req.session.appUid){
    res.render("login");
  }else{
    res.redirect("/chat/chat");
  }
});

router.get('/chat', function(req, res){
  console.log("CHAT");
  console.log(req.session);
  if(!req.session.appUid){
    res.redirect("/");
  }else{
    res.render("chat");
  }
});

router.post('/login', function(req, res){
  console.log("POST");
  if(req.body.user){
    console.log(req.session.appUid);
    if(!req.session.appUid){
      console.log("isFucked");
      req.session.appUid = req.body.user;
      res.locals.userConnected = req.body.user;
      console.log("SUCCESS POST LOGIN");
      console.log(req.session);
      res.send({status: "success"});
    }else{
      res.redirect("/chat");
    }
  }else{
    res.redirect("/chat");
  }
});

router.get('/logout', function(req, res){
  req.session.appUid = null;
  res.redirect("/");
});

module.exports = router;
