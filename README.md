# grunt-img-base64 
## 描述
该项目为一个基于grunt的插件，可以将css中的图片提取，并将图片转化为base64的格式保存在css中。
## 安装
````
npm install grunt-img-base64
````
## 使用
````javascript
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    img2base64: {
      build: {
        cwd: "",
        src: 'F:\\work\\nw\\index.css',
        dst: 'F:\\work\\nw\\my.css'
      },
      buildWithCWD: {
        cwd: "F:\\work\\nw",
        src: 'index.css',
        dst: 'my02.css' 
      },
      buildWithCWD2: {
        cwd: "F:\\work\\nw",
        concat: true,
        src: '*.css',
        dst: 'my03.css' 
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-img-base64');

  // Default task(s).
  grunt.registerTask('default', ['img2base64:build']);
  grunt.registerTask('default1', ['img2base64:buildWithCWD']);
  grunt.registerTask('default2', ['img2base64:buildWithCWD2']);

};
````
## 输入&输出
* 输入
```` css
/* 三角形 */
.trigon {
  width:0;
  height:0;
  border-width:10px;
  border-style:solid;
  position: absolute;
  z-index:-1;
	background-image:url('ga.jpg')
}
````
* 输出
````css
/* 三角形 */
.trigon {
  width:0;
  height:0;
  border-width:10px;
  border-style:solid;
  position: absolute;
  z-index:-1;
  background-image:url(data:image/jpg;base64,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)
}
````
## 参数
* src：需要扫描的css，多个css使用数据数组格式；
* concat： true|false，是否需要合并，如果合并，则会将多个src合并为一个dst，此时dst地址应该为一个_文件地址_
* cwd: 当前地址。
* dst：目标地址，支持文件或者文件夹。
