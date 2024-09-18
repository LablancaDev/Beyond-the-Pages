import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://valencianodavid:oOifYGKPSMINipKN@cluster0.qhe81.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {

        });
        console.log('MongoDB conectado...');
    } catch (error) {
        console.error('Error conectando a MongoDB:', error);
        process.exit(1); // Terminar el proceso si hay un error
    }
};

export default connectDB;
