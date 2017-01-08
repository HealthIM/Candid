require 'candid'

Candid.snapshot(['javascripts/simplechart.js'], 
		            ['styles/style.css'], 
		            {data: [1, 3, 9],  title: 'A Simple Bar Chart JPEG!'},
		            options = {file_dest: '/images', 
		             		   file_name: 'jpeg_chart',
		             		   ext: 'jpeg',
			             		 save: 'local'})
