# About  

Basic node.js file actions that return Promises.

Written in Typescript, runs everywhere.

# Methods

# loadJSON(filename: string): Promise<any>

Loads a file.

Resolves with a object saved in the JSON file.

# saveJSON(filename: string, data: any, humanReadable: boolean = false): Promise<void>

Saves a file with an object is JSON format.

# exists(filename: string): Promise<boolean>

Resolves with boolean is the file exists or not.

# deleteFile(filename: string): Promise<boolean>

_more commands later_

# mkdir(path: string): Promise<void>

Create a directories recursively.

# isFolderEmpty(path: string): Promise<boolean>

Returns true if the folder contains files or sub folders.
