
require 'json'

class Candid

	def self.create(scripts = [], styles = [], data_src = [], include_js = [], options = {})
     
        options[:id]         ||= 'svg'
        options[:file_name]  ||= options[:file_name]
        options[:ext]        ||= 'png'
        # include_js           ||= []
        options[:quality]     # phantomjs will handle the default quality in this case

        ### TODO ###
        # options[:local_assets] ||= options[:local_assets].to_s
        # options[:ext_assets]   ||= options[:ext_assets].to_s
        # options[:images]       ||= options[:images].to_s

        include_js = include_js.map{ |data| include_raw_data(data) }


        p include_js

        
        styles     = styles.to_s
        scripts    = scripts.to_s
        include_js = include_js.to_s
        data_src   = data_src.to_s
        options    = hash_to_s(options)
        
        
        system 'phantomjs', candid_gem_root_path+'/bin/candid.js', candid_gem_root_path, scripts, styles, data_src, include_js, options
      
	  
		# TODO return file path of new image
		# return options[:file_destination]
	end


    def self.save_image(name, dest_path)
        # TODO 
    end

    private
    def self.include_raw_data(raw_data)

        data         = raw_data[:data].to_json
        reference_as = raw_data[:reference_as]
        file_name    = 'test.js'
        
        # unless Dir.exist? tmp_dir
        #     make_tmp_dir
        # end

        Dir.chdir(tmp_dir) do 
            File.open(file_name, "wb") do |file|
                file << "var #{reference_as} = #{data};"
            end
        end

        return "#{tmp_dir}/#{file_name}"
    end




    def self.hash_to_s(h)
        "{" + (h.map {|k, v|   "\""+k.to_s+"\"" + ':'"\""+v+"\"" }).join(",") + "}"
    end

    private
    def self.make_tmp_dir
        Dir.mkdir(tmp_dir)
    end

    private
	def self.candid_gem_root_path
    # returns /var/lib/gems/2.3.0/gems/candid-x.y.z/lib/..
	  File.join(File.dirname(File.expand_path(__FILE__)), '..')
	end

    private
    def self.tmp_dir
      '/tmp'
    end



end




