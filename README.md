# npm shrinkwrap
`npm-shrinkwrap`可以按照当前项目`node-modules`目录内的安装包情况生成稳定的版本号描述

> `shrinkwrap` 命令根据目前安装在`node_modules`的文件情况锁定依赖版本。在项目中执行 `npm install`
 的时候，`npm` 会检查在根目录下有没有 `npm-shrinkwrap.json` 文件，如果` shrinkwrap `文件存在的话，`npm` 会使用它（而**不是** package.json）来确定安装的各个包的版本号信息。
这样一来，在安装时候确定的所有版本信息会稳定的固化在 `shrinkwrap` 里。无论是A，B 和 C中的版本如何变化，或者它们的 `package.json `文件如何修改，你始终能保证，在你项目中执行` npm install` 的到的版本号时稳定的。

# webpack
> webpack is a module bundler. webpack takes modules with dependencies and generates static assets representing those modules

---
> webpack是一个模块打包工具，输入为包含依赖关系的模块集，输出为打包合并的前端静态资源

webpack 可以将任何前端资源视为模块，如css,图片，文本。
webpack本身只会处理javascript
而对于其他类型的资源是通过不同的loader将对应的资源转化为javascript模块

## 优点

## 环境搭建
首先需要一个Nodejs的环境，需要通过npm包管理工具下载webpack的命令，在全局中安装该命令。
```
npm install webpack -g
```
如图建立目录结构

![Paste_Image.png](http://upload-images.jianshu.io/upload_images/46217-e34db29f3a1ea056.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

命令行的形式调用，在改菜单目录下执行
```
webpack src/index.js dist/index.js
```
在`dist/index.js`中可以查看到编译的结果

每次都输入命令行去编译的话需要输入很长的参数，所以webpack提供了通过配置的方式去执行任务，在项目的目录下创建webpack.config.js即可。在配置文件中进行配置
其中参数的含义如下所示
简单的进行输入和输出的操作。webpack检测配置文件，读取模块入口与输出路径和文件名,将文件依赖整合成一个文件。
```
{
    entry: [String | Array | Object], // 入口模块
    output: {
        path: String,      // 输出路径
        filename: String   // 输出名称或名称 pattern
        publicPath: String // 指定静态资源的位置
        ...                // 其他配置
    }
}
```
然后执行npm init操作，在该目录下安装webpack的依赖。
### 加载其他类型的文件
我们知道在前端文件的编写过程中存在许多类型的文件，至少会有图片和样式文件等等

## loaders的介绍
loader可以通过类似管道的方式连接起来，管道的执行方向为从右向左

常用的加载器包括css-loader style-loader url-loader。这些加载器的作用就将不同的文件加载到js文件中。同样这些加载器也是用Nodejs进行编写的，在项目中使用的时候就需要添加到依赖。
```
cnpm install style-loader css-loader url-loader less-loader
```
在入口文件中添加如下代码，就可以看到
```
require('style!css!./index.css')
```

同样 loaders也可以使用配置的方式，简化我们的工程，达到统一管理的目的。

```
$ webpack --config XXX.js   //使用另一份配置文件（比如webpack.config2.js）来打包

$ webpack --watch   //监听变动并自动打包

$ webpack -p    //压缩混淆脚本，这个非常非常重要！

$ webpack -d    //生成map映射文件，告知哪些模块被最终打包到哪里了
```
entry: 定义整个编译过程的起点

output: 定义整个编译过程的终点

module: 定义模块module的处理方式

plugin 对编译完成后的内容进行二度加工

resolve.alias 定义模块的别名

## 独立打包样式文件

## 插件的介绍
webpack提供插件机制，可以对每次的build结果进行助理，配置plugin参数就可以。

### 分割vendor代码和应用业务代码

### webpack-dev-server
webpack提供的基于node.js的Express服务器
它提供如下的服务
- server服务
- 监控源文件的修改，如果源文件改变了，就会调用webpack重新打包
-

##  参考资料

https://segmentfault.com/a/1190000003985797
