<?php


class Socket{
	public function socketcreate(){
		$opts = array(
		    'socket' => array(
		        'bindto' => '192.168.0.100:0',
		    ),
		);


		// connect to the internet using the '192.168.0.100' IP and port '7000'
		$opts = array(
		    'socket' => array(
		        'bindto' => '192.168.0.100:7000',
		    ),
		);


		// connect to the internet using port '7000'
		$opts = array(
		    'socket' => array(
		        'bindto' => '0:7000',
		    ),
		);


		// create the context...
		$context = stream_context_create($opts);

		// ...and use it to fetch the data
		echo file_get_contents('http://localhost/php/soure.php', false, $context);
	}

	public function httpcreat(){
		$postdata = http_build_query(
		    array(
		        'var1' => 'some content',
		        'var2' => 'doh'
		    )
		);

		$opts = array('http' =>
		    array(
		        'method'  => 'POST',
		        'header'  => 'Content-type: application/x-www-form-urlencoded',
		        'content' => $postdata
		    )
		);

		$context = stream_context_create($opts);

		$result = file_get_contents('http://localhost/bookdemo/php/soure.php', false, $context);
		echo ($result);
	}

	public function authfunc(){
		$_SERVER['PHP_AUTH_USER'] = '';
		$_SERVER['PHP_AUTH_PW'] = '';
		unset($_SERVER['PHP_AUTH_USER']);
		 if (!isset($_SERVER['PHP_AUTH_USER'])) {
		    header('WWW-Authenticate: Basic realm="My Realm"');
		    header('HTTP/1.0 401 Unauthorized');
		    echo 'Text to send if user hits Cancel button';
		    exit;
		  } else {
		  	$username = $_SERVER['PHP_AUTH_USER'];
		  	$password = $_SERVER['PHP_AUTH_PW'];

		    echo $username .'------'.$password;
		  }
	}




}


// setcookie('name','php',time() + 10);

echo $_COOKIE["name"];











