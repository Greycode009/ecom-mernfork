import PropTypes from 'prop-types';

const Badge = ({ children, variant = 'default', className = '' }) => {
    const variants = {
        default: 'bg-neutral-100 text-neutral-700',
        primary: 'bg-primary-100 text-primary-700',
        secondary: 'bg-secondary-100 text-secondary-700',
        accent: 'bg-accent-100 text-accent-700',
        ai: 'bg-purple-100 text-purple-700',
        entertainment: 'bg-pink-100 text-pink-700',
        education: 'bg-blue-100 text-blue-700',
        vpn: 'bg-green-100 text-green-700',
        productivity: 'bg-orange-100 text-orange-700',
    };

    return (
        <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant]} ${className}`}
        >
            {children}
        </span>
    );
};

Badge.propTypes = {
    children: PropTypes.node.isRequired,
    variant: PropTypes.oneOf(['default', 'primary', 'secondary', 'accent', 'ai', 'entertainment', 'education', 'vpn', 'productivity']),
    className: PropTypes.string,
};

export default Badge;
