
@img = Candid.snapshot(["app/assets/javascripts/chart.js"], 
                       ["app/assets/stylesheets/chart.css"], 
                       {data: [1 ,3, 4], title: 'Bar Chart'},
                       options = {save: 'tmp', ext: 'png', rails: 'true'}) 