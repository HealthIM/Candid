class Candid

	def self.create(script, options = {})

        options[:id]    ||= 'svg'
        options[:style] ||= nil
        options[:data]  ||= nil

        # TODO  options[:file_destination] ||= nil
        # TODO  options[:quality]          ||= nil # (the defaults depend on the file_type & are handled by phantomjs)
        # TODO  options[:file_type]        ||= 'png'
        # TODO  options[:assets]           ||= nil # so users can load their own libraries (! wow, great idea) and then can get rid of vendor dir

		system "phantomjs #{candid_gem_root_path}/bin/candid.js \
		 #{options[:id]} \
		 #{candid_gem_root_path}\
		 #{script} \
		 #{options[:data]} \
		 #{options[:style]}" 
	end

    private
	def self.candid_gem_root_path
	  File.join(File.dirname(File.expand_path(__FILE__)), '..')
	end

end


