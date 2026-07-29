export interface StepperItem {
  slot: string
  title: string
  description?: string
  icon: string
}

export type StepperItemStatus = 'active' | 'completed' | 'pending'