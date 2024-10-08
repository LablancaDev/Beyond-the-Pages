import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom';

const BookDetail = () => { 

    const location = useLocation();

    const { book } = location.state || {}; // acceso al estado, resuperando el libro seleccionado

    console.log("Contenido del libro:", book)

    return (
        <div className='container-fluid back-cart'>
            <div className="row justify-content-center">
                <div className="col-12 col-md-8 col-lg-6 bookDetail">
                    <div className="card card-detail shadow-lg">
                        <div className="image-container text-center p-3">
                            <img
                                className='img-fluid book-image zoom-on-hover'
                                src={book.cover}
                                alt={book.title}
                                style={{ maxHeight: '400px', objectFit: 'contain' }}
                            />
                            <p className="text-muted small">{book.key}</p>
                        </div>
                        <div className="card-body text-center">
                            <h4 className='py-1'>{book.title}</h4>
                            <p className="text-muted">{book.description}</p>
                            <div className='d-flex justify-content-center align-items-center gap-2'>
                                <h6 className='text-secondary text-decoration-line-through'>{book.previousPrice}€</h6>
                                <h6 className='text-light bg-danger rounded p-1'>-5%</h6>
                            </div>
                            <div className='text-center mt-2'>
                                <h5 className='text-danger'>{book.price}€</h5>
                                <p className='text-success'>ENVÍO GRATIS! <i className="bi bi-truck"></i></p>
                            </div>
                            <Link to={'home'}>
                                <button className="btn btn-primary mt-2">Volver a la tienda</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default BookDetail   