import { template } from "lodash";
import packageMeta from "./package";

export default pkg => {
  const meta = packageMeta(pkg);
  const { year, name } = meta;
  const opts = {...pkg, year, nameFormatted: name };
  return template(`
/**
 * <%= nameFormatted %> (<%= name %> v<%= version %>)
 * <%= description %>
 * <%= homepage %>
 * (c) <%= year %> <%= author %>
 * @license <%= license || "MIT" %>
 */
`)(opts).trim();
}
