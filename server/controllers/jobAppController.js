const JobApp = require("../models/JobApp");

exports.getJobApps = async (req, res, next) => {
  try {
    const { status, search, sort, page = 1, limit = 10 } = req.query;
    let query = { userId: req.userId, isDeleted: false };

    if (status && status !== "all") query.status = status.toLowerCase();

    if (search) {
      query.$or = [
        { company: { $regex: search, $options: "i" } },
        { role: { $regex: search, $options: "i" } },
      ];
    }

    const sortOrder = sort === "oldest" ? "dateApplied" : "-dateApplied";

    const skip = (Number(page) - 1) * Number(limit);

    const jobApps = await JobApp.find(query)
      .sort(sortOrder)
      .skip(skip)
      .limit(Number(limit));

    const total = await JobApp.countDocuments(query);
    const totalPages = Math.ceil(total / Number(limit));

    res.json({
      total,
      totalPages,
      data: jobApps,
      currentPage: Number(page),
    });
  } catch (error) {
    next(error);
  }
};

exports.createJobApp = async (req, res, next) => {
  try {
    const jobApp = await JobApp.create({
      ...req.body,
      status: req.body.status.toLowerCase(),
      userId: req.userId,
    });
    res.status(201).json(jobApp);
  } catch (error) {
    next(error);
  }
};

exports.updateJobApp = async (req, res, next) => {
  try {
    const jobApp = await JobApp.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      req.body,
      { new: true }
    );

    if (!jobApp)
      return res.status(404).json({ message: "Job application not found" });

    res.json(jobApp);
  } catch (error) {
    next(error);
  }
};

exports.deleteJobApp = async (req, res, next) => {
  try {
    const jobApp = await JobApp.findOneAndUpdate(
      {
        _id: req.params.id,
        userId: req.userId,
      },
      { isDeleted: true },
      { new: true }
    );
    if (!jobApp)
      return res.status(404).json({ message: "Job application not found" });
    res.json({ message: "Job application deleted" });
  } catch (error) {
    next(error);
  }
};

exports.getJobSummary = async (req, res, next) => {
  const userId = req.userId;
  try {
    const jobs = await JobApp.find({ userId: userId, isDeleted: false });

    const summary = {
      total: jobs.length,
      applied: 0,
      interview: 0,
      rejected: 0,
      offer: 0,
    };

    jobs.forEach((job) => {
      if (summary[job.status] !== undefined) {
        summary[job.status]++;
      }
    });

    res.status(200).json(summary);
  } catch (err) {
    next(err);
  }
};
