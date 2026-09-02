import { RegExpMatcher, englishDataset, englishRecommendedTransformers } from "obscenity";

// Built once per server process — constructing the matcher is the expensive
// part, checking text against it is cheap.
const matcher = new RegExpMatcher({
  ...englishDataset.build(),
  ...englishRecommendedTransformers,
});

export function containsProfanity(text: string): boolean {
  return matcher.hasMatch(text);
}
