import mongoose from "mongoose";
export const { ObjectId } = mongoose.Types;


const productSchema = mongoose.Schema({
    nombre: {type:String, required: true, trim: true}, 
    precio: {type:Number, min:[1.00, "Precio debe ser al menos 1 peso"], required: true, trim: true}, 
    disponible: Boolean,
    detalles: {
        color: {type:String, required: true, trim: true}, 
        talla: {type:String, required: true, trim: true},
    },
},
    { timestamps : true}
);


 
productSchema.set("toJSON", {
    transform(doc,ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
    },
});

export const Product = mongoose.model("Product", productSchema);