var D3_PATH = '/../vendor/assets/d3.min.js';

var fs   = require('fs'),
	sys  = require('system'),
	page = require('webpage').create();

if (sys.args.length < 1) { 
	console.log("Missing arguments. \n \
		         Requires: main.js '/path/to/gem' script.js [data.[tsv|csv|json ... etc.]] [style.css]");
	phantom.exit(1);
}
else {
    var gem_dir     = sys.args[1],
        script_path = sys.args[2],
     	json_path   = sys.args[3],
     	style_path  = sys.args[4],
        style = "<style></style>";

    loadJSfile(script_path);
	loadJSfile(gem_dir + D3_PATH);
	if (json_path) loadJSfile(json_path);
	if (style_path) style = "<style>" + fs.read(style_path) + "</style>";
    
    eval(window.onload());

    var svg      = new XMLSerializer().serializeToString(d3.select('svg').node());  
	page.content = style + svg;

	var image_name = getFileNameFromPath(script_path) + ".png"

	if (page.render(image_name)){
		console.log("......................................................");
		console.log(image_name + " created!");
		console.log("......................................................");
	}else {
		console.log("......................................................");
		console.log("An error occured rendering the image.");
		console.log("......................................................");
	};    	

	phantom.exit();
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
	else {
		console.log('Loaded :' + file_path);
	}
}	





