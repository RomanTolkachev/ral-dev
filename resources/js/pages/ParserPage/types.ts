export interface Tab {
  label: string;
  is_working: boolean;
  new: number;
  updated?: number;
  not_changed: number;
  start_time: string;
  work_done_time?: string;
  next_start_time: string
}