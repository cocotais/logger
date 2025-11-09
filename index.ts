import kleur from "kleur";
import utils from "node:util";
import fs from "node:fs";

/**
 * 所有支持的日志级别
 */
type LogLevel = 'trace' | 'debug' | 'info' | 'notice' | 'warn' | 'error' | 'silent';
/**
 * 日志选项
 */
type LogOptions = {
    /**
     * 是否输出到控制台
     */
    toConsole?: boolean;
    /**
     * 是否输出到文件
     * 
     * 如果为 false，则不输出到文件；
     * 如果为 string，则输出到文件，文件路径为 string
     */
    toFile?: false | string;
    /**
     * 是否输出日期
     */
    hasDate?: boolean;
}

class Logger {
    /**
     * 日志名称
     */
    public name: string;
    /**
     * 日志级别
     */
    public loglevel: LogLevel;
    /**
     * 日志选项
     */
    public options: LogOptions;
    /**
     * 日志级别映射
     */
    protected loglevelMap: Record<LogLevel, number> = {
        trace: 0,
        debug: 1,
        info: 2,
        notice: 3,
        warn: 4,
        error: 5,
        silent: 6
    }
    /**
     * 日志颜色映射
     * 
     * 每个日志级别对应一个函数，函数接收一个字符串参数，返回一个着色后的字符串
     */
    protected logColorMap: Record<LogLevel, Function> = {
        trace: kleur.gray,
        debug: kleur.gray,
        info: kleur.blue,
        notice: kleur.blue,
        warn: kleur.yellow,
        error: kleur.red,
        silent: kleur.gray
    }

    /**
     * 创建一个日志实例
     * @param name 日志名称
     * @param loglevel 日志级别
     * @param options 日志选项
     */
    constructor(name?: string, loglevel?: LogLevel, options?: LogOptions) {
        this.name = name ?? 'logger';
        this.loglevel = loglevel ?? 'info';
        this.options = options ?? {
            toConsole: true,
            toFile: false,
            hasDate: false
        }
    }

    /**
     * 记录日志
     * @param level 日志级别
     * @param args 日志内容
     * @protected
     */
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