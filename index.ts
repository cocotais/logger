import kleur from "kleur";

type LogLevel = 'trace' | 'debug' | 'info' | 'notice' | 'warn' | 'error' | 'silent';

class Logger {
    public name: string;
    public loglevel: LogLevel;
    private loglevelMap: Record<LogLevel, number> = {
        trace: 0,
        debug: 1,
        info: 2,
        notice: 3,
        warn: 4,
        error: 5,
        silent: 6
    }
    private logColorMap: Record<LogLevel, kleur.Color> = {
        trace: kleur.gray,
        debug: kleur.gray,
        info: kleur.blue,
        notice: kleur.blue,
        warn: kleur.yellow,
        error: kleur.red,
        silent: kleur.gray
    }

    constructor(name?: string, loglevel?: LogLevel) {
        this.name = name ?? 'logger';
        this.loglevel = loglevel ?? 'debug';
    }

    private log(level: LogLevel, ...args: any[]) {
        if (this.loglevelMap[this.loglevel] > this.loglevelMap[level]) return;
        console.log(this.name, this.logColorMap[level](`[${level.toUpperCase()}]`), ...args)
    }

    trace(...args: any[]) {
        this.log('trace', ...args)
    }
    debug(...args: any[]) {
        this.log('debug', ...args)
    }
    info(...args: any[]) {
        this.log('info', ...args)
    }
    notice(...args: any[]) {
        this.log('notice', ...args)
    }
    warn(...args: any[]) {
        this.log('warn', ...args)
    }
    error(...args: any[]) {
        this.log('error', ...args)
    }
}

export { Logger }
export default new Logger()