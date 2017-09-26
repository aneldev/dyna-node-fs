export declare const loadJSON: (filename: string) => Promise<any>;
export declare const saveJSON: (filename: string, data: any, humanReadable?: boolean) => Promise<void>;
export declare const exists: (filename: string) => Promise<boolean>;
export declare const deleteFile: (filename: string) => Promise<boolean>;
