<?php

class Person {
	public $age = 24;
	public function base(&$age){
		$age = 20;
	}	
}

$per = new Person();
$per->base($per->age);

echo $per->age;

echo phpinfo();







