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
        src: 'F:\\work\\nw\\index.css',
        dst: 'F:\\work\\nw\\my.css'
      }
    }
  });
  // Load the plugin that provides the "base64" task.
  grunt.loadNpmTasks('grunt-img-base64');
  // Default task(s).
  grunt.registerTask('default', ['img2base64']);
};
````
## 参数
* src：需要扫描的css，多个css使用数据数组格式；
* concat： true|false，是否需要合并，如果合并，则会将多个src合并为一个dst，此时dst地址应该为一个_文件地址_
* cwd: 当前地址。
* dst：目标地址，支持文件或者文件夹。
