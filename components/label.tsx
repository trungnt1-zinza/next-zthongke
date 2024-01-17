import React from 'react';

interface LabelProps {
    labels: string[];
}

const Labels: React.FC<LabelProps> = ({ labels }) => {
    return (
        <div>
            {labels.map((label, index) => (
                <div key={index}>{label}</div>
            ))}
        </div>
    );
};
export default Labels;
