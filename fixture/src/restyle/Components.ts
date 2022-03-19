import {
  ThemeProvider,
  createBox,
  createText,
  createRestyleComponent,
  createVariant,
  VariantProps,
} from "@shopify/restyle";
import theme, { Theme } from "./theme";

export const Box = createBox<Theme>();
export const RText = createText<Theme>();
