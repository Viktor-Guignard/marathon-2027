import type { PlannedSession, TrainingDay } from '@/types';

const longRunKm: Record<string, number> = {
  '2026-10-03': 16, '2026-10-10': 17, '2026-10-17': 18, '2026-10-24': 16, '2026-10-31': 19,
  '2026-11-07': 17, '2026-11-14': 21, '2026-11-21': 23, '2026-11-28': 18,
  '2026-12-05': 24, '2026-12-12': 20, '2026-12-19': 27, '2026-12-26': 30,
  '2027-01-02': 18, '2027-01-09': 20, '2027-01-16': 22, '2027-01-23': 18, '2027-01-30': 24,
  '2027-02-06': 26, '2027-02-13': 20, '2027-02-20': 28, '2027-02-27': 22,
  '2027-03-06': 30, '2027-03-13': 24, '2027-03-20': 32, '2027-03-27': 26,
  '2027-04-03': 8, '2027-04-10': 8, '2027-04-17': 12, '2027-04-24': 6,
};

const tuesdayRuns = [
  { activity: 'Tapis · endurance facile', type: 'Tapis' as const, plannedDistance: 9, plannedDuration: 60 },
  { activity: 'Tapis · tempo', type: 'Tempo' as const, plannedDistance: 9.5, plannedDuration: 60 },
  { activity: 'Tapis · fractionné', type: 'Fractionné' as const, plannedDistance: 8.5, plannedDuration: 55 },
  { activity: 'Tapis · footing facile', type: 'Tapis' as const, plannedDistance: 8, plannedDuration: 50 },
];

const iso = (date: Date) => date.toISOString().slice(0, 10);
const mondayOf = (date: Date) => { const d = new Date(date); d.setDate(d.getDate() - ((d.getDay() + 6) % 7)); return d; };
const idFor = (date: string, id: string) => `${date}-${id}`;

export function createInitialSchedule(week: TrainingDay[]): PlannedSession[] {
  const sessions: PlannedSession[] = [];
  const start = new Date('2026-09-28T12:00:00');
  const end = new Date('2027-04-25T12:00:00');
  let monday = mondayOf(start);
  let weekIndex = 0;

  while (monday <= end) {
    for (let day = 1; day <= 7; day++) {
      const date = new Date(monday);
      date.setDate(monday.getDate() + day - 1);
      const key = iso(date);
      if (date > end) continue;
      const race = key === '2027-04-04' ? 'Marathon de Paris' : key === '2027-04-25' ? 'Marathon de Gdańsk' : null;
      if (race) {
        sessions.push({ id: idFor(key, 'race'), date: key, activity: race, type: 'Running', status: 'À faire', isRace: true });
        continue;
      }

      const weekly = week.filter((entry) => entry.day === day);
      for (const entry of weekly) {
        if (day === 2 && (entry.type === 'Tapis' || entry.type === 'Running' || entry.type === 'Fractionné' || entry.type === 'Tempo' || entry.type === 'Endurance')) continue;
        if (day === 6 && (entry.type === 'Sortie longue' || entry.type === 'Running')) continue;
        sessions.push({
          id: idFor(key, entry.id), date: key, activity: entry.activity, type: entry.type,
          status: 'À faire',
          ...(entry.plannedDistance !== undefined ? { plannedDistance: entry.plannedDistance } : {}),
          ...(entry.plannedDuration !== undefined ? { plannedDuration: entry.plannedDuration } : {}),
        });
      }

      if (day === 2) {
        const run = tuesdayRuns[weekIndex % tuesdayRuns.length];
        const originalActivity = week.find((entry) => entry.day === 2 && ['Tapis','Running','Fractionné','Tempo','Endurance'].includes(entry.type))?.activity ?? 'Course sur tapis';
        const focus = run.activity.split('·')[1]?.trim() ?? 'endurance facile';
        sessions.push({ id: idFor(key, 'tue-run'), date: key, ...run, activity: `${originalActivity} · ${focus}`, status: 'À faire' });
      }
      if (day === 6) {
        const distance = longRunKm[key];
        if (distance !== undefined) {
          const lighter = ['2026-10-24','2026-11-07','2026-11-28','2026-12-12','2027-01-02','2027-01-23','2027-02-13','2027-02-27'].includes(key);
          sessions.push({
            id: idFor(key, 'sat-long'), date: key,
            activity: distance <= 12 ? 'Footing facile' : 'Sortie longue',
            type: distance <= 12 ? 'Endurance' : 'Sortie longue',
            plannedDistance: distance,
            plannedDuration: Math.round(distance * 6.5),
            durationIsEstimate: true,
            status: 'À faire',
            isLongRun: distance > 12,
            ...(lighter ? { weekNote: 'Semaine allégée · objectif adaptable' } : {}),
          });
        }
      }
    }
    monday = new Date(monday);
    monday.setDate(monday.getDate() + 7);
    weekIndex++;
  }
  return sessions.sort((a, b) => a.date.localeCompare(b.date) || a.id.localeCompare(b.id));
}
