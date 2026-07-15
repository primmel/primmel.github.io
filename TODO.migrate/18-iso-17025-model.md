# 18 — Create ISO 17025 model from real source

> **Status: DONE** — Model created at
> `primmel/private-models/reference/iso/iso-17025.prl`. 5 roles, 29
> processes (24 nested), 27 provisions, 3 canvases, 6 data registries.
> Source: `/Users/mulgogi/src/mn/iso-17025/sources/`.

## What

Create a Primmel `.prl` model of ISO/IEC 17025 (Testing and calibration
laboratories — General requirements) from the real AsciiDoc source.

ISO 17025 specifies the general requirements for the competence,
impartiality, and consistent operation of laboratories. It is the
primary standard for lab accreditation worldwide.

## Source

- Section sources: `/Users/mulgogi/src/mn/iso-17025/sources/sections/`
  - `04-general_requirements.adoc`
  - `05-structural_requirements.adoc`
  - `06-resource_requirements.adoc`
  - `07-process_requirements.adoc`
  - `08-management_system_requirements.adoc`
- Main document: `/Users/mulgogi/src/mn/iso-17025/sources/document.adoc`

## Structure to model

ISO 17025 has  8 main clauses:

1. Scope
2. Normative references
3. Terms and definitions
4. General requirements (impartiality, confidentiality)
5. Structural requirements (organization, management)
6. Resource requirements (personnel, facilities, equipment, metrological traceability)
7. Process requirements (review of requests, sampling, testing, reporting)
8. Management system requirements (document control, improvement)

Clause 7 (process requirements) is the core: it defines the lab
testing workflow from request review → sampling → testing/calibration
→ data validation → reporting.

## Target file

```
primmel/private-models/reference/iso/iso-17025.prl
```

## Key processes to model

- Request, tender and contract review (7.1.1-7.1.9)
- Selection, verification and validation of methods (7.2)
- Sampling (7.3)
- Handling of test/calibration items (7.4)
- Technical records (7.5)
- Evaluation of measurement uncertainty (7.6)
- Ensuring validity of results (7.7)
- Reporting of results (7.8)
- Complaints (7.9)
- Nonconforming work (7.10)
- Data control and information management (7.11)

## Dependencies

- TODO 01 (canvas keyword) — done
- The model uses provisions with reference clauses
