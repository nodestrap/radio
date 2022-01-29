// react:
import {
    default as React,
    useRef,
    useEffect,
}                           from 'react'         // base technology of our nodestrap components

// cssfn:
import {
    // compositions:
    mainComposition,
    
    
    
    // styles:
    style,
    vars,
    imports,
    
    
    
    //combinators:
    children,
    
    
    
    // utilities:
    escapeSvg,
}                           from '@cssfn/cssfn'       // cssfn core
import {
    // hooks:
    createUseSheet,
}                           from '@cssfn/react-cssfn' // cssfn for react
import {
    createCssConfig,
    
    
    
    // utilities:
    usesGeneralProps,
    usesSuffixedProps,
    overwriteProps,
}                           from '@cssfn/css-config'  // Stores & retrieves configuration using *css custom properties* (css variables)

// nodestrap utilities:
import {
    // utilities:
    setRef,
}                           from '@nodestrap/utilities'

// nodestrap components:
import {
    // hooks:
    usesSizeVariant,
    usesBorderRadius,
}                           from '@nodestrap/basic'
import {
    // hooks:
    useTogglerActive,
}                           from '@nodestrap/indicator'
import {
    // hooks:
    CheckStyle,
    CheckVariant,
    
    
    
    // styles:
    inputElm,
    usesCheckLayout,
    usesCheckVariants,
    usesCheckStates,
    
    
    
    // configs:
    cssDecls as ccssDecls,
    
    
    
    // react components:
    CheckProps,
    Check,
}                           from '@nodestrap/check'



// styles:
export const usesRadioLayout = () => {
    // dependencies:
    
    // borders:
    const [, , borderRadiusDecls] = usesBorderRadius();
    
    
    
    return style({
        ...imports([
            // layouts:
            usesCheckLayout(),
        ]),
        ...style({
            // children:
            ...children(inputElm, {
                // borders:
                // circle corners on top:
                [borderRadiusDecls.borderStartStartRadius] : '0.5em',
                [borderRadiusDecls.borderStartEndRadius  ] : '0.5em',
                // circle corners on bottom:
                [borderRadiusDecls.borderEndStartRadius  ] : '0.5em',
                [borderRadiusDecls.borderEndEndRadius    ] : '0.5em',
                
                
                
                // customize:
                ...usesGeneralProps(cssProps), // apply general cssProps
            }),
        }),
        ...vars({
            [ccssDecls.img] : cssProps.img,
        }),
    });
};
export const usesRadioVariants = () => {
    // dependencies:
    
    // layouts:
    const [sizes] = usesSizeVariant((sizeName) => style({
        // overwrites propName = propName{SizeName}:
        ...overwriteProps(cssDecls, usesSuffixedProps(cssProps, sizeName)),
    }));
    
    
    
    return style({
        ...imports([
            // variants:
            usesCheckVariants(),
            
            // layouts:
            sizes(),
        ]),
    });
};
export const usesRadioStates = () => {
    return style({
        ...imports([
            // states:
            usesCheckStates(),
        ]),
    });
};

export const useRadioSheet = createUseSheet(() => [
    mainComposition(
        imports([
            // layouts:
            usesRadioLayout(),
            
            // variants:
            usesRadioVariants(),
            
            // states:
            usesRadioStates(),
        ]),
    ),
], /*sheetId :*/'f4fvh7cm5b'); // an unique salt for SSR support, ensures the server-side & client-side have the same generated class names



// configs:
export const [cssProps, cssDecls, cssVals, cssConfig] = createCssConfig(() => {
    return {
        //#region indicators
        // forked from Bootstrap 5:
        img                      : `url("data:image/svg+xml,${escapeSvg("<svg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'><circle r='2' fill='#000'/></svg>")}")`,
        //#endregion indicators
    };
}, { prefix: 'rad' });



// react components:

export interface RadioProps
    extends
        CheckProps
{
}
export function Radio(props: RadioProps) {
    // styles:
    const sheet = useRadioSheet();
    
    
    
    // states:
    const inputRef  = useRef<HTMLInputElement|null>(null);
    const [isActive, setActive] = useTogglerActive({
        ...props,
        
        defaultActive : props.defaultActive ?? props.defaultChecked, // forwards `defaultChecked` to `defaultActive`
        active        : props.active        ?? props.checked,        // forwards `checked`        to `active`
    }, /*changeEventTarget :*/inputRef);
    
    
    
    // rest props:
    const {
        // essentials:
        elmRef,
    ...restProps}  = props;
    
    
    
    // dom effects:
    useEffect(() => {
        const radio = inputRef.current;
        if (!radio) return; // radio was unloaded => nothing to do
        
        
        
        // handlers:
        const handleClear = () => {
            setActive(false); // set as inactive
        };
        
        
        
        // setups:
        radio.addEventListener('clear', handleClear);
        
        
        
        // cleanups:
        return () => {
            radio.removeEventListener('clear', handleClear);
        };
    }, [setActive]); // the effect should only run once, `setActive()` guaranteed never to mutate
    
    
    
    // handlers:
    const handleCheck = () => {
        setActive(true); // set as active
    }
    
    
    
    // fn props:
    const isButton          = !!props.checkStyle && ['btn', 'togglerBtn'].includes(props.checkStyle);
    const semanticRole      = props.semanticRole ?? (isButton ? 'button'  : 'radio');
    
    
    
    // jsx:
    return (
        <Check
            // other props:
            {...restProps}
            
            
            // semantics:
            semanticRole={semanticRole}
            
            
            // essentials:
            elmRef={(elm) => {
                setRef(elmRef, elm);
                setRef(inputRef, elm);
            }}
            
            
            // accessibilities:
            active={isActive}
            
            
            // classes:
            mainClass={props.mainClass ?? sheet.main}
            
            
            // formats:
            type={props.type ?? 'radio'}
            
            
            // events:
            onClick={(e) => {
                props.onClick?.(e);
                
                
                
                if (!e.defaultPrevented) {
                    handleCheck();
                    e.preventDefault();
                } // if
            }}
            onKeyUp={(e) => {
                props.onKeyUp?.(e);
                
                
                
                if (!e.defaultPrevented) {
                    if ((e.key === ' ') || (e.code === 'Space')) {
                        handleCheck();
                        e.preventDefault();
                    } // if
                } // if
            }}
            
            onChange={(e) => {
                props.onChange?.(e);
                
                
                
                if (!props.name)       return; // the radio must have a name
                if (!e.target.checked) return; // the radio is checked not cleared
                
                
                
                let parentGroup = e.target.parentElement;
                //#region find nearest `<form>` or grandGrandParent
                while (parentGroup) {
                    if (parentGroup.tagName === 'FORM') break; // found nearest `<form>`
                    
                    // find next:
                    const grandParent = parentGroup.parentElement;
                    if (!grandParent) break;
                    parentGroup = grandParent;
                } // while
                //#endregion find nearest `<form>` or grandGrandParent
                
                
                
                if (parentGroup) {
                    for (const radio of (Array.from(parentGroup.querySelectorAll('input[type=radio]')) as HTMLInputElement[])) {
                        if (radio === e.target) continue; // radio is self => skip
                        if (radio.name !== props.name) continue; // radio's name is different to us => skip
                        
                        
                        
                        radio.dispatchEvent(new Event('clear', { bubbles: false }));
                    } // for
                } // if
            }}
        />
    );
}
export { Radio as default }

export type { CheckStyle, CheckVariant }
