require 'candid'

Candid.snapshot(['javascripts/simplechart.js'], 
		            ['styles/style.css'], 
		            {data: [1, 3, 9] , 
		             title: 'A Simple Bar Chart!'},
		            options = {save: 'remote', 
		            	file_dest: '/home/julia/HealthIM/candid/examples/images/', 
		            	file_name: 'save_remote'})
