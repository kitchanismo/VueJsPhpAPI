<?php

//connect to database
$con=mysql_connect("localhost", "root", "")or die("cannot connect"); 
mysql_select_db("db_library")or die("cannot select DB");

//start a session
session_start();

//init error and user
$res = array('error' =>false);
$res = array('isvaliduser' =>true);

//get action from request
$action = isset($_GET['action']) ? $_GET['action']: '' ;


//if user is in a session, perform actions
if (isset($_SESSION['username'])) {
	
	//perform logout
	if ($action =='signout') {

		unset($_SESSION['username']);
		session_unset();
		session_destroy();
		$res['message'] = "Succcessfully Sign-out";
		
	}


	$res['username'] = isset($_SESSION['username']) ? $_SESSION['username']: '' ;
	$res['isvaliduser'] = true;
	$res['alerts'] = 'Welcome, ' . $res['username'] ."!";
} else {
	//if user is not in a session set valid user to false
	//perform login


	if ($action =='login') {
		$count = 0;
		$fname = isset($_POST['username']) ? $_POST['username']: '' ;
		$pword = isset($_POST['password']) ? $_POST['password']: '' ;
		$result = mysql_query("SELECT * FROM tbluser WHERE username ='$fname' and password ='$pword'");
		$count=mysql_num_rows($result);
		
		if ($count>=1){
			$_SESSION["username"] = $fname;
			$res['message'] = "Successfully Login";
			$res['username'] = $fname;
		
		}
		else {
			$res['message'] = "Invalid Username or Password";
			$res['error'] = true;
			
		}
			
	}
		//perform an insert
	if ($action =='create') {
		$username = isset($_POST['username']) ? $_POST['username']: '' ;
		$email = isset($_POST['email']) ? $_POST['email']: '' ;
		$password = isset($_POST['password']) ? $_POST['password']: '' ;

		if ($username != '' || $email != '' || $password != '') {

			$result = mysql_query("INSERT INTO tbluser (username,email,password) VALUES ('$username','$email','$password')");
		
			if ($result) {
				$res['message'] = "Successfully created. Sign in now." ;
				
			}
			else {
				$res['error'] = true;
				$res['message'] = "Not Added ".mysql_error($con);
				
			}
		} else {
			$res['error'] = true;
			$res['message'] = "Not Added ".mysql_error($con);
		}

		
	
	}


	if ($action =='userExist') {
		
		$username = isset($_GET['username']) ? $_GET['username']: '' ;
		$result = mysql_query("SELECT * FROM tbluser WHERE username ='$username'");
		$count=mysql_num_rows($result);

		if ($count>=1){
			$res['error'] = true;
		} else {
			$res['error'] = false;
		}
	}
	$res['isvaliduser'] = false;
	$res['username'] = '';
	$res['alert'] = 'Sign in now.';
}


//display result in ajson format
//header("Content-type: application/json");
echo json_encode($res);

?>