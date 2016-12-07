
# Candid

Candid is a Ruby gem that renders images from JavaScript with PhantomJS.

Candid comes with D3.js installed.

To use Candid you must have PhantomJS install on your machine.

- http://phantomjs.org/


### How to use:

```
require 'candid'

Candid.snapshot(["somescript.js"], 
                ["somestyle.css"], 
                [{data: [1, 3, 10], reference_as:'data'}], 
                options = {})
```

    
### How to use (Rails):

Include the following in your Gemfile

`gem 'candid'`

### Options and Defaults:

`options = {id: 'svg', file_name: 'my_image', ext: 'png'}`

**id**
	- defaults to 'svg'
  
**file_name**
	- defaults to the id
  
**ext**
	- defaults to 'png'

**file_dest**
	- defaults to working directory
