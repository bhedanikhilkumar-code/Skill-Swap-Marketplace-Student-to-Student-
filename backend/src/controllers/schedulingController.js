import Session from '../models/Session.js';
import User from '../models/User.js';
import { fail, success } from '../utils/response.js';

const dayIndex = { SUN: 0, MON: 1, TUE: 2, WED: 3, THU: 4, FRI: 5, SAT: 6 };

const parseSlots = (availability = []) =>
  availability.flatMap((a) =>
    (a.slots || []).map((slot) => {
      const [s, e] = slot.split('-');
      return { day: (a.day || '').toUpperCase(), start: s, end: e, timezone: a.timezone || 'UTC' };
    })
  );

export const commonSlots = async (req, res) => {
  const { userA, userB, weekStart } = req.query;
  const a = await User.findById(userA || req.user.id);
  const b = await User.findById(userB);
  if (!a || !b) return fail(res, 'Users not found', null, 404);
  const slotsA = parseSlots(a.availability);
  const slotsB = parseSlots(b.availability);
  const overlaps = [];
  for (const sa of slotsA) {
    for (const sb of slotsB) {
      if (sa.day !== sb.day) continue;
      const start = sa.start > sb.start ? sa.start : sb.start;
      const end = sa.end < sb.end ? sa.end : sb.end;
      if (start < end) overlaps.push({ day: sa.day, startUtc: start, endUtc: end, requesterTimezone: req.query.timezone || 'UTC' });
    }
  }
  return success(res, { weekStart, overlaps });
};

export const sessionIcs = async (req, res) => {
  const session = await Session.findById(req.params.id);
  if (!session) return fail(res, 'Session not found', null, 404);
  const start = new Date(session.scheduledAt);
  const end = new Date(start.getTime() + session.durationMinutes * 60000);
  const fmt = (d) => d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  const ics = `BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nUID:session-${session._id}@skillswap\nDTSTAMP:${fmt(new Date())}\nDTSTART:${fmt(start)}\nDTEND:${fmt(end)}\nSUMMARY:Skill Swap Session\nDESCRIPTION:${session.notes || 'Skill swap'}\nEND:VEVENT\nEND:VCALENDAR`;
  res.setHeader('Content-Type', 'text/calendar');
  return res.send(ics);
};
