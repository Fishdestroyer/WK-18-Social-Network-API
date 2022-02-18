const { Thoughts, Users } = require('../models');

//Set up thoughts controller
const thoughtsController = {
     //Get all thoughts
    getAllThoughts(req, res) {
        Thoughts.find({})
        .populate({
            path: 'thoughts',
            select: '-__v'
        })
        .select('__v')
        .sort({_id: -1})
        .then(dbThoughtsData => res.json(dbThoughtsData))
        .catch(err => {
            console.log(err);
            res.status(400);
        });
    },

    //Get a singular thought
    getThoughtsById({ params}, res) {
        Thoughts.findOne({ _id: params.id })
        .populate({
            path: 'thoughts',
            select: '-__v'
        })
        .select('__v')
        .sort({_id: -1})
        .then(dbThoughtsData => res.json(dbThoughtsData))
        .catch(err => {
            console.log(err);
            res.status(400);
        });
    },
    
    //Create/ add a new thought
    addThoughts({ params, body}, res) {
        console.log(params); 
        Thoughts.create(body)
        .then(({ _id }) => {
            return Users.fidOneAndUpdate(
                { _id: params.thoughtId },
                { $push: { thoughts: _id} },
                {new: true}
            );
        })
        .then(dbThoughtsData => {
            console.log(dbThoughtsData);
            if( !dbThoughtsData) {
                res. status(404).json({message: 'Ruht ro raggy, that dont work'});
                return;
            } 
            res.json(dbThoughtsData);
        })
        .catch(err => res.json(err));
    },

    //Add a reaction to a thought with validator

    addReaction({ params, body}, res) {
        Thoughts.findOneAndUpdate(
            { _id: params.thoughtId },
            { $push: { reaction: body} },
            {new: true, runValidators: true})
            .populate({
                path: 'reactions',
                select: '-__v'
            })
            .select('__v')
            .then(dbThoughtsData => res.json(dbThoughtsData))
            .catch(err => {
                console.log(err);
                res.status(400);
            });
    },

    //Update a Thought

    updateThought({ params, body }, res) {
        Thoughts.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
          .then(dbThoughtsData => {
            if (!dbThoughtsData) {
              res.status(404).json({ message: 'No thought found with this id!' });
              return;
            }
            res.json(dbThoughtsData);
          })
          .catch(err => res.json(err));
      },
    
      //Delete a thought by id
      deleteThought({ params }, res) {
        Thoughts.findOneAndDelete({ _id: params.id })
          .then(dbThoughtsData => res.json(dbThoughtsData))
          .catch(err => res.json(err));
      },

      //Delete a reaction to a thought
      deleteReaction({ params }, res) {
        Thoughts.findOneAndUpdate({ _id: params.thoughtid }, {$pull: {reactions: {reactionId: params.reactionId} } }, {new: true})
        .then(dbThoughtsData => {
            if (!dbThoughtsData) {
              res.status(404).json({ message: 'No thought found with this id!' });
              return;
            }
            res.json(dbThoughtsData);
          })
          .catch(err => res.json(err));
      }
};


module.exports = thoughtsController;