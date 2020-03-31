<template>
  <v-row no-gutters>
    <v-expansion-panels accordion>
      <v-expansion-panel v-for="report in analysis" :key="report.locale">
        <v-expansion-panel-header>
          <v-row no-gutters>
            <v-col cols="4"><strong :class="report.error && `error--text`">{{ report.asset }}</strong></v-col>
            <v-col class="text--secondary">Covered: {{ report.coverage.covered}}</v-col>
            <v-col class="text--secondary">Uncovered: {{(report.coverage.total - report.coverage.covered )}}</v-col>
            <v-col class="text--secondary">Total: {{ report.coverage.total}}</v-col>
            <v-col>
              <v-chip small :color="colorize(report.coverage)" class="my-n2">
                <strong>{{ percentage(report.coverage) }}%</strong>
              </v-chip>
            </v-col>
          </v-row>
        </v-expansion-panel-header>
        <v-expansion-panel-content v-show="report.missing.length > 0" class="grey lighten-4 pt-4">
          <p v-if="report.missing.length">
            These content keys are untranslated:
          </p>
          <p v-else-if="report.error">
            Translation for this file is corrupted: <br />
            <code>{{ report.error }}</code>
          </p>
          <p v-else>All keys are translated!</p>
          <span v-show="report.missing" v-for="k in report.missing" :key="k">
            <code>{{ k }}</code>&nbsp;
          </span>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-row>
</template>

<script>
export default {
  validate({ params }) {
    return /^[a-z]{2}-[A-Z]{2}$/.test(params.locale);
  },
  async asyncData({params, store, error}) {
    const report = store.state.report.reports.find(r => r.locale === params.locale);

    if (!report) {
      return error({ message: "Report not found", statusCode: 404});
    }

    return report;
  },
  head () {
    return {
      title: `Coverage report for ${this.locale}`
    }
  },
  methods: {
    uncovered(data) {
      return data.filter(r => r.coverage.covered !== r.coverage.total)
    },
    percentage(coverage) {
      return Math.round(coverage.covered / coverage.total * 100)
    },
    colorize(coverage) {
      const percentil = coverage.covered / coverage.total

      if (percentil <= 0.5) {
        return "red"
      }
      if (percentil < 0.8) {
        return "orange"
      }
      if (percentil < 0.9) {
        return "lime"
      }

      return "light-green"
    }
  }
}
</script>
