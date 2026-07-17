import path from "path";
import { mergeConfig, type UserConfig } from "vite";

export default (config: UserConfig): UserConfig =>
  mergeConfig(config, {
    resolve: {
      dedupe: [
        "@codemirror/state",
        "@codemirror/view",
        "@codemirror/language",
        "@codemirror/commands",
        "@uiw/react-codemirror",
        "@strapi/design-system",
      ],
      alias: {
        "@codemirror/state": path.resolve(
          __dirname,
          "../../node_modules/@codemirror/state",
        ),
        "@codemirror/view": path.resolve(
          __dirname,
          "../../node_modules/@codemirror/view",
        ),
      },
    },
  });
