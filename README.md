# Candid

Candid is a Ruby gem that renders images from SVGs via PhantomJS. 

Candid comes with D3.js, JQuery, and Chart.js installed.

**See the Examples directory to get started!**

### How To:
To create an image Candid requires at least one JavaScript file, and can also a accept stylesheets, variables, and additional options. 

```
require 'candid'

img = Candid.snapshot(["somescript.js"], ["somestyle.css"], {data: [1, 3, 10]}, options: {id: 'chart'})
```
Candid will return a hash containing the image name, and the file path (including the name).

#### Note: `somescript.js` must contain the `window.onload` function. This ensures that your JS gets executed.

### Rails:
Include the following in your Gemfile

`gem 'candid'`

Always set the `rails` option to 'true' in snapshot options, like so:

`img = Candid.snapshot(["somescript.js"], ["somestyle.css"], {data: [1, 3, 10]}, options: {rails: 'true'})`

Candid will automatically save to `public/tmp` in your application's directory.

### Options and Defaults:
Ex. 
`options = {id: 'svg', file_name: 'my_image', ext: 'png', rails: 'false'}`


**:save**
- Defaults to 'tmp'
- Can also be 'local' if you want to save somewhere in your working directory.

**:id**
- This is the id of the svg you are saving as an image.
- Defaults to 'svg'.

**:ext**
- Defaults to 'png'.
- Can also be 'jpeg' or 'gif'.

**:file_name**
- Defaults to a random temporary name.
  
**:file_dest**
- Defaults to 'tmp'.

**:rails**
- Defaults to 'false'.
- Can also be 'true'.

### Developed by HealthIM Inc.
### Primary Author: Julia Karkowska

