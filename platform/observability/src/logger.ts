import { getCorrelationId } from './correlation-context.js';

export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

export interface LogFields {
  [key: string]: unknown;
}

interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: string;
  service: string;
  correlationId?: string;
  [key: string]: unknown;
}

/**
 * Structured JSON logger. Every entry automatically carries the current
 * correlation ID (if any) so log aggregation can reconstruct a full
 * request/event trace across process and domain boundaries.
 */
export class Logger {
  constructor(private readonly service: string) {}

  private write(level: LogLevel, message: string, fields?: LogFields): void {
    const entry: LogEntry = {
      level,
      message,
      timestamp: new Date().toISOString(),
      service: this.service,
      correlationId: getCorrelationId(),
      ...fields,
    };
    // eslint-disable-next-line no-console
    console.log(JSON.stringify(entry));
  }

  debug(message: string, fields?: LogFields): void {
    this.write('debug', message, fields);
  }

  info(message: string, fields?: LogFields): void {
    this.write('info', message, fields);
  }

  warn(message: string, fields?: LogFields): void {
    this.write('warn', message, fields);
  }

  error(message: string, fields?: LogFields): void {
    this.write('error', message, fields);
  }
}
