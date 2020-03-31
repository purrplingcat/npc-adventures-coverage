<template>
  <div class="text-center">
    <v-menu offset-y>
      <template v-slot:activator="{ on }">
        <v-btn
          text
          v-on="on"
        >
          {{ translate(selected) }} <v-icon>mdi-chevron-down</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item
          v-for="([locale, label], index) in items"
          :key="index"
          :to="`/details/${locale}`"
        >
          <v-list-item-title>{{ label }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
  export default {
    props: ['items', 'selected'],
    methods: {
      translate(code) {
        const items = this.$props.items || [];
        const [_, label] = items.find(([locale]) => locale === code) || [];

        return label || code;
      }
    }
  }
</script>
