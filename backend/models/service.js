const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true, validate:{
    validator: function(value){
        return value.trim() !== '';
    },
    message:"Le nom est invalide"
  }},
  price: { type: Number, required: true, min: 0, validate:{
    validator: function(value){
        return value > 0;
    },
    message:"Le prix doit être supérieur à 0"
  }},
  committee: { type: Number, required: true, min: 0, max: 100,validate:{
    validator:function(value){
        return value > 0 && value <= 100;
    },
    message:"La commission doit être entre 0 et 100"
  }},
  duration: { type: Number, required: true, min: 0,validate:{
    validator:function(value){
        return value > 0;
    },
    message:"La durrée doit être supérieur à 0"
  }},
  discount: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'discount',
    validate: {
      isAsync: true,
      validator: async function(value) {
        try {
          if (value===null) {
            return true
          }
          const discount = await mongoose.model('Discount').findById(value);
          return discount && (discount.is_service === true || discount.is_service === 'true');
        } catch (err) {
          console.log(err);
          return false;
        }
      },
      message: 'L\' offre est uniquement pour les services'
    }
  },
}
);

module.exports = mongoose.model("Service", serviceSchema);
