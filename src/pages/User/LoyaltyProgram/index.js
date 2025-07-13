import React from 'react';
import './LoyaltyProgram.scss';

function LoyaltyProgram() {
    const loyaltyData = {
        currentPoints: 1250,
        nextTier: 'Gold',
        pointsToNextTier: 250,
        currentTier: 'Silver',
        benefits: [
            'Free shipping on all orders',
            '5% cashback on purchases',
            'Early access to sales',
            'Birthday rewards'
        ],
        recentActivity: [
            { date: '2024-01-15', action: 'Purchase', points: '+150', description: 'Order #12345' },
            { date: '2024-01-10', action: 'Redeem', points: '-500', description: 'Free shipping voucher' },
            { date: '2024-01-05', action: 'Purchase', points: '+200', description: 'Order #12340' }
        ]
    };

    const getTierColor = (tier) => {
        switch(tier.toLowerCase()) {
            case 'bronze': return '#cd7f32';
            case 'silver': return '#c0c0c0';
            case 'gold': return '#ffd700';
            case 'platinum': return '#e5e4e2';
            default: return '#6c757d';
        }
    };

    return (
        <div className="loyalty-program">
            <h2>Loyalty Program</h2>
            
            <div className="loyalty-overview">
                <div className="points-card">
                    <h3>Current Points</h3>
                    <div className="points-display">{loyaltyData.currentPoints}</div>
                    <p className="tier-info">
                        Current Tier: <span style={{color: getTierColor(loyaltyData.currentTier)}}>{loyaltyData.currentTier}</span>
                    </p>
                </div>

                <div className="progress-card">
                    <h3>Progress to Next Tier</h3>
                    <div className="progress-bar">
                        <div 
                            className="progress-fill" 
                            style={{width: `${((loyaltyData.currentPoints - 1000) / 250) * 100}%`}}
                        ></div>
                    </div>
                    <p>{loyaltyData.pointsToNextTier} points to {loyaltyData.nextTier}</p>
                </div>
            </div>

            <div className="benefits-section">
                <h3>Current Benefits</h3>
                <div className="benefits-grid">
                    {loyaltyData.benefits.map((benefit, index) => (
                        <div key={index} className="benefit-item">
                            <i className="fa-solid fa-check"></i>
                            <span>{benefit}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="activity-section">
                <h3>Recent Activity</h3>
                <div className="activity-list">
                    {loyaltyData.recentActivity.map((activity, index) => (
                        <div key={index} className="activity-item">
                            <div className="activity-date">{activity.date}</div>
                            <div className="activity-details">
                                <span className="activity-action">{activity.action}</span>
                                <span className="activity-description">{activity.description}</span>
                            </div>
                            <div className={`activity-points ${activity.points.startsWith('+') ? 'positive' : 'negative'}`}>
                                {activity.points}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default LoyaltyProgram; 