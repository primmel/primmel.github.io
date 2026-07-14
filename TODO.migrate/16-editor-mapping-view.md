# 16 — Editor: visual mapping view (TODO 13 P4)

## What

A visual `.prm` mapping editor that lets users draw lines between
reference model elements and implementation model elements.

## Current state

The editor can load a single model and visualize its process flow.
It cannot:
- Load a reference and implementation model side-by-side
- Create or edit `.prm` mapping files
- Visualize which implementation elements satisfy which reference
  requirements
- Identify unmapped reference requirements (Statement of Applicability
  gaps)

## Proposed UI

A new top-level view: **Mapping** (alongside the current Model view):

```
┌──────────────────┬──────────────────────────┬──────────────────┐
│ Reference Model  │   Mapping Canvas         │ Implementation   │
│ (ISO 27001)      │                          │ (Ribose Crimson) │
│                  │   ┌───────┐              │                  │
│ ○ ISMS           │   │ISMS   │──────┐       │ ○ Crimson        │
│ ○ EstablishISMS  │   └───────┘       │      │ ○ CrimsonReq     │
│ ○ ImplementISMS  │   ┌───────┐       v      │ ○ CrimsonPol      │
│ ○ RiskAssessment │   │Risk   │   ┌───────┐  │ ○ CrimsonProc     │
│                  │   │Assess │───│Crimson│  │                  │
│                  │   └───────┘   │ISMS   │  │                  │
│                  │               └───────┘  │                  │
└──────────────────┴──────────────────────────┴──────────────────┘
```

- **Left panel**: reference model element tree
- **Center**: mapping canvas with draggable lines
- **Right panel**: implementation model element tree
- **Bottom**: unmapped reference elements (Statement of Applicability gaps)

## Interaction model

1. User clicks a reference element (left)
2. User clicks an implementation element (right)
3. A line is drawn between them in the center canvas
4. The mapping is stored in the `.prm` structure:

```json
{
  "mapSet": {
    "ISO27001": {
      "mappings": {
        "ISMS": {
          "Crimson": { "description": "fulfils", "justification": "..." }
        }
      }
    }
  }
}
```

5. The user can add a `description` and `justification` to each mapping

## Statement of Applicability

The mapping view highlights:
- **Green**: reference elements with at least one implementation mapping
- **Yellow**: implementation elements not mapped to any reference
- **Red**: reference elements with NO implementation mapping (gaps)

This gives auditors an instant visual of compliance coverage.

## Technical approach

### Loading two models

The editor's Pinia stores need to support a second model:

```typescript
// stores/mapping.ts
export const useMappingStore = defineStore('mapping', () => {
  const referenceModel = ref<Standard | null>(null);
  const implementationModel = ref<Standard | null>(null);
  const mappings = ref<MapEntry[]>([]);
  // ...
});
```

### SVG rendering

The mapping canvas uses SVG with:
- Draggable nodes (left and right columns)
- Bezier curves for mapping lines
- Click a line to select and edit its description/justification

### Export

Save the mappings as a `.prm` JSON file via File System Access API.

## Dependencies

- The mapping JSON format must match the existing `.prm` structure
  (see `implementations/acme/acme.prm`)
- Statement of Applicability logic: every reference element must have
  ≥1 implementation mapping
