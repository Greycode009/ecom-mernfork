import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Badge from './Badge';

const ProductCard = ({ product }) => {
    const { slug, title, price, images = [], tags = [], isFeatured } = product;
    const image = images?.[0] || null; // Get first image from array

    // Extract features with defaults (backward compatible)
    const instant = product.features?.instant !== false;
    const verified = product.features?.verified !== false;
    const support = product.features?.support !== false;

    // Map tag names to badge variants
    const getTagVariant = (tag) => {
        const tagLower = tag.toLowerCase();
        if (tagLower === 'ai') return 'ai';
        if (tagLower === 'entertainment') return 'entertainment';
        if (tagLower === 'education') return 'education';
        if (tagLower === 'vpn') return 'vpn';
        if (tagLower === 'productivity') return 'productivity';
        return 'default';
    };

    return (
        <Link to={`/product/${slug}`} className="group block">
            <div className="relative h-full bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden border border-neutral-200/60 shadow-lg shadow-neutral-900/5 transition-all duration-500 hover:shadow-2xl hover:shadow-primary-500/20 hover:-translate-y-2 hover:border-primary-300/60">
                {/* Top Badge - POPULAR only */}
                {isFeatured && (
                    <div className="absolute top-3 right-3 z-10">
                        <div className="px-2.5 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold rounded-full shadow-lg">
                            ⭐ POPULAR
                        </div>
                    </div>
                )}

                {/* Image Container with Gradient Overlay */}
                <div className="relative h-56 bg-gradient-to-br from-primary-50 via-primary-100 to-purple-50 overflow-hidden">
                    {/* Animated gradient background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-400/20 via-purple-400/20 to-pink-400/20 animate-gradient-shift" />

                    <img
                        src={image || 'https://via.placeholder.com/400x400?text=No+Image'}
                        alt={title}
                        className="relative w-full h-full object-contain p-6 transition-all duration-500 group-hover:scale-110 group-hover:rotate-2"
                    />

                    {/* Gradient overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Content */}
                <div className="p-5 relative">
                    {/* Glassmorphism effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/60 to-white/40 backdrop-blur-xl -z-10" />

                    <h3 className="font-display text-xl font-bold text-neutral-900 mb-3 line-clamp-2 group-hover:text-primary-600 transition-colors duration-300 leading-tight">
                        {title}
                    </h3>

                    {/* Price with premium styling */}
                    <div className="flex items-baseline gap-2 mb-4">
                        <span className="text-3xl font-black bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
                            Rs {price.toLocaleString()}
                        </span>
                    </div>

                    {/* Tags */}
                    {tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mb-4">
                            {tags.slice(0, 3).map((tag) => (
                                <Badge key={tag} variant={getTagVariant(tag)}>
                                    {tag}
                                </Badge>
                            ))}
                            {tags.length > 3 && (
                                <Badge variant="default">+{tags.length - 3}</Badge>
                            )}
                        </div>
                    )}

                    {/* Features/Benefits - Conditionally displayed */}
                    {(instant || verified || support) && (
                        <div className="flex items-center gap-3 text-xs text-neutral-600 mb-4">
                            {instant && (
                                <div className="flex items-center gap-1">
                                    <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span>Instant</span>
                                </div>
                            )}
                            {verified && (
                                <div className="flex items-center gap-1">
                                    <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span>Verified</span>
                                </div>
                            )}
                            {support && (
                                <div className="flex items-center gap-1">
                                    <svg className="w-4 h-4 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span>24/7 Support</span>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Hover CTA with gradient */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-r from-primary-600 via-purple-600 to-pink-600 text-white text-center py-4 font-bold text-lg transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 shadow-2xl">
                    <span className="flex items-center justify-center gap-2">
                        View Details
                        <svg className="w-5 h-5 animate-bounce-x" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                    </span>
                </div>

                {/* Corner accent */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary-400/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
        </Link>
    );
};

ProductCard.propTypes = {
    product: PropTypes.shape({
        slug: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        image: PropTypes.string,
        tags: PropTypes.arrayOf(PropTypes.string),
        isFeatured: PropTypes.bool,
        features: PropTypes.shape({
            instant: PropTypes.bool,
            verified: PropTypes.bool,
            support: PropTypes.bool,
        }),
    }).isRequired,
};

export default ProductCard;
