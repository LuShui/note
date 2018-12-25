  模块的定义
     export命令用于规定模块的对外接口，import命令用于输入其他模块提供的功能。

     export:
        export var name = "javascript";
        export var version = 6.0;

        var name = "javascript";
        var version = 6.0;
        export {name,version};
        以上两种方式是等价的。


        export function Person() {
            this.name = 'javascript';
        };

        function Person() {
            this.name = 'javascript';
        };
        export {Person};
        以上两种方式是等价的


     通过as使用别名的方式（自己定义输出的变量名）
     export {Person as p};
     export {name as n,version as v};



     import:导入模块
        import命令具有提升效果，会提升到整个模块的头部，首先执行

        import导入是变量名需要和export时的变量名相同
            export  { URL, m };
            import {URL,m} from './common.js';
            这里 export 和 import 的名称相同

        import {name} from './base';







模块的加载
    普通script加载

         script标签的defer和async属性，都是异步加载的实现方式
            相同点：下载外部脚本，但不会等它下载和执行，而是直接执行后面的命令。
            不同点：
                defer：要等到整个页面正常渲染结束，才会执行
                async:一旦下载完，渲染引擎就会中断渲染，执行这个脚本以后，再继续渲染

         浏览器加载 ES6 模块，也使用<script>标签，但是要加入type="module"属性。
         type="module"的<script>，都是异步加载，不会造成堵塞浏览器，即等到整个页面渲染完，
         再执行模块脚本，等同于打开了<script>标签的defer属性。

         备注：浏览器并未实现模块功能，但是可以通过Babel转码器来实现
        

        浏览器加载 ES6 模块，也使用<script>标签，但是要加入type="module"属性
            <script type="module" src="./module.js"></script>
            相等于
            <script type="module" src="./module.js" defer></script>

                浏览器对于带有type="module"的<script>，都是异步加载，不会造成堵塞浏览器，即等到整个页面渲染完，再执行模块脚本，等同于打开了<script>标签的defer属性

    

    ES6 模块与 CommonJS 模块的差异
        CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用。
        CommonJS 模块是运行时加载，ES6 模块是编译时输出接口。



    

