const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async(req, res) => {
  // find all tags
  try{
    const tagsData = await Tag.findAll({
      
  // be sure to include its associated Products
      include: [{model: Product}],
    });
    //throws a 404 error if there is no data in tagsData
    if (!tagsData){
      res.status(404).json({message: 'But there was nothing there.'})
    }
    res.status(200).json(tagsData);
  } catch(err){
    res.status(500).json(err); }
  // be sure to include its associated Product data
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  try{
    tagsData = await Tag.findByPk(req.params.id, {
    // be sure to include its associated Products
      include: [{model: Product}],
    })
  
    if (!tagsData){
      res.status(404).json({message: 'But there was nothing there.'})
      return; 
    } 
    res.status(200).json(tagsData);
  } catch(err){
    res.status(500).json(err);
  }
  // be sure to include its associated Product data
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const tagsData = await Tag.create(req.body);

    res.status(200).json(tagsData);
  } catch(err){
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try{
    await Tag.update(
      {
        id: req.body.id,
      },
      {
        where: req.params.tag_name,
      }
    )
      res.status(200).json('Data update complete');
  } catch(err){
    if (!tagsData){
      res.status(404).json({message: 'But there was nothing there.'})
      return; 
    } 
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    await Tag.destroy({
      where: {
        id: req.params.id
      }
    }) .then(data => {
      res.status(200).json('You have destroyed the data');
    });
  } catch(err){
    res.status(500).json(err);
  }
});

module.exports = router;
