<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { load, dump } from '@primmel/primmel';
import type { Standard } from '@primmel/primmel';

defineOptions({ inheritAttrs: false });

interface CanvasNode {
  id: string;
  x: number;
  y: number;
  kind: 'start' | 'end' | 'timer' | 'process' | 'exclusive' | 'parallel';
  label: string;
}
interface CanvasEdge {
  id: string;
  from: { x: number; y: number };
  to: { x: number; y: number };
}

const props = defineProps<{ code: string }>();
const emit = defineEmits<{ 'update:code': [value: string] }>();

const model = computed<Standard | null>(() => {
  try {
    return load(props.code);
  } catch {
    return null;
  }
});

const parseError = computed<string | null>(() => {
  try {
    load(props.code);
    return null;
  } catch (e) {
    return (e as Error).message;
  }
});

const activeCanvasId = ref<string | null>(null);
const zoom = ref(1);
const panX = ref(0);
const panY = ref(0);
const isDragging = ref(false);
const dragStart = ref({ x: 0, y: 0, px: 0, py: 0 });

const canvas = computed(() => {
  if (!model.value) return null;
  if (!activeCanvasId.value) {
    return model.value.pages.find((p) => p.id === model.value!.root?.id) ?? model.value.pages[0] ?? null;
  }
  return model.value.pages.find((p) => p.id === activeCanvasId.value) ?? null;
});

const HALF = 24;

function nodeKind(elId: string): CanvasNode['kind'] {
  if (!model.value) return 'process';
  const ev = model.value.events.find((e) => e.id === elId);
  if (ev) {
    if (ev.eventType === 'start') return 'start';
    if (ev.eventType === 'end') return 'end';
    return 'timer';
  }
  const gw = model.value.gateways.find((g) => g.id === elId);
  if (gw) return gw.gatewayType === 'exclusive_gateway' ? 'exclusive' : 'parallel';
  return 'process';
}

function nodeLabel(elId: string): string {
  if (!model.value) return elId;
  const proc = model.value.processes.find((p) => p.id === elId);
  return proc?.name || elId;
}

const rendered = computed(() => {
  if (!canvas.value || !canvas.value.childs) return { nodes: [] as CanvasNode[], edges: [] as CanvasEdge[] };
  const c = canvas.value;
  const nodes: CanvasNode[] = c.childs.map((comp) => {
    const elId = comp.element?.id ?? comp.name;
    return { id: elId, x: comp.x ?? 0, y: comp.y ?? 0, kind: nodeKind(elId), label: nodeLabel(elId) };
  });
  const lookup = new Map(nodes.map((n) => [n.id, n]));
  const edges: CanvasEdge[] = (c.edges ?? [])
    .map((e) => {
      const fromId = e.from?.element?.id ?? e.from?.name ?? '';
      const toId = e.to?.element?.id ?? e.to?.name ?? '';
      const from = lookup.get(fromId);
      const to = lookup.get(toId);
      if (!from || !to) return null;
      const dx = to.x - from.x, dy = to.y - from.y;
      const adx = Math.abs(dx), ady = Math.abs(dy);
      if (adx > ady) {
        return { id: e.id, from: { x: from.x + (dx > 0 ? HALF : -HALF), y: from.y }, to: { x: to.x + (dx > 0 ? -HALF : HALF), y: to.y } };
      }
      return { id: e.id, from: { x: from.x, y: from.y + (dy > 0 ? HALF : -HALF) }, to: { x: to.x, y: to.y + (dy > 0 ? -HALF : HALF) } };
    })
    .filter((e): e is CanvasEdge => e !== null);
  return { nodes, edges };
});

const viewBox = computed(() => {
  const z = zoom.value;
  return `${-panX.value / z} ${-panY.value / z} ${800 / z} ${500 / z}`;
});

const colors: Record<CanvasNode['kind'], string> = {
  start: '#22c55e', end: '#ef4444', timer: '#f59e0b',
  process: '#4a6fa5', exclusive: '#f57c00', parallel: '#9c27b0',
};

function onMouseDown(e: MouseEvent) {
  const target = e.target as Element;
  if (target.tagName === 'svg' || target.getAttribute('data-bg')) {
    isDragging.value = true;
    dragStart.value = { x: e.clientX, y: e.clientY, px: panX.value, py: panY.value };
  }
}
function onMouseMove(e: MouseEvent) {
  if (!isDragging.value) return;
  panX.value = dragStart.value.px + (e.clientX - dragStart.value.x);
  panY.value = dragStart.value.py + (e.clientY - dragStart.value.y);
}
function onMouseUp() { isDragging.value = false; }
function onWheel(e: WheelEvent) {
  e.preventDefault();
  zoom.value = Math.max(0.3, Math.min(2.5, zoom.value * (e.deltaY > 0 ? 0.9 : 1.1)));
}
function reset() { zoom.value = 1; panX.value = 0; panY.value = 0; }

