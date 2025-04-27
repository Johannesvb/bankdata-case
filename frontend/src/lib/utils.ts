import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

// Helper for SolidUI

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
