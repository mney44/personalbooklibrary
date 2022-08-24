const express = require('express');
const axios = require('axios');
const config = require('config');
const router = express.Router();
const {check, validationResult} = require('express-validator');

const Booklist = require('../../models/Booklist');



// get api/booklist

router.get('/booklist', async (req, res)=>{
    try {
       const booklist =  await Booklist.findOne({
           title: req.title.id
       }).populate('title');
       if(!booklist){
           return res.status(400).json({msg: 'No book exists'});
       }
       res.json(title);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }
});

// Post api/booklist

router.post(
    '/',
    check('title','title is required')
    .not()
    .isEmpty(),
    check('comment','comment is required')
    .not()
    .isEmpty(),
    async(req,res)=>{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors. array() });
        }

        const {
            title,
            comment
        } = req.body;

        // build a booklist object
        const booklistFields = {};
        booklistFields.title = req.title.id;
        if(title) booklistFields.title = title;
        if(comment) booklistFields.comment = comment;
    try {
       let booklist = await Booklist.findOne({title:req.title.id});
       if(booklist){
        //    update
        booklist = await Booklist.findOneAndUpdate(
            {title:req.title.id},
            {$set: booklistFields},
            {new: true}
        );
        return res.json(booklist)
       }


    //    create
    booklist = new Booklist(booklistFields);
    await booklist.save();
    res.json(booklist)
       
    } catch (err) {
     console.error(err.message);
     res.status(500).send('Server Error');   
    }
   
        
    }


);

// route get api/booklist/title/:title_id

router.get(
    '/booklist/:booklist_id',
   
    async ({ params: { title } }, res) => {
      try {
        const booklist = await booklist.findOne({
          title: title
        }).populate('user');
  
        if (!booklist) return res.status(400).json({ msg: 'booklist not found' });
  
        return res.json(booklist);
      } catch (err) {
        console.error(err.message);
        return res.status(500).json({ msg: 'Server error' });
      }
    }
  );

  // @route    DELETE api/booklist
// @desc     Delete booklist

router.delete('/', async (req, res) => {
    try {
      // Remove booklist
      await Booklist.deleteMany({ title: req.title.id });

  
      res.json({ msg: 'Title deleted' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });

  // @route    PUT api/booklist/booklist
// @desc     Add booklist

router.put(
    '/booklist',

        check('title', 'Title is required').not().isEmpty(),
        check('description', 'Description is required').not().isEmpty(),
        check('startDate', 'Start date is required') .not().isEmpty(),
        check('endDate', 'End date is required').not().isEmpty(),

    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      const {
        title,
       comment

      } = req.body;
  
      const newTitle = {
        title,
        comment
        

      };
  
      try {
        const booklist = await Booklist.findOne({ user: req.user.id });
  
        booklist.title.unshift(newTitle);
  
        await booklist.save();
  
        res.json(booklist);
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }
    }
  );




module.exports = router;