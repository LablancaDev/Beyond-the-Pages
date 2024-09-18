import { Request, Response } from 'express';
import User from '../models/User.js'; // Asegúrate de que la ruta sea correcta

export const registerNewUser = async (req: Request, res: Response) => {
    try {
        console.log('Datos recibidos:', req.body); // Esto te mostrará qué datos se están recibiendo
        const { name, email, password } = req.body;
        const profile_image = req.file?.filename; // Asumiendo que la imagen es guardada correctamente

        // Agregamos un log para verificar los datos que se van a insertar
        console.log('Datos a insertar:', { name, email, password, profile_image });

        // Asegúrate de que todos los campos están presentes
        if (!name || !email || !password || !profile_image) {
            res.status(400).json({ message: 'Tiene que rellenar todos los campos para el registro' });
            return;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            res.status(400).json({ message: "El formato del email no es válido" });
            return;
        }

        if (password.length < 6) {
            res.status(400).json({ message: "La contraseña debe tener al menos 6 caracteres" });
            return;
        }
         

        const newUser = new User({
            name,
            email,
            password, // Asegúrate de hashear la contraseña aquí
            profile_image,
        });

        await newUser.save(); // Guardar el nuevo usuario en la base de datos

        res.status(201).json({
            message: 'User registered successfully',
            user: newUser,
        });
    } catch (error) {
        console.error('Error registrando el usuario:', error);
        res.status(500).json({ message: 'Error registrando el usuario' });
    }
};

export const loginUser = async (req:Request, res:Response) => {
    
    try {
        const {email, password} = req.body;

        // Busca el usuario por email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: 'Email o contraseña incorrectos' });
        }

        // validación password
        if(user.password === password){
            res.status(200).json({message: 'Login exitoso', id: user._id, name: user.name, email: user.email })
            return
        }

        
    } catch (error) {
        console.error('Error durante el login:', error);
        res.status(500).json({ message: 'Error durante el login' });
    }
}

// * NOTAS:
// No necesitas crear tablas en MongoDB como lo harías en bases de datos SQL. En su lugar, MongoDB utiliza colecciones y documentos.
// En Mongo DB el controlador es quien se encarga de hacer las consultas y manejar los datos 
