// utils/cloudinaryConfig.js
import { v2 as cloudinary } from 'cloudinary';

// Configure cloudinary
cloudinary.config({ 
    cloud_name: 'dctskqld7', 
    api_key: '217948398682429', 
    api_secret: process.env.CLOUDINARY_API_SECRET // Store this in environment variables
});

/**
 * Optimizes an image URL with Cloudinary transformations
 * @param {string} publicId - The public ID of the image
 * @param {Object} options - Transformation options
 * @returns {string} - Optimized image URL
 */
export const getOptimizedImageUrl = (publicId, options = {}) => {
    const defaultOptions = {
        fetch_format: 'auto',
        quality: 'auto'
    };
    
    const mergedOptions = { ...defaultOptions, ...options };
    
    return cloudinary.url(publicId, mergedOptions);
};

/**
 * Creates a cropped image URL
 * @param {string} publicId - The public ID of the image
 * @param {number} width - Width of the crop
 * @param {number} height - Height of the crop
 * @returns {string} - Cropped image URL
 */
export const getCroppedImageUrl = (publicId, width = 500, height = 500) => {
    return cloudinary.url(publicId, {
        crop: 'auto',
        gravity: 'auto',
        width,
        height,
        fetch_format: 'auto',
        quality: 'auto'
    });
};

export default cloudinary;