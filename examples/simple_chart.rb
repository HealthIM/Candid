require 'candid'

Candid.snapshot(['javascripts/simplechart.js'], 
		            ['styles/style.css'], 
		            {data: [1, 3, 9] , title: 'A Simple Bar Chart!'},
		            options = {file_dest: '/images', 
		             		   save: 'local', 
		             		   file_name: 'simple_chart'})
