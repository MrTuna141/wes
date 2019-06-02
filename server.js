// #!/usr/bin/node

require("easy-web-framework")();

get("/", function(result, options) {
 
    let session = options.session;
    if (typeof session.views !== "undefined") {
      session.views++;
    } else {
      session.views = 0;
    }
   console.log(session.views);

   template(options, "index.html", function(page) {
    result(page);
  });
});

get("/user-question", function(result, options) {
  template(options, "user-question.html", function(page) {
    result(page);
  });
});

get("/user-result", function(result, options) {
  let user = options.param.user;
  console.log(user);
  let sql = "SELECT * FROM `user` WHERE `name` LIKE '" + user + "'";
  query(sql, function(answer) {
    result(answer[0].points);
  });
});

get("/login", function(result, options) {
  template(options, "login.html", function(page) {
    result(page);
  });
});

get("/login-resultat", function(result, options) {
  let user = options.param.user;
  let log = options.session.login;

  let sql = "SELECT * FROM `user` WHERE `name` LIKE '" + user + "'";
  query(sql, function(answer) {
  //	result(answer[0].password);    
	if(answer[0].password === options.param.password) {
      	options.session.login = true;
      	result("Du är inlogad!");
 } else {
      	options.session.login = false;
       	result("Den gick jag inte på!");
 }

  });
});

start("/home/mrTuna/.config.json", function() {});
