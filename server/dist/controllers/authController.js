var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import User from '../models/User.js'; // Asegúrate de que la ruta sea correcta
export const registerNewUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        console.log('Datos recibidos:', req.body); // Esto te mostrará qué datos se están recibiendo
        const { name, email, password } = req.body;
        const profile_image = (_a = req.file) === null || _a === void 0 ? void 0 : _a.filename; // Asumiendo que la imagen es guardada correctamente
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
        yield newUser.save(); // Guardar el nuevo usuario en la base de datos
        res.status(201).json({
            message: 'User registered successfully',
            user: newUser,
        });
    }
    catch (error) {
        console.error('Error registrando el usuario:', error);
        res.status(500).json({ message: 'Error registrando el usuario' });
    }
});
export const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        // Busca el usuario por email
        const user = yield User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Email o contraseña incorrectos' });
        }
        // validación password
        if (user.password === password) {
            res.status(200).json({ message: 'Login exitoso', id: user._id, name: user.name, email: user.email });
            return;
        }
    }
    catch (error) {
        console.error('Error durante el login:', error);
        res.status(500).json({ message: 'Error durante el login' });
    }
});
// * NOTAS:
// No necesitas crear tablas en MongoDB como lo harías en bases de datos SQL. En su lugar, MongoDB utiliza colecciones y documentos.
// En Mongo DB el controlador es quien se encarga de hacer las consultas y manejar los datos 
