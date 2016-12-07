
# Candid

Candid is a Ruby gem that renders images from JavaScript with PhantomJS.

Candid comes with D3.js installed.

To use Candid you must have PhantomJS install on your machine.

- http://phantomjs.org/

PhantomJS can also be installed via a Ruby Gem 

- https://github.com/colszowka/phantomjs-gem


### How to use:

```
require 'candid'

Candid.snapshot(["somescript.js"], 
                ["somestyle.css"], 
                [{data: [1, 3, 10], reference_as:'data'}], 
                options = {})
```

`somescript.js` must contain the `window.onload` function

    
### How to use (Rails):

Include the following in your Gemfile

`gem 'candid'`

### Options and Defaults:

`options = {id: 'svg', file_name: 'my_image', ext: 'png'}`

**:id**

- Defaults to 'svg'
  
**:file_name**

- Defaults to the id
  
**:ext**

- Defaults to 'png'
- Can also be 'jpeg' or 'gif'

**:file_dest**

- Defaults to working directory


