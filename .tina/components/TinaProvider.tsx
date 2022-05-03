import type { ReactNode } from "react";
import TinaCMS from "tinacms";
import { tinaConfig } from "../schema";

// Importing the TinaProvider directly into your page will cause Tina to be added to the production bundle.
// Instead, import the tina/provider/index default export to have it dynamially imported in edit-moode
/**
 *
 * @private Do not import this directly, please import the dynamic provider instead
 */
const TinaProvider = ({ children }: { children: ReactNode }) => {
  // @ts-ignore
  return <TinaCMS {...tinaConfig}>{children}</TinaCMS>;
};

export default TinaProvider;
