import express from 'express'
import { createNewJob, deleteJob, editJob, jobLists } from '../controllers/JobController.js'

export const jobRouting = express.Router()

jobRouting.post("/add", createNewJob)
jobRouting.get("/getJobs", jobLists)
jobRouting.put("/edit",editJob)
jobRouting.delete("/delete",deleteJob)
