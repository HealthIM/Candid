require 'json'
require 'tempfile'
require 'tmpdir'

class Candid

	def self.snapshot(scripts = [], styles = [], include_js = [], options = {})
      
        options[:id]    ||= 'svg'
        options[:ext]   ||= 'png'
        options[:save]  ||= 'tmp'
        options[:rails] ||= 'false'

        if options[:save] == 'local'
            options[:file_dest] ||= "."
            options[:file_name] ||= File.basename Tempfile.new('candid')
        else # save in tmp
            tmp_file = Tempfile.new('candid')
            if options[:rails] == 'true'
                options[:file_dest] = 'public/tmp'
            else
                options[:file_dest] = File.dirname tmp_file
            end
            options[:file_name] = File.basename tmp_file
        end

        options[:file_name] = options[:file_name] + '.' + options[:ext] 

        new_path  = options[:file_dest] +'/'+ options[:file_name]  
        new_path  = ""  
        file_name = options[:file_name] 
        
        options =  hash_to_s(options)
        tmp_vars = include_js.map { |data| store_tmp_var(data[0], data[1]) }

        system 'phantomjs', candid_gem_root_path+'/lib/candid.js', 
                            candid_gem_root_path,
                            scripts.to_s, 
                            styles.to_s, 
                            tmp_vars.to_s, 
                            options

        { path: new_path, name: file_name }
    end


    private
    def self.store_tmp_var(k, v)
        data = v.to_json
        ref  = k.to_s

        file = Tempfile.new('candid')
        file.write "var #{ref} = #{data};"
        file.close
        
        file.path
    end

    def self.tmp_img_path
        file = Tempfile.new('candid')
        file.close 
        file.path
    end

    private
    def self.hash_to_s(h)
        if h == {}
            "{}"
        else
            "{" + (h.map {|k, v| "\"" + k.to_s + "\"" + ":\""+v+"\""   }).join(",") + "}"
        end
    end

    private
	def self.candid_gem_root_path
	  File.join(File.dirname(File.expand_path(__FILE__)), '..')
	end


end

