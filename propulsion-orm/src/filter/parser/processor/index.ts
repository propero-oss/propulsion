import { FilterProcessor } from "@/filter/parser/filter-parser-types";
import { eqProcessor, geProcessor, gtProcessor, leProcessor, ltProcessor, neProcessor } from "@/filter/parser/processor/comparison-filter-processor";
import { andProcessor, notProcessor, orProcessor } from "@/filter/parser/processor/logical-filter-processor";
import { closeToProcessor, farFromProcessor } from "@/filter/parser/processor/proximity-filter-processor";
import { inProcessor, notInProcessor, notNullProcessor, nullProcessor } from "@/filter/parser/processor/set-filter-processor";
import {
  containsProcessor,
  endsWithProcessor,
  likeProcessor,
  matchProcessor,
  notContainsProcessor,
  notEndsWithProcessor,
  notLikeProcessor,
  notMatchProcessor,
  notStartsWithProcessor,
  startsWithProcessor
} from "@/filter/parser/processor/text-filter-processor";
import { fromPairs } from "lodash";

export * from "@/filter/parser/processor/comparison-filter-processor";
export * from "@/filter/parser/processor/logical-filter-processor";
export * from "@/filter/parser/processor/proximity-filter-processor";
export * from "@/filter/parser/processor/set-filter-processor";
export * from "@/filter/parser/processor/text-filter-processor";

export const defaultProcessors: FilterProcessor[] = [
  eqProcessor,
  neProcessor,
  gtProcessor,
  ltProcessor,
  geProcessor,
  leProcessor,
  andProcessor,
  orProcessor,
  notProcessor,
  closeToProcessor,
  farFromProcessor,
  inProcessor,
  notInProcessor,
  nullProcessor,
  notNullProcessor,
  containsProcessor,
  notContainsProcessor,
  matchProcessor,
  notMatchProcessor,
  likeProcessor,
  notLikeProcessor,
  startsWithProcessor,
  notStartsWithProcessor,
  endsWithProcessor,
  notEndsWithProcessor
];

export const defaultProcessorMap: Record<string, FilterProcessor> = fromPairs(defaultProcessors.map(processor => [processor.operator, processor]));
