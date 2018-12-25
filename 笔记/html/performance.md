1、前端性能优化
	1、减少http请求，合并压缩js和css
	2、使用浏览器缓存，减少数据传输大小。
	3、CSS放在页面最上部，javascript放在页面最下面
	4、图片懒加载，只加载当前屏的图片。（减少了http请求）
	5、减少dom操作

	页面渲染优化
		1、动态加载脚本，通过JavaScript来实现脚本加载
			function loadJS(src) {
	  			const script = document.createElement('script');
	  			script.src = src;
	  				document.getElementsByTagName('head')[0].appendChild(script);
			}
			loadJS('http://example.com/scq000.js');

		2、异步加载脚本，async和defer可是实现脚本异步加载
			async和defer区别：async属性的脚本执行顺序是不能得到保证的。而使用defer属性的脚本执行顺序可以得到保证
				defer属性是在html文档解析完成后，DOMContentLoaded事件之前就会执行js。async一旦加载完js后就会马上执行，最迟不超过window.onload事件
				如果脚本没有操作DOM等元素，或者与DOM时候加载完成无关，直接使用async。如果需要DOM，就使用defer

		3、DNS Prefetch 预解析
			<meta http-equiv="x-dns-prefetch-control" content="on" /> /* 这是用来告知浏览器当前页面要做DNS预解析 */
			<link rel="dns-prefetch" href="//example.com">



2、缓存
	1、强缓存
	2、协商缓存
	
	缓存类型：
		1、数据库数据缓存
		2、服务器端缓存
			a：代理服务器缓存
			b: CDN缓存
		3、浏览器端缓存
		4、Web应用层缓存

	Cache-Control：指定缓存策略
		max-age 		:（单位为s）指定设置缓存最大的有效时间，定义的是时间长短。当浏览器向服务器发送请求后，在max-age这段时间里浏览器就不会再向服务器发送请求了
		s-maxage		:（单位为s）只用于共享缓存（比如CDN缓存）,如果存在s-maxage，则会覆盖掉max-age和Expires header
		public			:指定响应会被缓存，并且在多用户间共享
		private			:响应只作为私有的缓存不能在用户间共享
		no-cache		:指定不缓存响应，表明资源不进行缓存
		no-store		:绝对禁止缓存
		must-revalidate	:指定如果页面是过期的，则去服务器进行获取

	Expires:缓存过期时间
		用来指定资源到期的时间，是服务器端的具体的时间点。也就是说，Expires=max-age + 请求时间，需要和Last-modified结合使用
		cache-control的优先级更高。 Expires是Web服务器响应消息头字段，在响应http请求时告诉浏览器在过期时间前浏览器可以直接从浏览器缓存取数据，而无需再次请求
	
	Last-modified:服务器端文件的最后修改时间
		需要和cache-control共同使用，是检查服务器端资源是否更新的一种方式。当浏览器再次进行请求时，会向服务器传送If-Modified-Since报头，询问Last-Modified时间点之后资源是否被修改过。如果没有修改，则返回码为304，使用缓存；如果修改过，则再次去服务器请求资源，返回码和首次请求相同为200，资源为服务器最新资源

	ETag:根据实体内容生成一段hash字符串，标识资源的状态，由服务端产生。浏览器会将这串字符串传回服务器，验证资源是否已经修改
	


