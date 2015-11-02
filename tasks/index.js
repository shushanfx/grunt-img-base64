var path = require("path");
var fs = require("fs");
var base64 = require("base64-img");
var ContentType = require("content-type-mime");

function getAbsolutePath(p, grunt){
    var newP = p;
    if(!grunt.file.isPathAbsolute(newP)){
        newP = path.join(process.cwd(), p);
    }
    return newP;
}

function replaceAll(str, src, dst){
	var a = str, b = null;
	while(a != b){
		b = a;
		a = b.replace(src, dst);
	}
	return a;
}

function handleImage(src, content, grunt){
	var ret = content;
	var reg = /url\(\s*[\"\']?\s*([^\'\"\)]*)\s*[\"\']?\s*\)/gi
	var result = null;
	var map = {};
	var realPath = null, data;

	var buildBase64Image = function(r, d){
		var type = ContentType(r);
		return ["url(",data, ")"].join("");
	}
	
	while((result = reg.exec(content))){
		realPath = path.join(path.dirname(src), result[1]);
		if(fs.existsSync(realPath)){
			data = base64.base64Sync(realPath);
			map[result[0]] = buildBase64Image(realPath, data);
		}
	}

	Object.keys(map).forEach(function(item, index){
		grunt.log.debug(item + " -> " + map[item]);
		ret = replaceAll(ret, item, map[item]);
	});

	return ret;
}

module.exports = function(grunt){
	grunt.registerMultiTask("img2base64", "Convert image to base64.", function(){
		var done = this.async();
		var src = this.data.src, dst = this.data.dst;
		var arr = [];
		var context = '';
		var encoding = this.data.encoding || "UTF-8";
		if(Array.isArray(src)){
			arr.push(src);
		}
		else{
			arr.push(src);
		}

		arr.forEach(function(item, index){
			var newItem = getAbsolutePath(item, grunt);
			var str = grunt.file.read(newItem, {
				encoding: encoding
			});
			if(str){
				context += handleImage(newItem, str, grunt);
			}
		});

		grunt.file.write(getAbsolutePath(dst, grunt), context, {
			encoding: encoding
		});
		done(true);
	});
}