import Notification from "../models/notification.model.js";

//Create Notification api
export const createNotification = async (req, res) => {
  try {
    const data = {};

    if (req.body.title) data.title = req.body.title;
    if (req.body.description) data.description = req.body.description;
    if (req.body.type) data.type = req.body.type;
    if (req.body.state) data.state = req.body.state;
    if (req.body.issued_by) data.issued_by = req.body.issued_by;
    if (req.body.date_issued) data.date_issued = req.body.date_issued;
    if (req.body.valid_till) data.valid_till = req.body.valid_till;
    if (req.body.eligibility) data.eligibility = req.body.eligibility;
    if (req.body.link) data.link = req.body.link;
    if (req.body.tags) data.tags = req.body.tags;

    const notification = new Notification(data);
    const savedNotification = await notification.save();

    res.status(201).json({
      success: true,
      message: "Notification created successfully",
      data: savedNotification,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};


// GET all notifications
export const getAllNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find().sort({ date_issued: -1 }); // latest first
    res.status(200).json({
      success: true,
      count: notifications.length,
      data: notifications,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
