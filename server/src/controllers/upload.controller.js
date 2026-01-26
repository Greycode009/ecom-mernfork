import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, "../../uploads");
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadsDir);
    },
    filename: (req, file, cb) => {
        // Generate unique filename: timestamp-random-originalname
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        const ext = path.extname(file.originalname);
        const baseName = path.basename(file.originalname, ext)
            .replace(/[^a-zA-Z0-9]/g, "-")
            .substring(0, 50);
        cb(null, `${uniqueSuffix}-${baseName}${ext}`);
    },
});

// File filter - only allow images
const fileFilter = (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp", "image/svg+xml"];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Only image files (JPEG, PNG, GIF, WebP, SVG) are allowed"), false);
    }
};

// Create multer instance
const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB max
    },
});

// Upload single image
export const uploadImage = [
    upload.single("image"),
    (req, res) => {
        try {
            if (!req.file) {
                return res.status(400).json({ message: "No image file provided" });
            }

            // Return the URL path to the uploaded image
            const imageUrl = `/uploads/${req.file.filename}`;

            res.json({
                success: true,
                url: imageUrl,
                filename: req.file.filename,
                originalName: req.file.originalname,
                size: req.file.size,
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
];

// Upload multiple images
export const uploadMultipleImages = [
    upload.array("images", 5), // Max 5 images
    (req, res) => {
        try {
            if (!req.files || req.files.length === 0) {
                return res.status(400).json({ message: "No image files provided" });
            }

            const images = req.files.map((file) => ({
                url: `/uploads/${file.filename}`,
                filename: file.filename,
                originalName: file.originalname,
                size: file.size,
            }));

            res.json({
                success: true,
                images,
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
];

// Delete an uploaded image
export const deleteImage = async (req, res) => {
    try {
        const { filename } = req.params;

        // Security check - only allow deleting from uploads directory
        const filePath = path.join(uploadsDir, filename);

        if (!filePath.startsWith(uploadsDir)) {
            return res.status(400).json({ message: "Invalid file path" });
        }

        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
            res.json({ success: true, message: "Image deleted" });
        } else {
            res.status(404).json({ message: "Image not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Error handling middleware for multer
export const handleUploadError = (err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        if (err.code === "LIMIT_FILE_SIZE") {
            return res.status(400).json({ message: "File too large. Max size is 5MB" });
        }
        return res.status(400).json({ message: err.message });
    }
    if (err) {
        return res.status(400).json({ message: err.message });
    }
    next();
};
