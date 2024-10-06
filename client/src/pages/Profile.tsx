import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import library from '../assets/img/library.jpg'

const Profile = () => {

    const { user_id, userName, userEmail, profileImage } = useSelector((state: RootState) => state.auth)


    return (
        <div className="container-fluid" style={{ backgroundImage: `url(${library})`, backgroundSize: 'cover' }}>
            <div className="row">
                <div className="col profile-container">
                    <div className="card w-75 m-auto p-4 my-3"  style={{ background: 'rgba(255, 255, 255, 0.5)' }}>
                        <h3 className='text-center py-3'>Profile User</h3>
                        <div className='w-25 m-auto'>
                            <img className='img-fluid' src={`http://localhost:5000/uploads/${profileImage}`} alt="" />
                        </div>
                        <div className='text-start'>
                            <hr />
                            <h4>Id del usuario: <br /><span className='text-success'>{user_id}</span></h4>
                            <hr />
                            <h4>Nombre del usuario: <br /><span className='text-success'>{userName}</span></h4>
                            <hr />
                            <h4>Email del usuario: <br /><span className='text-success'>{userEmail}</span></h4>
                            <hr />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Profile