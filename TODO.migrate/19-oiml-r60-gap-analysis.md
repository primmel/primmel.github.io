# 19 — OIML R 60 semantic gap analysis

## What

OIML R 60 (Metrological regulation for load cells) has a rich data
model across 35+ YAML files. This analysis identifies what Primmel can
and cannot represent, and proposes language extensions needed for
full semantic coverage.

## Current coverage: ~60% structural, ~30% quantitative

### Fully representable (structural layer)

| OIML R 60 concept | Primmel construct | Coverage |
|---|---|---|
| Standard identity | `metadata` | Full |
| Roles | `role` | Full |
| Processes | `process` (with actor, modality, validate_provision) | Full |
| Provisions (basic) | `provision` (condition, modality, reference) | Full |
| Data classes | `class` with fields | Full |
| Data registries | `data_registry` | Full |
| Enums | `enum` with values | Full |
| Tables (column-indexed) | `table` with columns + data | Full |
| Approvals | `approval` (actor, approve_by, record) | Full |
| State machines | `state_machine` (initial, transitions) | Full |
| References (URN) | `reference` | Full |
| Notes | `note` | Full |
| Canvases (flow diagrams) | `canvas` with elements + process_flow | Full |

### Partially representable (missing richness)

| OIML R 60 concept | Primmel construct | What's missing |
|---|---|---|
| Variables/symbols | `variable` | `notation` (math display), `unit`, `source` (declared/derived/looked-up), formula with display+expression+inputs |
| Calculations | `calculation` | Typed inputs/outputs with units; OCL expression body |
| Forms | `form` | Deeply nested array/object fields with defaults; field-level references |
| Exclusive gateways | `exclusive_gateway` | Classification-dimension predicates (`[accuracy_class] in ['A','B']`) |

### NOT representable (language gaps)

#### 1. Structured acceptance criteria

OIML R 60 provisions have structured thresholds:

```yaml
acceptance_criteria:
  type: threshold
  limit:
    expression: "L_test"
    operator: gte
    threshold_expression: "E_min"
    unit: mass units
```

Primmel `provision` has only free-text `condition`. No way to express
machine-evaluable thresholds with operators and units.

**Proposed extension:**
```text
provision ProvMPE {
  condition "Errors shall not exceed MPE"
  modality SHALL
  acceptance_criteria {
    expression "error_EL"
    operator lte
    threshold "mpe_tiers,limit_factor,accuracy_class,accuracy_class"
    unit "v"
  }
}
```

#### 2. Conformance test construct

OIML R 60 has ordered test procedures with typed test variables:

```yaml
tests:
  - name: "Determination of measurement error..."
    procedure_steps: [check_test_conditions, insert_load_cell, ...]
    targets: [/req/metrological/mpe, /req/metrological/repeatability]
    variables:
      - name: conversion_factor_f
        derivation: "ocl{(avgIndicationAt75pct - indicationAtDmin) / (0.75 * n_LC)}"
```

No Primmel construct for conformance tests. `process` doesn't have
ordered steps or test variables.

**Proposed extension:**
```text
conformance_test MeasurementError {
  name "Measurement error test"
  targets { ProvMPE ProvRepeatability ProvTemperatureEffectMDLO }
  procedure {
    step check_test_conditions
    step insert_load_cell
    step preload_load_cell
    step apply_test_load_points
    step record_indications_increasing
    step record_indications_decreasing
  }
  variables {
    f { type number unit "counts/v" derivation "ocl{...}" }
    EL { type number unit "v" derivation "ocl{...}" }
  }
}
```

#### 3. Typed calculation I/O

OIML R 60 calculations have typed inputs and outputs:

```yaml
inputs:
  - { name: avgIndicationAt75pct, type: number, unit: counts }
output:
  - { name: f, type: number, unit: "counts/v" }
expression: "ocl{(avgIndicationAt75pct - indicationAtDmin) / (0.75 * n_LC)}"
```

Primmel `calculation` has only a name and reference. No typed I/O.

**Proposed extension:**
```text
calculation conversionFactor {
  name "Conversion factor f"
  input avgIndicationAt75pct { type number unit "counts" }
  input indicationAtDmin { type number unit "counts" }
  input n_LC { type integer }
  output f { type number unit "counts/v" }
  expression "ocl{(avgIndicationAt75pct - indicationAtDmin) / (0.75 * n_LC)}"
}
```

#### 4. Value model (dimension-keyed lookups)

```yaml
value_model:
  mpe_tiers:
    dimension: accuracy_class
    binding:
      A: [{ min: 0, max: 50000, factor: 0.5 }, ...]
```

No Primmel construct for dimension-keyed value profiles.

#### 5. Evaluation profiles

```yaml
profiles:
  - id: class-a-digital-nh
    accuracy_class: A
    technology: digital
    humidity_class: NH
```

Dimension combinations that select applicable requirements/tests.
No Primmel construct.

#### 6. Sample selection rules

Algorithmic rules for selecting test samples based on metrological
merit ordering. No Primmel construct for declarative algorithms.

#### 7. Table lookup formulas

```yaml
formulas:
  - name: lookupMPE
    type: table_lookup
    lookup: { key: accuracy_class, variable: load, multiplier: p_LC }
```

Primmel measurements don't support table lookup expressions.

#### 8. Form nesting depth

OIML R 60 forms have deeply nested array→object→field structures
with defaults. Primmel `form` fields are flatter.

#### 9. Gateway classification predicates

```yaml
gateways:
  - id: test_runs_gateway
    edges:
      - target: conduct_mdlo_tests
        condition: "[accuracy_class] in ['C', 'D']"
```

Primmel `exclusive_gateway` conditions are measurement expressions,
not classification-dimension predicates.

## Summary

| Layer | Coverage | Status |
|---|---|---|
| Standard identity | 100% | Full |
| Organizational (roles, processes, approvals) | 100% | Full |
| Requirements (provisions) | 70% | Missing structured thresholds |
| Data model (classes, registries, enums, tables) | 90% | Full |
| State machines | 100% | Full |
| Variables/symbols | 40% | Missing notation/unit/source/formula |
| Calculations | 30% | Missing typed I/O and expressions |
| Conformance tests | 0% | No construct |
| Value model | 0% | No construct |
| Evaluation profiles | 0% | No construct |
| Sample selection | 0% | No construct |
| Gateway predicates | 20% | Missing dimension predicates |
| Forms | 50% | Missing deep nesting |
| Certificate templates | 0% | No construct |

## Proposed language extensions (priority order)

1. **Acceptance criteria in provisions** — structured threshold/operator/unit
2. **Conformance test construct** — ordered steps, test variables, targets
3. **Typed calculation I/O** — inputs, outputs with types and units
4. **Variable metadata** — notation, unit, source, formula display+expression
5. **Table lookup measurements** — `lookup(table, col, key)` expressions
6. **Evaluation profile construct** — dimension combinations for test applicability
7. **Value model construct** — dimension-keyed tiered bindings
8. **Gateway classification predicates** — `[dimension] in [...]` syntax
9. **Form nesting** — support array/object field types with defaults
10. **Certificate template construct** — structured output templates

## Conclusion

Primmel can represent the **organizational and structural** layers of
OIML R 60 (who does what, what data exists, how the workflow flows).
It **cannot** represent the **quantitative and testing** layers (how
errors are calculated, what thresholds apply, how tests are performed,
what evaluation rules select applicable tests).

Full representation requires extending Primmel with metrology-specific
primitives: structured acceptance criteria, conformance test
procedures, typed calculations, and dimension-keyed value models.
