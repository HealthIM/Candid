var D3_PATH = '/vendor/assets/d3.min.js';

var fs   = require('fs'),
	sys  = require('system'),
	page = require('webpage').create();

if (sys.args.length < 1) { 
	console.log("Missing arguments.");
	phantom.exit(1);
}
else {
    var gem_dir = sys.args[1],
    	id      = sys.args[2]
        scripts = arrayFromString(sys.args[3]),
     	styles  = arrayFromString(sys.args[4]),
     	data    = arrayFromString(sys.args[5]),
     	// dest_path   = sys.args[6],
     	// file_type   = sys.args[7],
     	// quality     = sys.args[8],
        style = "";


	loadJSfile(gem_dir + D3_PATH);

// linking external styles sheets through js : http://stackoverflow.com/questions/574944/how-to-load-up-css-files-using-javascript
    style += "<style>"
	for (i in styles) {
    	style += fs.read(styles[i]);
    }
    style += "</style>"


    for (i in data) {
    	loadJSfile(data[i]);
    }

 	for (i in scripts) {
    	loadJSfile(scripts[i]);
    }

    
    eval(window.onload());


    var svg      = new XMLSerializer().serializeToString(d3.select(id).node());  
	page.content = style + svg;

	var image_name = getFileNameFromPath(scripts[0]) +"_"+ id + ".png"

	if (page.render(image_name)){
		console.log(image_name + " created!");
	}else {
		console.log("An error occured rendering the image.");
		phantom.exit(1);
	};    	

	page.close();
	phantom.exit(0);
	
};


function getFileNameFromPath(file_path){
	var file_name = file_path.split('\\').pop().split('/').pop();
    return file_name.substring(0, file_name.length - 3);
}

function loadJSfile(file_path){
	if (!phantom.injectJs(file_path)) {
		console.log('Error loading:' + file_path);
		phantom.exit(1);
	}
}	

function arrayFromString(str){
	return JSON.parse(str);
}	

   
// https://medium.com/@stockholmux/besting-phantomjs-font-problems-ee22795f5c0b#.5gyuus8p8
// otherwise just use system fonts
