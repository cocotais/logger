import kleur from "kleur";

class Logger {
    public name: string;
    public loglevel: string;
    private loglevelMap: Record<string, number> = {
        debug: 0,
        info: 1,
        notice: 2,
        warn: 3,
        error: 4,
        fatal: 5
    }

    constructor(name?: string, loglevel?: string) {
        this.name = name ?? 'logger';
        this.loglevel = loglevel ?? 'info';
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
    fatal(...args: any[]) {
        if (this.loglevelMap[this.loglevel] > this.loglevelMap['fatal']) return;
        console.error(this.name, kleur.bgRed('[FATAL]'), ...args)
    }
}

export { Logger }
export default new Logger()