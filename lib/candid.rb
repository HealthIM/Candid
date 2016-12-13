require 'json'
require 'tempfile'
require 'phantomjs'

class Candid

	def self.snapshot(scripts = [], styles = [], include_js = [], options = {})
     
        options[:id]         ||= 'svg'
        options[:file_name]  ||= options[:file_name]
        options[:ext]        ||= 'png'

        options =  hash_to_s(options)

        include_js = include_js.each_with_index.map  { |data, i| store_in_tmp(data) }
    
        Phantomjs.run(candid_gem_root_path+'/lib/candid.js', 
                        candid_gem_root_path,
                        scripts.to_s, 
                        styles.to_s, 
                        include_js.to_s, 
                        options)  { |line| 
                            puts line 
                        }
    end

    ### DEPRECIATED ###
    def self.create(scripts = [], styles = [], data_src =[], include_js = [], options = {})
        snapshot scripts, styles, include_js, options
    end

    private
    def self.store_in_tmp(raw_data)
        data         = raw_data[:data].to_json
        reference_as = raw_data[:reference_as]
        
        file = Tempfile.new('candid')
        file.write "var #{reference_as} = #{data};"
        file.close
        
        file.path
    end

    private
    def self.hash_to_s(h)
        "{" + (h.map {|k, v| "\"" + k.to_s + "\"" + ":\""+v+"\""   }).join(",") + "}"
    end

    private
	def self.candid_gem_root_path
	  File.join(File.dirname(File.expand_path(__FILE__)), '..')
	end

end

