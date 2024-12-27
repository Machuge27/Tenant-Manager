// ErrorBox.js
import React from 'react';
import PropTypes from 'prop-types';
import { X } from 'lucide-react'
import '../boxes/ErrorBox'; // For styling (optional)

const ErrorBox = ({ message, type = 'error', onClose }) => {
    const boxStyles = {
        error: { backgroundColor: '#ffdddd', borderColor: '#f44336', color: '#d32f2f' },
        warning: { backgroundColor: '#fff8e1', borderColor: '#ff9800', color: '#f57c00' },
        info: { backgroundColor: '#e3f2fd', borderColor: '#2196f3', color: '#1976d2' },
        success: { backgroundColor: '#e8f5e9', borderColor: '#4caf50', color: '#388e3c' },
    };

    const style = boxStyles[type] || boxStyles.error;

    return (
        <div className='error-box' style={{ ...style, padding: '.3rem', marginTop: '1.5rem', border: '1px solid', borderRadius: '5px', position: 'relative' }}>
            {onClose && (
                <div
                    onClick={onClose}
                    className='close-btn'
                    style={{
                        color: style.color,
                    }}
                >
                    <X />
                </div>
            )}
            <span>{message}</span>
        </div>
    );
};

// Prop validation
ErrorBox.propTypes = {
    message: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['error', 'warning', 'info', 'success']),
    onClose: PropTypes.func,
};

export default ErrorBox;
