"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Brain,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Clock,
  User,
  Video,
  X,
} from "lucide-react";
import { GlassCard } from "@/components/GlassCard";
import { StatCard } from "@/components/StatCard";
import { cn } from "@/lib/utils";
import {
  getCalendarSnapshot,
  type Meeting,
} from "@/data/calendar";

function addDays(date: Date, days: number): Date {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

export default function CalendarPage() {
  const [weekStartDate, setWeekStartDate] = useState(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today;
  });
  const calendar = useMemo(() => getCalendarSnapshot(weekStartDate), [weekStartDate]);
  const [selectedDate, setSelectedDate] = useState(calendar.todayDate);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const meetingsForSelectedDate = useMemo(
    () => calendar.meetings.filter((meeting) => meeting.date === selectedDate),
    [calendar.meetings, selectedDate]
  );
  const bookedSlotsForSelectedDate = useMemo(
    () => meetingsForSelectedDate.map((meeting) => meeting.time),
    [meetingsForSelectedDate]
  );
  const [selectedMeeting, setSelectedMeeting] = useState<Meeting | null>(calendar.todaysMeetings[0] ?? null);
  const [detailsDismissed, setDetailsDismissed] = useState(false);

  useEffect(() => {
    if (!detailsDismissed) {
      setSelectedMeeting(meetingsForSelectedDate[0] ?? null);
    }
    setSelectedSlot(null);
  }, [detailsDismissed, meetingsForSelectedDate, selectedDate]);

  useEffect(() => {
    setSelectedDate(calendar.todayDate);
  }, [calendar.todayDate]);

  const calendarKPIs = [
    {
      title: "Today's Meetings",
      value: String(calendar.todaysMeetings.length),
      change: "+2",
      trend: "up" as const,
      icon: CalendarDays,
      delay: 0,
    },
    {
      title: "Booked Slots",
      value: String(bookedSlotsForSelectedDate.length),
      change: "+1",
      trend: "up" as const,
      icon: Clock,
      delay: 0.08,
    },
    {
      title: "Available Slots",
      value: String(calendar.timeSlots.length - bookedSlotsForSelectedDate.length),
      change: "+3",
      trend: "up" as const,
      icon: Video,
      delay: 0.16,
    },
  ];

  return (
    <div className="max-w-350 mx-auto">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Calendar</h1>
        </div>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {calendarKPIs.map((kpi) => (
          <StatCard
            key={kpi.title}
            title={kpi.title}
            value={kpi.value}
            change={kpi.change}
            trend={kpi.trend}
            icon={kpi.icon}
            delay={kpi.delay}
          />
        ))}
      </div>

      <div className="items-stretch flex gap-6">
        <GlassCard
          className="min-w-0 flex-1 overflow-hidden rounded-[28px] border-border/60 bg-card/90 p-0"
          delay={0.24}
        >
          <div className="flex items-center justify-between border-b border-border/50 px-5 py-4">
            <h3 className="text-sm font-semibold text-foreground">{calendar.monthLabel}</h3>
            <div className="flex gap-2">
              <button
                onClick={() => setWeekStartDate((current) => addDays(current, -7))}
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-border/50 bg-card/40 text-muted-foreground transition-colors hover:bg-muted/40 hover:text-foreground"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={() => setWeekStartDate((current) => addDays(current, 7))}
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-border/50 bg-card/40 text-muted-foreground transition-colors hover:bg-muted/40 hover:text-foreground"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="border-b border-border/40 px-5 py-4">
            <div className="grid grid-cols-7 gap-2">
              {calendar.weekDays.map((day) => (
                <button
                  key={day.date}
                  onClick={() => setSelectedDate(day.date)}
                  className={cn(
                    "flex flex-col items-center rounded-2xl px-3 py-3 transition-all",
                    day.date === selectedDate
                      ? "gradient-primary text-primary-foreground shadow-lg shadow-primary/20"
                      : day.isToday
                        ? "bg-primary/10 text-primary"
                        : "bg-card/40 text-muted-foreground hover:bg-muted/30 hover:text-foreground"
                  )}
                >
                  <span className="mb-1 text-[11px] font-medium">{day.dayLabel}</span>
                  <span className="text-lg font-bold">{day.dayNumber}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="px-5 py-3">
            {calendar.timeSlots.map((slot, index) => {
              const meeting = meetingsForSelectedDate.find((item) => item.time === slot);
              const isBooked = bookedSlotsForSelectedDate.includes(slot);

              return (
                <motion.div
                  key={slot}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.03 }}
                  onClick={() => {
                    setDetailsDismissed(false);
                    setSelectedSlot(slot);
                    if (meeting) setSelectedMeeting(meeting);
                    if (!meeting) setSelectedMeeting(null);
                  }}
                  className={cn(
                    "grid cursor-pointer grid-cols-[110px_minmax(0,1fr)] items-center border-b border-border/30 px-1 py-4 transition-all last:border-b-0",
                    selectedSlot === slot ? "bg-primary/6" : "hover:bg-muted/20"
                  )}
                >
                  <div className="px-4 text-[13px] font-semibold text-foreground">{slot}</div>
                  {meeting ? (
                    <div className="rounded-2xl border border-primary/20 bg-primary/5 px-4 py-3">
                      <p className="text-[13px] font-semibold text-foreground">{meeting.title}</p>
                      <p className="mt-1 text-[12px] text-muted-foreground">
                        {meeting.attendee} • {meeting.type} • {meeting.duration}
                      </p>
                    </div>
                  ) : (
                    <div
                      className={cn(
                        "rounded-2xl border px-4 py-3 text-[12px] font-medium",
                        isBooked
                          ? "border-border/40 bg-muted/20 text-muted-foreground"
                          : "border-border/40 bg-card/40 text-muted-foreground"
                      )}
                    >
                      Available
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </GlassCard>

        <AnimatePresence>
          {!detailsDismissed && (
            <motion.div
              initial={{ opacity: 0, x: 20, width: 0 }}
              animate={{ opacity: 1, x: 0, width: 380 }}
              exit={{ opacity: 0, x: 20, width: 0 }}
              className="shrink-0"
            >
              <GlassCard className="sticky top-6 min-h-full rounded-[28px] border-border/60 bg-card/90 p-6">
              <div className="mb-6 flex items-center justify-between">
                <h3 className="text-lg font-semibold tracking-[-0.02em] text-foreground">Schedule Details</h3>
                <button
                  onClick={() => {
                    setDetailsDismissed(true);
                    setSelectedMeeting(null);
                    setSelectedSlot(null);
                  }}
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-border/50 bg-card/40 text-muted-foreground transition-colors hover:bg-muted/40 hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="mb-6 rounded-3xl border border-border/40 bg-muted/15 px-5 py-6 text-center">
                <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-3xl gradient-primary text-primary-foreground shadow-lg shadow-primary/20">
                  <CalendarDays className="h-8 w-8" />
                </div>
                <h4 className="text-xl font-semibold text-foreground">
                  {selectedMeeting?.title ?? "Open Time Slot"}
                </h4>
                <p className="mt-3 text-[13px] text-muted-foreground">
                  {selectedMeeting
                    ? `${selectedMeeting.attendee} • ${selectedMeeting.time}`
                    : selectedSlot
                      ? `${selectedSlot} • Available`
                      : "Select a slot to view details"}
                </p>
              </div>

              <div className="mb-6 space-y-2">
                {[
                  {
                    label: "Date",
                    value:
                      calendar.weekDays.find((day) => day.date === selectedDate)?.date ?? selectedDate,
                  },
                  { label: "Time", value: selectedMeeting?.time ?? selectedSlot ?? "Not selected" },
                  { label: "Attendee", value: selectedMeeting?.attendee ?? "Open slot" },
                  { label: "Type", value: selectedMeeting?.type ?? "Available" },
                  { label: "Duration", value: selectedMeeting?.duration ?? "30 min block" },
                ].map(({ label, value }) => (
                  <div
                    key={label}
                    className="grid grid-cols-[92px_minmax(0,1fr)] items-center gap-3 rounded-2xl border border-border/40 bg-muted/15 px-4 py-3 text-sm"
                  >
                    <span className="text-muted-foreground">{label}</span>
                    <span className="truncate text-right font-medium text-foreground">{value}</span>
                  </div>
                ))}
              </div>

              {selectedMeeting && (
                <div className="mb-5 rounded-3xl border border-border/50 bg-muted/15 p-5">
                  <div className="mb-3 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl gradient-primary text-primary-foreground shadow-lg shadow-primary/20">
                      <User className="h-4 w-4" />
                    </div>
                    <span className="text-sm font-semibold text-foreground">Meeting Summary</span>
                  </div>
                  <div className="rounded-2xl border border-border/40 bg-card/40 px-4 py-4">
                    <p className="text-[12px] leading-6 text-muted-foreground">
                      {selectedMeeting.title} is scheduled with{" "}
                      <span className="font-semibold text-foreground">{selectedMeeting.attendee}</span> as a{" "}
                      <span className="font-semibold text-primary">{selectedMeeting.type}</span> for{" "}
                      {selectedMeeting.duration}.
                    </p>
                  </div>
                </div>
              )}

              <div className="mb-5 rounded-3xl border border-border/50 bg-muted/15 p-5">
                <div className="mb-3 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl gradient-primary text-primary-foreground shadow-lg shadow-primary/20">
                    <Brain className="h-4 w-4" />
                  </div>
                  <span className="text-sm font-semibold text-foreground">AI Suggestion</span>
                </div>
                <div className="rounded-2xl border border-border/40 bg-card/40 px-4 py-4">
                  <p className="text-[12px] leading-6 text-muted-foreground">
                    Based on {calendar.aiMeetingSuggestion.leadName}'s engagement pattern, the AI recommends a
                    follow-up on{" "}
                    <span className="font-semibold text-primary">{calendar.aiMeetingSuggestion.suggestedTime}</span>.{" "}
                    {calendar.aiMeetingSuggestion.reason}
                  </p>
                </div>
              </div>

              <div className="flex gap-2">
                <button className="flex-1 rounded-2xl gradient-primary py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-opacity hover:opacity-90">
                  Schedule Meeting
                </button>
                <button className="flex-1 rounded-2xl border border-border/60 bg-card/50 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-muted/40">
                  Block Slot
                </button>
              </div>
              </GlassCard>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
