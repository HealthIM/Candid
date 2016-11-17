var D3_PATH = '/vendor/assets/d3.min.js';

var fs   = require('fs'),
	sys  = require('system'),
	page = require('webpage').create();

if (sys.args.length < 1) { 
	console.log("Missing arguments.");
	phantom.exit(1);
}
else {
	var gem_dir, id, scripts, styles, data, options, style, image_path;
 
	try {
	    gem_dir    =            sys.args[1];
        scripts    = JSON.parse(sys.args[2]);
     	styles     = JSON.parse(sys.args[3]);
     	data       = JSON.parse(sys.args[4]);
     	include_js = JSON.parse(sys.args[5]);
     	options    = JSON.parse(sys.args[6]);
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
	// var quality   = options['quality'  ];

    style  = "<style>"
	for (i in styles) {
    	style += fs.read(styles[i]);
    }
    style += "</style>"


	for (i in include_js) {
		console.log(include_js[i])
	    loadJSfile(include_js[i]);
	}

    for (i in data) {
    	loadJSfile(data[i]);
    }

 	for (i in scripts) {
    	loadJSfile(scripts[i]);
    }

    try{
    	eval(window.onload());
	}
	catch(err){
		console.log(err);
		page.close();
		phantom.exit(0);
	}

    var svg      = new XMLSerializer().serializeToString(d3.select(id).node());  
	page.content = style + svg;

	if (file_dest) {
        if (!fs.changeWorkingDirectory(fs.workingDirectory + file_dest)) {
        	console.log("Unable to access: " + fs.workingDirectory + file_dest);	
			page.close();
			phantom.exit(0);
        }
	}

	if (!file_name) file_name = id;
	
	file_name = file_name + '.' + ext; 
    
    var quality = 75;
    ext === 'svg' ? quality = 0 : quality = 100;

	if (page.render(file_name), {quality: quality}){
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
		// phantom.exit(1);
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


// output an img file with error msg??
   
// https://medium.com/@stockholmux/besting-phantomjs-font-problems-ee22795f5c0b#.5gyuus8p8
// otherwise just use system fonts

// linking external styles sheets through js : http://stackoverflow.com/questions/574944/how-to-load-up-css-files-using-javascript
