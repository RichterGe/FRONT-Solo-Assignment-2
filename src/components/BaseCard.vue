<template>
  <div class="base-card">
    <div class="card-header" v-if="$slots.title">
      <slot name="title"></slot>
    </div>
    <div class="card-body">
      <slot name="content" ></slot>
    </div>
    <div class="card-actions" v-if="$slots.actions">
      <slot name="actions"></slot>
    </div>
  </div>
</template>

<style scoped>
.base-card {
  background-color: var(--card-bg);
  border-radius: 12px;
  /* Softer shadow, removed the solid 1px border */
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  width: 100%;
  display: flex;
  flex-direction: column;
}

.card-header {
  padding: var(--space-md) var(--space-md) var(--space-sm) var(--space-md);
  font-size: 1.25rem;
  font-weight: bold;
  color: var(--card-header);
}

.card-body {
  padding: 0 var(--space-md) var(--space-md) var(--space-md);
  color: var(--card-body);
  line-height: 1.5;
}

.card-actions {
  padding: var(--space-sm);
  display: flex;
  justify-content: flex-end; /* Aligns the delete button to the right */
  background-color: var(--card-actions);
}
</style>