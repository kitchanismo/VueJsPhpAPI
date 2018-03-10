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
	if ($action =='logout') {

			unset($_SESSION['username']);
			session_unset();
			session_destroy();
			$res['message'] = "Succcessfully Logout";
	} 

	//perform read all data
	if ($action =='read') {
		
		$uname = isset($_SESSION['username']) ? $_SESSION['username']: '' ;
		$result = mysql_query("SELECT * from tblbooks WHERE isdelete = 'false'");
		$books = array();
		$rows=mysql_num_rows($result);

		while($row = mysql_fetch_array($result)) {
			array_push($books, $row);
		}
		$res['rows'] = $rows . " item/s.";
		$res['tblbooks'] = $books;
		$res['username'] = $uname;

	}  

	//perform a search
	if ($action =='search') {
		
		$searchKey = isset($_GET['searchKey']) ? $_GET['searchKey']: '' ;
		$selectedSearchBy = isset($_GET['selectedSearchBy']) ? $_GET['selectedSearchBy']: '' ;
		$result = mysql_query("SELECT * from tblbooks WHERE $selectedSearchBy like '%$searchKey%' AND isdelete = 'false'" );
		$books = array();
		$rows=mysql_num_rows($result);

		while($row = mysql_fetch_array($result)) {
			array_push($books, $row);
		}
		$res['rows'] = $rows . " item/s.";
		$res['tblbooks'] = $books;
	}


	if ($action =='create') {
		
		$id = $_POST['bookid'];
		$title = $_POST['title'];
		$category = $_POST['category'];
		$author = $_POST['author'];
		$publisher = $_POST['publisher'];
		$qty = $_POST['qty'];

		$result = mysql_query("INSERT INTO tblbooks (title,category,author,publisher,qty,isdelete) VALUES ('$title','$author','$category','$publisher','$qty','false')");
	
		if ($result) {
			$res['message'] = "Successfully saved" ;
		}
		else {
			$res['error'] = true;
			$res['message'] = "Not Added ".mysql_error($con);
		}
	
	}

	//perform update
	if ($action =='update') {
		
		$id = $_POST['bookid'];
		$title = $_POST['title'];
		$category = $_POST['category'];
		$author = $_POST['author'];
		$publisher = $_POST['publisher'];
		$qty = $_POST['qty'];
		$result = mysql_query("UPDATE tblbooks SET title = '$title', category = '$category' , author = '$author' , publisher = '$qty' , qty = '$qty' WHERE bookid = '$id'");
		
		if ($result) {
			$res['message'] = "Successfully updated" ;
		}
		else {
			$res['error'] = true;
			$res['message'] = "Not Updated ".mysql_error($con);
		}
	}

	//perform delete
	if ($action =='delete') {
		
		$id = $_POST['bookid'];
		$result = mysql_query("UPDATE tblbooks SET isdelete = 'true' where bookid = '$id'");
		
		if ($result) {
			$res['message'] = 'Successfully deleted' ;

		}
		else {
			$res['error'] = true;
			$res['message'] = "Not Deleted ".mysql_error($con);
		}
	}

	
} else {
	//if user is not in a session set valid user to false
	//perform login
	if ($action =='login') {
		$count = 0;
		$fname = isset($_POST['username']) ? $_POST['username']: '' ;
		$pword = isset($_POST['password']) ? $_POST['password']: '' ;
		$result = mysql_query("SELECT * FROM tbluser WHERE username ='$fname' and password ='$pword'");
		$count=mysql_num_rows($result);
		
		if ($count==1){
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
	
	$res['isvaliduser'] = false;
}


//display result in ajson format
//header("Content-type: application/json");
echo json_encode($res);

?>