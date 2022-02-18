const {} = require('../models');

const thoughtsController = {
    addThought({ params, body}, res) {
        console.log(params); 
        thoughtsController.create(body)
        
    }
}


module.exports = thoughtsController;