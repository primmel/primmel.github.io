# 02 — Create primmel/private-models repo

## What

Create a new private GitHub repository `primmel/private-models` and
migrate all 14 real-world models from `mn/mmel-models/` into it,
with a clean hierarchy organized by standard body and model type.

## Repo structure

```
primmel/private-models/
├── README.adoc
├── CLAUDE.md
├── reference/                   Standards as published
│   ├── iso/
│   │   ├── iso-27001/
│   │   │   ├── iso-27001.prl     (was ISO27001.mmel)
│   │   │   └── README.md
│   │   ├── iso-13485/
│   │   │   ├── iso-13485.prl
│   │   │   └── iso-13485.prd     (if .sdc exists)
│   │   ├── iso-14971/
│   │   │   └── iso-14971.prl
│   │   └── mdsap/
│   │       └── mdsap.prl
│   ├── bsi/
│   │   ├── bs-20400/
│   │   │   └── bs-20400.prl
│   │   ├── bs-44003/
│   │   │   └── bs-44003.prl
│   │   ├── bs-16341/
│   │   │   └── bs-16341.prl
│   │   ├── bs-202000/
│   │   │   └── bs-202000.prl
│   │   ├── bs-6004/
│   │   │   └── bs-6004.prl
│   │   └── dptm/
│   │       ├── dptm.prl
│   │       └── dptm.prd          (was dptm.sdc)
│   └── hls/
│       └── hls.prl               (data structure demo)
│
├── implementations/             Organisation implementations
│   ├── acme/
│   │   ├── acme.prl              (was acme.mmel)
│   │   └── acme.prm             (was acme.map)
│   ├── abc-company/
│   │   ├── abc-bs20400.prl      (was BS20400impl.mmel)
│   │   └── abc-bs20400.prm
│   ├── qms/
│   │   ├── qms.prl              (was QMS implementation.mmel)
│   │   └── qms.prm             (was QMS.map)
│   └── ribose/
│       ├── ribose-crimson.prl   (was RiboseImplementation.mmel)
│       ├── ribose-crimson.prm   (was ribose.map)
│       └── ribose-crimson.pws/  (was ribose.sws → YAML directory)
│
├── test/                        Artificial test models
│   ├── links/
│   ├── model-diff/
│   └── mapping-diff/
│
└── docs/
    ├── guides/                  (from Guides/ — authoring, measurement, mapping)
    └── paneron-extension/       (historical archive — not maintained)
```

## Migration steps per file

1. Copy `.mmel` → `.prl`
2. Change `schema "MMEL 0.1"` → `schema "Primmel 0.1"`
3. Rename `subprocess` keyword → `canvas` (after TODO 01)
4. Convert `.sdc` → `.prd` (format may differ — evaluate)
5. Rename `.map` → `.prm` (JSON structure compatible)
6. Convert `.sws` → `.pws/` directory (JSON blob → YAML files per record)
7. Update internal cross-references if any paths changed

## Verification

- Each `.prl` file loads without errors via `@primmel/primmel`
- `dump(load(content))` round-trips for each model
- Element counts match original (spot-check against Paneron)

## Dependencies

- TODO 01 (subprocess → canvas rename) should be done first
