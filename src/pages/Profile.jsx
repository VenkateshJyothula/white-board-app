import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classes from './Profile.module.css';

const Profile = () => {
    const [data, setData] = useState(null);
    const [canvases, setCanvases] = useState([]);
    const [redirect, setRedirect] = useState(false);
    const [canvasName, setCanvasName] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("TOKEN");
        if (!token) {
            setRedirect(true);
            return;
        }

        const getProfileAndCanvases = async () => {
            try {
                const profileRes = await fetch('https://backend-li1v.onrender.com/api/users/profile', {
                    method: 'GET',
                    headers: {
                        'Authorization': token,
                        'Content-Type': 'application/json',
                    }
                });

                if (!profileRes.ok) {
                    throw new Error(`Profile fetch error: ${profileRes.status} ${profileRes.statusText}`);
                }

                const profileData = await profileRes.json();
                setData(profileData);

                const canvasRes = await fetch('https://backend-li1v.onrender.com/api/canvas', {
                    method: 'GET',
                    headers: {
                        'Authorization': token,
                        'Content-Type': 'application/json',
                    }
                });

                if (!canvasRes.ok) {
                    throw new Error(`Canvas fetch error: ${canvasRes.status} ${canvasRes.statusText}`);
                }

                const canvasData = await canvasRes.json();
                setCanvases(canvasData);
            } catch (error) {
                setRedirect(true);
                console.error('Error:', error.message);
            }
        };

        getProfileAndCanvases();
    }, []);

    const handleCreateCanvas = async () => {
        if (!canvasName.trim()) return;
        
        try {
            const token = localStorage.getItem("TOKEN");
            const response = await fetch('https://backend-li1v.onrender.com/api/canvas', {
                method: 'POST',
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: canvasName }),
            });

            if (!response.ok) {
                throw new Error('Failed to create canvas');
            }

            const newCanvas = await response.json();
            setCanvases((prev) => [...prev, newCanvas]);
            setCanvasName('');
        } catch (error) {
            alert('Error creating canvas');
            console.log('Create Canvas Error:', error.message);
        }
    };

    const handleDelete = async (id) => {
        try {
            const token = localStorage.getItem("TOKEN");
            const response = await fetch(`https://backend-li1v.onrender.com/api/canvas/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                setCanvases((prev) => prev.filter((canvas) => canvas._id !== id));
            } 
            else{
                alert("Failed to delete Canvas");
            }
        } catch (error) {
            console.error('Error deleting canvas:', error);
        }
    };

    const handleOpen = (id) => {
        navigate(`/canvas/${id}`);
    };

    if (redirect) {
        navigate('/');
    }

    return (
        <div className={classes.pageContainer}>
            {data ? (
                <div>
                    <h2 className={classes.greeting}>Hi, {data.name}!</h2>
                    
                    {/* Create Canvas */}
                    <div className={classes.createCanvas}>
                        <input
                            type="text"
                            placeholder="New Canvas Name"
                            value={canvasName}
                            onChange={(e) => setCanvasName(e.target.value)}
                            className={classes.inputField}
                        />
                        <button onClick={handleCreateCanvas} className={classes.createButton}>
                            Create Canvas
                        </button>
                    </div>

                    <h3 className={classes.canvasTitle}>Your Canvases:</h3>
                    {canvases.length > 0 ? (
                        <div className={classes.canvasGrid}>
                            {canvases.map((canvas) => (
                                <div key={canvas._id} className={classes.canvasCard}>
                                    <h4 className={classes.canvasName}>{canvas.name}</h4>
                                    <p className={classes.canvasDate}>
                                        Created: {new Date(canvas.createdAt).toLocaleString()}
                                    </p>
                                    <div className={classes.buttonGroup}>
                                        <button 
                                            className={classes.openButton} 
                                            onClick={() => handleOpen(canvas._id)}
                                        >
                                            Open
                                        </button>
                                        <button 
                                            className={classes.deleteButton} 
                                            onClick={() => handleDelete(canvas._id)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className={classes.noCanvas}>No canvases available</p>
                    )}
                </div>
            ) : (
                <p className={classes.loadingText}>Loading...</p>
            )}
        </div>
    );
};

export default Profile;
