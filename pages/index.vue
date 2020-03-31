<template>
  <v-layout
    column
    justify-center
    align-center
  >
    <v-container
      class="mt-4"
    >
      <h1 class="display-1">{{report.title}}</h1>
      <div class="mt-6">
        <v-switch
          v-model="onlyOfficial"
          label="Only official translations"
        ></v-switch>
      </div>
      <v-row class="mt-2">
        <v-col 
          v-for="stat in sort(report.stats)"
          :key="stat.locale" 
          class="mb-2"
          cols="12"
          md="6"
          xl="3"
        >
          <StatCard :stat="stat" />
        </v-col>
      </v-row>
      <div class="mt-4">
        <small class="grey--text">This report was generated {{ formatDate(report.date) }}</small>
      </div>
    </v-container>
  </v-layout>
</template>

<script>
import StatCard from '~/components/StatCard.vue'
import { mapState } from 'vuex'
import { format, isValid } from "date-fns"

export default {
  components: {
    StatCard
  },
  data() {
    return {onlyOfficial: true};
  },
  computed: {
    ...mapState({
      report: state => state.report
    })
  },
  methods: {
    formatDate(value) {
      const date = new Date(value)

      if (isValid(date)) {
        return format(date, "yyyy-MM-dd hh:mm:ss");
      }

      return value
    },
    sort(arr) {
      if (!arr) {
        return [];
      }

      if (this.$data.onlyOfficial) {
        arr = arr.filter((item) => item.official);
      }

      return arr.concat().sort((a, b) => {
        if (a.coverage.percentage === b.coverage.percentage) {
          return 0;
        }

        return a.coverage.percentage <= b.coverage.percentage ? 1 : -1;
      });
    }
  }
}
</script>
