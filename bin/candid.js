var D3_PATH = '/vendor/assets/d3.min.js';

var fs   = require('fs'),
	sys  = require('system'),
	page = require('webpage').create();

if (sys.args.length < 1) { 
	console.log("Missing arguments.");
	phantom.exit(1);
}
else {
    var id          = sys.args[1]
    	gem_dir     = sys.args[2],
        script_path = sys.args[3],
     	json_path   = sys.args[4],
     	style_path  = sys.args[5],
     	// dest_path   = sys.args[6],
     	// file_type   = sys.args[7],
     	// quality     = sys.args[8],
        style = "<style></style>";

    loadJSfile(script_path);
	loadJSfile(gem_dir + D3_PATH);
	if (json_path) loadJSfile(json_path);
	if (style_path) style = "<style>" + fs.read(style_path) + "</style>";
    
    eval(window.onload());

    var svg      = new XMLSerializer().serializeToString(d3.select(id).node());  
	page.content = style + svg;

	var image_name = getFileNameFromPath(script_path) +"_"+ id + ".png"

	if (page.render(image_name)){
		console.log(image_name + " created!");
	}else {
		console.log("An error occured rendering the image.");
		phantom.exit(1);
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
}	





