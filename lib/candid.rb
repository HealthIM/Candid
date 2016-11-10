class Candid

	def self.create(options = {})
     
        options[:id]       ||= 'svg'
        options[:styles]     = options[:styles ].to_s
        options[:scripts]    = options[:scripts].to_s
        options[:data_files] = options[:data_files].to_s

        # TODO  options[:local_assets]      = options[:local_assets].to_s
        # TODO  options[:ext_assets]        = options[:ext_assets].to_s
        # TODO  options[:images]            = options[:images].to_s

        # TODO  options[:file_destination] ||= .
        # TODO  options[:quality]          ||= 0 # phantomjs will handle the default quility in this case
        # TODO  options[:file_type]        ||= 'png'

		system "phantomjs \
		 #{candid_gem_root_path}/bin/candid2.js \
		 #{candid_gem_root_path} \
		 #{options[:id]        } \
		 #{options[:scripts]   } \ 
		 #{options[:styles]    } \
		 #{options[:data_files]}" 

		 # TODO return file path of new image
		# return options[:file_destination]
	end

    private
	def self.candid_gem_root_path
	  File.join(File.dirname(File.expand_path(__FILE__)), '..')
	end

end



