import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        order: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Order",
            required: true,
        },
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true,
        },
        // Snapshot of product info at purchase time
        productTitle: {
            type: String,
            required: true,
        },
        productImage: {
            type: String,
            default: "",
        },
        // Plan details
        planId: {
            type: String,
            required: true, // "monthly", "3months", "yearly"
        },
        planLabel: {
            type: String,
            required: true, // "1 Month", "3 Months", "1 Year"
        },
        durationInDays: {
            type: Number,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        currency: {
            type: String,
            default: "NPR",
        },
        // Subscription timing
        startDate: {
            type: Date,
            required: true,
        },
        endDate: {
            type: Date,
            required: true,
        },
        // Status tracking
        status: {
            type: String,
            enum: ["active", "expiring", "expired", "cancelled"],
            default: "active",
        },
        // Notification tracking
        notificationsSent: {
            sevenDayWarning: {
                type: Boolean,
                default: false,
            },
            threeDayWarning: {
                type: Boolean,
                default: false,
            },
            expiryNotice: {
                type: Boolean,
                default: false,
            },
        },
        // Activation details (copied from order)
        activationDetails: {
            email: { type: String, default: "" },
            phone: { type: String, default: "" },
            username: { type: String, default: "" },
            uid: { type: String, default: "" },
        },
    },
    {
        timestamps: true,
    }
);

// Index for efficient queries
subscriptionSchema.index({ user: 1, status: 1 });
subscriptionSchema.index({ endDate: 1, status: 1 }); // For cron job to find expiring
subscriptionSchema.index({ "notificationsSent.sevenDayWarning": 1, endDate: 1 });

// Virtual to check if expiring soon (within 7 days)
subscriptionSchema.virtual("isExpiringSoon").get(function () {
    if (this.status !== "active") return false;
    const daysUntilExpiry = Math.ceil((this.endDate - new Date()) / (1000 * 60 * 60 * 24));
    return daysUntilExpiry <= 7 && daysUntilExpiry > 0;
});

// Virtual for days remaining
subscriptionSchema.virtual("daysRemaining").get(function () {
    const days = Math.ceil((this.endDate - new Date()) / (1000 * 60 * 60 * 24));
    return Math.max(0, days);
});

subscriptionSchema.set("toJSON", { virtuals: true });
subscriptionSchema.set("toObject", { virtuals: true });

const Subscription = mongoose.model("Subscription", subscriptionSchema);

export default Subscription;
