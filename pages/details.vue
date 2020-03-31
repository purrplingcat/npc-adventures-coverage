<template>
  <v-layout column>
    <v-row class="px-4 mt-4">
      <h2>Detailed report</h2>
      <v-spacer />
      <LocaleSelect :items="reports.map(r => [r.locale, r.label])" :selected="$route.params.locale || 'Pick a locale'" />
    </v-row>
    <v-row class="px-4 mt-6">
      <NuxtChild :key="$route.params.locale" />
    </v-row>
  </v-layout>
</template>

<script>
import LocaleSelect from '~/components/LocaleSelect.vue'
import { mapState } from 'vuex'

export default {
  components: {
    LocaleSelect
  },
  computed: {
    ...mapState({
      reports: state => state.report.reports || []
    })
  }
}
</script>