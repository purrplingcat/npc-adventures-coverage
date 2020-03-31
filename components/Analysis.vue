<template>
  <v-expansion-panels accordion>
    <v-expansion-panel>
      <v-expansion-panel-header>
        <v-row no-gutters>
          <v-col cols="4">{{ asset }}</v-col>
          <v-col cols="6">Covered: {{ coverage.covered || 'Not set' }}</v-col>
          <v-col cols="6">Total: {{ coverage.total || 'Not set' }}</v-col>
        </v-row>
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        @missing
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

