class Candid

	def self.create(script_path, options = {})

        options[:id]         ||= 'svg'
        options[:style_path] ||= nil
        options[:data_path]  ||= nil

		system "phantomjs #{candid_gem_path}/assets/candid.js \
		 #{options[:id]} \
		 #{candid_gem_path}/.. \
		 #{script_path} \
		 #{options[:data_path]} \
		 #{options[:style_path]}" \
	end

    private
	def self.candid_gem_path
	  File.join(File.dirname(File.expand_path(__FILE__)))
	end

end


