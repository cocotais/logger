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

    constructor(name?: string, loglevel?: LogLevel) {
        this.name = name ?? 'logger';
        this.loglevel = loglevel ?? 'debug';
    }
    trace(...args: any[]) {
        if (this.loglevelMap[this.loglevel] > this.loglevelMap['trace']) return;
        console.log(this.name, kleur.gray('[TRACE]'), ...args)
    }
    debug(...args: any[]) {
        if (this.loglevelMap[this.loglevel] > this.loglevelMap['debug']) return;
        console.log(this.name, kleur.gray('[DEBUG]'), ...args)
    }
    info(...args: any[]) {
        if (this.loglevelMap[this.loglevel] > this.loglevelMap['info']) return;
        console.log(this.name, '[INFO]', ...args)
    }
    notice(...args: any[]) {
        if (this.loglevelMap[this.loglevel] > this.loglevelMap['notice']) return;
        console.log(this.name, kleur.blue('[NOTICE]'), ...args)
    }
    warn(...args: any[]) {
        if (this.loglevelMap[this.loglevel] > this.loglevelMap['warn']) return;
        console.warn(this.name, kleur.yellow('[WARN]'), ...args)
    }
    error(...args: any[]) {
        if (this.loglevelMap[this.loglevel] > this.loglevelMap['error']) return;
        console.error(this.name, kleur.red('[ERROR]'), ...args)
    }
}

export { Logger }
export default new Logger()