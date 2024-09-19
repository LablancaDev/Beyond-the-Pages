import mongoose, { Schema } from 'mongoose';
// Definir el esquema del Usuario
const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    profile_image: {
        type: String,
        required: false,
    },
});
// Crear y exportar el modelo de Usuario
const User = mongoose.model('User', UserSchema);
export default User;
