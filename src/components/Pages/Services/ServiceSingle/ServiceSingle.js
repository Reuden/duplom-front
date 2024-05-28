import React, { useContext, useEffect, useState } from 'react';
import { BsStarFill, BsStarHalf } from 'react-icons/bs';
import { Link, useLoaderData } from 'react-router-dom';
import './ServiceSingle.css';
import { AuthContext } from '../../../../context/AuthProvider';
import toast, { Toaster } from 'react-hot-toast';

const ServiceSingle = () => {
    const { user } = useContext(AuthContext);
    const service = useLoaderData();
    const { _id, title, image_url, rating, location, amenities, details } = service;
    const [reviews, setReviews] = useState([]);

    // Логування для перевірки даних
    console.log('Service:', service);
    console.log('Service ID:', _id);

    useEffect(() => {
        if (_id) {
            fetch(`http://localhost:5000/reviews/${_id}`)
                .then(res => res.json())
                .then(data => {
                    console.log('Fetched reviews:', data); // Додано для логування відгуків
                    setReviews(data);
                })
                .catch(error => console.error('Error fetching reviews:', error));
        }
    }, [_id]);

    const handleSubmit = event => {
        event.preventDefault();
        const form = event.target;
        const review = form.review.value;
        const data = {
            userId: user.uid,
            userName: user.displayName,
            userImg: user.photoURL,
            serviceId: _id,
            serviceTitle: title,
            serviceImgURL: image_url,
            details: review
        }
        fetch('http://localhost:5000/reviews/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((data) => {
                toast.success('Review Added Successfully');
                form.reset();
                setReviews(prevReviews => [...prevReviews, data]);  // Додайте новий відгук до списку
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    return (
        <div>
            <div className="hero hero-service mb-3" style={{ backgroundImage: `url("${image_url}")` }}>
                <div className="hero-overlay bg-opacity-40"></div>
                <div className="hero-content ml-20 text-neutral-content">
                    <div className="my-16">
                        <h1 className="mb-5 text-5xl font-bold">{title}</h1>
                        <div className='flex items-center text-xl font-semibold'>
                            <BsStarFill className='color-red mr-1'/><BsStarFill className='color-red mr-1'/><BsStarFill className='color-red mr-1'/><BsStarFill className='color-red mr-1'/><BsStarHalf className='color-red mr-2'/> {rating?.number}
                        </div>
                    </div>
                </div>
            </div>
            <div className='mx-24'>
                <div className='mt-10'>
                    <h2 className='font-semibold text-2xl'>Адреса:</h2>
                    <div className='w-full md:w-6/12 my-2'>
                        <div>{location}</div>
                    </div>
                </div>
                <div className="divider"></div>
                {amenities ? <div>
                    <div className='mb-2'>
                    <h2 className='font-semibold text-2xl mb-3'>Інформація про заклад</h2>
                    {details?.specialties && 
                    <div className='my-2'>
                        <h2 className='font-semibold text-md mb-2'>Specialties</h2>
                        {details.specialties}    
                    </div>}
                    {details?.history && 
                    <div className='my-2'>
                        <h2 className='font-semibold text-md mb-2'>Історія</h2>
                        {details.history}    
                    </div>}
                </div>
                <div className="divider"></div>
                </div> : <></>}
                
                <div>
                    <h2 className='font-semibold text-2xl mb-2'>Відгуки</h2>
                    <div>
                        {reviews.length ? reviews.map(review => 
                            <div key={review._id} className="card bg-base-100 shadow-xl my-4">
                                <div className="card-body">
                                    <>  
                                        <p className="card-title text-sm">
                                            <div className="avatar">
                                                <div className="w-8 rounded-full">
                                                    <img src={review.userImg} alt=""/>
                                                </div>
                                            </div>
                                            {review.userName} <BsStarFill className='color-red'/><BsStarFill className='color-red'/><BsStarFill className='color-red'/><BsStarFill className='color-red'/><BsStarHalf className='color-red'/>
                                        </p>
                                    </>
                                    <p>{review.details}</p>
                                </div>
                            </div>) : <h4>No review yet</h4>  
                        }
                    </div>
                </div>
                <div className="divider"></div>
                <div className='mb-5'>
                    <h2 className='font-semibold text-2xl my-3'>Add Reviews</h2>
                    {
                    user?.uid ? 
                    <form onSubmit={handleSubmit}>
                        <div className="form-control mb-4 w-full md:w-6/12">
                            <textarea className="textarea textarea-bordered" name='review' placeholder="Write review"></textarea>
                        </div>
                        <input type="submit" className='btn red-button' value="Submit review" />
                        <Toaster />
                    </form>: 
                    <Link to="/login" className='btn red-button'>You must login to add a review</Link> 
                    
                    }
                    
                </div>
            </div>
        </div>
    );
};

export default ServiceSingle;
