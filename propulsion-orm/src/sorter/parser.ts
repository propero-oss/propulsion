import { Sorter } from "@/sorter/types";
import { escapeRegExp } from "lodash";

export class SorterParser {
  protected escapeRegExp: RegExp;

  public constructor(protected sorterSeparator = ",", protected sorterDescendingIndicator = "-", protected escapeChar = "\\") {
    this.escapeRegExp = this.buildEscapeRegExp();
  }

  protected buildEscapeRegExp() {
    const { sorterSeparator, sorterDescendingIndicator, escapeChar } = this;
    const escaped = escapeRegExp(`${sorterSeparator}${sorterDescendingIndicator}${escapeChar}`);
    return new RegExp(`[${escaped}]`, "g");
  }

  public parse(raw: string): Sorter[] {
    const { sorterDescendingIndicator, sorterSeparator, escapeChar } = this;
    const sorters: Sorter[] = [];
    let current = "";
    let esc = false;
    let ascending = true;
    const pushCurrent = () => {
      if (current) sorters.push({ field: current, ascending });
      current = "";
      ascending = true;
    };
    for (const char of raw) {
      if (char === escapeChar && (esc = !esc)) continue;
      if (char === sorterDescendingIndicator && !current && !esc) ascending = false;
      else if (char === sorterSeparator) pushCurrent();
      else current += char;
      esc = false;
    }
    pushCurrent();
    return sorters;
  }

  protected escape(str: string): string {
    return str.replace(this.escapeRegExp, `${this.escapeChar}$0`);
  }

  public serialize(sort: Sorter[]): string {
    const { sorterSeparator, sorterDescendingIndicator } = this;
    return sort.map(sorter => `${sorter.ascending ? "" : sorterDescendingIndicator}${this.escape(sorter.field as string)}`).join(sorterSeparator);
  }
}
