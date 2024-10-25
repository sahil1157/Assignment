import mongoose from "mongoose";
import Job from "../models/jobSchemas.js";


// sending all the job schemas to frontend...
export const jobLists = async (req, res, next) => {
    try {
        const getAllJobs = await Job.find().sort({ updatedAt: -1 })
        if (getAllJobs.length === 0) {
            return res.status(404).json({ message: "No jobs found", valid: false });
        }
        if (getAllJobs) {
            return res.status(200).json({ message: getAllJobs, valid: true })
        }
    } catch (error) {
        next({
            message: error
        })
    }
}



export const createNewJob = async (req, res, next) => {
    try {

        // validating if any of the fields are empty or not...
        const { title, companyName, job_role, date, location, type, status, salary, workhours, email, website, description, skillsRequired } = req.body;

        // Validating if any of the fields are missing
        if (!companyName || !job_role || !date || !location || !type || !status || !salary || !workhours || !email || !website || !description || !title || !skillsRequired) {
            return next({
                message: "All the fields are mandatory.",
                status: 400
            });
        }

        // Creating a new job document and saving it to the database...
        const insertDb = await Job.create({
            companyName,
            job_role,
            date,
            location,
            type,
            status,
            salary,
            workhours,
            email,
            website,
            description,
            title,
            skillsRequired
        })

        //if document was created successfully, then status 200 is passed....
        if (insertDb) {
            res.status(200).json({ valid: true, message: "Job role successfully created" });
        }

    } catch (error) {
        //during the jobschema creation, if any error occurs then passed to next middleware..
        next({
            message: error.message || "An error occurred while creating the job",
            status: 500
        });
    }
};

// editing a job...

export const editJob = async (req, res, next) => {
    // the default value and as well as as new value is extracted....
    const { id, companyName, job_role, date, location, type, status, salary, workhours, email, website, description, title, skillsRequired } = req.body
    try {

        const updateFields = {
            id,
            companyName,
            job_role,
            date,
            location,
            type,
            status,
            salary,
            workhours,
            email,
            website,
            description,
            title,
            skillsRequired,
            createdAt: Date.now()
        }
        // updating the filed...
        const updateField = await Job.findByIdAndUpdate(
            id,
            { $set: updateFields },
            { new: true }
        )

        if (!updateField) {
            return next({
                message: "Updation failed...",
                status: 500
            })
        }

        res.status(200).json({
            data: updateField,
            message: "Successfully updated",
            valid: true
        })

    } catch (error) {
        next({
            message: error
        })
    }
}


// controller for deleting job..
export const deleteJob = async (req, res, next) => {
    try {
        const { deleteId } = req.body
        if (!deleteId) {
            res.status(400).json({ message: "DeleteId not found", valid:false })
        }
        const deletedItem = await Job.findByIdAndDelete(deleteId)
        if (deletedItem) {
            return res.status(200).json({ message: "Job removed successfully", valid: true })

        }
    } catch (error) {
        next({ message: error })
    }
}