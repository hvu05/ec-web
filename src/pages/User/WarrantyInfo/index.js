import React from 'react';
import './WarrantyInfo.scss';

function WarrantyInfo() {
    const warrantyData = [
        {
            id: 1,
            productName: 'iPhone 15 Pro',
            purchaseDate: '2024-01-10',
            warrantyEnd: '2027-01-10',
            status: 'active',
            type: 'Extended Warranty',
            coverage: ['Hardware defects', 'Battery replacement', 'Screen damage']
        },
        {
            id: 2,
            productName: 'MacBook Air M2',
            purchaseDate: '2023-12-15',
            warrantyEnd: '2024-12-15',
            status: 'active',
            type: 'Standard Warranty',
            coverage: ['Manufacturing defects', 'Hardware failures']
        },
        {
            id: 3,
            productName: 'AirPods Pro',
            purchaseDate: '2023-11-20',
            warrantyEnd: '2024-11-20',
            status: 'expired',
            type: 'Standard Warranty',
            coverage: ['Manufacturing defects']
        }
    ];

    const getStatusColor = (status) => {
        return status === 'active' ? '#28a745' : '#dc3545';
    };

    const getStatusText = (status) => {
        return status === 'active' ? 'Active' : 'Expired';
    };

    const isExpired = (endDate) => {
        return new Date(endDate) < new Date();
    };

    return (
        <div className="warranty-info">
            <h2>Warranty Information</h2>
            <p className="description">
                View and manage warranty coverage for your purchased products
            </p>

            <div className="warranty-summary">
                <div className="summary-card">
                    <h3>Active Warranties</h3>
                    <div className="summary-number">
                        {warrantyData.filter(w => w.status === 'active').length}
                    </div>
                </div>
                <div className="summary-card">
                    <h3>Expired Warranties</h3>
                    <div className="summary-number expired">
                        {warrantyData.filter(w => w.status === 'expired').length}
                    </div>
                </div>
            </div>

            <div className="warranty-list">
                {warrantyData.map((warranty) => (
                    <div key={warranty.id} className={`warranty-card ${warranty.status}`}>
                        <div className="warranty-header">
                            <div className="product-info">
                                <h3>{warranty.productName}</h3>
                                <span className="warranty-type">{warranty.type}</span>
                            </div>
                            <div className="status-badge" style={{color: getStatusColor(warranty.status)}}>
                                {getStatusText(warranty.status)}
                            </div>
                        </div>

                        <div className="warranty-details">
                            <div className="detail-row">
                                <span className="label">Purchase Date:</span>
                                <span className="value">{warranty.purchaseDate}</span>
                            </div>
                            <div className="detail-row">
                                <span className="label">Warranty End:</span>
                                <span className={`value ${isExpired(warranty.warrantyEnd) ? 'expired' : ''}`}>
                                    {warranty.warrantyEnd}
                                </span>
                            </div>
                        </div>

                        <div className="coverage-section">
                            <h4>Coverage Includes:</h4>
                            <ul className="coverage-list">
                                {warranty.coverage.map((item, index) => (
                                    <li key={index}>
                                        <i className="fa-solid fa-check"></i>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="warranty-actions">
                            {warranty.status === 'active' && (
                                <button className="btn btn--primary">File Claim</button>
                            )}
                            {warranty.status === 'expired' && (
                                <button className="btn btn--secondary">Extend Warranty</button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default WarrantyInfo; 