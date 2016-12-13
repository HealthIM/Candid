
# Candid

Candid is a Ruby gem that renders images from JavaScript with PhantomJS. The PhantomJs gem is used to install PhantomJS on your system.

Candid comes with D3.js, JQuery, and Chart.js installed.

### How to use:

```
require 'candid'

Candid.snapshot(["somescript.js"], 
                ["somestyle.css"], 
                [{data: [1, 3, 10], reference_as:'data'}], 
                options = {})
```

### Note:
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