3、XMLHttpRequest
	XMLHttpRequest标准又分为Level 1和Level 2
	Level 1缺点：
		受同源策略的限制，不能发送跨域请求
		不能发送二进制文件（如图片、视频、音频等），只能发送纯文本数据
		在发送和获取数据的过程中，无法实时获取进度信息，只能判断是否完成
	Level 2新增功能
		可以发送跨域请求，在服务端允许的情况下
		支持发送和接收二进制数据
		新增formData对象，支持发送表单数据
		发送和获取数据时，可以获取进度信息
		可以设置请求的超时时间
	
	基本使用
		let xhr = new XMLHttpRequest();
		xhr.open('GET', './xhr.php');
		
		xhr.overrideMimeType('text/xml; charset = utf-8');//Level 1设置返回的数据类型
		xhr.responseType = 'json';//Level 2设置返回的数据类型
		小结：
			xhr.overrideMimeType()能做到的xhr.responseType都能做到。
			所以现在完全可以摒弃使用xhr.overrideMimeType()

		获取response数据
			xhr提供了3个属性来获取请求返回的数据
			分别是：xhr.response、xhr.responseText、xhr.responseXML

		追踪ajax请求的当前状态
			用xhr.readyState这个属性是只读属性，总共有5种可能值，分别对应xhr不同的不同阶段
			每次xhr.readyState的值发生变化时，都会触发xhr.onreadystatechange事件
				0：UNSENT (初始状态，未打开)	此时xhr对象被成功构造，open()方法还未被调用
				1：OPENED (已打开，未发送)	open()方法已被成功调用，send()方法还未被调用。
				2：HEADERS_RECEIVED (已获取响应头)	send()方法已经被调用, 响应头和响应状态已经返回
				3:LOADING (正在下载响应体)	响应体(response entity body)正在下载中，此状态下通过xhr.response 可能已经有了响应数据
				4：DONE (整个数据传输过程结束)	整个数据传输过程结束，不管本次请求是成功还是失败

		设置请求的超时时间
			xhr.timeout
				单位：毫秒
				默认值：0，即不设置超时

		获取上传、下载的进度
			可以通过onprogress事件来实时显示进度，默认情况下这个事件每50ms触发一次。
			需要注意的是，上传过程和下载过程触发的是不同对象的onprogress事件
				上传触发的是xhr.upload对象的 onprogress事件
				下载触发的是xhr对象的onprogress事件

		事件
			onreadystatechange		
				每当xhr.readyState改变时触发；但xhr.readyState由非0值变为0时不触发。
			onloadstart				
				调用xhr.send()方法后立即触发，若xhr.send()未被调用则不会触发此事件。
			onprogress				
				xhr.upload.onprogress在上传阶段(即xhr.send()之后，xhr.readystate=2之前)触发，每50ms触发一次；xhr.onprogress在下载阶段（即xhr.readystate=3时）触发，每50ms触发一次。
			onload					
				当请求成功完成时触发，此时xhr.readystate=4
			onloadend				
				当请求结束（包括请求成功和请求失败）时触发
			onabort					
				当调用xhr.abort()后触发
			ontimeout				
				xhr.timeout不等于0，由请求开始即onloadstart开始算起，当到达xhr.timeout所设置时间请求还未结束即onloadend，则触发此事件。
			onerror					
				在请求过程中，若发生Network error则会触发此事件（若发生Network error时，上传还没有结束，则会先触发xhr.upload.onerror，再触发xhr.onerror；
				若发生Network error时，上传已经结束，则只会触发xhr.onerror）。
				注意，只有发生了网络层级别的异常才会触发此事件，对于应用层级别的异常，如响应返回的xhr.statusCode是4xx时，并不属于Network error，所以不会触发onerror事件，而是会触发onload事件。

		事件触发顺序
			

		xhr.send();
		xhr.onreadystatechange = function(){
			console.log(xhr);
		};


4、跨域方案
	1、jsonp跨域    
		通过动态的创建script标签，再指定回调函数
		只能是get请求，而且请求的url连接有长度限制

	2、document.domain + iframe跨域（数据通信）    
		此方案仅限主域相同，子域不同的跨域应用场景。
		两个页面都通过js强制设置document.domain为基础主域，就实现了同域。

	3、 location.hash + iframe跨域
	

	4、window.name + iframe跨域


	5、postMessage跨域


	6、 跨域资源共享（CORS）
		普通跨域请求：只服务端设置Access-Control-Allow-Origin即可，前端无须设置，
		若要带cookie请求：前后端都需要设置。   
			前端设置：cookiexhr.withCredentials = true 设置携带cookie
			后端设置：Access-Control-Allow-Credentials: true	设置允许cookie
					  Access-Control-Allow-Origin: http://www.lushui.com   设置允许跨域访问的域名

