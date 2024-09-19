import { Request, Response } from 'express';
import User from '../models/User.js'; // Asegúrate de que la ruta sea correcta

export const registerNewUser = async (req: Request, res: Response) => {
    try {
        console.log('Datos recibidos:', req.body); // datos recibidos

        // Se extraen los datos del cuerpo de la solicitud
        const { name, email, password } = req.body; 
        // También se extrae el nombre del archivo de la imágen, que es el archivo subido a través de Multer (un middleware de Node.js para manejar archivos).
        const profile_image = req.file?.filename;

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

        // Se pasan los datos (name, email, password, profile_image) al constructor del modelo con los datos que vienen de la solicitud, creando una instancia de User.
        //  Esto sería similar a crear un objeto de una clase en lenguajes de programación orientados a objetos. como en Java
        const newUser = new User({
            name,
            email,
            password, 
            profile_image,
        });

        await newUser.save(); // El usuario recién creado se guarda en la base de datos MongoDB usando el método save(). Mongoose convierte ese objeto en un documento que se guarda en MongoDB.
        // MongoDB asignará automáticamente un ID único a este nuevo registro, y los datos serán almacenados.

        // Si todo funciona bien, se responde con un código HTTP 201 (Created) y un mensaje de éxito. También se devuelve el usuario recién creado.
        res.status(201).json({
            message: 'User registered successfully',
            user: newUser,
        });
    } catch (error) {
        console.error('Error registrando el usuario:', error);
        res.status(500).json({ message: 'Error registrando el usuario' });
    }
};

export const loginUser = async (req: Request, res: Response) => {

    try {
        const { email, password } = req.body;

        // Busca el usuario por email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: 'Email o contraseña incorrectos' });
        }

        // validación password
        if (user.password === password) {
            res.status(200).json({
                message: 'Login exitoso',
                id: user._id,
                name: user.name,
                email: user.email,
                profileImage: user.profile_image,
            })
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

// Estoy usando Mongoose, una librería de Node.js que facilita la interacción con MongoDB mediante la definición de modelos y esquemas.
// Mongoose traduce las interacciones en el código (como newUser.save()) en comandos de MongoDB que se ejecutan en la base de datos.
