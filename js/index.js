
var app = new Vue({ 
    el: '#app', 
        data: { 
              //url
              url: "/library/api/",
              
              //boolean
              haserror: false,
              isexist: false,
              limitchar: false,
              //string
              uname: '',
              repassword: '',
              searchKey: '',
              errorMessage: '',
              successMessage: '',
              errorCreate: '',
              successCreate: '',

              //timer
              tmr: 5000,
    
              //arrays
              newuser: {username: "", email: "", password: ""},
              loginuser: {username: "", password: ""}
          
          },
          
          mounted: function() {
            this.validateUser();
            console.log('index mounted');
          },
          
          methods: {
            
            hideMessage: function (t) {
                setTimeout("app.clearMessage();", t); 
            },

            addUser: function(action) {
               var formData = app.toFormdata(app.newuser);
              axios.post(app.url +  "index.php?action=" + action, formData)
              .then(function(response){
                if (response.data.error){
                  app.errorCreate = response.data.message;
                  app.hideMessage(app.tmr);
                }
                else {
                  app.successCreate = response.data.message;
                  app.hideMessage(app.tmr);
                }
              });
            },

            userLogin: function() {
              var formData = app.toFormdata(app.loginuser);
              axios.post(app.url +  "index.php?action=login", formData)
              .then(function(response){
                if (response.data.error){
                  app.clearMessage();
                  app.errorMessage = response.data.message;
                  app.hideMessage(app.tmr);
                }
                else {
                  app.clearMessage();
                  app.successMessage = response.data.message;
                  window.location="home.html";
                  app.hideMessage(app.tmr);
                }
              });
            },

            validateUser:function() {
              axios.get(this.url +  "index.php")
              .then(function(response){
                console.log(response)
                if (!response.data.isvaliduser){
                  app.successMessage = response.data.alert;
                  app.hideMessage(app.tmr);
                } else {
                  window.location="home.html";
                }
              });
            },

            showExist: function(mes) {
              if (app.newuser.username.length > 5 && app.newuser.username.length < 13 ) {
                app.clearMessage();
                app.limitchar = true;
                return app.newuser.username + ' is ' + mes;
              } else {
                app.limitchar = false;
                app.clearMessage();
                app.errorCreate = 'Username must be 6 to 12 characters only.';
              }
            },

            isUserExist: function() {
              app.showExist();
              if (app.limitchar == false) {
                  return;
              }
              var username = app.newuser.username;
              axios.post(app.url +  "index.php?action=userExist&username=" + username )
              .then(function(response){
                if (response.data.error){
                  app.isexist = true;
                  app.errorCreate = app.showExist('taken');
                }
                else {
                  app.isexist = false;
                  app.successCreate = app.showExist('available'); 
                }
              });
            },

            //form to post
            toFormdata: function(obj) {
              var form_data = new FormData();
              for (var key in obj) {
                form_data.append(key, obj[key]);
              }
              return form_data;
            },

            clearMessage: function() {
              app.errorMessage = "";
              app.successMessage = "";
              app.errorCreate = "";
              app.successCreate = "";
            },

            onValidationSignup: function() {
              if (app.newuser.username == "" || app.newuser.email == "" || app.newuser.password == "" || app.repassword == "") {
                  app.errorCreate = 'Missing input.';
                  app.hideMessage(app.tmr);
                  app.successCreate = '';
                  return;
              }
              //
              if (app.newuser.username.length < 6 || app.newuser.username.length > 12) {
                  app.errorCreate = 'Username must be 6 to 12 characters only.';
                  app.hideMessage(app.tmr);
                  app.successCreate = '';
                  return;
              }
              //
              if (!app.newuser.username.match(/^[0-9a-zA-Z]+$/)) {
                app.errorCreate = 'Username numbers and letters only.';
                app.hideMessage(app.tmr);
                app.successCreate = '';
                return;
              }
              //
              if (app.newuser.password.length < 6 || app.newuser.password.length > 12) {
                  app.errorCreate = 'Password must be 6 to 12 characters only.';
                  app.hideMessage(app.tmr);
                  app.successCreate = '';
                  return;
              }
              //
              if (app.repassword != app.newuser.password) {
                  app.errorCreate = 'Password not matched.';
                  app.hideMessage(app.tmr);
                  app.successCreate = '';
                  return;
              } 
              //
              if (!app.newuser.email.match(/^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/)) {
                app.errorCreate = 'Please enter a valid email address.';
                app.hideMessage(app.tmr);
                app.successCreate = '';
                return;
              }
              //
              if (app.isexist == true) {
                app.errorCreate = app.newuser.username + ' is taken.';
                app.hideMessage(app.tmr);
                app.successCreate = '';
                return;
              }
              //
              app.clearMessage();
              app.repassword = '';
              app.addUser('create');
              app.hideMessage(app.tmr);
              app.newuser = {username: "", email: "", password: ""};
            },

          onValidationSignin: function() {
              if (app.loginuser.username == "" || app.loginuser.password == "") {
                app.clearMessage();
                app.errorMessage = 'Missing input.';
                app.hideMessage(app.tmr);
                return;
              } 
              //
              app.userLogin();
             }
          }
    });

