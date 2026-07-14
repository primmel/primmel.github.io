# 15 — Editor: data registry CRUD (TODO 13 P3)

## What

Add a data registry browser to the editor that lets users view, add,
edit, and delete records in `.pws/` workspace files.

## Current state

The editor can parse and display models that reference data
registries, but it cannot:
- Browse the records in a registry
- Create new records via a form
- Edit existing records
- Delete records
- Save changes back to a `.pws/` directory

## Proposed UI

Add a new panel tab: **Registry** (between Code and Inspect):

```
┌─────────────────────────────────────────┐
│ Registry: Procedure  [+ Add record]     │
├─────────────────────────────────────────┤
│ ID            Process    Procedures      │
│ rec_001       P1         "Step A"        │
│ rec_002       P2         "Step B"    [🗑] │
│ ...                                     │
└─────────────────────────────────────────┘
```

When a record is selected, show a form generated from the data class
definition. Each field renders based on its type:
- `string` → text input
- `int` / `real` → number input
- `boolean` → checkbox
- `enum` → dropdown
- `date` → date picker

## Technical approach

### Reading `.pws/` in the browser

The `.pws/` directory is a set of YAML files. In the browser, these
can be loaded via:

1. **File System Access API** (Chrome/Edge) — read the directory
   directly
2. **Drag-drop the entire `.pws/` folder** — read all files
3. **Upload a `.pws.zip`** — extract in browser

### Writing changes

When a record is edited:
1. Update the in-memory record object
2. Serialize the record back to YAML
3. Write the file via File System Access API (`createWritable`)
4. Update the manifest if a record was added/removed

### Form generation

The form schema is derived from the model's `class` definitions:

```text
class Procedure#data {
  Process    { definition "Processes" }
  Procedures { definition "Procedures" }
}
```

Each attribute in the class body becomes a form field. The `#data`
suffix marks it as a data class (linkable to a registry).

## Dependencies

- YAML parser/serializer for the browser (e.g., `js-yaml`)
- File System Access API (already integrated for P5)
- The editor's Pinia stores need a new `workspace` store for records
