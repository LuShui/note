<?php

/**
 * php 会话
 */
class Session{
	public function __construct(){
		session_start();
	}


	public function createsession(){
		if (!isset($_SESSION['openid'])) {
			$_SESSION['openid'] = uniqid();
		}
		return $this;
	}


	public function getseeion(){
		echo $_SESSION['openid'] . '</br>';
	}


    public function testsess(){
		$this->createsession()->getseeion();
	}

}


$ses = new Session();
$ses->testsess();