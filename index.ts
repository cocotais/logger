import kleur from "kleur";
import utils from "node:util";
import fs from "node:fs";

type LogLevel = 'trace' | 'debug' | 'info' | 'notice' | 'warn' | 'error' | 'silent';
type LogOptions = {
    toConsole?: boolean;
    toFile?: false | string;
    hasDate?: boolean;
}

class Logger {
    public name: string;
    public loglevel: LogLevel;
    public options: LogOptions;
    protected loglevelMap: Record<LogLevel, number> = {
        trace: 0,
        debug: 1,
        info: 2,
        notice: 3,
        warn: 4,
        error: 5,
        silent: 6
    }
    protected logColorMap: Record<LogLevel, kleur.Color> = {
        trace: kleur.gray,
        debug: kleur.gray,
        info: kleur.blue,
        notice: kleur.blue,
        warn: kleur.yellow,
        error: kleur.red,
        silent: kleur.gray
    }

    constructor(name?: string, loglevel?: LogLevel, options?: LogOptions) {
        this.name = name ?? 'logger';
        this.loglevel = loglevel ?? 'info';
        this.options = options ?? {
            toConsole: true,
            toFile: false,
            hasDate: false
        }
    }

    protected log(level: LogLevel, ...args: any[]) {
        if (this.loglevelMap[this.loglevel] > this.loglevelMap[level]) return;

        let messages = []
        messages.push(this.logColorMap[level](`[${level.toUpperCase().at(0)}]`))

        if (this.options.hasDate) {
            messages.push(kleur.gray(new Date().toISOString()))
        }

        messages.push(kleur.bold(this.name))

        messages.push(...args);
        let message = utils.formatWithOptions({ colors: true }, ...messages);

        if (this.options.toConsole) {
            console.log(message)
        }
        if (this.options.toFile) {
            const fileMessage = message.replace(/\u001b\[[0-9;]*m/g, '') + '\n';
            fs.appendFileSync(this.options.toFile, fileMessage)
        }
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