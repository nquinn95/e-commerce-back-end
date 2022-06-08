const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  try{
    const categoriesData = await Category.findAll({
      
  // be sure to include its associated Products
      include: [{
        model: Product
      }],
    });
    //throws a 404 error if there is no data in categoriesData
    if (!categoriesData){
      res.status(404).json( 'But there was nothing there.')
    }
    res.status(200).json(categoriesData);
  } catch(err){
    res.status(500).json(err);
  }

});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  try{
  categoriesData = await Category.findByPk(req.params.id, {
  // be sure to include its associated Products
    include: [{model: Product}],
  })

  if (!categoriesData){
    res.status(404).json({message: 'But there was nothing there.'})
    return; 
  } 
  res.status(200).json(categoriesData);
} catch(err){
  res.status(500).json(err);
}

  
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const categoriesData = await Category.create(req.body);

    res.status(200).json(categoriesData);
  } catch(err){
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try{
    await Category.update(
      {
        id: req.body.id,
      },
      {
        where: req.params.categories_id,
      }
    )
      res.status(200).json('Data update complete');
  } catch(err){
    if (!categoriesData){
      res.status(404).json({message: 'But there was nothing there.'})
      return; 
    } 
  }

});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    await Category.destroy({
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
