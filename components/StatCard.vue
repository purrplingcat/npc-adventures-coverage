<template>
  <v-card
    class="mr-4"
    shaped
  >
    <v-list-item three-line>
      <v-list-item-content>
        <v-list-item-title class="headline mb-1">{{ stat.label || stat.locale }}</v-list-item-title>
        <v-list-item-subtitle>
          Covered <strong>{{ stat.coverage.covered }}</strong> of <strong>{{ stat.coverage.total }}</strong> entries.
        </v-list-item-subtitle>
      </v-list-item-content>
      
      <v-list-item-avatar
        tile
        size="80"
        :color="colorize(stat.coverage.percentage)"
      >
        <span class="headline white--text">{{ Math.round(stat.coverage.percentage * 100) }}%</span>
      </v-list-item-avatar>
    </v-list-item>

    <v-card-actions>
      <v-btn text :to="`/details/${stat.locale}`">Details</v-btn>
      <div class="ml-auto mr-2">
        <v-chip color="error" label small v-show="stat.failed">Corrupted</v-chip>
        <v-chip color="success" label small v-show="stat.official">Official</v-chip>
      </div>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    stat: Object
  },
  methods: {
    colorize(value) {
      if (value === 1.0) {
        return "green"
      }
      if (value >= 0.9) {
        return "light-green"
      }
      if (value >= 0.8) {
        return "lime"
      }
      if (value >= 0.5) {
        return "orange"
      }

      return "red"
    },
  }
}
</script>