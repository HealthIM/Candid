require 'candid'

Candid.snapshot(['javascripts/simplechart.js'], 
		            ['styles/style.css'], 
		            {data: [1, 3, 9] , 
		             title: 'A Simple Bar Chart!'},
		            options = {save: 'local', 
		            	file_dest: '/images', 
		            	file_name: 'save_local'})
