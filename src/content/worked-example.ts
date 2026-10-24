// The brief's story: giving a brother a lift. He's late 20 minutes in total, you're late 2,
// so he owes you 18. Shown on the home page and /how-it-works.

export interface ExampleEntry {
  day: string;
  late: "brother" | "you";
  minutes: number;
}

export const exampleEntries: readonly ExampleEntry[] = [
  { day: "Mon 6 Oct", late: "brother", minutes: 2 },
  { day: "Wed 8 Oct", late: "brother", minutes: 3 },
  { day: "Fri 10 Oct", late: "brother", minutes: 1 },
  { day: "Mon 13 Oct", late: "you", minutes: 2 },
  { day: "Wed 15 Oct", late: "brother", minutes: 5 },
  { day: "Fri 17 Oct", late: "brother", minutes: 2 },
  { day: "Mon 20 Oct", late: "brother", minutes: 4 },
  { day: "Wed 22 Oct", late: "brother", minutes: 3 },
];

export function exampleTotals(entries: readonly ExampleEntry[]) {
  const sum = (who: ExampleEntry["late"]) =>
    entries.filter((e) => e.late === who).reduce((total, e) => total + e.minutes, 0);
  const brother = sum("brother");
  const you = sum("you");
  return { brother, you, owed: brother - you };
}
