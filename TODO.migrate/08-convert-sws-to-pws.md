# 08 — Convert .sws → .pws workspace format

## What

The old `.sws` format is a single JSON blob containing all data
registry records. Primmel's `.pws` format is a directory with one
YAML file per record, organized into subdirectories per data registry,
with a `manifest.yaml` at the root.

## Current .sws format (JSON blob)

```json
{
  "docs": {
    "RiboseCrimson": {
      "id": "RiboseCrimson",
      "store": {
        "TestingRegistry": {
          "id": "TestingRegistry",
          "docs": {
            "6400790380169285": {
              "id": 6400790380169285,
              "name": "Happy first document",
              "attributes": {
                "string": "yes",
                "empty": "also yes",
                "boolean": "False"
              },
              "regid": "TestingRegistry"
            }
          }
        }
      }
    }
  },
  "version": "v1.0.0-dev1"
}
```

## Target .pws format (directory + YAML)

```
ribose-crimson.pws/
├── manifest.yaml
├── TestingRegistry/
│   ├── 6400790380169285.yaml
│   └── ...
└── ...
```

manifest.yaml:
```yaml
version: v1.0.0-dev1
model: RiboseCrimson
registries:
  - TestingRegistry
```

6400790380169285.yaml:
```yaml
id: "6400790380169285"
regid: TestingRegistry
name: Happy first document
attributes:
  string: "yes"
  empty: "also yes"
  boolean: false
```

## Migration script

1. Read `.sws` JSON
2. For each model → each registry → each record:
   - Create directory: `.pws/<RegistryName>/`
   - Write YAML file: `<record-id>.yaml`
3. Write `manifest.yaml` at root
4. Delete `.sws` file

## Benefits of directory format

- **Git-friendly**: each record is a file, diffs are readable
- **Human-readable**: YAML > JSON for manual inspection
- **Scalable**: no need to load entire blob into memory
- **File-system operations**: mv, cp, rm on individual records
- **Separation**: records are physically separated by registry

## Dependencies

- None (format conversion is standalone)
