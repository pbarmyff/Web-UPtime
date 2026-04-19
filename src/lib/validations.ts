import { z } from "zod";

export const monitorSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  url: z.string().url("Must be a valid URL"),
  type: z.enum(["HTTP", "PING", "HEARTBEAT"]),
  method: z.enum(["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD", "OPTIONS"]).default("GET"),
  interval: z.number().int().min(10).max(86400).default(60),
  expectedStatus: z.number().int().min(100).max(599).nullable().optional(),
  expectedKeyword: z.string().max(255).nullable().optional(),
  headers: z.string().nullable().optional(), // Must be valid JSON string
  body: z.string().nullable().optional(),    // Must be valid JSON string
  timeout: z.number().int().min(1000).max(60000).default(10000),
  retries: z.number().int().min(0).max(10).default(3),
  status: z.enum(["UP", "DOWN", "PAUSED"]).default("UP").optional(),
});

export const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Must be a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const maintenanceWindowSchema = z.object({
    title: z.string().min(1, "Title is required").max(100),
    startTime: z.string().datetime(),
    endTime: z.string().datetime(),
});

export const statusPageSchema = z.object({
    name: z.string().min(1, "Name is required").max(100),
    slug: z.string().min(3, "Slug must be at least 3 characters").regex(/^[a-z0-9-]+$/, "Slug can only contain lowercase letters, numbers, and hyphens"),
    description: z.string().max(500).nullable().optional(),
    monitors: z.array(z.string()), // Array of monitor IDs
});

export const alertRuleSchema = z.object({
  type: z.enum(["EMAIL", "WEBHOOK"]),
  target: z.string().min(1, "Target is required").max(255),
});
