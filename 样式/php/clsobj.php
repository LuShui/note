<?php

header("Content-type: text/html; charset=utf-8"); 

class Base{
	const type = 'Object';
	public $age = 0;
	function __construct($age = 22){
		$this->age = $age;
	}
}


class ChildClass extends Base{
	public function __construct($age = 22){
		parent::__construct($age);
	}
}


$a = new ChildClass(25);

$array = array(
	'code'=>1,
	'age'=>'你好'
);

echo serialize($array);
echo json_encode(unserialize(serialize($array)));