function onInput(e: Event) {
  emit('update:code', (e.target as HTMLTextAreaElement).value);
}

function format() {
  if (!model.value) return;
  emit('update:code', dump(model.value));
}

function download() {
  const blob = new Blob([props.code], { type: 'text/plain' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'model.prl';
  a.click();
}

function bezierPath(from: { x: number; y: number }, to: { x: number; y: number }): string {
  const dx = Math.abs(to.x - from.x), dy = Math.abs(to.y - from.y);
  const cp = Math.max(dx, dy) * 0.4;
  if (dx > dy) {
    const dir = to.x > from.x ? cp : -cp;
    return `M ${from.x} ${from.y} C ${from.x + dir} ${from.y}, ${to.x - dir} ${to.y}, ${to.x} ${to.y}`;
  }
  const dir = to.y > from.y ? cp : -cp;
  return `M ${from.x} ${from.y} C ${from.x} ${from.y + dir}, ${to.x} ${to.y - dir}, ${to.x} ${to.y}`;
}

watch(model, (m) => {
  if (m && m.pages.length > 0 && !m.pages.find((p) => p.id === activeCanvasId.value)) {
    activeCanvasId.value = m.root?.id ?? m.pages[0].id;
  }
});
</script>

<template>
  <div class="pg-layout">
    <div class="pg-editor">
      <div class="pg-editor-header">
        <span class="pg-filename">hello-world.prl</span>
        <button @click="format" class="pg-btn">Format</button>
        <button @click="download" class="pg-btn">Download</button>
      </div>
      <textarea
        :value="code"
        @input="onInput"
        spellcheck="false"
        class="pg-code"
        aria-label="Primmel model source"
      ></textarea>
    </div>
    <div class="pg-output">
      <div v-if="parseError" class="pg-error">{{ parseError }}</div>
      <template v-if="model">
        <div class="pg-stats">
          <h3>Summary</h3>
          <div class="pg-stat-row">
            <span class="pg-stat">{{ model.processes.length }} processes</span>
            <span class="pg-stat">{{ model.provisions.length }} provisions</span>
            <span class="pg-stat">{{ model.pages.length }} canvases</span>
            <span class="pg-stat">{{ model.roles.length }} roles</span>
          </div>
        </div>
        <div class="pg-diagram">
          <div class="pg-diagram-header">
            <h3>{{ canvas?.id ?? 'Canvas' }}</h3>
            <div class="pg-zoom-controls">
              <button @click="zoom = Math.max(0.3, zoom * 0.9)">−</button>
              <button @click="reset">⟲</button>
              <button @click="zoom = Math.min(2.5, zoom * 1.1)">+</button>
            </div>
          </div>
          <div v-if="model.pages.length > 1" class="pg-canvas-tabs">
            <button
              v-for="p in model.pages"
              :key="p.id"
              :class="{ active: p.id === canvas?.id }"
              @click="activeCanvasId = p.id"
            >{{ p.id }}</button>
          </div>
          <svg
            class="pg-svg"
            :viewBox="viewBox"
            @mousedown="onMouseDown"
            @mousemove="onMouseMove"
            @mouseup="onMouseUp"
            @mouseleave="onMouseUp"
            @wheel.prevent="onWheel"
          >
            <rect data-bg="true" :x="-10000" :y="-10000" :width="20000" :height="20000" fill="transparent" />
            <g v-for="edge in rendered.edges" :key="edge.id">
              <path :d="bezierPath(edge.from, edge.to)" fill="none" stroke="#6b7280" stroke-width="1.5" marker-end="url(#pg-arrow)" />
            </g>
            <g v-for="node in rendered.nodes" :key="node.id" :transform="`translate(${node.x} ${node.y})`">
              <rect v-if="node.kind === 'process'" :x="-HALF" :y="-HALF" :width="HALF*2" :height="HALF*2" rx="6" :fill="colors[node.kind] + '20'" :stroke="colors[node.kind]" stroke-width="2" />
              <polygon v-else-if="node.kind === 'exclusive' || node.kind === 'parallel'" :points="`0,${-HALF} ${HALF},0 0,${HALF} ${-HALF},0`" :fill="colors[node.kind] + '20'" :stroke="colors[node.kind]" stroke-width="2" />
              <circle v-else :r="HALF - 2" :fill="colors[node.kind] + '20'" :stroke="colors[node.kind]" :stroke-width="node.kind === 'end' ? 3 : 2" />
              <text y="4" text-anchor="middle" class="pg-node-label">{{ node.label.length > 16 ? node.label.slice(0, 16) + '…' : node.label }}</text>
            </g>
            <defs>
              <marker id="pg-arrow" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
                <polygon points="0 0, 8 3, 0 6" fill="#6b7280" />
              </marker>
            </defs>
          </svg>
        </div>
      </template>
      <div v-else-if="!parseError" class="pg-empty">Start typing to see the model…</div>
    </div>
  </div>
</template>

<style scoped>
.pg-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0;
  height: calc(100vh - 120px);
}
.pg-editor {
  display: flex;
  flex-direction: column;
  border-right: 1px solid var(--color-rule);
}
.pg-editor-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: var(--color-surface-2);
  border-bottom: 1px solid var(--color-rule);
  font-family: var(--font-mono);
  font-size: 0.8rem;
  color: var(--color-text-3);
}
.pg-filename { flex: 1; }
.pg-btn {
  padding: 0.25rem 0.6rem;
  border: 1px solid var(--color-rule-strong);
  border-radius: 4px;
  background: var(--color-surface);
  color: var(--color-text-2);
  font-size: 0.78rem;
  cursor: pointer;
}
.pg-btn:hover { background: var(--color-surface-2); }
.pg-code {
  flex: 1;
  border: none;
  padding: 1rem;
  font-family: var(--font-mono);
  font-size: 0.82rem;
  line-height: 1.75;
  resize: none;
  outline: none;
  background: var(--color-surface);
  color: var(--color-ink);
  tab-size: 2;
}
.pg-output {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: var(--color-surface);
}
.pg-error {
  padding: 0.75rem 1rem;
  background: rgba(125, 42, 42, 0.1);
  border-bottom: 1px solid var(--color-burgundy);
  color: var(--color-burgundy);
  font-family: var(--font-mono);
  font-size: 0.8rem;
}
.pg-stats {
  padding: 0.75rem 1rem;
  border-bottom: 1px solid var(--color-rule);
}
.pg-stats h3 {
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--color-text-3);
  margin-bottom: 0.4rem;
}
.pg-stat-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}
.pg-stat {
  font-size: 0.78rem;
  padding: 0.15rem 0.5rem;
  background: var(--color-surface-2);
  border-radius: 3px;
  color: var(--color-text-2);
}
.pg-diagram {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.pg-diagram-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.4rem 1rem;
  border-bottom: 1px solid var(--color-rule);
}
.pg-diagram-header h3 {
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--color-burgundy);
}
:global(.dark) .pg-diagram-header h3 { color: var(--color-ochre); }
.pg-zoom-controls {
  display: flex;
  gap: 0.25rem;
}
.pg-zoom-controls button {
  width: 26px;
  height: 26px;
  border: 1px solid var(--color-rule);
  background: var(--color-surface);
  border-radius: 3px;
  cursor: pointer;
  font-size: 0.85rem;
  color: var(--color-text-2);
}
.pg-zoom-controls button:hover { background: var(--color-surface-2); }
.pg-canvas-tabs {
  display: flex;
  gap: 0;
  padding: 0 1rem;
  border-bottom: 1px solid var(--color-rule);
  overflow-x: auto;
}
.pg-canvas-tabs button {
  padding: 0.3rem 0.6rem;
  border: none;
  background: none;
  cursor: pointer;
  font-size: 0.75rem;
  font-family: var(--font-mono);
  color: var(--color-text-3);
  border-bottom: 2px solid transparent;
  white-space: nowrap;
}
.pg-canvas-tabs button.active {
  color: var(--color-burgundy);
  border-bottom-color: var(--color-burgundy);
}
:global(.dark) .pg-canvas-tabs button.active { color: var(--color-ochre); border-bottom-color: var(--color-ochre); }
.pg-svg {
  flex: 1;
  width: 100%;
  cursor: grab;
  background-image: radial-gradient(circle, var(--color-rule) 1px, transparent 1px);
  background-size: 20px 20px;
}
.pg-svg:active { cursor: grabbing; }
.pg-node-label {
  font-size: 10px;
  fill: var(--color-text-2);
  pointer-events: none;
  user-select: none;
}
.pg-empty {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-text-3);
  font-size: 0.9rem;
}
@media (max-width: 768px) {
  .pg-layout { grid-template-columns: 1fr; height: auto; }
  .pg-editor, .pg-output { min-height: 300px; }
}
</style>
