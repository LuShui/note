1、PHP的作用域
	PHP 有四种不同的变量作用域
		1、local
		2、global
		3、static
		4、parameter

	局部和全局作用域
		在所有函数外部定义的变量，拥有全局作用域。除了函数外，全局变量可以被脚本中的任何部分访问，要在一个函数中访问一个全局变量，需要使用 global 关键字。(全局作用域不能再函数中访问)
		在 PHP 函数内部声明的变量是局部变量，仅能在函数内部访问
	
	global 关键字
		global 关键字用于函数内访问全局变量。在函数内调用函数外定义的全局变量，我们需要在函数中的变量前加上 global 关键字
	
	Static 作用域
		静态常量
	
	参数作用域
		过调用代码将值传递给函数的局部变量。参数是在参数列表中声明的，作为函数声明的一部分
		


2、文件包含
	include，include_once 和 require,require_once
	
	include 和 require除了处理错误的方式不同之外，在其他方面都是相同的
		require 生成一个致命错误（E_COMPILE_ERROR），在错误发生后脚本会停止执行。
		include 生成一个警告（E_WARNING），在错误发生后脚本会继续执行。

	include和require 重复导入同一个文件会多次重复的导入。
	include_once和require_once 只会导入一次文件。


3、变量和常量
	1、php中变量默认都是值传递。

	常量定义
		1、通过define()定义。可以再任意的位置定义。
		2、通过conset定义。必须定义在最外外层的作用域中。不能再函数内定义

	常量的使用
		1、直接通过定义的名字使用。
		2、通过constant()函数使用。


4、抽象类与抽象方法
	通过abstract关键字定义，主要让其他子类用于继承。
	1，如果一个方法定义为抽象方法，则其所在的类必须定义为抽象类。
	2，但，一个抽象类中，可以没有抽象方法——但通常意义不大。
	3，子类继承自一个抽象类，则子类必须实现父类中的所有抽象方法，除非子类也继续作为抽象类
	4，子类实现抽象父类的方法时，访问控制修饰符的范围不能降低，且方法的参数也须一致——其实这就是重写，所以要满足重写的要求。


5、一些方法(这些方法都需要定义在类中才能自动调用)
	当调用一个不存在的属性是，会自动调用预先定义好的__get()方法
	给一个不存在的属性复制，会自动调用预先定义好的__set()方法。
	对一个不存在的属性判断是，不调用预先定义好的__isset()方法。isset();
	对一个不存在的属性unset()时，会自动调用预先定义好的__unset()方法.
	
	以下方法都带有2个参数，第一个是调用的方法名，第二个参数是传递的参数。
	当使用一个对象调用一个不存在的普通方法的时候，会自动去调用预先定义好的__call()方法
	当使用一个对象（类）调用一个不存在的静态方法的时候，会自动去调用预先定义好的＂__callStatic＂方法。

	php中是单继承，但是可以通过接口实现多继承。


6、类的自动加载
	在外面的页面中，并不需要去“引入”（包含）类文件，但是程序会在需要一个类的时候就自动去“动态加载”该类
	1、__autoload()方法
	2、spl_autoload_regist(“函数名”);
	








	
