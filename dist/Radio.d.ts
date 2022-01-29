/// <reference types="react" />
import { CheckStyle, CheckVariant, CheckProps } from '@nodestrap/check';
export declare const usesRadioLayout: () => import("@cssfn/cssfn").Rule;
export declare const usesRadioVariants: () => import("@cssfn/cssfn").Rule;
export declare const usesRadioStates: () => import("@cssfn/cssfn").Rule;
export declare const useRadioSheet: import("@cssfn/types").Factory<import("jss").Classes<"main">>;
export declare const cssProps: import("@cssfn/css-config").Refs<{
    img: string;
}>, cssDecls: import("@cssfn/css-config").Decls<{
    img: string;
}>, cssVals: import("@cssfn/css-config").Vals<{
    img: string;
}>, cssConfig: import("@cssfn/css-config").CssConfigSettings;
export interface RadioProps extends CheckProps {
}
export declare function Radio(props: RadioProps): JSX.Element;
export { Radio as default };
export type { CheckStyle, CheckVariant };
