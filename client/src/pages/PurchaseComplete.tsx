import React from 'react';
import confetti from 'canvas-confetti';

const PurchaseComplete = () => {

    // Lanza el confetti al finalizar la compra
    React.useEffect(() => {
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
        });

        //  Puedes hacer más cosas aquí, como mostrar un mensaje de confirmación o redirigir al usuario
        // alert('¡Gracias por tu compra!');

    }, []); // Ejecutar solo una vez

    return (
        <div className='container-fluid d-flex flex-column min-vh-100 purchase_complete'>
            <div className="row flex-grow-1" style={{ height: '50%' }}>
                <div className="col d-flex align-items-center justify-content-center">
                    <h2>Gracias por realizar tu compra y confiar en nostros!</h2>
                </div>
            </div>
        </div>
    );
}

export default PurchaseComplete;
