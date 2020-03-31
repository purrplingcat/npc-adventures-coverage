let alreadyDone = false;

export default async function({store}) {
  if (!alreadyDone) {
    await store.dispatch("load");
    alreadyDone = true;
  }
}
