import mongoose, { Schema, Document } from 'mongoose';

// * En MongDB hay que definir modelos, este es el modelo de Users, define las propiedades de un user y los tipos de datos que se guardarán en la bd mongo

// Definir una interfaz para el modelo de Usuario
export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    profile_image?: string; // Opcional si no siempre es requerido
}

// Definir el esquema del Usuario
const UserSchema: Schema = new Schema({
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
        required: false, // La imagen no es obligatoria
    },
});

// Crear y exportar el modelo de Usuario
const User = mongoose.model<IUser>('User', UserSchema);
export default User;
