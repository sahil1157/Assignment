import mongoose from "mongoose";

// here the db for jobSchema is created...

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    companyName: {
        type: String,
        required: true
    },
    job_role: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["Pending", "Accepted", "Rejected"],
        default: "Pending"
    },
    salary: {
        type: String,
        required: true
    },
    description: {
        required: true,
        type: String
    },
    workhours: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        match: [/.+@.+\..+/, "Please enter a valid email address"]
    },
    website: {
        type: String,
        required: true,
        match: [/^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/.*)?$/, "Please enter a valid website URL"]

    },
    skillsRequired: {
        type: [String], 
        required: true
    }
}, { timestamps: true });

const Job = mongoose.model("Job", jobSchema);

export default Job;
