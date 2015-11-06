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
		var cwd = this.data.cwd;
		var concat = this.data.concat || false;
		var srcArray = [];
		
		if(Array.isArray(src)){
			arr.push(src);
		}
		else{
			arr.push(src);
		}
		
		if(cwd){
			if(!grunt.file.isDir(cwd)){
				grunt.log.error("The property must be a directory.");
				done(true);
				return -1;
			}	
			else{
				process.chdir(cwd);
			}	
		}
		
		if(concat){
			// concat the files
			if(grunt.file.isDir(dst)){
				dst = path.join(dst, (+ new Date()) + ".css");
			}
		}
		else{
			if(grunt.file.isFile(dst)){
				dst = path.dirname(dst);	
			}
		}

		arr.forEach(function(item, index){
			var myArray = grunt.file.expand({
				cwd : cwd || process.cwd()
			}, item);
			srcArray = srcArray.concat(myArray);				
		});

		arr = srcArray;
		arr.forEach(function(item, index){
			var newItem = getAbsolutePath(item, grunt);
			if(grunt.file.isFile(newItem)){
				var str = grunt.file.read(newItem, {
					encoding: encoding
				});
				var newStr = handleImage(newItem, str, grunt);
				if(str){
					if(concat){
						context += (newStr + "\n");
					}
					else{
						grunt.file.write(getAbsolutePath(path.join(dst, path.basename(newItem)), grunt), newStr, {
							encoding: encoding
						});
					}
				}	
			}
		});

		if(concat){
			grunt.file.write(getAbsolutePath(dst, grunt), context, {
				encoding: encoding
			});	
		}
		done(true);
	});
}