import { Notification } from "../../Model/user/index.js";

function timeSince(date) {
  const secs = Math.floor((new Date() - new Date(date)) / 1000);
  if (secs < 3600)  return `${Math.floor(secs / 60)} minutes ago`;
  if (secs < 86400) return `${Math.floor(secs / 3600)} hours ago`;
  return `${Math.floor(secs / 86400)} days ago`;
}

export async function getNotifications(req, res) {
  try {
    const notifs = await Notification.findAll({
      where: { user_id: req.user.id },
      order: [["created_at", "DESC"]],
      limit: 20,
    });
    res.json(notifs.map(n => ({ ...n.dataValues, time_ago: timeSince(n.created_at) })));
  } catch (err) { res.status(500).json({ message: err.message }); }
}

export async function markRead(req, res) {
  try {
    await Notification.update({ is_read: true }, { where: { id: req.params.id, user_id: req.user.id } });
    res.json({ message: "Marked read" });
  } catch (err) { res.status(500).json({ message: err.message }); }
}