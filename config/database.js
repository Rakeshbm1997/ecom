const mongoose = require('mongoose');

const MANGO_URI= process.env.MANGO_URI


mongoose.connect(MANGO_URI)
  .then(() => console.log('Connected!'))
  .catch(()=> console.log('Error in connection!'));



  exports.connect =() => {
    mongoose.connect(MANGO_URI)
    .then(() => console.log('Connected!'))
    .catch(()=> console.log('Error in connection!'));

  }