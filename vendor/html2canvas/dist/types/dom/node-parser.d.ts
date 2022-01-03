import { ElementContainer } from './element-container';
import { Context } from '../core/context';
export declare const parseTree: (context: Context, element: HTMLElement) => ElementContainer;
export declare const isTextNode: (node: Node) => node is Text;
export declare const isElementNode: (node: Node) => node is Element;
export declare const isHTMLElementNode: (node: Node) => node is HTMLElement;
export declare const isSVGElementNode: (element: Element) => element is SVGElement;
export declare const isLIElement: (node: Element) => node is HTMLLIElement;
export declare const isOLElement: (node: Element) => node is HTMLOListElement;
export declare const isInputElement: (node: Element) => node is HTMLInputElement;
export declare const isHTMLElement: (node: Element) => node is HTMLHtmlElement;
export declare const isSVGElement: (node: Element) => node is SVGSVGElement;
export declare const isBodyElement: (node: Element) => node is HTMLBodyElement;
export declare const isCanvasElement: (node: Element) => node is HTMLCanvasElement;
export declare const isImageElement: (node: Element) => node is HTMLImageElement;
export declare const isIFrameElement: (node: Element) => node is HTMLIFrameElement;
export declare const isStyleElement: (node: Element) => node is HTMLStyleElement;
export declare const isScriptElement: (node: Element) => node is HTMLScriptElement;
export declare const isTextareaElement: (node: Element) => node is HTMLTextAreaElement;
export declare const isSelectElement: (node: Element) => node is HTMLSelectElement;
export declare const isSlotElement: (node: Element) => node is HTMLSlotElement;
export declare const isCustomElement: (node: Element) => node is HTMLElement;