5、浏览器输入URL后发生的事情
	1、域名解析：查询DNS获得对应的IP地址
		a:查找浏览器缓存,浏览器会检查缓存中有没有这个域名对应的解析过的IP地址，如果缓存中有，这个解析过程就将结束
		b:查找操作系统缓存,如果用户的浏览器缓存中没有，浏览器会从hosts文件查找是否有存储DNS信息，查找是否有目标域名和对应的IP地址
		c:查找路由器缓存,如果系统缓存中也找不到，那么查询请求就会发向路由器，路由器一般会有自己的DNS缓存
		d:查找DNS 缓存,如果路由器缓存中也找不到，那么就查询ISP DNS 缓存服务器了
		e:迭代查询,如果前面都找不到DNS缓存的话,
			本地 DNS服务器将该请求转发到互联网上的根域,
			根域将所要查询域名中的顶级域（比如要查询www.baidu,com，该域名的顶级域就是com）的服务器IP地址返回到本地DNS。
			本地DNS根据返回的IP地址，再向顶级域（就是com域）发送请求， com域服务器再将域名中的二级域（即www.baidu.com中的baidu.com）的IP地址返回给本地DNS。
			本地DNS再向二级域发送请求进行查询。
			之后不断重复这样的过程，直到本地DNS服务器得到最终的查询结果，并返回到主机。这时候主机才能通过域名访问该网站。

	2、确认好了IP和端口号，则向该IP地址对应的服务器的该端口号发起TCP连接请求（3次握手）
	3、三次握手成功后，开始通讯，进行数据传输
	4、浏览器渲染界面，展示界面。与用户进行交互
	5、窗口关闭，tcp链接结束。


6、浏览器的渲染原理简介
	1、解析（html，css，JavaScript）解析，
		HTML解析生成DOM tree ， css解析生成css rule tree，JavaScript通过api操作dom和css
		
	2、渲染界面
		解析完成之后，浏览器引擎会通过DOM Tree 和 CSS Rule Tree 来构造 Rendering Tree
		渲染流程
			1、计算css属性
			2、构建	Rendering Tree
			3、Layout （布局）
			4、开始渲染


7、BFC（块级格式化上下文）
	它是一个独立的渲染区域，只有Block-level box参与， 它规定了内部的Block-level Box如何布局，并且与这个区域外部毫不相干

	BFC布局规则
		1.内部的Box会在垂直方向，一个接一个地放置。
		2.Box垂直方向的距离由margin决定。属于同一个BFC的两个相邻Box的margin会发生重叠。
		3.每个元素的margin box的左边， 与包含块border box的左边相接触(对于从左往右的格式化，否则相反)。即使存在浮动也是如此。
		4.BFC的区域不会与float box重叠。
		5.BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素。反之也如此。
		6.计算BFC的高度时，浮动元素也参与计算

	哪些元素会生成BFC
		1.根元素
		2.float属性不为none
		3.position为absolute或fixed
		4.display为inline-block, table-cell, table-caption, flex, inline-flex
		5.overflow不为visible

	BFC作用
		1.清除浮动
		2.防止 margin 重叠
		3.多栏布局的一种方式


8、JavaScript闭包
	闭包就是能够读取其他函数作用域内变量的函数。
	正常情况下无法获取到函数作用域内变量的值，但是通过闭包可以获取到函数作用域内的值。


9、关于meta标签
	name属性：name属性主要用于描述网页，与之对应的属性值为content，content中的内容主要是便于搜索引擎机器人查找信息和分类信息用的。

		keywords用来告诉搜索引擎你网页的关键字是什么
		<meta name="keywords" content="science,education,culture,politics,ecnomics，relationships,entertaiment,human">

		description用来告诉搜索引擎你的网站主要内容
		<meta name="description"content="Thispageisaboutthemeaningofscience,education,culture.">
		
		robots用来告诉搜索机器人哪些页面需要索引，哪些页面不需要索引
			content的参数有all,none,index,noindex,follow,nofollow。默认是all。
		<meta name="robots"content="none">

		标注网页的作者
		<meta name="author" content="root,root@xxxx.com">

		告诉浏览器你的渲染模式
		<meta name="renderer" content="webkit">

		viewport(视图模式）
		<meta name="viewport" content="width=device-width,initial-scale=1"/>


	http-equiv属性：
		
		告诉浏览器渲染模式
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		
		用于设定网页的到期时间。一旦网页过期，必须到服务器上重新传输。
		<meta http-equiv="expires"content="Fri,01Jan201618:18:18GMT">

		禁止浏览器从本地计算机的缓存中访问页面内容
		<meta http-equiv="Pragma" content="no-cache">

		自动刷新并指向新页面。
		<meta http-equiv="Refresh" content="2;URL=http://www.baidu.com">

		如果网页过期，那么存盘的cookie将被删除。
		<meta http-equiv="Set-Cookie"content="cookievalue=xxx;expires=Friday,12-Jan-200118:18:18GMT；path=/">

		强制页面在当前窗口以独立页面显示
		<meta http-equiv="Window-target" content="_blank">

		设定页面使用的字符集
		<meta http-equiv="content-Type" content="text/html;charset=gb2312">

		显示语言的设定
		<meta http-equiv="Content-Language" content="zh-cn"/>
