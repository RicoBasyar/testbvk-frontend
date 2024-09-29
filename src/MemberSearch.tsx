import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const MemberSearch: React.FC = () => {
    const [name, setName] = useState('');
    const [members, setMembers] = useState<any[]>([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [size] = useState(5);
    const navigate = useNavigate();

    const handleSearch = async (newPage: number = 0) => {
        setLoading(true);
        setError('');
        setPage(newPage);

        try {
            const response = await axios.get(`http://localhost:8080/testBVK/member/listMember`, {
                params: { name, page: newPage, size },
            });
            setMembers(response.data);
        } catch (error) {
            setError('Failed to fetch members.');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleNextPage = () => {
        handleSearch(page + 1);
    };

    const handlePreviousPage = () => {
        if (page > 0) {
            handleSearch(page - 1);
        }
    };

    const handleViewDetail = (email: string) => {
        navigate(`/member-detail?email=${encodeURIComponent(email)}`);
    };

    return (
        <div className="container mt-4">
            <h2>Search Members</h2>
            <div className="input-group mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Enter member name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <button className="btn btn-primary" onClick={() => handleSearch()}>Search</button>
            </div>

            {loading && <p>Loading...</p>}

            {error && <p className="text-danger">{error}</p>}

            {members.length > 0 && (
                <>
                    <table className="table table-striped">
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Position</th>
                            <th>View Member</th>
                        </tr>
                        </thead>
                        <tbody>
                        {members.map((member) => (
                            <tr key={member.email}>
                                <td>{member.name}</td>
                                <td>{member.email}</td>
                                <td>{member.position}</td>
                                <td>
                                    <button
                                        className="btn btn-info"
                                        onClick={() => handleViewDetail(member.email)}
                                    >
                                        View Details
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    <div className="d-flex justify-content-between">
                        <button className="btn btn-secondary" onClick={handlePreviousPage} disabled={page === 0}>
                            Previous
                        </button>
                        <button className="btn btn-secondary" onClick={handleNextPage}>
                            Next
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default MemberSearch;
