Gem::Specification.new do |s|
  s.name        = 'candid'
  s.version     = '1.0.0'
  s.date        = '2017-02-04'
  s.summary     = 'Renders images from JavaScript with PhantomJS.'
  s.description = 'Candid is a Ruby gem that renders images from JavaScript with PhantomJS.'
  s.authors     = ["Julia Karkowska"]
  s.email       = 'julia@healthim.com'
  s.files       = ["lib/candid.rb", "lib/candid.js", 
                  "vendor/d3.min.js", 
                  "vendor/jquery-3.1.1.min.js",
                  "vendor/Chart.min.js",
                  "vendor/Chart.bundle.min.js"]
  s.homepage    = 'https://github.com/HealthIM/Candid'
  s.license     = 'MIT'
end

