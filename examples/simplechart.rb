require 'candid'

Candid.snapshot(['javascripts/simplechart.js'], 
	            ['styles/style.css'], 
	            [{data: [1, 3, 9], reference_as: 'data'},
	             {data: 'A Simple Bar Chart!', reference_as: 'title'}],
	            options = {file_dest: '/images', 
	             		   file_name: 'simplechart'})

