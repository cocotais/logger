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
     * 日志等级，默认 info
     */
    loglevel: LogLevel;
    /**
     * 是否输出到控制台
     */
    toConsole: boolean;
    /**
     * 是否输出到文件
     * 
     * 如果为 false，则不输出到文件；
     * 如果为 string，则输出到文件，文件路径为 string
     */
    toFile: false | string;
    /**
     * 是否输出日期
     */
    hasDate: boolean;
    /**
     * 日志颜色映射
     * 
     * 每个日志级别对应一个函数，函数接收一个字符串参数，返回一个着色后的字符串
     */
    logColorMap: Record<LogLevel, Function>;
}

const loglevelMap: Record<LogLevel, number> = {
    trace: 0,
    debug: 1,
    info: 2,
    notice: 3,
    warn: 4,
    error: 5,
    silent: 6
}

/**
 * 记录日志
 * @param name 日志名称
 * @param level 日志级别
 * @param config 日志配置（部分选项）
 * @param args 日志内容
 */
function log(name: string, level: LogLevel, config: Partial<LogOptions>, ...args: any[]) {
    const options: LogOptions = {
        loglevel: 'info',
        toConsole: true,
        toFile: false,
        hasDate: false,
        logColorMap: {
            trace: kleur.gray,
            debug: kleur.gray,
            info: kleur.blue,
            notice: kleur.blue,
            warn: kleur.yellow,
            error: kleur.red,
            silent: kleur.gray
        },
        ...config
    }

    if (loglevelMap[options.loglevel] > loglevelMap[level]) return;

    let messages = []
    messages.push(options.logColorMap[level](`[${level.toUpperCase().at(0)}]`))

    if (options.hasDate) {
        messages.push(kleur.gray(new Date().toISOString()))
    }

    messages.push(kleur.bold(name))

    messages.push(...args);
    let message = utils.formatWithOptions({ colors: true }, ...messages);

    if (options.toConsole) {
        console.log(message)
    }
    if (options.toFile) {
        const fileMessage = message.replace(/\u001b\[[0-9;]*m/g, '') + '\n';
        fs.appendFileSync(options.toFile, fileMessage)
    }
}

class Logger {
    /**
     * 日志名称
     */
    public name: string;
    /**
     * 日志选项
     */
    public options: LogOptions;

    /**
     * 创建一个日志实例
     * @param name 日志名称
     * @param options 日志选项
     */
    constructor(name?: string, options?: Partial<LogOptions>) {
        this.name = name ?? 'logger';
        this.options = {
            loglevel: 'info',
            toConsole: true,
            toFile: false,
            hasDate: false,
            logColorMap: {
                trace: kleur.gray,
                debug: kleur.gray,
                info: kleur.blue,
                notice: kleur.blue,
                warn: kleur.yellow,
                error: kleur.red,
                silent: kleur.gray
            },
            ...options
        }
    }

    /**
     * 记录日志
     * @param level 日志级别
     * @param args 日志内容
     * @protected
     */
    protected log(level: LogLevel, ...args: any[]) {
        log(this.name, level, this.options, ...args)
    }

    /**
     * 设置日志选项
     * @param options 日志选项
     */
    setOptions(options: Partial<LogOptions>) {
        this.options = {
            ...this.options,
            ...options
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
export default log;