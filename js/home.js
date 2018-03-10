
var app = new Vue({ 
    el: '#app', 
        data: { 
              //url
              url: "/library/api/",
              
              //boolean
              showadd: false,
              showedit: false,
              showremove: false,
              showmodal: false,
              showdropsearchmaintenance: false,
              showdropsearchlist: false,
              showdropadd: false,
              showbookmaintenance: false,
              showbooklist: true,
              haserror: false,

              //string
              welcome: '',
              searchKey: '',
              errorMessage: '',
              successMessage: '',
              errorEdit: '',
              errorAdd: '',

              //timer
              tmr: 5000,
    
              //arrays
              selectedSearchBy: 'Title',
              searchBy: {title: "Title", category: "Category", author: "Author", publisher: "Publisher"},
              newbooks: {bookid: "", title: "", category: "", author: "", publisher: "", qty: ""},
              books: {},
              clickedbooks: {}
          },

          mounted: function() {
            this.loadbooks();
            this.welcomeUser();
          },
          
          methods: {

            hideMessage: function (t) {
                var tm = setTimeout("app.clearMessage();", t);
                clearTimeout(tm);
                setTimeout("app.clearMessage();", t); 
            },

            welcomeUser: function() {
              axios.get(this.url + "home.php?action=read")
              .then(function(response){
                console.log(response);
                if (response.data.isvaliduser){
                  app.successMessage = "Welcome, " + response.data.username + "!" ;
                  app.hideMessage(app.tmr);
                }
              });
            },

            loadbooks: function() {
              axios.get(this.url + "home.php?action=read")
              .then(function(response){
                console.log(response);
                if (!response.data.isvaliduser){
                  app.errorMessage = response.data.message;
                  window.location="index.html";
                }
                else {
                  app.books = response.data.tblbooks;
                  //app.successMessage = response.data.rows;
                  app.hideMessage(app.tmr);
                }
              });
            },

            searchBooks: function() {
              axios.get(app.url + "home.php?action=search&searchKey=" + app.searchKey + "&selectedSearchBy=" + app.selectedSearchBy )
              .then(function(response){
                console.log(response);
                if (response.data.error){
                  app.errorMessage = response.data.message;
                }
                else {
                  app.books = response.data.tblbooks;
                  app.successMessage = response.data.rows;
                  app.hideMessage(app.tmr);
                }
              });
            },

            crudBooks: function(action) {
              if (action == 'create') {
                 var formData = app.toFormdata(app.newbooks);
              }
              if (action == 'update' || action == 'delete') {
                var formData = app.toFormdata(app.clickedbooks);
              }
              axios.post(app.url +  "home.php?action=" + action, formData)
              .then(function(response){
                if (response.data.error){
                  console.log(response);
                  app.errorMessage = response.data.message;
                }
                else {
                  app.successMessage = response.data.message;
                  app.showmodal = false;
                  app.showadd = false;
                  app.showedit = false;
                  app.showremove = false;
                  app.loadbooks();
                }
              });
            },

            signoutUser: function() {
              axios.get(this.url + "index.php?action=signout")
              .then(function(response){
                console.log(response);
                if (!response.data.isvaliduser){
                  app.errorMessage = response.data.message;
                  window.location="index.html";
                }
                else {
                  window.location="index.html";
                  app.hideMessage(5000);
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

            selectBook: function(book) {
              app.clickedbooks = book;
            },

            onValidationEdit: function() {
              if (app.clickedbooks.title == "" || app.clickedbooks.category == "" || app.clickedbooks.author == "" || app.clickedbooks.publisher == "" || app.clickedbooks.qty == "") {
                app.errorEdit = 'Missing input.';
                app.hideMessage(3000);
                return;
              } 
              if (!app.clickedbooks.qty.match(/^[0-9]+$/)) {
                app.errorEdit = 'Numbers only in quantity.';
                app.hideMessage(5000);
                return;
              }
              app.crudBooks('update');
              app.errorEdit = '';
            },

            onValidationAdd: function() {
              if (app.newbooks.title == "" || app.newbooks.category == "" || app.newbooks.author == "" || app.newbooks.publisher == "" || app.newbooks.qty == "") {
                app.errorAdd = 'Missing input.';
                app.hideMessage(5000);
                return;
              } 
              if (!app.newbooks.qty.match(/^[0-9]+$/)) {
                app.errorAdd = 'Numbers only in quantity.';
                app.hideMessage(5000);
                return;
              }
              app.crudBooks('create');
              app.errorAdd = '';
            }
          }
    });

