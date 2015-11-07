var obj = {
	name: "Hello",
	value: "World"
};
for(var key in obj){
	var value = obj[key];
	// do something here...
	console.log(key + ":" + value);
}