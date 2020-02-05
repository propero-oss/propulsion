import { InvalidArgumentsError, UnsupportedOperation } from "@/error";
import { Filter } from "@/filter";
import { defaultProcessors } from "@/filter/parser/processor";
import { TOKEN_PARAMS_START, TOKEN_PARAMS_END, TOKEN_PARAMS_SEPARATOR, FilterParserToken, UnprocessedFilter, FilterProcessor } from "./filter-parser-types";
import { fromPairs, escapeRegExp } from "lodash";

export class FilterParser {
  static readonly TOKEN_PARAMS_START = TOKEN_PARAMS_START;
  static readonly TOKEN_PARAMS_END = TOKEN_PARAMS_END;
  static readonly TOKEN_PARAMS_SEPARATOR = TOKEN_PARAMS_SEPARATOR;

  protected readonly tokenLookup: Record<string, FilterParserToken>;
  protected readonly processorMap: Record<string, FilterProcessor>;
  protected readonly processorAliasMap: Record<string, FilterProcessor>;
  protected readonly escapingRegExp: RegExp;

  public constructor(
    protected paramsStartChar = "(",
    protected paramsEndChar = ")",
    protected paramsSeparatorChar = ",",
    protected escapeChar = "\\",
    protected processors = defaultProcessors
  ) {
    this.tokenLookup = {
      [paramsStartChar]: TOKEN_PARAMS_START,
      [paramsEndChar]: TOKEN_PARAMS_END,
      [paramsSeparatorChar]: TOKEN_PARAMS_SEPARATOR
    };
    this.escapingRegExp = this.buildEscapingRegExp();
    this.processorMap = this.buildProcessorMap();
    this.processorAliasMap = this.buildProcessorAliasMap();
  }

  protected buildProcessorMap() {
    return fromPairs(this.processors.map(it => [it.operator, it]));
  }

  protected buildProcessorAliasMap() {
    return fromPairs(this.processors.map(it => [it.alias, it]));
  }

  protected buildEscapingRegExp() {
    const { paramsStartChar, paramsEndChar, paramsSeparatorChar, escapeChar } = this;
    const escaped = escapeRegExp(`${paramsStartChar}${paramsEndChar}${paramsSeparatorChar}${escapeChar}`);
    return new RegExp(`[${escaped}]`, "g");
  }

  protected tokenize(raw: string): (string | FilterParserToken)[] {
    const { paramsStartChar, paramsEndChar, paramsSeparatorChar, escapeChar, tokenLookup } = this;
    const tokens: (string | FilterParserToken)[] = [];
    let esc = false;
    let current = "";
    let tokenBefore = false;
    for (const char of raw) {
      if (char === escapeChar && (esc = !esc)) continue;
      if ((char === paramsStartChar || char === paramsEndChar || char === paramsSeparatorChar) && !esc) {
        if (!tokenBefore) tokens.push(current, tokenLookup[char]);
        else tokens.push(tokenLookup[char]);
        tokenBefore = true;
        current = "";
      } else {
        current += char;
        tokenBefore = false;
      }
      esc = false;
    }
    return tokens;
  }

  protected segment(tokens: (string | FilterParserToken)[]): UnprocessedFilter {
    const branch = (op: string) => ({ op, params: [] } as UnprocessedFilter);
    const root = branch("and");
    const stack = [root];
    let current = root;
    let prev: string | FilterParserToken = "";
    for (const token of tokens) {
      if (token === TOKEN_PARAMS_START) {
        current.params.push((current = branch(prev as string)));
        stack.push(current);
      } else if (token === TOKEN_PARAMS_END) {
        if (prev !== TOKEN_PARAMS_START && prev !== TOKEN_PARAMS_END) current.params.push(prev as string);
        stack.pop();
        current = stack[stack.length - 1];
      } else if (token === TOKEN_PARAMS_SEPARATOR) {
        if (prev !== TOKEN_PARAMS_END) current.params.push(prev as string);
      }
      prev = token;
    }
    return root;
  }

  protected process(raw: UnprocessedFilter): Filter {
    const { params, op } = raw;
    const processor = this.processorAliasMap[op];
    if (!processor) throw new UnsupportedOperation(`Unsupported filter operator: ${op}`);
    if (!processor.validateParams(...params)) throw new InvalidArgumentsError(`Invalid filter arguments for filter: ${op}`);
    return processor.process(this.process.bind(this), ...params);
  }

  public parse(filter: string) {
    const tokens = this.tokenize(filter);
    const segments = this.segment(tokens);
    return this.process(segments);
  }

  protected escape(str: string): string {
    return str.replace(this.escapingRegExp, `${this.escapeChar}$0`);
  }

  public serialize(filter: Filter): string {
    const { escape, serialize, paramsStartChar, paramsSeparatorChar, paramsEndChar, processorMap } = this;
    const processor = processorMap[filter.op];
    const [alias, ...params] = [processor.alias, ...processor.serializeParams(serialize.bind(this), filter)].map(escape.bind(this));
    return [alias, paramsStartChar, params.join(paramsSeparatorChar), paramsEndChar].join("");
  }
}
