// Dynamic calendar data and helpers used by the Calendar page and AI context.

export interface Meeting {
  id: string;
  date: string;
  time: string;
  title: string;
  attendee: string;
  type: string;
  duration: string;
}

export interface CalendarSuggestion {
  leadName: string;
  suggestedTime: string;
  reason: string;
}

export interface CalendarDay {
  date: string;
  dayLabel: string;
  dayNumber: number;
  isToday: boolean;
}

export interface CalendarSnapshot {
  monthLabel: string;
  todayDate: string;
  weekDays: CalendarDay[];
  timeSlots: string[];
  meetings: Meeting[];
  todaysMeetings: Meeting[];
  bookedTimeSlots: string[];
  aiMeetingSuggestion: CalendarSuggestion;
}

const timeSlots = [
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
];

const meetingsDb: Meeting[] = [
  {
    id: "meeting-vikram-review",
    date: "2026-03-24",
    time: "10:00 AM",
    title: "Vikram Industries - Project Review",
    attendee: "Rajesh Mehta",
    type: "Video Call",
    duration: "45 min",
  },
  {
    id: "meeting-shah-consultation",
    date: "2026-03-24",
    time: "2:00 PM",
    title: "Shah Constructions - Initial Consultation",
    attendee: "Priya Shah",
    type: "In-Person",
    duration: "60 min",
  },
  {
    id: "meeting-desai-proposal",
    date: "2026-03-24",
    time: "4:00 PM",
    title: "Desai Group - Proposal Discussion",
    attendee: "Anita Desai",
    type: "Video Call",
    duration: "30 min",
  },
  {
    id: "meeting-greenbuild-demo",
    date: "2026-03-25",
    time: "11:00 AM",
    title: "GreenBuild Infra - Product Demo",
    attendee: "Neha Gupta",
    type: "Video Call",
    duration: "30 min",
  },
  {
    id: "meeting-precast-budget",
    date: "2026-03-26",
    time: "3:00 PM",
    title: "Precast Solutions - Budget Review",
    attendee: "Suresh Iyer",
    type: "In-Person",
    duration: "45 min",
  },
  {
    id: "meeting-jindal-ops-sync",
    date: "2026-03-27",
    time: "12:00 PM",
    title: "Jindal Ops - Dispatch Sync",
    attendee: "Arun Malhotra",
    type: "Video Call",
    duration: "30 min",
  },
  {
    id: "meeting-infra-kickoff",
    date: "2026-03-31",
    time: "1:00 PM",
    title: "InfraBuild - Kickoff Planning",
    attendee: "Karan Bedi",
    type: "In-Person",
    duration: "60 min",
  },
  {
    id: "meeting-aurora-estimate",
    date: "2026-04-02",
    time: "11:00 AM",
    title: "Aurora Housing - Estimate Review",
    attendee: "Meera Nair",
    type: "Video Call",
    duration: "45 min",
  },
];

const aiMeetingSuggestionDb = {
  leadName: "Neha Gupta",
  date: "2026-03-25",
  time: "11:00 AM",
  reason: "Her response rate is highest during morning hours.",
};

function startOfDay(date: Date): Date {
  const next = new Date(date);
  next.setHours(0, 0, 0, 0);
  return next;
}

function addDays(date: Date, days: number): Date {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

function formatIsoDate(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function formatMonthLabel(date: Date): string {
  return new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric" }).format(date);
}

function formatDayLabel(date: Date): string {
  return new Intl.DateTimeFormat("en-US", { weekday: "short" }).format(date);
}

function formatSuggestionLabel(date: Date, time: string): string {
  const day = new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(date);
  return `${day} ${time}`;
}

function parseIsoDate(date: string): Date {
  const [year, month, day] = date.split("-").map(Number);
  return new Date(year, month - 1, day);
}

export function getCalendarSnapshot(baseDate = new Date()): CalendarSnapshot {
  const today = startOfDay(baseDate);
  const weekDays: CalendarDay[] = Array.from({ length: 7 }, (_, index) => {
    const date = addDays(today, index);
    return {
      date: formatIsoDate(date),
      dayLabel: formatDayLabel(date),
      dayNumber: date.getDate(),
      isToday: index === 0,
    };
  });

  const meetings = meetingsDb;

  const todayDate = formatIsoDate(today);
  const todaysMeetings = meetings.filter((meeting) => meeting.date === todayDate);
  const bookedTimeSlots = todaysMeetings.map((meeting) => meeting.time);

  const suggestionDate = parseIsoDate(aiMeetingSuggestionDb.date);
  const aiMeetingSuggestion = {
    leadName: aiMeetingSuggestionDb.leadName,
    suggestedTime: formatSuggestionLabel(suggestionDate, aiMeetingSuggestionDb.time),
    reason: aiMeetingSuggestionDb.reason,
  };

  return {
    monthLabel: formatMonthLabel(today),
    todayDate,
    weekDays,
    timeSlots,
    meetings,
    todaysMeetings,
    bookedTimeSlots,
    aiMeetingSuggestion,
  };
}
