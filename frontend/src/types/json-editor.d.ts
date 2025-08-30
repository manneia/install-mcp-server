declare module '@json-editor/json-editor' {
  class JSONEditor {
    constructor(element: HTMLElement, options: any);
    static defaults: any;
    on(event: string, callback: () => void): void;
    getValue(): any;
    setValue(value: any): void;
    destroy(): void;
  }
  export { JSONEditor };
}