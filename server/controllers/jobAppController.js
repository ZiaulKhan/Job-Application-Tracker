const JobApp = require("../models/JobApp");

exports.getJobApps = async (req, res) => {
  try {
    const { status, search, sort, page = 1, limit = 3 } = req.query;
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
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.createJobApp = async (req, res) => {
  try {
    const jobApp = await JobApp.create({
      ...req.body,
      status: req.body.status.toLowerCase(),
      userId: req.userId,
    });
    res.status(201).json(jobApp);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create job application" });
  }
};

exports.updateJobApp = async (req, res) => {
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
    console.error(error);
    res.status(500).json({ message: "Failed to update job application" });
  }
};

exports.deleteJobApp = async (req, res) => {
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
    console.error(error);
    res.status(500).json({ message: "Failed to delete job application" });
  }
};
