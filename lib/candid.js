var D3_PATH = '/vendor/assets/d3.min.js';

var fs   = require('fs'),
	sys  = require('system'),
	page = require('webpage').create();

if (sys.args.length < 1) { 
	console.log("Missing arguments.");
	phantom.exit(1);
}
else {
	var gem_dir, id, scripts, styles, include_js, options, style;
 
	try {
	    gem_dir    =            sys.args[1];
        scripts    = JSON.parse(sys.args[2]);
     	styles     = JSON.parse(sys.args[3]);
     	include_js = JSON.parse(sys.args[4]);
     	options    = JSON.parse(sys.args[5]);
     	id         = options['id']
	} catch(err) {
		console.log("Error parsing arguments.");
		console.log(sys.args);
		console.log(err)
		page.close();
		phantom.exit(1);
	}
	
	loadJSfile(gem_dir + D3_PATH);

	var file_dest = options['file_dest'];
	var file_name = options['file_name'];
	var ext       = options['ext'];

    style  = "<style>"
	for (i in styles) {
    	style += fs.read(styles[i]);
    }
    style += "</style>"


	include_js.forEach(function(d) {phantom.injectJs(d)});
	scripts.forEach(function(d) {loadJSfile(d)});

    try{
    	eval(window.onload());
	}
	catch(err){
		console.log(err);
		page.close();
		phantom.exit(1);
	}

    var svg      = new XMLSerializer().serializeToString(d3.select(id).node());  
	page.content = style + svg;

	if (file_dest) {
        if (!fs.changeWorkingDirectory(fs.workingDirectory + file_dest)) {
        	console.log("Unable to access: " + fs.workingDirectory + file_dest);	
			page.close();
			phantom.exit(1);
        }
	}

	if (!file_name) file_name = id;
	file_name = file_name + '.' + ext; 
    

	if (page.render(file_name)){
		console.log(file_name + " created!");
	} else {
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
		console.log('Error loading: ' + file_path);
	}
}	

function readFile(file_path){
	try {fs.read(file_path);}
	catch(err) {
		console.log('Unable to load ' + file_path);
		console.log(err);
		phantom.exit(1);
	}

}

