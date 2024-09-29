import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const MemberDetail: React.FC = () => {
    const [member, setMember] = useState<any>(null);
    const [error, setError] = useState('');
    const location = useLocation();

    const query = new URLSearchParams(location.search);
    const email = query.get('email');

    useEffect(() => {
        const fetchMemberDetail = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/testBVK/member/detailMember`, {
                    params: { email },
                });
                setMember(response.data);
                setError('');
            } catch (error) {
                setError('Failed to fetch member details.');
                console.error(error);
            }
        };

        if (email) {
            fetchMemberDetail();
        }
    }, [email]);

    if (error) {
        return <p className="text-danger">{error}</p>;
    }

    const imagePath = member ? member.picture.replace(/\\/g, '/') : '';
    const baseUrl = 'http://localhost:8080/';

    return (
        <div className="container mt-4">
            {member ? (
                <div>
                    <h2>Member Detail</h2>
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">{member.name}</h5>
                            <p className="card-text"><strong>Email:</strong> {member.email}</p>
                            <p className="card-text"><strong>Position:</strong> {member.position}</p>
                            <p className="card-text"><strong>Join Date:</strong> {member.joinDate}</p>
                            {imagePath && (
                                <img
                                    src={`${baseUrl}${imagePath}`}
                                    alt={member.name}
                                    className="img-fluid"
                                    style={{ maxWidth: '360px', height: '480px' }}
                                />
                            )}
                        </div>
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default MemberDetail;
