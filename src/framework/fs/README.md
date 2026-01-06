# Framework - File System
This folder contains **reusable file-system helpers** for reading, writing, and deleting migration data files. <br/>
These utilities centralize file I/O behavior and ensure consistent logging and dry-run safety across all migration workflows.

## Folder Structure
```
src/framework/fs/
│
├─ delete-data-file.ts
├─ read-data-file.ts
├─ write-data-file.ts
```

### `read-data-file.ts`
Reads and parses a JSON data file, returning null if the file does not exist and throwing on invalid JSON.

### `write-data-file.ts`
Writes JSON data to disk with pretty formatting and optional dry-run support.

### `delete-data-file.ts`
Safely deletes a data file, skipping missing files and supporting dry-run execution.